<template>
  <div class="container">
    <h1>{{ user.user }}</h1>
    <h1>{{ user.password }}</h1>
    <div class="row">
      <div class="col-12">
        <h1>Administración</h1>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary mb-3 col-12">Agregar Curso</button>
      <div class="col-12">
        <Tabla :dataCursosTabla="cursos" />
      </div>
    </div>
    <div class="row">
      <h1>{{ totalCursos }}</h1>
      <h1>{{ totalCupos }}</h1>
      <h1>{{ totalInscritos }}</h1>
      <h1>{{ cuposRestantes }}</h1>
      <h1>{{ cursosTerminados }}</h1>
      <h1>{{ cursosActivos }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Tabla from "@/components/TablaComp.vue";
export default {
  name: "AdministracionView",
  computed: {
    ...mapState(["user", "cursos"]),
    ...mapGetters([
      "totalCursos",
      "totalCupos",
      "totalInscritos",
      "cuposRestantes",
      "cursosTerminados",
      "cursosActivos",
    ]),
  },
  components: {
    Tabla,
  },
};
</script>

<style></style>
