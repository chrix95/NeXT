/* eslint-disable no-undef */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
    alias: "/login"
  },
  {
    path: "/dashboard",
    name: "Analytics Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/all-admin",
    name: "All Admin",
    component: () => import("../views/Admin/AllAdmin.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/create-admin",
    name: "Create Admin",
    component: () => import("../views/Admin/CreateAdmin.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/edit-admin/:id",
    name: "Edit Admin Super",
    component: () => import("../views/Admin/EditAdmin.vue"),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/update-profile",
    name: "Update Profile",
    component: () => import("../views/Profile/UpdateProfile.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: () => import("../views/Profile/ChangePassword.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/all-agents",
    name: "All Agents",
    component: () => import("../views/Agents/AllAgents.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("login");
  if (to.matched.some(record => record.meta.requiresAuth) && loggedIn == null) {
    next("/");
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
