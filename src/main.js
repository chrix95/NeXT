import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);

sync(store, router);

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem("login");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.dispatch("reloadUserData", userData);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: h => h(App)
}).$mount("#app");
