<template>
  <search-form/>
  <movie-table/>
  <movies-by-genre/>
  <movies-by-cast/>
  <p>{{ this.first }}</p>
</template>

<script>
import moviesData from "./data/movies.json";
import SearchForm from "./components/SearchForm.vue";
import MovieTable from "./components/MovieTable.vue";
import MoviesByGenre from "./components/MoviesByGenre.vue";
import MoviesByCast from "./components/MoviesByCast.vue";

export default {
  name: "App",
  components: {
    SearchForm,
    MovieTable,
    MoviesByGenre,
    MoviesByCast
  },
  data() {
    return {
      movies: moviesData,
      first: null,
    };
  },
  created() {
    this.first = _.first(this.movies)
    console.log(this.first);
  },
};
</script>

<style>
</style>
