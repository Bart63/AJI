<template>
  <div>
      <h2>Search Form</h2>
      <div>
          <text>Tytuł:</text>
          <input id="tytulText" type="text" placeholder="Tytuł lub fragment tytułu"/>
      </div>
      <div>
          <text>Rok produkcji od:</text>
          <input id="rokOdDate" type="date"/>
      </div>
      <div>
          <text>Rok produkcji do:</text>
          <input id="rokDoDate" type="date"/>
      </div>
      <div>
          <text>Obsada:</text>
          <input id="obsadaText" type="text" placeholder="Imię i nazwisko"/>
      </div>
      <button id="szukajButton" type="button" @click="filter">Szukaj</button>
    </div>
</template>

<script>
export default {
  name: "SearchForm",

 props: {
   movies: Object
 },
  data() {
    return {
      films: [],
      a: Number
    };
  },
  created() {
    this.films = this.movies;
    this.a = 4;
  },
  methods: {
    filter: function()
    {
      this.a = this.a + 1;
    }
  }
  
}

</script>

<style scoped>
</style>