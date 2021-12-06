<template>
  <div class="button_container">
    <v-btn
      @click="$router.push('/create-product')"
      color="teal lighten-2"
      class="white--text button_nav"
    >
      Dodaj nowy produkt
    </v-btn>
    <v-btn
      @click="$router.push('/show-products')"
      color="teal lighten-3"
      class="white--text button_nav"
    >
      Przeglądaj i edytuj produkty
    </v-btn>
    <v-btn
      @click="$router.push('/show-unrealized-orders')"
      color="teal lighten-3"
      class="white--text button_nav"
    >
      Wyświetl niezrealizowane zamówienia
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  created() {
    this.resetState();
    this.getIdeas();
  },
  methods: {
    ...mapActions(["getIdeas", "upVoteIdea", "downVoteIdea", "resetState"]),
  },
  computed: {
    ...mapState(["ideas"]),
  },
};
</script>

<style scoped>
.button_container{
  padding: 0.2vh;
  text-align:center;
}
.button_nav{
  margin-inline:5vw;
  margin-top: 1vw
}
</style>