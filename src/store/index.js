import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/helpers/firebase.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cursos: [],
    loadSpinner: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_DATA_CURSOS(state, payload) {
      state.cursos = payload;
    },
    SET_LOAD_SPINNER(state, payload) {
      state.loadSpinner = payload;
    },
  },
  getters: {
    userState(state) {
      if (state.user === null) {
        return false;
      } else {
        return true;
      }
    },
    totalCursos(state) {
      return state.cursos.length;
    },
    totalCupos(state) {
      let totalCupos = 0;
      state.cursos.forEach((cupo) => {
        //console.log(cupo.cupos);
        totalCupos = totalCupos + Number(cupo.cupos);
      });
      return totalCupos;
    },
    totalInscritos(state) {
      return state.cursos.reduce((accumulator, curso) => {
        //return state.cursos.reduce((accumulator, curso, i) => {
        accumulator = accumulator + Number(curso.inscritos);
        //console.log("iteración", 1 + i++, accumulator);
        return accumulator;
      }, 0);
    },
    cuposRestantes(state) {
      return state.cursos.reduce((accumulator, curso) => {
        //return state.cursos.reduce((accumulator, curso, i) => {
        accumulator = accumulator + Number(curso.cupos - curso.inscritos);
        //console.log("iteración", 1 + i++, curso.cupos - curso.inscritos);
        return accumulator;
      }, 0);
    },
    cursosTerminados(state) {
      return state.cursos.reduce((accumulator, item) => {
        accumulator = accumulator + item.estado;
        //console.log(+item.estado);
        return accumulator;
      }, 0);
    },
    cursosActivos(state) {
      return state.cursos.reduce((accumulator, item) => {
        accumulator = accumulator + !item.estado;
        //console.log(+!item.estado);
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
        const newUser = {
          user: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        commit("SET_USER", newUser);
        //localStorage.setItem("loggedIn", "true");
        router.push("/");
        console.log(userCredential.user);
        console.log(newUser);
      } catch (error) {
        if (error.code === "auth/invalid-email")
          alert("Escribe un correo valido");
        else if (error.code === "auth/weak-password")
          alert("Contraseña debil, debe contener al menos 6 caracteres");
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
        const user = {
          user: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        commit("SET_USER", user);
        //localStorage.setItem("loggedIn", "true");
        router.push("/");
        console.log(userCredential.user);
      } catch (error) {
        if (error.code === "auth/user-not-found")
          alert("Usuario no encontrado");
        else if (error.code === "auth/wrong-password")
          alert("La contraseña no coincide");
      }
    },

    async logout({ commit }) {
      const auth = getAuth();
      try {
        const userCredential = await signOut(auth);
        commit("SET_USER", null);
        //localStorage.removeItem("loggedIn");
        router.push("/login");
        console.log(
          userCredential ? userCredential.user : "userCredential ya no existe"
        );
      } catch (error) {
        console.error(error);
      }
    },
    authStateChanged({ commit }) {
      const auth = getAuth();
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userDetected = {
              user: user.email,
              uid: user.uid,
            };
            //console.log(user);
            commit("SET_USER", userDetected);
          } else {
            commit("SET_USER", user);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },

    async getCollectionCursos({ commit }) {
      commit("SET_LOAD_SPINNER", true);
      setTimeout(() => {
        try {
          const q = query(collection(db, "cursos"));
          onSnapshot(q, (querySnapshot) => {
            const cursos = [];
            querySnapshot.forEach((doc) => {
              const curso = {
                ...doc.data(),
                idCurso: doc.id,
              };
              cursos.push(curso);
            });
            commit("SET_DATA_CURSOS", cursos);
            commit("SET_LOAD_SPINNER", false);
          });
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    },

    async updateCurso(_, payload) {
      console.log(payload);
      try {
        const docRef = doc(db, "cursos", payload.idCurso);
        await updateDoc(docRef, payload);
        const timestamp = serverTimestamp();
        console.log(timestamp);
        console.log("Ha sido Actualizado el curso con ID: ", docRef.id);
        alert("Ha sido Actualizado el curso con codigo: " + payload.codigo);
      } catch (error) {
        console.error(error);
      }
    },
    async createCurso(_, payload) {
      try {
        const docRef = await addDoc(collection(db, "cursos"), {
          nombre: payload.nombre,
          imagen: payload.imagen,
          cupos: payload.cupos,
          inscritos: payload.inscritos,
          duracion: payload.duracion,
          costo: payload.costo,
          codigo: payload.codigo,
          descripcion: payload.descripcion,
          estado: payload.estado,
        });
        //console.log(payload);
        console.log("Ha sido Creado el curso con ID: ", docRef.id);
        //alert("Ha sido Creado el curso con codigo: " + payload.codigo);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCurso(_, payload) {
      console.log(payload);
      try {
        await deleteDoc(doc(db, "cursos", payload.idCurso));
        console.log("Ha sido Eliminado el curso con ID: ", payload.idCurso);
        //alert("Ha sido Eliminado el curso con codigo: " + payload.codigo);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
