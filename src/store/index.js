import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    SET_USER_DATA(state, credentials) {
      state.token = credentials.token;
      state.user = credentials.data;
      localStorage.setItem("login", JSON.stringify(credentials));
      state.isUserLoggedIn = true;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${credentials.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("login");
      location.reload();
    }
  },
  actions: {
    login({ commit }, credentials) {
      commit("SET_USER_DATA", credentials);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    }
  },
  modules: {}
});
