<template>
  <v-app>
    <v-app-bar
      app color="primary" dark
    >
      <div class="d-flex align-center">
        Great software to deal with shop management
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
    <v-container>
      <router-view/>
    </v-container>
    </v-main>
    <notifications group="Errors" position="bottom right" classes="notificationStyle" />
    <notifications group="Successes" position="bottom right" classes="notificationStyle" />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  .notificationStyle {
  
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 25px;
 
  color: #ffffff;
  background: #44A4FC;
  
  border-radius:20px;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}

</style>
