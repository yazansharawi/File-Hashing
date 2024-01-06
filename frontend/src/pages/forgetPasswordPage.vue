<template>
  <div>
    <Nav />
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div class="main">
      <div class="signInDiv">
        <div class="welcome">Reset Password</div>
        <v-sheet
          width="400"
          class="mx-auto"
          style="display: flex; flex-direction: column"
        >
          <v-form
            @submit.prevent="emailVerified ? changePassword() : verifyEmail()"
          >
            <v-text-field
              v-model="userEmail"
              label="User Email"
              variant="outlined"
              density="compact"
              required
              :rules="emailRules"
            />

            <v-text-field
              v-if="emailVerified"
              v-model="userPassword"
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              variant="outlined"
              :rules="passwordRules"
              label="Enter your New Password"
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
              {{ emailVerified ? "Change Password" : "Verify Email" }}
            </v-btn>
          </v-form>
        </v-sheet>
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
    return {
      userEmail: "",
      userPassword: "",
      emailVerified: false,
      visible: false,
      snackbar: false,
      snackbarText: "",
      resetToken: "",
    };
  },
  computed: {
    emailRules() {
      return [
        () => !!this.userEmail || "This field is required",
        () =>
          (this.userEmail && this.userEmail.includes("@")) ||
          "Email must contain @",
      ];
    },
    passwordRules() {
      return [
        () => !!this.userPassword || "This field is required",
        (v) =>
          (v && v.length >= 10) || "Password must be at least 10 characters",
      ];
    },
    isFormValid() {
      return this.emailVerified
        ? !!this.userPassword && this.userPassword.length >= 10
        : !!this.userEmail && this.userEmail.includes("@");
    },
  },
  methods: {
    async verifyEmail() {
      try {
        const response = await this.$axios.post("user/verifyEmail", {
          email: this.userEmail,
        });
        if (response.status === 200) {
          this.emailVerified = true;
        } else {
          this.snackbarText = "Email not found";
          this.snackbar = true;
        }
      } catch (error) {
        this.snackbarText = "Error during email verification";
        this.snackbar = true;
      }
    },

    async changePassword() {
      try {
        const response = await this.$axios.post("user/forgetPass", {
          email: this.userEmail,
          password: this.userPassword,
          token: this.resetToken,
        });
        if (response.status === 200) {
          this.$router.push({ name: "loginPage" });
        } else {
          this.snackbarText = "Something Went Wrong";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error during password change:", error);
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
