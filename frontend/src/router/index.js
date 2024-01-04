import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/pages/homePage.vue"),
    meta: {
      title: "HomePage",
    },
  },
  {
    path: "/login",
    name: "loginPage",
    component: () => import("@/pages/logInPage.vue"),
    meta: {
      title: "LoginPage",
    },
  },
  {
    path: "/signUp",
    name: "signUpPage",
    component: () => import("@/pages/signUpPage.vue"),
    meta: {
      title: "signUpPage",
    },
  },
  {
    path: "/forgetPassword",
    name: "forgetPasswordPage",
    component: () => import("@/pages/forgetPasswordPage.vue"),
    meta: {
      title: "forgetPasswordPage",
    },
  },
];

const router = new Router({
    mode: 'history',
    routes
  });
  
  router.afterEach((to) => {
    const routeName = to.name;
    const metaTitle = routeName ? `${routeName}` : "Your App Name";
    document.title = metaTitle;
  });
  
  export default router;
