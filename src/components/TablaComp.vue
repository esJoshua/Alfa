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
          <td class="badge rounded-pill bg-success">{{ curso.costo }}</td>
          <td>
            {{ curso.estado ? "Si" : "No" }}
          </td>
          <td class="badge rounded-pill bg-success">Fecha</td>
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
