<template>
  <div>
  <v-row>
    <v-col>
        <v-card v-for="idea in ideas"
        :key="idea._id"
        class="mb-4"
        max-width="344"
        outlines>

          <v-card-text>
            {{idea.idea}}
          </v-card-text>

          <v-card-actions>
            <v-btn @click="upVoteIdea(idea)">Up vote</v-btn>
            <div class="mr-4 ml-4">{{idea.votes}}</div>
            <v-btn @click="downVoteIdea(idea)">Down vote</v-btn>
          </v-card-actions>
          </v-card>
      </v-col>
      <v-col>
        <v-btn @click="$router.push('/create-idea')" color="teal lighten-2" class="white--text">Add new idea</v-btn>
      </v-col>
    </v-row>
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
