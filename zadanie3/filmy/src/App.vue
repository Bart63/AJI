<template>
  <div class="container">
    <search-form
      :movies="this.movies"
      @getFilteredFilms="getFilms"
    ></search-form>
    <movie-table :movies="this.filteredMovies" />
    <movies-by-genre :movies="moviesForGenre" />
    <movies-by-cast :movies="moviesForCast" />
  </div>
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
    MoviesByCast,
  },
  data() {
    return {
      movies: moviesData,
      filteredMovies: moviesData,
      moviesForGenre: [],
      moviesForCast: [],
    };
  },
  created() {
    this.moviesForGenre = _.sampleSize(moviesData, 100);
    this.moviesForCast = _.sampleSize(moviesData, 100);
  },
  methods: {
    getFilms: function (value) {
      this.filteredMovies = value;
    },
  },
};
</script>

<style>
li {
  margin-left: 3vw;
}
</style>
