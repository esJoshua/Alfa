<template>
  <div>
    <b-modal
      id="modal-add-curso"
      ref="modal"
      size="md"
      title="Datos del Curso"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
    >
      <form ref="form" @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label-for="input-nombre">
          <b-form-input
            class="border-input shadow"
            id="input-nombre"
            v-model.trim="form.nombre"
            invalid-feedback="Campo requerido"
            type="text"
            placeholder="Nombre"
            title="Nombre del curso"
            maxlength="30"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            class="border-input mt-3 shadow"
            id="input-imagen"
            v-model="defaultImg"
            invalid-feedback="Campo requerido"
            placeholder="URL de la imagen del curso"
            title="URL de la imagen del curso"
            required
          ></b-form-input>
          <small>Esta es una Url de imagen random de ejemplo</small>
        </b-form-group>

        <b-form-group id="input-group-3" label-for="input-curso">
          <b-form-input
            class="border-input mt-3 shadow"
            id="input-3"
            v-model.number="form.cupos"
            invalid-feedback="Campo requerido"
            placeholder="Cupos del curso"
            title="Cupos del curso"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label-for="input-inscritos">
          <b-form-input
            class="border-input mt-3 shadow"
            id="input-4"
            v-model="form.inscritos"
            :state="validatedInscritos"
            invalid-feedback="Campo requerido"
            placeholder="Número de inscritos en el curso"
            title="Inscritos en el curso"
            type="number"
            required
          ></b-form-input>
          <template>
            <small
              v-if="
                !validatedInscritos &&
                form.inscritos !== null &&
                form.inscritos !== ''
              "
              >El número de inscritos no puede ser mayor al número de cúpos
              disponibles</small
            >
          </template>
        </b-form-group>
        <b-form-group id="input-group-5" label-for="input-duracion">
          <b-form-input
            class="border-input mt-3 shadow"
            id="input-5"
            v-model="form.duracion"
            invalid-feedback="Campo requerido"
            placeholder="Duración del curso"
            title="Duración del curso"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label-for="input-costo">
          <b-form-input
            class="border-input mt-3 shadow"
            id="input-6"
            v-model.number="form.costo"
            invalid-feedback="Campo requerido"
            placeholder="Costo del curso"
            title="Costo del curso"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-7" label-for="input-codigo">
          <b-form-input
            class="border-input mt-3 shadow"
            id="text-7"
            v-model.trim="form.codigo"
            invalid-feedback="Campo requerido"
            placeholder="Código del curso"
            title="Código del curso"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-8" label-for="input-descripcion">
          <b-form-textarea
            id="text-8"
            class="mt-3 shadow"
            v-model="form.descripcion"
            invalid-feedback="Campo requerido"
            placeholder="Descripción del curso"
            title="Descripción del curso"
            type="text"
            required
            rows="4"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          id="input-group-9"
          label="Estado del curso:"
          label-for="input-estado"
          class="mt-3"
        >
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              v-model="form.estado"
            />
            <label
              v-if="form.estado"
              class="form-check-label"
              for="flexSwitchCheckDefault"
              >Terminado</label
            >
            <label v-else class="form-check-label" for="flexSwitchCheckDefault"
              >Activo</label
            >
          </div>
        </b-form-group>

        <div class="mt-3 text-center">
          <b-button type="submit" variant="outline-success"
            >AGREGAR CURSO</b-button
          >
          <b-button class="m-3" type="reset" variant="outline-danger"
            >LIMPIAR FORMULARIO</b-button
          >
          <b-button @click="hideModal" type="button" variant="outline-primary">
            REGRESAR
          </b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ModalComp",
  data() {
    return {
      form: {
        nombre: "",
        imagen: "",
        cupos: null,
        inscritos: null,
        duracion: "",
        costo: null,
        codigo: "",
        estado: false,
        descripcion: "",
        imgUrlDefault: "http://placeimg.com/640/480/tech",
      },
      confirmacion: "",
    };
  },
  computed: {
    validatedInscritos() {
      if (this.form.inscritos) {
        return this.isValid(this.form.inscritos);
      }
      return null;
    },
    defaultImg: {
      get() {
        return this.form.imgUrlDefault;
      },
      set(value) {
        this.form.imagen = value;
      },
    },
  },
  methods: {
    isValid() {
      return this.form.inscritos <= this.form.cupos ? true : false;
    },
    ...mapActions(["createCurso"]),
    resetModal() {
      this.form.nombre = "";
      this.form.imagen = "";
      this.form.cupos = null;
      this.form.inscritos = null;
      this.form.duracion = "";
      this.form.costo = null;
      this.form.codigo = "";
      this.form.estado = false;
      this.form.descripcion = "";
    },
    hideModal() {
      this.$bvModal.hide("modal-add-curso");
    },
    onSubmit() {
      if (this.validatedInscritos) {
        this.$bvModal
          .msgBoxConfirm("Confirme la creación del curso.", {
            title: "!! Confirmación !!",
            okVariant: "success",
            okTitle: "Sí, Agregar",
            cancelTitle: "Cancelar",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
            headerBgVariant: "success",
            bodyTextVariant: "success",
            headerTextVariant: "light",
          })
          .then((value) => {
            this.confirmacion = value;
            if (this.confirmacion === true) this.createCurso(this.form);
            this.$router.push("/");
          });
      }
    },
  },
};
</script>

<style>
.close {
  display: none;
}
.border-input {
  border-block-start-style: none;
}
</style>
