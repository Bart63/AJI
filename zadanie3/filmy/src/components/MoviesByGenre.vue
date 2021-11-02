<template>
  <div>
    <h1>Filmy wg gatunku:</h1>
    <ol v-for="gen in genres">
      {{
        gen
      }}:
      <span class="red" v-for="m in moviesWithGenre">
        <li v-if="m.genres.includes(gen)">
          {{ m.title }}
        </li>
      </span>
    </ol>
  </div>
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