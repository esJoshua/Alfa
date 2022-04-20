<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-2">Ingrese sus Datos</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="login borderless">
          <div>
            <label class="login__title">Usuario</label>
            <input
              class="login__input form-control"
              placeholder="Intenta con: prueba@correo.com"
              type="email"
              v-model="dataUser.user"
              required
            />
          </div>
          <div>
            <label class="login__title mt-3">Contraseña</label>
            <input
              class="login__input form-control"
              placeholder="Ingresa 123456"
              type="password"
              v-model="dataUser.password"
              required
            />
          </div>
          <div class="mt-3">
            <button @click="login" class="login__btn btn btn-primary mx-2">
              Ingresar
            </button>
            <RouterLink to="/registro" class="login__btn btn btn-primary mx-2">
              Registrar Nuevo Usuario
            </RouterLink>
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
