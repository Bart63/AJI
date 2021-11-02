<template>
  <h1>Baza filmów</h1>
  <form id="search-form">
    <div class="form-group">
      <label for="inputTitle">Tytuł</label>
      <input
        id="inputTitle"
        class="form-control"
        type="text"
        placeholder="Tytuł lub fragment tytułu"
      />
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionFrom"
        >Rok produkcji od:</label
      >
      <div class="col-sm-8">
        <input
          id="inputProductionFrom"
          class="form-control"
          type="number"
          min="1900"
          max="2019"
          step="1"
          value=""
          placeholder="Liczba naturalna z przedziału 1900-2019"
        />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionTo"
        >Rok produkcji do:</label
      >
      <div class="col-sm-8">
        <input
          id="inputProductionTo"
          class="form-control"
          type="number"
          min="1900"
          max="2019"
          step="1"
          value=""
          placeholder="Liczba naturalna z przedziału 1900-2019"
        />
      </div>
    </div>
    <div class="form-group">
      <label for="inputCast">Obsada</label>
      <input
        id="inputCast"
        type="text"
        class="form-control"
        placeholder="Imię i nazwisko"
      />
    </div>
    <div class="form-group row">
      <input
        type="submit"
        class="btn btn-info col-sm-12"
        value="Szukaj"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchForm",

  props: {
    movies: Object,
  },
  data() {
    return {
      films: [],
      searchForm: HTMLFormElement,
    };
  },
  created() {
    this.films = this.movies;
  },
  mounted() {
    this.searchForm = document.getElementById('search-form');
    this.searchForm.addEventListener('submit', this.filter);
    this.searchForm.submit
  },
  methods: {
    filter: function (event) {
      this.films = this.movies;

      var titleText = document.getElementById("inputTitle").value;
      var dateFrom = document.getElementById("inputProductionFrom").value;
      var dateTo = document.getElementById("inputProductionTo").value;
      var castText = document.getElementById("inputCast").value;

      if (titleText != "") {
        this.films = _.filter(this.films, function (e) {
          return e.title.indexOf(titleText) != -1;
        });
      }

      if (dateFrom != "") {
        this.films = _.filter(this.films, function (e) {
          return e.year >= dateFrom;
        });
      }

      if (dateTo != "") {
        this.films = _.filter(this.films, function (e) {
          return e.year <= dateTo;
        });
      }

      if (castText != "") {
        this.films = _.filter(this.films, function (e) {
          return _.join(e.cast, " ").indexOf(castText) != -1;
        });
      }

      this.$emit("getFilteredFilms", this.films);
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
</style>