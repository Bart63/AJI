<template>
  <div>
  
    <v-btn @click="$router.push('/create-product')" color="teal lighten-2" class="white--text">Add new product</v-btn>
     <v-btn @click="$router.push('/show-products')" color="teal lighten-3" class="white--text">Show products</v-btn>

  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Home',

    created() {
        this.getIdeas();
    },
    methods: {
        ...mapActions(['getIdeas', 'upVoteIdea', 'downVoteIdea'])
    },
    computed: {
        ...mapState(['ideas'])
    }
    
  }
</script>
