<template>
  <div>
    <div v-if="homePage" class="main-with-logout">
      <div class="nav">File-Hashing</div>
      <div class="mx-2">
        <v-btn elevation="0" @click="logout">Log Out</v-btn>
      </div>
    </div>
    <div v-else>
      <div class="nav">File-Hashing</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: {
    homePage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    async logout() {
      console.log("this.$store", this.$store);
      await this.$store.dispatch("logout");
      this.$router.push({ name: "loginPage" });
    },
  },
};
</script>

<style scoped>
.main-with-logout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav {
  background-color: #f5f5fa;
  padding: 20px;
  font-size: 35px;
  color: #333333;
}
@media (max-width: 992px) {
  .nav {
    padding: 20px;
    font-size: 25px;
    color: #333333;
    display: flex;
    justify-content: center;
  }
}
</style>
