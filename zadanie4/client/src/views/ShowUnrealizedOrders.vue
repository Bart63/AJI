<template>
  <div class="show_unr_products">
    <h1>Niezrealizowane zamówienia</h1>
    <v-text-field v-model="search" label="Szukaj" single-line hide-details>
    </v-text-field>
    <v-data-table
      :headers="this.mainHeaders"
      :items="this.orders"
      :search="search"
      class="elevation-5"
    >
      <template v-slot:item.approvalDate="props">
        <div>{{ props.item.approvalDate }}</div>
      </template>

      <template v-slot:item.totalOrderPrice="props">
        <v-chip dark>
          {{ props.item.totalOrderPrice }}
        </v-chip>
      </template>

      <template v-slot:item.products="props">
        <div v-for="product in props.item.products">
          <v-chip>
            {{ product.product.productName }}
          </v-chip>
          <v-chip class="ma-1" color="primary">
            Ilość: {{ product.quantity }}
          </v-chip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions(["getOrdersWithStatus", "getStates"]),
  },
  computed: {
    ...mapState(["orders", "states"]),
  },

  data() {
    return {
      mainHeaders: [
        { text: "Data zatwierdzenia", value: "approvalDate" },
        { text: "Wartość (PLN)", value: "totalOrderPrice" },
        { text: "Produkty", value: "products" },
        { text: "Status", value: "status.stateName" },
      ],
      search: "",
    };
  },
  
  async created() {
    await this.getStates();
    await this.getOrdersWithStatus("ZATWIERDZONE");
    this.$set(this.orders, "orders", this.orders);
  },
};
</script>