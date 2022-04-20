<template>
  <div>
    <h1 class="mb-3 text-center mt-4">Lista de Cursos</h1>
    <template v-if="loadSpinner">
      <div
        class="text-primary text-center my-5"
        role="status"
        aria-hidden="true"
      >
        <div class="spinner-border m-3"></div>
        <div>Cargando contenido...</div>
      </div>
    </template>
    <Card :dataCursosCard="cursos" v-if="!loadSpinner" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/CardComp.vue";
export default {
  name: "HomeView",
  computed: {
    ...mapState(["user", "cursos", "loadSpinner"]),
  },
  components: {
    Card,
  },
};
</script>
