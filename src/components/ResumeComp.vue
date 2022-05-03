<template>
  <b-row>
    <b-col class="mt-3 resume-bg">
      <p
        class="resume-border rounded p-2"
        :style="'borderColor: purple; color: purple'"
      >
        Cantidad total de alumnos permitidos:
        {{ totalCupos }} alumnos
      </p>
      <p
        class="resume-border rounded p-2"
        :style="'border-color: blue; color:blue'"
      >
        Cantidad total de alumnos inscritos: {{ totalInscritos }} alumnos
      </p>
      <p
        class="resume-border rounded p-2"
        :style="'border-color: green; color:green'"
      >
        Cantidad total de cupos restantes: {{ cuposRestantes }} alumnos
      </p>
      <p
        class="resume-border rounded p-2"
        :style="'border-color: rgb(243, 31, 148); color:rgb(243, 31, 148)'"
      >
        Cantidad total de curso terminados: {{ cursosTerminados }} cursos
      </p>
      <p
        class="resume-border rounded p-2"
        :style="'border-color: brown; color:brown'"
      >
        Cantidad total de cursos activos: {{ cursosActivos }} cursos
      </p>
      <p
        class="resume-border rounded p-2"
        :style="'border-color: orange; color:orange'"
      >
        Cantidad total de cursos: {{ totalCursos }} cursos
      </p>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ResumeComp",
  computed: {
    ...mapGetters("courses", [
      "totalCursos",
      "totalCupos",
      "totalInscritos",
      "cuposRestantes",
      "cursosTerminados",
      "cursosActivos",
    ]),
  },
};
</script>
<style>
.resume-border {
  border: 2px solid;
  background-color: white;
}
.resume-bg {
  background-color: rgba(5, 5, 5, 0.8);
}
</style>
