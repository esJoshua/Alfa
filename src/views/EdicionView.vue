<template>
  <b-container
    class="mt-4 text-white d-flex flex-column justify-content-center align-items-center"
  >
    <b-row>
      <b-col>
        <h1>Editando el curso: {{ nombre }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form class="input-bg" @submit.prevent="onSubmit" @reset="resetForm">
          <b-form-group
            id="input-group-1"
            label="Nombre:"
            label-for="input-nombre"
          >
            <b-form-input
              class="input-border"
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
              class="input-border"
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
              class="input-border"
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
              class="input-border"
              id="input-inscritos"
              v-model="inscritos"
              :state="validatedInscritos"
              type="number"
              required
            ></b-form-input>
            <template>
              <small v-if="!validatedInscritos && inscritos !== null"
                >El número de inscritos no puede ser mayor al número de cúpos
                disponibles</small
              >
            </template>
          </b-form-group>
          <b-form-group
            id="input-group-5"
            label="Duración del curso:"
            label-for="input-duracion"
          >
            <b-form-input
              class="input-border"
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
              class="input-border"
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
              class="input-border"
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
          <b-form-group
            id="input-group-9"
            label="Estado del curso:"
            label-for="input-estado"
          >
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="estado"
              />
              <label
                v-if="stateEstado"
                class="form-check-label"
                for="flexSwitchCheckDefault"
                >Terminado</label
              >
              <label
                v-else
                class="form-check-label"
                for="flexSwitchCheckDefault"
                >Activo</label
              >
            </div>
          </b-form-group>
          <div>
            <span
              >Fecha de creación del curso:
              <small>{{
                new Date(editCurso.fecha.seconds * 1000)
                  .toLocaleString()
                  .split(",")[0]
              }}</small>
            </span>
          </div>
          <template v-if="editCurso.fechaAct">
            <span
              >Última actualizacón:
              <small>{{ new Date(editCurso.fechaAct.seconds * 1000) }}</small>
            </span>
          </template>
          <div class="mt-3 text-center">
            <b-button type="submit" variant="success">ACTUALIZAR</b-button>
            <b-button class="m-3" type="reset" variant="danger"
              >LIMPIAR FORMULARIO</b-button
            >
            <b-button to="/admin" type="button" variant="primary">
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
        imagen: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: null,
        codigo: "",
        estado: null,
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
        estado: false,
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
      this.estado = false;
    },
    async onSubmit() {
      //console.log(this.validatedInscritos);
      if (this.validatedInscritos) {
        this.cursoEditado.nombre = this.form.nombre || this.editCurso.nombre;
        this.cursoEditado.imagen = this.form.imagen || this.editCurso.imagen;
        this.cursoEditado.cupos = this.form.cupos || this.editCurso.cupos;
        this.cursoEditado.inscritos =
          this.form.inscritos || this.editCurso.inscritos;
        this.cursoEditado.duracion =
          this.form.duracion || this.editCurso.duracion;
        this.cursoEditado.costo = this.form.costo || this.editCurso.costo;
        this.cursoEditado.codigo = this.form.codigo || this.editCurso.codigo;
        this.cursoEditado.descripcion =
          this.form.descripcion || this.editCurso.descripcion;
        this.cursoEditado.estado =
          this.form.estado !== this.editCurso.estado &&
          this.form.estado !== null
            ? this.form.estado
            : this.editCurso.estado;
        this.cursoEditado.idCurso = this.editCurso.idCurso;
        await this.updateCurso(this.cursoEditado);
        this.$router.push("/admin");
      }
    },
    isValid() {
      return this.form.inscritos <= this.form.cupos ? true : false;
    },
  },
  computed: {
    ...mapState(["cursos"]),
    editCurso() {
      return this.cursos.find(
        (curso) => curso.codigo === this.$route.params.id
      );
    },
    validatedInscritos() {
      if (this.inscritos >= 0) {
        return this.isValid(this.inscritos);
      }
      return null;
    },
    stateEstado() {
      return this.form.estado !== this.editCurso.estado &&
        this.form.estado !== null
        ? this.form.estado
        : this.editCurso.estado;
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
    estado: {
      get() {
        return this.editCurso.estado;
      },
      set(value) {
        this.form.estado = Boolean(value);
      },
    },
  },
};
</script>

<style>
.input-bg {
  background-color: rgba(5, 5, 5, 0.9);
}
.input-border {
  border-block-start-style: none;
}
</style>
