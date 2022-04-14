<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Curso</th>
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
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.cupos }}</td>
          <td>{{ curso.inscritos }}</td>
          <td>{{ curso.duracion }}</td>
          <td>
            <span class="badge rounded-pill bg-success p-2"
              >${{ curso.costo }}</span
            >
          </td>
          <td>
            <span
              class="p-2 badge rounded-pill"
              :class="[curso.estado ? 'bg-primary' : 'bg-secondary']"
            >
              {{ curso.estado ? "Si" : "No" }}</span
            >
          </td>
          <td><span class="badge rounded-pill bg-success p-2">Fecha</span></td>
          <td><span>✏️</span><span>🗑️</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaComp",
  props: {
    dataCursosTabla: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
