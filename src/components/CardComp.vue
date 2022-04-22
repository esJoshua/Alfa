<template>
  <b-row class="justify-content-evenly">
    <b-col
      v-for="curso of dataCursosCard"
      :key="curso.codigo"
      sm="6"
      md="4"
      class="m-3 g-0"
      style="width: 21rem"
    >
      <b-card style="min-height: 38rem">
        <div
          class="bgimg"
          :style="`background-image: url(${curso.imagen})`"
          :img-alt="curso.nombre"
          @error="imgError"
        ></div>
        <b-card-body>
          <b-card-title style="height: 50px"
            ><strong>{{ curso.nombre }}</strong></b-card-title
          >
          <b-card-sub-title class="m-1">Información</b-card-sub-title>
          <b-card-text>
            <b-list-group flush>
              <b-list-group-item
                >Costo:
                <em
                  >${{ curso.costo.toLocaleString("DE-de") }}</em
                ></b-list-group-item
              >
              <b-list-group-item
                >Duración: <em>{{ curso.duracion }}</em></b-list-group-item
              >
              <b-list-group-item
                >Cupos: <em>{{ curso.cupos }}</em></b-list-group-item
              >
              <b-list-group-item
                >Completado:
                <em>{{ curso.estado ? "Si" : "No" }}</em></b-list-group-item
              >
              <b-list-group-item
                >Descripción:
                <em>{{ curso.descripcion }}</em></b-list-group-item
              >
            </b-list-group>
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
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
