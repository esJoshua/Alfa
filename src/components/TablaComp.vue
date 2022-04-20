<template>
  <div>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col" class="text-start">Curso</th>
          <th scope="col">Cupos</th>
          <th scope="col">Inscritos</th>
          <th scope="col">Duración</th>
          <th scope="col">Costo</th>
          <th scope="col">Terminado</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso of dataCursosTabla" :key="curso.codigo">
          <td class="text-start">{{ curso.nombre }}</td>
          <td>{{ curso.cupos }}</td>
          <td>{{ curso.inscritos }}</td>
          <td>{{ curso.duracion }}</td>
          <td>
            <span class="badge rounded-pill bg-info p-2"
              >${{ curso.costo }}</span
            >
          </td>
          <td>
            <span
              class="py-2 px-4 badge rounded-pill text-center"
              :class="[curso.estado ? 'bg-primary' : 'bg-secondary']"
            >
              {{ curso.estado ? "Si" : "No" }}</span
            >
          </td>
          <td>
            <span class="badge rounded-pill bg-success p-2">Fecha</span>
          </td>
          <td>
            <span
              ><RouterLink class="cursor" :to="`/edicion/${curso.codigo}`"
                >✏️</RouterLink
              ></span
            >
            <span class="cursor" @click="deleteCursoBtn(curso)">🗑️</span>
          </td>
        </tr>
      </tbody>
    </table>
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
