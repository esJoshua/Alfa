<template>
  <div>
    <Navbar />

    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "@/components/NavbarComp.vue";
export default {
  name: "App",
  created() {
    this.getCollectionCursos();
  },
  methods: {
    ...mapActions(["getCollectionCursos"]),
  },

  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
