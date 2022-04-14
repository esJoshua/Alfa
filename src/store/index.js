import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/helpers/firebase.js";

//onAuthStateChanged,
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    cursos: [],
  },
  mutations: {
    SET_LOG(state, payload) {
      state.loggedIn = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_DATA_CURSOS(state, payload) {
      state.cursos = payload;
    },
  },
  getters: {
    totalCursos(state) {
      return state.cursos.length;
    },
    totalCupos(state) {
      let totalCupos = 0;
      state.cursos.forEach((cupo) => {
        console.log(cupo.cupos);
        totalCupos = totalCupos + parseInt(cupo.cupos);
      });
      return totalCupos;
    },
    totalInscritos(state) {
      return state.cursos.reduce((accumulator, curso, i) => {
        accumulator = accumulator + curso.inscritos;
        console.log("iteración", 1 + i++, accumulator);
        return accumulator;
      }, 0);
    },
    cuposRestantes(state) {
      return state.cursos.reduce((accumulator, curso, i) => {
        accumulator = accumulator + curso.cupos - curso.inscritos;
        console.log("iteración", 1 + i++, curso.cupos - curso.inscritos);
        return accumulator;
      }, 0);
    },
    cursosTerminados(state) {
      return state.cursos.reduce((accumulator, item) => {
        accumulator = accumulator + item.estado;
        console.log(+item.estado);
        return accumulator;
      }, 0);
    },
    cursosActivos(state) {
      return state.cursos.reduce((accumulator, item) => {
        accumulator = accumulator + !item.estado;
        console.log(+!item.estado);
        return accumulator;
      }, 0);
    },
  },
  actions: {
    async createUser({ commit }, payload) {
      //async createUser(payload) {
      const user = payload.user;
      const password = payload.password;
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          user,
          password
        );
        commit("SET_LOG", true);
        localStorage.setItem("loggedIn", "true");
        router.push("/");
        console.log(userCredential.user);
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    },

    async loginWithFirebase({ commit }, payload) {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          payload.user,
          payload.password
        );
        commit("SET_LOG", true);
        localStorage.setItem("loggedIn", "true");
        router.push("/");
        console.log(userCredential.user);
      } catch (error) {
        console.error(error);
      }
    },

    async logout({ commit }) {
      const auth = getAuth();
      try {
        const userCredential = await signOut(auth);
        commit("SET_LOG", false);
        localStorage.removeItem("loggedIn");
        router.push("/login");
        console.log(
          userCredential ? userCredential.user : "userCredential ya no existe"
        );
      } catch (error) {
        console.error(error);
      }
    },

    /*  const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  },  */
    async getCollectionCursos({ commit }) {
      try {
        const request = await getDocs(collection(db, "cursos"));
        const data = request.docs.map((doc) => {
          const obj = {
            ...doc.data(),
            idCurso: doc.id,
          };
          return obj;
        });
        //console.log(data);
        commit("SET_DATA_CURSOS", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateCurso({ dispatch }, payload) {
      //console.log(payload);
      try {
        const docRef = doc(db, "cursos", payload.idCurso);
        await updateDoc(docRef, payload);
        console.log("Ha sido Actualizado el curso con ID: ", docRef.id);
        dispatch("getCollectionCursos");
        alert("Ha sido Actualizado el curso con codigo: " + payload.codigo);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
