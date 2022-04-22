<template>
  <form class="container mt-4">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-2">Registre sus Datos</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="borderless">
          <div>
            <label class="form-label">Usuario</label>
            <input
              class="form-control"
              placeholder="Intenta con: xxxxxx@correo.com"
              type="email"
              pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
              invalid-feedback="Ingresa un email válido"
              v-model="dataUser.user"
              required
            />
          </div>
          <div>
            <label class="mt-3 form-label">Contraseña</label>
            <input
              class="form-control"
              placeholder="Ingresa 123456"
              type="password"
              v-model="dataUser.password"
              minlength="6"
              title="Debe contener mínimo 6 caracteres"
              required
            />
          </div>
          <div class="form-check d-flex justify-content-center mt-3">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              required
            />
            <label class="form-check-label">
              He leído y acepto los términos y condiciones de uso
            </label>
          </div>
          <div class="text-center">
            <button @submit="createUserNew" class="btn btn-primary mt-3">
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "RegistroView",
  data() {
    return {
      dataUser: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["createUser"]),
    ...mapMutations(["SET_USER"]),
    async createUserNew() {
      await this.createUser(this.dataUser);
      this.SET_USER(this.dataUser);
    },
  },
};
</script>

<style></style>
