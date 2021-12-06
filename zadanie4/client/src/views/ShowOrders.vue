<template>
  <div class="show_orders">
    <h1>Wszystkie zamówienia</h1>
    <v-select
              v-model="search"
              :items="states"
              item-text="stateName"
              item-value="stateName"
            ></v-select>
    <v-data-table
      :headers="this.mainHeaders"
      :items="this.orders"
      :search="search"
      class="elevation-5"
    >
      
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions(["getOrders", "getStates", "updateOrder"]),

  },
  computed: {
    ...mapState(["orders", "states"]),
  },
  data() {
    return {
      mainHeaders: [
        { text: "Data zatwierdzenia", value: "approvalDate" },
        { text: "Wartość (PLN)", value: "totalOrderPrice" },
        { text: "Status", value: "status.stateName", align: ' d-none' },
      ],
      search: "ZATWIERDZONE",
      statesToShow: []
    };
  },
  async created() {
    await this.getStates();
    await this.getOrders();
    this.$set(this.orders, "orders", this.orders);
    this.$set(this.states, "states", this.states);
    
    
  },
 
  
};
</script>