<template>
  <div class="submit-idea">
    <h1>Create an Idea</h1>
    <form @submit="_submitIdea">
      <v-textarea
        outlined
        @change="_setForm"
        name="input1"
        label="Idea description"
      >
      </v-textarea>
      <br />
      <v-btn type="submit" color="lime darken-4" class="white--text">
        Submit
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations(["setForm"]),
    ...mapActions(["createIdea"]),
    _setForm(value) {
      this.setForm({ key: "idea", value: value });
    },
    _submitIdea(event) {
      event.preventDefault();
      this.createIdea();
    },
  },
};
</script>

<style scoped>
textarea {
  width: 400px;
  height: 200px;
  font-size: 24px;
}
</style>