<template>
  <div>
    <h1>Filmy wg obsady:</h1>
    <ol v-for="c in cast">
      {{
        c
      }}:
      <span class="blue" v-for="m in moviesWithCast">
        <li v-if="m.cast.includes(c)">
          {{ m.title }}
        </li>
      </span>
    </ol>
  </div>
</template>

<script>
export default {
  name: "MoviesByCast",
  props: {
    movies: Object,
  },
  data() {
    return {
      moviesWithCast: [],
      cast: [],
    };
  },
  created() {
    this.moviesWithCast = _.filter(this.movies, function (m) {
      return m["cast"].length != 0;
    });
    let castDict = _.map(this.movies, "cast");
    this.cast = _.reduce(castDict, function (arr, item) {
      return _.union(arr, item);
    });
  },
};
</script>

<style scoped>
.blue {
  color: blue;
}
</style>