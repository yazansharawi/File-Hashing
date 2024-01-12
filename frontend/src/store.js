import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const saveState = (key, state) => localStorage.setItem(key, JSON.stringify(state));

const getState = key => {
  const state = localStorage.getItem(key);
  if (state) {
    return JSON.parse(state);
  }
  return null;
}

const store = new Vuex.Store({
  state: {
    token: getState('token') || null,
    userUuid: getState('userUuid') || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      saveState('token', token);
    },
    setUserUuid(state, userUuid) {
      state.userUuid = userUuid;
      saveState('userUuid', userUuid);
    },
    clearAuthData(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('userUuid');
      state.token = null;
      state.userUuid = null;
    },
  },
  actions: {
    logout({ commit }) {
      commit('clearAuthData');
    },
    signUpSuccess({ commit }, { token, userUuid }) {
      commit('setToken', token);
      commit('setUserUuid', userUuid);
    },
    loginSuccess({ commit }, { token, userUuid }) {
      commit('setToken', token);
      commit('setUserUuid', userUuid);
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
