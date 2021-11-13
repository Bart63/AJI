<template>
  <div>
  
     <v-btn @click="$router.push('/show-products')" color="teal lighten-3" class="white--text">Show products</v-btn>

  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Home',

    created() {
        this.resetState();
        
    },
    methods: {
        ...mapActions(['resetState'])
    },
    computed: {
        
    }
    
  }
</script>
