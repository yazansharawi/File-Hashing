import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.prototype.$axios = axios;
Vue.prototype.$store = store;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
