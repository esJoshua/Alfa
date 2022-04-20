<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" class="p-3">
      <b-navbar-brand to="/">AlfaWeb</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav tab class="margin">
          <template v-if="loggedIn">
            <b-nav-item exact exact-active-class="active" to="/"
              >Home</b-nav-item
            >
            <b-nav-item exact exact-active-class="active" to="/admin"
              >Admin</b-nav-item
            >
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ user.user }}</em>
              </template>
              <b-dropdown-item>Perfil</b-dropdown-item>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "NavbarComp",
  methods: {
    ...mapActions(["logout"]),
    async logoutBtn() {
      await this.logout();
    },
  },
  computed: {
    ...mapState(["loggedIn", "user"]),
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
.navbar-brand {
  font-size: 2rem;
}
</style>
