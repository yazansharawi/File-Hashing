<template>
  <div>
    <div class="nav">File-Hashing</div>
  </div>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style scoped>
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
