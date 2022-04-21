<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <h1 class="text-center">Editando el curso:</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form @submit.prevent="onSubmit" @reset="resetForm">
          <b-form-group
            id="input-group-1"
            label="Nombre:"
            label-for="input-nombre"
          >
            <b-form-input
              class="border-input"
              id="input-nombre"
              v-model="nombre"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="URL de la imagen del curso:"
            label-for="input-URLimg"
          >
            <b-form-input
              class="border-input"
              id="input-URLimg"
              v-model="URLimg"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Cupos del curso:"
            label-for="input-cupos"
          >
            <b-form-input
              class="border-input"
              id="input-cupos"
              v-model="cupos"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Inscritos en el curso:"
            label-for="input-inscritos"
          >
            <b-form-input
              class="border-input"
              id="input-inscritos"
              v-model="inscritos"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-5"
            label="Duración del curso:"
            label-for="input-duracion"
          >
            <b-form-input
              class="border-input"
              id="input-duracion"
              v-model="duracion"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Costo del curso:"
            label-for="input-costo"
          >
            <b-form-input
              class="border-input"
              id="input-costo"
              v-model="costo"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-7"
            label="Código del curso:"
            label-for="input-codigo"
          >
            <b-form-input
              class="border-input"
              id="text-codigo"
              v-model="codigo"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-8"
            label="Descripción del curso:"
            label-for="input-descripcion"
          >
            <b-form-textarea
              id="input-descripcion"
              v-model="descripcion"
              type="text"
              required
              minlength="40"
              rows="4"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group id="input-group-9" label="Fecha:" label-for="input-9">
            <b-form-input
              id="text-9"
              v-model="form.fecha"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <div class="mt-3 text-center">
            <b-button type="submit" variant="outline-success"
              >ACTUALIZAR</b-button
            >
            <b-button class="m-3" type="reset" variant="outline-danger"
              >LIMPIAR FORMULARIO</b-button
            >
            <b-button class="m-3" type="button" variant="outline-warning">
              LIMPIAR VALIDACIÓN</b-button
            >
            <b-button to="/admin" type="button" variant="outline-primary">
              REGRESAR
            </b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "EdicionView",
  data() {
    return {
      form: {
        nombre: "",
        URLimg: "",
        cupos: null,
        inscritos: null,
        duracion: "",
        costo: null,
        codigo: "",
        descripcion: "",
      },
      cursoEditado: {
        nombre: "",
        imagen: "",
        cupos: null,
        inscritos: null,
        duracion: "",
        costo: null,
        codigo: "",
        descripcion: "",
        idCurso: "",
      },
    };
  },
  methods: {
    ...mapActions(["updateCurso"]),
    resetForm() {
      this.nombre = "";
      this.URLimg = "";
      this.cupos = null;
      this.inscritos = null;
      this.duracion = "";
      this.costo = null;
      this.codigo = "";
      this.descripcion = "";
    },
    async onSubmit() {
      this.cursoEditado.nombre = this.form.nombre || this.editCurso.nombre;
      this.cursoEditado.imagen = this.form.URLimg || this.editCurso.imagen;
      this.cursoEditado.cupos = this.form.cupos || this.editCurso.cupos;
      this.cursoEditado.inscritos =
        this.form.inscritos || this.editCurso.inscritos;
      this.cursoEditado.duracion =
        this.form.duracion || this.editCurso.duracion;
      this.cursoEditado.costo = this.form.costo || this.editCurso.costo;
      this.cursoEditado.codigo = this.form.codigo || this.editCurso.codigo;
      this.cursoEditado.descripcion =
        this.form.descripcion || this.editCurso.descripcion;
      this.cursoEditado.idCurso = this.editCurso.idCurso;
      //console.log(this.cursoEditado);
      await this.updateCurso(this.cursoEditado);
      this.$router.push("/admin");
    },
  },
  computed: {
    ...mapState(["cursos"]),
    editCurso() {
      return this.cursos.find(
        (curso) => curso.codigo === this.$route.params.id
      );
    },
    nombre: {
      get() {
        return this.editCurso.nombre;
      },
      set(value) {
        this.form.nombre = value;
      },
    },
    URLimg: {
      get() {
        return this.editCurso.imagen;
      },
      set(value) {
        this.form.imagen = value;
      },
    },
    cupos: {
      get() {
        return this.editCurso.cupos;
      },
      set(value) {
        this.form.cupos = Number(value);
      },
    },
    inscritos: {
      get() {
        return this.editCurso.inscritos;
      },
      set(value) {
        this.form.inscritos = Number(value);
      },
    },
    duracion: {
      get() {
        return this.editCurso.duracion;
      },
      set(value) {
        this.form.duracion = value;
      },
    },
    costo: {
      get() {
        return this.editCurso.costo;
      },
      set(value) {
        this.form.costo = Number(value);
      },
    },
    codigo: {
      get() {
        return this.editCurso.codigo;
      },
      set(value) {
        this.form.codigo = value;
      },
    },
    descripcion: {
      get() {
        return this.editCurso.descripcion;
      },
      set(value) {
        this.form.descripcion = value;
      },
    },
  },
};
</script>

<style>
.border-input {
  border-block-start-style: none;
}
</style>
