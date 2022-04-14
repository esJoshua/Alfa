<template>
  <div>
    <h1 class="mb-3 text-center">Lista de Cursos</h1>
    <Card :dataCursosCard="cursos" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/CardComp.vue";
export default {
  name: "HomeView",
  computed: {
    ...mapState(["user", "cursos"]),
  },
  components: {
    Card,
  },
};
</script>
