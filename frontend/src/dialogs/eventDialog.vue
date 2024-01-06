<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="400">
      <v-card class="text">
        <v-card-text style="display: flex; justify-content: center"
          >{{ eventType }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="closeDialog">Close Dialog</v-btn>
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
