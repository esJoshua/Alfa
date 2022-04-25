<template>
  <div id="app">
    <Navbar />

    <router-view class="views-container" />

    <Footer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "@/components/NavbarComp.vue";
import Footer from "@/components/FooterComp.vue";
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
    Footer,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  position: relative;
  background-image: url("https://wallpaperboat.com/wp-content/uploads/2020/04/matrix-wallpaper-download-13.jpg");
}
.views-container {
  padding-bottom: 8rem;
}
h1 {
  color: white;
  border: 2px solid #1adb6ac5;
  box-shadow: 0 0 70px 15px #1adb6ac5;
  background-color: rgb(0, 0, 0, 2);
}
</style>
