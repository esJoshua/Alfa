<template>
  <form
    class="container mt-4 text-white"
    :class="{ 'was-validated': deactivate }"
    @submit.prevent="createNewUser"
  >
    <div class="row justify-content-center">
      <div class="form-container">
        <label class="form-label">Usuario</label>
        <input
          class="form-control"
          placeholder="Ejemplo:: xxxxxx@correo.com"
          type="email"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
          invalid-feedback="Ingresa un email válido"
          v-model="dataUser.user"
          required
        />
        <label class="mt-3 form-label">Contraseña</label>
        <input
          class="form-control"
          placeholder="Ejemplo: 123456"
          type="password"
          v-model="dataUser.password"
          minlength="6"
          required
        />
        <template v-if="dataUser.password.length < 6">
          <small>Debe contener mínimo 6 caracteres</small>
        </template>
        <label class="mt-3 form-label">Repetir Contraseña</label>
        <input
          class="form-control"
          placeholder="Ejemplo: 123456"
          type="password"
          v-model="password2"
          minlength="6"
          title="Debe contener mínimo 6 caracteres"
          required
        />
        <template v-if="dataUser.password !== password2">
          <small>Contraseña no coincide</small>
        </template>
        <div class="form-check d-flex justify-content-center mt-3 novalidate">
          <input
            class="form-check-input me-2"
            type="checkbox"
            id="checkbox"
            value=""
            required
          />
          <label class="form-check-label" for="checkbox">
            He leído y acepto los términos y condiciones de uso
          </label>
        </div>
        <div class="text-center">
          <button
            type="submit"
            name="btn"
            :disabled="!deactivate"
            class="btn btn-primary mt-3"
          >
            Crear Usuario
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegistroView",
  data() {
    return {
      dataUser: {
        user: "",
        password: "",
      },
      password2: "",
    };
  },
  methods: {
    ...mapActions("user", ["createUser"]),
    createNewUser() {
      this.createUser(this.dataUser);
    },
  },
  computed: {
    deactivate() {
      console.log(this.dataUser.password, this.password2);
      return (
        this.dataUser.password === this.password2 &&
        this.dataUser.password.trim() !== "" &&
        this.dataUser.password.length > 5
      );
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
