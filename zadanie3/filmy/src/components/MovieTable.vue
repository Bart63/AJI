<template>
  <div>
    <h2>Movie Table</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in this.moviesTable">
          <td>{{ d.title }}</td>
          <td>{{ d.year }}</td>
          <td>
            <p v-for="c in d.cast">{{ c }}</p>
          </td>
          <td>
            <p v-for="g in d.genres">{{ g }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button id="kolejneButton" type="button" @click="showNextMovies">
        Pokaż kolejne 10
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieTable",

  props: {
    movies: Object,
  },
  data() {
    return {
      moviesTable: [],
      tableHeaders: [],
      numberOfRows: Number,
    };
  },
  created() {
    this.numberOfRows = 10;
    this.moviesTable = this.firstN(this.movies, this.numberOfRows);
  },
  methods: {
    firstN: function (obj, n) {
      return _.reduce(
        _.slice(_.keys(obj), 0, n),
        function (memo, current) {
          memo[current] = obj[current];
          return memo;
        },
        {}
      );
    },
    showNextMovies: function () {
      this.numberOfRows = this.numberOfRows + 10;

      if (this.movies.length < this.numberOfRows) {
        this.numberOfRows = this.movies.length;
      }

      this.moviesTable = this.firstN(this.movies, this.numberOfRows);
    },
  },
  watch: {
    movies: function () {
      this.moviesTable = this.firstN(this.movies, this.numberOfRows);
    },
  },
};
</script>

<style scoped>
th,
td {
  border: 1px solid black;
}
</style>