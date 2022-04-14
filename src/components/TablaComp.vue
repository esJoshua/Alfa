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
          <td><span class="badge rounded-pill bg-success p-2">Fecha</span></td>
          <td>
            <span
              ><RouterLink :to="`/edicion/${curso.codigo}`"
                >✏️</RouterLink
              ></span
            >
            <span>🗑️</span>
          </td>
          <td>{{ curso.codigo }}</td>
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
