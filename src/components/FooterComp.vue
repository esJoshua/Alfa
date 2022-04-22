<template>
  <footer
    class="text-center text-white w-100"
    style="background-color: #000000"
  >
    <div class="container p-3 pb-0">
      <section>
        <a class="btn btn-outline-light m-1"
          ><i class="fab fa-facebook-f"></i
        ></a>
        <a class="btn btn-outline-light m-1"><i class="fab fa-twitter"></i></a>
        <a class="btn btn-outline-light m-1"><i class="fab fa-google"></i></a>
        <a class="btn btn-outline-light m-1"
          ><i class="fab fa-instagram"></i>
        </a>
        <a class="btn btn-outline-light m-1"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <a class="btn btn-outline-light m-1"><i class="fab fa-github"></i></a>
      </section>
    </div>

    <div class="text-center p-3" style="background-color: #000000">
      © 2022 Copyright: AlfaWeb J.E.
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComp",
};
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  height: 7rem;
}
</style>
