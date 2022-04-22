<template>
  <div class="container mt-4 text-white">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-2">Ingrese sus Datos</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div>
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
            <button @click="login" class="btn btn-primary mx-2">
              Ingresar
            </button>
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
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
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
    ...mapMutations(["SET_USER"]),
    ...mapActions(["loginWithFirebase"]),
    async login() {
      await this.loginWithFirebase(this.dataUser);
      this.SET_USER(this.dataUser);
    },
  },
};
</script>

<style></style>
