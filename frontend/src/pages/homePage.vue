<template>
  <div style="background-color: #f5f5fa; height: 100vh">
    <Nav :homePage="true" />
    <eventDialog :model="confirmationDialog" @update:model="confirm($event)" />
    <registerDialog
      :model="eventDialog"
      @update:model="eventDialog = $event"
      :eventType="snackbarText"
    />
    <div class="main">
      <div class="file-input-button">
        <v-file-input
          label="File input"
          class="file-input"
          :disabled="loading"
          v-model="selectedFile"
        />
        <v-btn
          x-large
          depressed
          :disabled="loading"
          @click="confirmationDialog = true"
        >
          <div v-if="loading">
            <v-progress-circular :size="25" indeterminate />
          </div>
          <div v-else>
            <v-icon class="mr-1">mdi-upload</v-icon>
            UPLOAD FILE
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/navbar.vue";
import eventDialog from "../dialogs/eventDialog.vue";
import registerDialog from "../dialogs/registerDialog.vue";
export default {
  name: "HomePage",
  components: {
    Nav,
    eventDialog,
    registerDialog,
  },
  data: () => ({
    dragging: false,
    snackbar: false,
    snackbarText: "",
    selectedFile: null,
    loading: false,
    eventDialog: false,
    confirmationDialog: false,
  }),
  methods: {
    confirm(event) {
      if (event) {
        this.drop();
      } else {
        this.confirmationDialog = false;
        this.selectedFile = null;
      }
    },
    dragEnter() {
      this.dragging = true;
    },
    dragLeave() {
      this.dragging = false;
    },
    async hashFile(file) {
      const buffer = await file.arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", buffer);
      const hashArray = Array.from(new Uint8Array(digest));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    },
    async drop() {
      this.loading = true;

      if (this.selectedFile) {
        this.confirmationDialog = false;
        const fileHash = await this.hashFile(this.selectedFile);
        try {
          const response = await this.$axios.post(
            `/MediaRecord/register-by-user-uuid/${this.$store.getters.user.userUuid}`,
            { hash: fileHash, contentType: this.selectedFile.type }
          );

          this.snackbarText = response.data.message;
          this.eventDialog = true;
          this.selectedFile = null;
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.snackbarText = `This file is already registered by ${error.response.data.ownerName}.`;
            this.eventDialog = true;
          } else {
            console.error("Error uploading file:", error);
            this.snackbarText = "Failed to upload file. Please try again.";
            this.eventDialog = true;
          }
          this.selectedFile = null;
        }

        this.loading = false;
        this.snackbar = true;
      } else {
        this.snackbarText = "No file selected";
        this.snackbar = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
* {
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
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.insideUploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.file-input {
  max-width: 500px;
}
.file-input-button {
  display: flex;
  flex-direction: column;
}
</style>
