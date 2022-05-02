import { db } from "@/helpers/firebase.js";
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

export default {
  //////////////* COURSE MANAGEMENT  *////////////////////
  async getCollectionCourses({ commit }) {
    commit("spinner/SET_LOAD_SPINNER", true, { root: true });
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
          commit("spinner/SET_LOAD_SPINNER", false, { root: true });
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
};
