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
    <Table :dataCoursesTable="courses" v-if="!loadSpinner" />
    <Resume v-if="!loadSpinner" />
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Table from "@/components/TableComp.vue";
import Modal from "@/components/ModalComp.vue";
import Resume from "@/components/ResumeComp.vue";
export default {
  name: "AdminView",
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("courses", ["courses", "loadSpinner"]),
    ...mapState("spinner", ["loadSpinner"]),
  },
  components: {
    Table,
    Modal,
    Resume,
  },
};
</script>
