<template>
  <b-modal
    id="modal-add-course"
    ref="modal"
    size="md"
    title="Datos del Curso"
    @show="resetModal"
    @hidden="resetModal"
    hide-footer
  >
    <b-form ref="form" @submit.prevent="onSubmit">
      <div id="input-group-1" class="form-floating">
        <input
          class="form-control border-input shadow"
          id="input-nombre"
          v-model="form.nombre"
          invalid-feedback="Campo requerido"
          type="text"
          placeholder="Nombre del curso"
          title="Nombre del curso"
          maxlength="30"
          required
        />
        <label for="input-nombre">Nombre del curso</label>
      </div>

      <div id="input-group-2" class="form-floating mt-2">
        <input
          class="form-control border-input shadow"
          id="input-imagen"
          v-model="defaultImg"
          invalid-feedback="Campo requerido"
          type="text"
          placeholder="URL de la imagen del curso"
          title="URL de la imagen del curso"
          maxlength="30"
          required
        />
        <label for="input-imagen"
          >URL del logo (URL con logo aleatorio por defecto)</label
        >
      </div>

      <div id="input-group-3" class="form-floating mt-2">
        <input
          class="form-control border-input shadow"
          id="input-curso"
          v-model.number="form.cupos"
          invalid-feedback="Campo requerido"
          type="number"
          placeholder="Número de cupos del curso"
          title="Número de cupos del curso"
          required
        />
        <label for="input-curso">Número de cupos</label>
      </div>

      <div id="input-group-3" class="form-floating mt-2">
        <input
          class="form-control border-input shadow"
          :class="{
            'is-invalid':
              !validatedInscritos &&
              inscritos !== null &&
              form.inscritos !== '' &&
              form.inscritos !== 0,
          }"
          id="input-inscritos"
          v-model.number="inscritos"
          invalid-feedback="Campo
        requerido"
          type="number"
          placeholder="Número de inscritos en el curso"
          title="Número de inscritos en el curso"
          required
        />
        <label for="input-inscritos">Número de inscritos</label>
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
      </div>
      <div id="input-group-4" class="form-floating mt-2">
        <input
          class="form-control border-input shadow"
          id="input-duracion"
          v-model="form.duracion"
          invalid-feedback="Campo requerido"
          type="text"
          placeholder="Duración del curso"
          title="Duración del curso"
          required
        />
        <label for="input-duracion">Duración</label>
      </div>
      <div id="input-group-5" class="form-floating mt-2">
        <input
          class="form-control border-input shadow"
          id="input-costo"
          v-model.number="form.costo"
          invalid-feedback="Campo requerido"
          type="number"
          placeholder="costo del curso"
          title="costo del curso"
          required
        />
        <label for="input-costo">Costo</label>
      </div>

      <div id="input-group-5" class="form-floating mt-2">
        <input
          class="form-control border-input shadow"
          id="input-codigo"
          v-model="form.codigo"
          invalid-feedback="Campo requerido"
          type="text"
          placeholder="Código del curso"
          title="Código del curso"
          required
        />
        <label for="input-codigo">Código</label>
      </div>

      <div id="input-group-6" class="form-floating mt-2">
        <textarea
          class="form-control border-input shadow"
          id="input-descripcion"
          v-model="form.descripcion"
          invalid-feedback="Campo requerido"
          type="text"
          placeholder="Leave a comment here"
          title="Descripción del curso"
          style="height: 100px"
          required
        ></textarea>
        <label for="input-descripcion">Descripción</label>
      </div>

      <b-form-group
        label="Estado del curso:"
        label-for="input-estado"
        class="mt-3"
      >
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="switch-estado"
            v-model="form.estado"
          />
          <label v-if="form.estado" class="form-check-label" for="switch-estado"
            >Terminado</label
          >
          <label v-else class="form-check-label" for="switch-estado"
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
    </b-form>
  </b-modal>
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
      confirmation: "",
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
    inscritos: {
      get() {
        return this.form.estado ? 0 : this.form.inscritos;
      },
      set(value) {
        this.form.inscritos = value;
      },
    },
  },
  methods: {
    ...mapActions("courses", ["createCourse"]),
    isValid() {
      return this.form.inscritos <= this.form.cupos ? true : false;
    },
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
      this.inscritos = null;
    },
    hideModal() {
      this.$bvModal.hide("modal-add-course");
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
            this.confirmation = value;
            if (this.confirmation)
              this.createCourse({
                ...this.form,
                inscritos: this.inscritos,
              });
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
.shadow:focus {
  background-color: #e5f3eac5;
}
</style>
