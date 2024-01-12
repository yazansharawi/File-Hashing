<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="400">
      <v-card class="text">
        <v-card-title>
          <span class="text-h5">File Registration</span>
        </v-card-title>
        <v-card-text style="font-size: 16px; margin-top: 10px"
          >{{ eventType }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="primary" @click="closeDialog">
            Close Dialog
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EventDialog",
  props: {
    model: {
      type: Boolean,
      required: false,
      default: false,
    },
    typeOfEvent: {
      type: String,
      required: false,
      default: null,
    },
    eventType: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:model", false);
    },
  },
};
</script>

<style scoped></style>
