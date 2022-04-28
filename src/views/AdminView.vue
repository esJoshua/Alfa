<template>
  <b-container class="mt-4">
    <Modal />
    <b-row id="title-container">
      <b-col>
        <h1 class="text-center">Administración</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12 g-0">
        <button v-b-modal.modal-add-course class="btn btn-primary mt-3 w-100">
          Agregar Curso
        </button>
      </b-col>
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
      <b-col class="mt-3 g-0">
        <Table :dataCoursesTable="courses" v-if="!loadSpinner" />
      </b-col>
    </b-row>
    <b-row>
      <div class="mt-3 resume-bg">
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
          :style="'border-color: red; color:red'"
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
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Table from "@/components/TableComp.vue";
import Modal from "@/components/ModalComp.vue";
export default {
  name: "AdminView",
  computed: {
    ...mapState(["user", "courses", "loadSpinner"]),
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
    Table,
    Modal,
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
