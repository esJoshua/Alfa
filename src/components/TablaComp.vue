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
        <b-tr v-for="curso of dataCursosTabla" :key="curso.codigo">
          <b-td class="text-start">{{ curso.nombre }}</b-td>
          <b-td>{{ curso.cupos }}</b-td>
          <b-td>{{ curso.inscritos }}</b-td>
          <b-td>{{ curso.duracion }}</b-td>
          <b-td>
            <span class="badge rounded-pill bg-info p-2"
              >${{ curso.costo.toLocaleString("DE-de") }}</span
            >
          </b-td>
          <b-td>
            <span
              class="py-2 px-4 badge rounded-pill text-center"
              :class="[curso.estado ? 'bg-primary' : 'bg-secondary']"
            >
              {{ curso.estado ? "Si" : "No" }}</span
            >
          </b-td>
          <b-td>
            <span class="badge rounded-pill bg-success p-2">Fecha</span>
          </b-td>
          <b-td>
            <RouterLink class="cursor" :to="`/edicion/${curso.codigo}`"
              >✏️</RouterLink
            >
            <span class="cursor" @click="deleteCursoBtn(curso)">🗑️</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TablaComp",
  data() {
    return {
      confirmacion: "",
    };
  },
  props: {
    dataCursosTabla: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions(["deleteCurso"]),
    deleteCursoBtn(curso) {
      console.log("click");
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
          this.confirmacion = value;
          if (this.confirmacion === true) this.deleteCurso(curso);
          console.log(this.confirmacion);
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
