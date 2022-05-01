import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import courses from "./courses";
import spinner from "./spinner";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    courses,
    spinner,
  },
});
