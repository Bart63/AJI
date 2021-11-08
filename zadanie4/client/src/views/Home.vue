<template>
  <div>
  
    <v-btn @click="$router.push('/create-product')" color="teal lighten-2" class="white--text">Add new product</v-btn>
     
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
