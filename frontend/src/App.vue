<template>
  <div>
    <div class="main">
      <div
        class="drop-area"
        @dragenter="dragEnter"
        @dragover.prevent
        @dragleave="dragLeave"
        @drop="drop"
      >
        <div class="insideUploader">
          <p v-if="dragging">Drop your file here</p>
          <p v-else>Drag and drop a file here</p>
          <button @click="openFileInput" class="button-style">
            Select Files
          </button>
        </div>
      </div>

      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileSelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    dragging: false,
  }),
  methods: {
    dragEnter() {
      this.dragging = true;
    },
    dragLeave() {
      this.dragging = false;
    },
    drop(event) {
      event.preventDefault();
      this.dragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        console.log("Dropped file:", file);
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file);
      }
    },
  },
};
</script>

<style scoped>
*{
  background-color: #f5f5fa;
}
.drop-area {
  width: 500px;
  height: 250px;
  border: 2px dashed #ccc;
  text-align: center;
  padding: 20px;
  cursor: pointer;
}
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.insideUploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-style {
  border: black 1px solid;
  border-radius: 10px;
  width: 100px;
}
</style>
