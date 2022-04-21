<template>
  <div>
    <b-modal
      id="modal-add-curso"
      ref="modal"
      size="md"
      title="Agregando Curso"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="onSubmit">
        <b-form-group id="input-group-1" label-for="input-nombre">
          <b-form-input
            class="border-input"
            id="input-nombre"
            v-model.trim="curso.nombre"
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
            class="border-input mt-3"
            id="input-imagen"
            v-model="curso.imagen"
            invalid-feedback="Campo requerido"
            placeholder="URL de la imagen del curso"
            title="URL de la imagen del curso"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label-for="input-curso">
          <b-form-input
            class="border-input mt-3"
            id="input-3"
            v-model="curso.cupos"
            invalid-feedback="Campo requerido"
            placeholder="Cupos del curso"
            title="Cupos del curso"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label-for="input-inscritos">
          <b-form-input
            class="border-input mt-3"
            id="input-4"
            v-model="curso.inscritos"
            invalid-feedback="Campo requerido"
            placeholder="Número de inscritos en el curso"
            title="Inscritos en el curso"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-5" label-for="input-duracion">
          <b-form-input
            class="border-input mt-3"
            id="input-5"
            v-model="curso.duracion"
            invalid-feedback="Campo requerido"
            placeholder="Duración del curso"
            title="Duración del curso"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label-for="input-costo">
          <b-form-input
            class="border-input mt-3"
            id="input-6"
            v-model="curso.costo"
            invalid-feedback="Campo requerido"
            placeholder="Costo del curso"
            title="Costo del curso"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-7" label-for="input-codigo">
          <b-form-input
            class="border-input mt-3"
            id="text-7"
            v-model.trim="curso.codigo"
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
            class="mt-3"
            v-model="curso.descripcion"
            invalid-feedback="Campo requerido"
            placeholder="Descripción del curso"
            title="Descripción del curso"
            type="text"
            required
            rows="4"
          ></b-form-textarea>
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
        imagen: "",
        cupos: null,
        inscritos: null,
        duracion: "",
        costo: null,
        codigo: "",
        descripcion: "",
      },
    };
  },
  /* computed: {
    cursoInscritos: {
      get() {
        return this.editCurso.inscritos;
      },
      set(value) {
        this.form.inscritos = Number(value);
      },
    },
  },*/
  methods: {
    ...mapActions(["createCurso"]),
    checkFormValidity() {
      const valid = this.this.$bvModal.checkValidity("modal-add-curso");
      this.inscritos = valid;
      return valid;
    },
    resetModal() {
      this.curso.nombre = "";
      this.curso.imagen = "";
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
.border-input {
  border-block-start-style: none;
}
</style>
