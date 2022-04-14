<template>
  <div>
    <nav id="app">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/admin">admin</router-link> |
      <router-link to="/edicion/:id">edicion</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/registro">registro</router-link>|
      <button @click="logoutBtn">logout</button> -->
      <template v-if="loggedIn">
        <router-link to="/">Home</router-link> |
        <router-link to="/admin">admin</router-link> |
        <button @click="logout" class="btn btn-link">Cerrar Sesión</button>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>|
        <router-link to="/registro">registro</router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  created() {
    this.getCollectionCursos();
  },
  methods: {
    ...mapActions(["logout", "getCollectionCursos"]),
    async logoutBtn() {
      await this.logout();
    },
  },
  computed: {
    ...mapState(["loggedIn"]),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
