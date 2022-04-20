import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/registro",
    name: "registro",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegistroView.vue"),
  },
  {
    path: "/edicion/:id",
    name: "edicion",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EdicionView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminView.vue"),
  },
  {
    path: "/*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ErrorView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //const isAuthenticated = localStorage.getItem("loggedIn");
  const isAuthenticated = store.state.loggedIn;
  console.log("Pag. Protegida:", to.meta.requiresAuth);
  if (to.meta.requiresAuth && !isAuthenticated) next({ name: "login" });
  else next();
});

export default router;
