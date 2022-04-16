<template>
  <div>
    <b-modal
      id="modal-add-curso"
      ref="modal"
      size="lg"
      title="Agregando Curso"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <!-- <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form> -->
      <form ref="form" @submit.stop.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input
            class="border-input"
            id="input-1"
            v-model.trim="curso.nombre"
            invalid-feedback="Campo requerido"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="URL de la imagen del curso:"
          label-for="input-2"
        >
          <b-form-input
            class="border-input"
            id="input-2"
            v-model.trim="curso.URLimg"
            invalid-feedback="Campo requerido"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Cupos del curso:"
          label-for="input-3"
        >
          <b-form-input
            class="border-input"
            id="input-3"
            v-model="curso.cupos"
            invalid-feedback="Campo requerido"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Inscritos en el curso:"
          label-for="input-4"
        >
          <b-form-input
            class="border-input"
            id="input-4"
            v-model="curso.inscritos"
            invalid-feedback="Campo requerido"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="Duración del curso:"
          label-for="input-5"
        >
          <b-form-input
            class="border-input"
            id="input-5"
            v-model="curso.duracion"
            invalid-feedback="Campo requerido"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Costo del curso:"
          label-for="input-6"
        >
          <b-form-input
            class="border-input"
            id="input-6"
            v-model="curso.costo"
            invalid-feedback="Campo requerido"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-7"
          label="Código del curso:"
          label-for="input-7"
        >
          <b-form-input
            class="border-input"
            id="text-7"
            v-model.trim="curso.codigo"
            invalid-feedback="Campo requerido"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-8"
          label="Descripción del curso:"
          label-for="input-8"
        >
          <b-form-textarea
            id="text-8"
            v-model="curso.descripcion"
            invalid-feedback="Campo requerido"
            type="text"
            required
            rows="4"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group id="input-group-9" label="Fecha:" label-for="input-9">
          <b-form-input
            id="text-9"
            v-model="curso.fecha"
            invalid-feedback="Campo requerido"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <div class="mt-3 text-center">
          <b-button type="submit" variant="outline-success">CREAR</b-button>
          <b-button class="m-3" type="reset" variant="outline-danger"
            >LIMPIAR FORMULARIO</b-button
          >
          <b-button class="m-3" type="button" variant="outline-warning">
            LIMPIAR VALIDACIÓN</b-button
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
      curso: {
        nombre: "",
        URLimg: "",
        cupos: null,
        inscritos: null,
        duracion: "",
        costo: null,
        codigo: "",
        descripcion: "",
        fecha: "",
      },
    };
  },
  methods: {
    ...mapActions(["createCurso"]),
    checkFormValidity() {
      const valid = this.this.$bvModal.checkValidity("modal-add-curso");
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.curso.nombre = "";
      this.curso.URLimg = "";
      this.curso.cupos = null;
      this.curso.inscritos = null;
      this.curso.duracion = "";
      this.curso.costo = null;
      this.curso.codigo = "";
      this.curso.descripcion = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      /* if (!this.checkFormValidity()) {
        return; */
      console.log("click");

      // Push the name to submitted names
      //this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-add-curso");
      });
    },
    hideModal() {
      this.$bvModal.hide("modal-add-curso");
    },
    async onSubmit() {
      await this.createCurso(this.curso);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.close {
  display: none;
}
</style>
