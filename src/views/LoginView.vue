<template>
  <div class="container mt-4 text-white">
    <div class="row justify-content-center">
      <div class="form-container">
        <div>
          <label class="form-label">Usuario</label>
          <input
            class="form-control"
            placeholder="Intenta con: prueba@correo.com"
            type="email"
            v-model="dataUser.user"
            minlength="6"
            required
          />
        </div>
        <div class="mt-3">
          <label class="form-label">Contraseña</label>
          <input
            class="form-control"
            placeholder="Ingresa 123456"
            type="password"
            v-model="dataUser.password"
            minlength="6"
            required
          />
        </div>
        <div class="text-center mt-3">
          <button @click="login" class="btn btn-primary mx-2">Ingresar</button>
        </div>
        <div class="text-center mt-2">
          <p>
            No estás registrado?
            <RouterLink class="text-white" to="/registro"
              >Click aquí</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      dataUser: {
        user: "prueba@correo.com",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapActions(["loginWithFirebase"]),
    async login() {
      await this.loginWithFirebase(this.dataUser);
    },
  },
};
</script>

<style>
.form-container {
  max-width: 17rem;
  background-color: rgba(5, 5, 5, 0.9);
}
</style>
