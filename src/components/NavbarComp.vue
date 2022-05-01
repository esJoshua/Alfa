<template>
  <div>
    <b-navbar toggleable="md" type="dark" class="p-3">
      <b-navbar-brand to="/">Cursos AlfaWeb</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav tab class="margin">
          <template v-if="userState">
            <b-nav-item exact exact-active-class="active" to="/"
              >Home</b-nav-item
            >
            <b-nav-item exact exact-active-class="active" to="/admin"
              >Admin</b-nav-item
            >
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ user.user }}</em>
              </template>
              <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item exact exact-active-class="active" to="/login"
              >Login</b-nav-item
            >
            <b-nav-item exact exact-active-class="active" to="/registro"
              >Registro</b-nav-item
            >
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "NavbarComp",
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutBtn() {
      await this.logout();
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["userState"]),
  },
};
</script>

<style lang="scss" scoped>
* {
  text-decoration: none;
}
.margin {
  margin-left: auto;
}
a {
  font-weight: bold;
}
nav {
  background-color: #000000;
}
.navbar-brand {
  font-size: 2rem;
}
</style>
