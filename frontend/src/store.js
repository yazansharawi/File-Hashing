import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userUuid: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserUuid(state, userUuid) {
      state.userUuid = userUuid;
    },
    clearAuthData(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.userUuid = null;
    },
  },
  actions: {
    logout({ commit }) {
      commit("clearAuthData");
    },
    signUpSuccess({ commit }, { token, userUuid }) {
      commit("setToken", token);
      commit("setUserUuid", userUuid);
    },
    loginSuccess({ commit }, { token, userUuid }) {
      localStorage.setItem("token", token);
      commit("setToken", token);
      commit("setUserUuid", userUuid);
    },
  },
  getters: {
    user(state) {
      return {
        token: state.token,
        userUuid: state.userUuid,
      };
    },
  },
});

export default store;
