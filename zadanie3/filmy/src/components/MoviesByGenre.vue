<template>
  <h2>Filmy wg gatunku:</h2>
  <p v-for="gen in genres">
    {{ gen }}:
    <p class='red' v-for="m in moviesWithGenre">
        <span v-if="m.genres.includes(gen)">
            - {{ m.title }}
        </span>
    </p>
  </p>
</template>

<script>
export default {
  name: "MoviesByGenre",
  props: {
    movies: Object,
  },
  data() {
    return {
      moviesWithGenre: [],
      genres: [],
    };
  },
  created() {
    this.moviesWithGenre = _.filter(this.movies, function (m) {
      return m["genres"].length != 0;
    });
    let genresDict = _.map(this.movies, "genres");
    this.genres = _.reduce(genresDict, function (arr, item) {
      return _.union(arr, item);
    });
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>