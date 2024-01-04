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

              <v-btn
                type="submit"
                block
                class="button"
                elevation="0"
                :disabled="!isFormValid"
              >
                Change Password
              </v-btn>
            </v-form>
          </v-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/navbar.vue";
export default {
  name: "forgotPasswordPage",

  components: {
    Nav,
  },
  data() {
    return {};
  },
  computed: {},

  methods: {},
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
  height: 350px;
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
