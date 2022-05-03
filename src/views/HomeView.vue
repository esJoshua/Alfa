<template>
  <b-container class="mt-4">
    <b-row id="title-container">
      <b-col>
        <h1 class="text-center">Lista de Cursos</h1>
      </b-col>
    </b-row>
    <template v-if="loadSpinner">
      <div
        class="text-primary text-center my-5"
        role="status"
        aria-hidden="true"
      >
        <div class="spinner-border m-3" style="color: #4ff149"></div>
        <div style="color: #4ff149">Cargando contenido...</div>
      </div>
    </template>
    <Card :dataCoursesCard="courses" v-if="!loadSpinner" />
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/CardComp.vue";
export default {
  name: "HomeView",
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("courses", ["courses", "loadSpinner"]),
    ...mapState("spinner", ["loadSpinner"]),
  },
  components: {
    Card,
  },
};
</script>
