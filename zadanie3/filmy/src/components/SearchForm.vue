<template>
  <div>
      <h2>Search Form</h2>
      <div>
          <text>Tytuł:</text>
          <input id="tytulText" type="text" placeholder="Tytuł lub fragment tytułu"/>
      </div>
      <div>
          <text>Rok produkcji od:</text>
          <input id="rokOdDate" type="number" min="1900" max="2019" step="1" value="" />
      </div>
      <div>
          <text>Rok produkcji do:</text>
          <input id="rokDoDate" type="number" min="1900" max="2019" step="1" value="" />
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
      
    };
  },
  created() {
    this.films = this.movies;
    
  },
  methods: {
    filter: function()
    {

      this.films = this.movies;

      var titleText = document.getElementById("tytulText").value;
      var dateFrom = document.getElementById("rokOdDate").value;
      var dateTo = document.getElementById("rokDoDate").value;
      var castText = document.getElementById("obsadaText").value;

      if (titleText != "") {
      this.films = _.filter(this.films, function(e) {
        return e.title.indexOf(titleText) != -1;
      })
      }

      if (dateFrom != "") {
      this.films = _.filter(this.films, function(e) {
        return e.year >= dateFrom;
      })
      }

      if (dateTo != "") {
      this.films = _.filter(this.films, function(e) {
        return e.year <= dateTo;
      })
      }

      if (castText != "") {
      this.films = _.filter(this.films, function(e) {
        return e.cast.indexOf(castText) != -1;
      })
      }


      this.$emit('getFilteredFilms', this.films)
    }
  }

  
}

</script>

<style scoped>
</style>