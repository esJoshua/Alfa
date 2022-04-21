<template>
  <b-container>
    <b-row class="justify-content-evenly">
      <b-col
        v-for="curso of dataCursosCard"
        :key="curso.codigo"
        sm="6"
        md="4"
        class="m-1 g-0"
        style="width: 23rem"
      >
        <b-card>
          <div
            class="bgimg"
            :style="`background-image: url(${curso.imagen})`"
            :img-alt="curso.nombre"
            @error="imgError"
          ></div>
          <b-card-body text-variant="secondary">
            <b-card-title>{{ curso.nombre }}</b-card-title>
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

<style>
.bgimg {
  height: 13rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
