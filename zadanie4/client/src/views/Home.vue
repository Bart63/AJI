<template>
  <div class="button_container">
    <v-btn
      @click="$router.push('/create-product')"
      color="teal lighten-7"
      class="white--text button_nav"
    >
      Dodaj nowy produkt
    </v-btn>
    <v-btn
      @click="$router.push('/show-products')"
      color="teal lighten-7"
      class="white--text button_nav"
    >
      Przeglądaj i edytuj produkty
    </v-btn>
    <v-btn
      @click="$router.push('/show-unrealized-orders')"
      color="teal lighten-7"
      class="white--text button_nav"
    >
      Wyświetl niezrealizowane zamówienia
    </v-btn>
    <v-btn
      @click="$router.push('/show-orders')"
      color="teal lighten-7"
      class="white--text button_nav"
    >
      Wyświetl zamówienia według kategorii
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  created() {
    this.resetState();
  },
  methods: {
    ...mapActions(["resetState"]),
  },
};
</script>

<style scoped>
.button_container{
  padding: 0.6vh;
  text-align:center;
}
.button_nav{
  margin-inline:5vw;
  margin-top: 1vw
}
.v-btn {
  width: 100vh;
  margin: 1vh;
  font-size: 3vh;
}

</style>