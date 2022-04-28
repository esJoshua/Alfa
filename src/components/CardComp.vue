<template>
  <b-row class="justify-content-evenly">
    <b-col
      v-for="course of dataCoursesCard"
      :key="course.codigo"
      sm="6"
      md="4"
      class="m-3 g-0"
      style="width: 21rem"
    >
      <b-card style="min-height: 38rem">
        <div
          class="bgimg"
          :style="`background-image: url(${course.imagen})`"
          :img-alt="course.nombre"
        ></div>
        <b-card-body>
          <b-card-title style="height: 50px"
            ><strong>{{ course.nombre }}</strong></b-card-title
          >
          <b-card-sub-title class="m-1">Información</b-card-sub-title>
          <b-card-text>
            <b-list-group flush>
              <b-list-group-item
                >Costo:
                <em
                  >${{ course.costo.toLocaleString("DE-de") }}</em
                ></b-list-group-item
              >
              <b-list-group-item
                >Duración: <em>{{ course.duracion }}</em></b-list-group-item
              >
              <b-list-group-item
                >Cupos: <em>{{ course.cupos }}</em></b-list-group-item
              >
              <b-list-group-item
                >Completado:
                <em>{{ course.estado ? "Si" : "No" }}</em></b-list-group-item
              >
              <b-list-group-item
                >Descripción:
                <em>{{ course.descripcion }}</em></b-list-group-item
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
    dataCoursesCard: {
      type: Array,
      default: () => [],
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
.card:hover {
  border-color: #4ff149;
  box-shadow: 20px 20px 20px 10px #1adb6ac5, -20px -20px 20px 10px #1adb6ac5;
}
</style>
