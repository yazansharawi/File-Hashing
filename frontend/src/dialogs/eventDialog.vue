<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="400">
      <v-card class="text">
        <v-card-title>
          <span class="text-h5">Confirmation Message</span>
        </v-card-title>
        <v-card-text>
          Would you like to register this file to yourself ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="closeDialog(false)"
            class="elevation-0"
          >
            No
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="closeDialog(true)"
            class="elevation-0"
          >
            Yes
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
    closeDialog(event) {
      this.$emit("update:model", event);
    },
  },
};
</script>

<style scoped></style>
