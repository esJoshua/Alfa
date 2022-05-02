import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "@/router";

export default {
  //////////////* USER MANAGEMENT  *////////////////////
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
      router.push("/");
      console.log(userCredential.user);
    } catch (error) {
      if (error.code === "auth/user-not-found") alert("Usuario no encontrado");
      else if (error.code === "auth/wrong-password")
        alert("La contraseña no coincide");
    }
  },

  async logout({ commit }) {
    const auth = getAuth();
    try {
      const userCredential = await signOut(auth);
      commit("SET_USER", null);
      router.push("/login");
      console.log(
        userCredential ? userCredential.user : "userCredential ya no existe"
      );
    } catch (error) {
      console.error(error);
    }
  },
  authState({ commit }, payload) {
    commit("SET_USER", payload);
  },
};
