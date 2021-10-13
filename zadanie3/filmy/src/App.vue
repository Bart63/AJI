<template>
  <p>{{this.movies}}</p>
</template>

<script>
import moviesData from "./data/movies.json";

export default {
  name: "App",
  data() {
    return {
      movies: moviesData
    }
  },
  created() {
    console.log(this.movies);
  }
};
</script>

<style>

</style>
