<template>
  <div class="show_unr_products" v-if="renderComponent">
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

      <template v-slot:item.status.stateName="props">
          <v-edit-dialog
          :return-value.sync="props.item.status"
          large
          persistent
          @save="save(props.item)"
          @cancel="cancel"
          @close="close"
        >
        <div>{{ props.item.status.stateName }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h5" 
              >Zmień status zamówienia</div>
            <v-select
              v-model="props.item.status"
              :items="states"
              item-text="stateName"
              item-value="_id"
            >
            </v-select>
          </template>
        </v-edit-dialog>
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
    ...mapActions(["getOrdersWithStatus", "getStates", "updateOrder"]),
    
    async updateValues() {
      await this.getStates();
      await this.getOrdersWithStatus("ZATWIERDZONE");
      this.$set(this.orders, "orders", this.orders);
      this.$set(this.states, "states", this.states);
    },

    async save(value) {
      
      const r = await this.updateOrder(value);
      if (r.status === 200) {
        this.$notify({
          group: "Successes",
          title: "Success",
          text: "Zamówienie pomyślnie zaktualizowane",
          type: "success",
        });
      }
      if (r.status === 400) {
        this.$notify({
          group: "Errors",
          title: "Błąd",
          text: "Nie można zaktualizować:\n" + r.errors,
          type: "error",
        });
      }
      await this.updateValues();
      this.renderComponent = false;
      this.$nextTick().then(() => {
        this.renderComponent = true;
      });
        
    },
    cancel() {},
    close() {},
  },
  computed: {
    ...mapState(["orders", "states"]),
  },
  data() {
    return {
      renderComponent: true,
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
      this.updateValues();
  },
 
  
};
</script>