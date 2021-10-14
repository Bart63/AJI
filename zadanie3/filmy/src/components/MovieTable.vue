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
            <tr v-for="d in movies">
              <td>{{ d.title }}</td>
              <td>{{ d.year }}</td>
              <td>{{ d.cast }}</td>
              <td>{{ d.genres }}</td>
            </tr>
          </tbody>
      </table>
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
      
      tableHeaders: [],
    };
  }
 
};
</script>

<style scoped>
</style>