<template>
  <div>
    <Nav />
    <div class="main">
      <div class="signInDiv">
        <div class="welcome">Welcome to File-Hashing !</div>
        <div>
          <v-sheet
            width="400"
            class="mx-auto"
            style="display: flex; flex-direction: column"
          >
            <v-form fast-fail @submit.prevent="signIn">
              <v-text-field
                v-model="userName"
                label="User Name"
                variant="outlined"
                density="compact"
                required
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

              <v-btn
                type="submit"
                block
                class="button"
                elevation="0"
                :disabled="!isFormValid"
              >
                Register
              </v-btn>
            </v-form>
            <div class="mt-5">
              <p class="text-body-2">
                Already have an account?
                <router-link
                  :to="{
                    name: 'loginPage',
                  }"
                  >Log In</router-link
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
  name: "singInPage",

  components: {
    Nav,
  },
  data() {
    return {
      userName: null,
      userEmail: null,
      userPassword: null,
      visible: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        !!this.userName &&
        this.userPassword.length >= 10 &&
        this.userEmail.includes("@")
      );
    },
  },

  methods: {
    async signIn() {
      let data = {
        userName: this.userName,
        email: this.userEmail,
        password: this.userPassword,
      };
      const response = await this.$axios.post("user", data);
      if (response.status === 201) {
        //     this.$store.dispatch("signUpSuccess", {
        //   user: response.data.user,
        //   token: response.data.token,
        //   userUuid:response.data.userUuid
        // });
        this.$router.push({
          name: "HomePage",
          params: { uuid: response.data.userUuid },
        });
      }
    },
  },
};
</script>

<style scoped>
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
