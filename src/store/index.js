import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
    courses: [],
    loadSpinner: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_DATA_COURSES(state, payload) {
      state.courses = payload;
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
      return state.courses.length;
    },
    totalCupos(state) {
      let totalCupos = 0;
      state.courses.forEach((cupo) => {
        //console.log(cupo.cupos);
        totalCupos = totalCupos + Number(cupo.cupos);
      });
      return totalCupos;
    },
    totalInscritos(state) {
      return state.courses.reduce((accumulator, course) => {
        accumulator = accumulator + Number(course.inscritos);
        //return state.courses.reduce((accumulator, course, i) => {
        //console.log("iteración", 1 + i++, accumulator);
        return accumulator;
      }, 0);
    },
    cuposRestantes(state) {
      return state.courses.reduce((accumulator, course) => {
        accumulator = accumulator + Number(course.cupos - course.inscritos);
        //return state.courses.reduce((accumulator, course, i) => {
        //console.log("iteración", 1 + i++, course.cupos - course.inscritos);
        return accumulator;
      }, 0);
    },
    cursosTerminados(state) {
      return state.courses.reduce((accumulator, item) => {
        accumulator = accumulator + item.estado;
        //console.log(+item.estado);
        return accumulator;
      }, 0);
    },
    cursosActivos(state) {
      return state.courses.reduce((accumulator, item) => {
        accumulator = accumulator + !item.estado;
        //console.log(+!item.estado);
        return accumulator;
      }, 0);
    },
  },
  actions: {
    async createUser({ commit }, payload) {
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
    /* Comportamiento indeseado al refrescar la página, entraba al view del login y luego es que 
    se actualizaba el usuario logeado pero ya estaba dentro del view del login...

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
    }, */
    authState({ commit }, payload) {
      commit("SET_USER", payload);
    },

    async getCollectionCourses({ commit }) {
      commit("SET_LOAD_SPINNER", true);
      setTimeout(() => {
        try {
          const q = query(collection(db, "cursos"));
          onSnapshot(q, (querySnapshot) => {
            const coursesOnSnap = [];
            querySnapshot.forEach((doc) => {
              const course = {
                ...doc.data(),
                idCurso: doc.id,
              };
              coursesOnSnap.push(course);
            });
            console.log(coursesOnSnap);
            commit("SET_DATA_COURSES", coursesOnSnap);
            commit("SET_LOAD_SPINNER", false);
          });
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    },

    async updateCourse(_, payload) {
      try {
        const docRef = doc(db, "cursos", payload.idCurso);
        await updateDoc(docRef, {
          ...payload,
          fechaUpda: serverTimestamp(),
        });
        console.log("Ha sido Actualizado el curso con ID: ", docRef.id);
        alert("Ha sido Actualizado el curso con codigo: " + payload.codigo);
      } catch (error) {
        console.error(error);
      }
    },
    async createCourse(_, payload) {
      try {
        const docRef = await addDoc(collection(db, "cursos"), {
          nombre: payload.nombre,
          imagen: payload.imgUrlDefault || payload.imagen,
          cupos: payload.cupos,
          inscritos: Number(payload.inscritos),
          duracion: payload.duracion,
          costo: payload.costo,
          codigo: payload.codigo,
          descripcion: payload.descripcion,
          estado: payload.estado,
          fecha: serverTimestamp(),
        });
        console.log("Ha sido Creado el curso con ID: ", docRef.id);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCourse(_, payload) {
      console.log(payload);
      try {
        await deleteDoc(doc(db, "cursos", payload.idCurso));
        console.log("Ha sido Eliminado el curso con ID: ", payload.idCurso);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
