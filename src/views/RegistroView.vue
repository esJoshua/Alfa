<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-2">Registre sus Datos</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="borderless">
          <div>
            <label>Usuario</label>
            <input
              class="form-control"
              placeholder="Intenta con: xxxxxx@correo.com"
              type="email"
              v-model="dataUser.user"
            />
          </div>
          <div>
            <label class="mt-3">Contraseña</label>
            <input
              class="form-control"
              placeholder="Ingresa 123456"
              type="password"
              v-model="dataUser.password"
            />
          </div>
          <div>
            <button @click="createUserNew" class="btn btn-primary mt-3">
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
