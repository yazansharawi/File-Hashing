<template>
  <div>
    <Nav />
    <div class="main">
      <div class="signInDiv">
        <div class="welcome">Welcome Back !</div>
        <div>
          <v-sheet
            width="400"
            class="mx-auto"
            style="display: flex; flex-direction: column"
          >
            <v-form fast-fail @submit.prevent="Login">
              <v-text-field
                v-model="userEmail"
                label="User Email"
                variant="outlined"
                density="compact"
                required
                :rules="[
                  () => !!userEmail || 'This field is required',
                  () =>
                    (userEmail && userEmail.includes('@')) ||
                    'Email must contain @',
                ]"
              />
              <v-text-field
                v-model="userPassword"
                :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                :rules="[
                  () => !!userPassword || 'This field is required',
                  (v) =>
                    (v && v.length >= 10) ||
                    'Password must be at least 10 characters',
                ]"
                label="Enter your Password"
                @click:append-inner="visible = !visible"
                required
              />
              <div class="forgot-pass">
                <router-link
                  :to="{
                    name: 'forgetPasswordPage',
                  }"
                  style="text-decoration: none; color: inherit"
                >
                  Forgot Password ?</router-link
                >
              </div>

              <v-btn
                type="submit"
                block
                class="button"
                elevation="0"
              >
                Login
              </v-btn>
            </v-form>
            <div class="mt-5">
              <p class="text-body-2">
                Don't have an account?
                <router-link
                  :to="{
                    name: 'signUpPage',
                  }"
                  >Sign Up</router-link
                >
              </p>
            </div>
          </v-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/navbar.vue";
export default {
  name: "loginPage",

  components: {
    Nav,
  },
  data() {
    return {
      userEmail: null,
      userPassword: null,
      visible: false,
    };
  },

  methods: {
    async Login() {
      try {
        let data = {
          email: this.userEmail,
          password: this.userPassword,
        };
        const response = await this.$axios.post("user/login", data);
        if (response.status === 200) {
          this.$store.dispatch("loginSuccess", {
            token: response.data.token,
            userUuid: response.data.userUuid, 
          });
          this.$router.push({ name: "HomePage" });
        } else {
          console.error("Login failed:", response);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped>
.forgot-pass {
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}
.main {
  height: 90vh;
  background-color: #f5f5fa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signInDiv {
  height: 420px;
  width: 500px;
  background-color: white;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
}
.welcome {
  font-weight: 400;
  font-size: 35px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #494949;
}
.button {
  margin-top: 10px;
}
</style>
