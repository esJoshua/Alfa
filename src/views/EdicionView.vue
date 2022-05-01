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
          <b-form-group label="Nombre:" label-for="input-nombre">
            <b-form-input
              class="input-border"
              id="input-nombre"
              v-model="nombre"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
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

          <b-form-group label="Cupos del curso:" label-for="input-cupos">
            <b-form-input
              class="input-border"
              id="input-cupos"
              v-model="cupos"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
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
          <b-form-group label="Duración del curso:" label-for="input-duracion">
            <b-form-input
              class="input-border"
              id="input-duracion"
              v-model="duracion"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Costo del curso:" label-for="input-costo">
            <b-form-input
              class="input-border"
              id="input-costo"
              v-model="costo"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Código del curso:" label-for="input-codigo">
            <b-form-input
              class="input-border"
              id="text-codigo"
              v-model="codigo"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
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
          <b-form-group label="Estado del curso:" label-for="input-estado">
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
                new Date(editCourse.fecha.seconds * 1000)
                  .toLocaleString()
                  .split(",")[0]
              }}</small>
            </span>
          </div>
          <template v-if="editCourse.fechaUpda">
            <span
              >Última actualizacón:
              <small>{{ new Date(editCourse.fechaUpda.seconds * 1000) }}</small>
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
      editedCourse: {
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
    ...mapActions("courses", ["updateCourse"]),
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
      if (this.validatedInscritos) {
        this.editedCourse.nombre = this.form.nombre || this.editCourse.nombre;
        this.editedCourse.imagen = this.form.imagen || this.editCourse.imagen;
        this.editedCourse.cupos = this.form.cupos || this.editCourse.cupos;
        this.editedCourse.inscritos = this.form.inscritos || this.inscritos;
        this.editedCourse.duracion =
          this.form.duracion || this.editCourse.duracion;
        this.editedCourse.costo = this.form.costo || this.editCourse.costo;
        this.editedCourse.codigo = this.form.codigo || this.editCourse.codigo;
        this.editedCourse.descripcion =
          this.form.descripcion || this.editCourse.descripcion;
        this.editedCourse.estado =
          this.form.estado !== this.editCourse.estado &&
          this.form.estado !== null
            ? this.form.estado
            : this.editCourse.estado;
        this.editedCourse.idCurso = this.editCourse.idCurso;
        await this.updateCourse(this.editedCourse);
        this.$router.push("/admin");
      }
    },
    isValid() {
      return this.form.inscritos <= this.form.cupos ? true : false;
    },
  },
  computed: {
    ...mapState("courses", ["courses"]),
    editCourse() {
      return this.courses.find(
        (course) => course.codigo === this.$route.params.id
      );
    },
    validatedInscritos() {
      if (this.inscritos >= 0) {
        return this.isValid(this.inscritos);
      }
      return null;
    },
    stateEstado() {
      return this.form.estado !== this.editCourse.estado &&
        this.form.estado !== null
        ? this.form.estado
        : this.editCourse.estado;
    },
    nombre: {
      get() {
        return this.editCourse.nombre;
      },
      set(value) {
        this.form.nombre = value;
      },
    },
    URLimg: {
      get() {
        return this.editCourse.imagen;
      },
      set(value) {
        this.form.imagen = value;
      },
    },
    cupos: {
      get() {
        return this.editCourse.cupos;
      },
      set(value) {
        this.form.cupos = Number(value);
      },
    },
    inscritos: {
      get() {
        return this.form.estado ? 0 : this.editCourse.inscritos;
      },
      set(value) {
        this.form.inscritos = value;
      },
    },
    estado: {
      get() {
        return this.inscritos === 0 ? true : false;
      },
      set(value) {
        this.form.estado = value;
      },
    },
    duracion: {
      get() {
        return this.editCourse.duracion;
      },
      set(value) {
        this.form.duracion = value;
      },
    },
    costo: {
      get() {
        return this.editCourse.costo;
      },
      set(value) {
        this.form.costo = Number(value);
      },
    },
    codigo: {
      get() {
        return this.editCourse.codigo;
      },
      set(value) {
        this.form.codigo = value;
      },
    },
    descripcion: {
      get() {
        return this.editCourse.descripcion;
      },
      set(value) {
        this.form.descripcion = value;
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
