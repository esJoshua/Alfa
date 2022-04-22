<template>
  <b-container class="mt-4">
    <Modal />
    <b-row>
      <b-col>
        <h1 class="text-center">Administración</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <button v-b-modal.modal-add-curso class="btn btn-primary mt-3 w-100">
          Agregar Curso
        </button>
      </b-col>
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
      <b-col class="mt-3">
        <Tabla :dataCursosTabla="cursos" v-if="!loadSpinner" />
      </b-col>
    </b-row>

    <div class="mt-3">
      <p
        class="borderp rounded p-2"
        :style="'borderColor: purple; color: purple'"
      >
        Cantidad total de alumnos permitidos:
        {{ totalCupos }} alumnos
      </p>
      <p class="borderp rounded p-2" :style="'border-color: blue; color:blue'">
        Cantidad total de alumnos inscritos: {{ totalInscritos }} alumnos
      </p>
      <p class="borderp rounded p-2" :style="'border-color: red; color:red'">
        Cantidad total de cupos restantes: {{ cuposRestantes }} alumnos
      </p>
      <p
        class="borderp rounded p-2"
        :style="'border-color: rgb(243, 31, 148); color:rgb(243, 31, 148)'"
      >
        Cantidad total de curso terminados: {{ cursosTerminados }} cursos
      </p>
      <p
        class="borderp rounded p-2"
        :style="'border-color: brown; color:brown'"
      >
        Cantidad total de cursos activos: {{ cursosActivos }} cursos
      </p>
      <p
        class="borderp rounded p-2"
        :style="'border-color: orange; color:orange'"
      >
        Cantidad total de cursos: {{ totalCursos }} cursos
      </p>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Tabla from "@/components/TablaComp.vue";
import Modal from "@/components/ModalComp.vue";
export default {
  name: "AdministracionView",
  computed: {
    ...mapState(["user", "cursos", "loadSpinner"]),
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
    Modal,
  },
};
</script>

<style>
.borderp {
  border: 1px solid;
}
</style>
