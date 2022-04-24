import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./helpers/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userDetected = {
      user: user.email,
      uid: user.uid,
    };
    //console.log(user);
    store.dispatch("detectUser", userDetected);
  } else {
    store.dispatch("detectUser", user);
  }

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
