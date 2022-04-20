<template>
  <b-container>
    <b-row>
      <b-col v-for="curso of dataCursosCard" :key="curso.codigo" sm="4">
        <b-card
          no-body
          style="max-width: 23rem"
          :img-src="curso.imagen"
          :img-alt="curso.nombre"
          @error="imgError"
          class="img-fluid"
          img-top
        >
          <template #header>
            <b-card-title>{{ curso.nombre }}</b-card-title>
          </template>
          <b-card-body>
            <b-card-sub-title class="mb-2">Información</b-card-sub-title>
            <b-card-text>
              <b-list-group flush>
                <b-list-group-item>Costo: {{ curso.costo }}</b-list-group-item>
                <b-list-group-item
                  >Duración: {{ curso.duracion }}</b-list-group-item
                >
                <b-list-group-item>Cupos: {{ curso.cupos }}</b-list-group-item>
                <b-list-group-item
                  >Completado:
                  {{ curso.estado ? "Si" : "No" }}</b-list-group-item
                >
                <b-list-group-item
                  >Descripción: {{ curso.descripcion }}</b-list-group-item
                >
              </b-list-group>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "CardComp",
  props: {
    dataCursosCard: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    imgError() {
      console.log("Image failed to load");
    },
  },
};
</script>

<style></style>
