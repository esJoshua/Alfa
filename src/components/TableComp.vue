<template>
  <div>
    <b-table-simple
      hover
      striped
      small
      responsive
      class="text-center g-0"
      table-variant="light"
    >
      <b-thead head-variant="dark">
        <b-tr>
          <b-th scope="col" class="text-start">Curso</b-th>
          <b-th scope="col">Cupos</b-th>
          <b-th scope="col">Inscritos</b-th>
          <b-th scope="col">Duración</b-th>
          <b-th scope="col">Costo</b-th>
          <b-th scope="col">Terminado</b-th>
          <b-th scope="col">Fecha</b-th>
          <b-th scope="col">Acciones</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="course of dataCoursesTable" :key="course.codigo">
          <b-td class="text-start">{{ course.nombre }}</b-td>
          <b-td>{{ course.cupos }}</b-td>
          <b-td>{{ course.inscritos }}</b-td>
          <b-td>{{ course.duracion }}</b-td>
          <b-td>
            <span class="badge rounded-pill bg-info p-2 text-dark"
              >${{ course.costo.toLocaleString("DE-de") }}</span
            >
          </b-td>
          <b-td>
            <span
              class="py-2 px-4 badge rounded-pill text-center"
              :class="[course.estado ? 'bg-primary' : 'bg-secondary']"
            >
              {{ course.estado ? "Si" : "No" }}</span
            >
          </b-td>
          <b-td>
            <span class="badge rounded-pill bg-success p-2">{{
              new Date(course.fecha.seconds * 1000)
                .toLocaleString()
                .split(",")[0]
            }}</span>
          </b-td>
          <b-td>
            <RouterLink class="cursor" :to="`/edicion/${course.codigo}`"
              >✏️</RouterLink
            >
            <span class="cursor" @click="deleteCourseBtn(course)">🗑️</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TableComp",
  data() {
    return {
      confirmation: "",
    };
  },
  props: {
    dataCoursesTable: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions(["deleteCourse"]),
    deleteCourseBtn(course) {
      this.$bvModal
        .msgBoxConfirm("Confirme la eliminación del curso.", {
          title: "!! Advertencia !!",
          okVariant: "danger",
          okTitle: "Sí, borrar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
          headerBgVariant: "warning",
          bodyTextVariant: "danger",
        })
        .then((value) => {
          this.confirmation = value;
          //console.log(this.confirmation);
          if (this.confirmation === true) this.deleteCourse(course);
        });
    },
  },
};
</script>

<style>
.close {
  display: none;
}
.cursor {
  cursor: pointer;
  text-decoration: none;
}
</style>
