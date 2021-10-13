<template>
  <p>{{ this.first }}</p>
</template>

<script>
import moviesData from "./data/movies.json";

export default {
  name: "App",
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
