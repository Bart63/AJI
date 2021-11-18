<template>
    <div class="show_unr_products">
        <h1>Niezrealizowane zamówienia</h1>
        <v-text-field
            v-model="search"
            label="Szukaj"
            single-line
            hide-details>
            </v-text-field>
        <v-data-table
            :headers="this.mainHeaders"
            :items="this.orders"
            :items-per-page="15"
            :search="search"
            class="elevation-5">

        <template v-slot:[`item.approvalDate`]="{props}">
            <div>{{ props.item.approvalDate }}</div>
        </template>
        <template v-slot:[`item.totalOrderPrice`]="{props}">
        <v-chip
          :color="green"
          dark
        >
            {{ props.item.totalOrderPrice }}
             </v-chip>
        </template>

        <template v-slot:[`item.products`]="{props}">
          <v-data-table
            :headers="this.productHeaders"
            :items="props"
            :items-per-page="15"
            :search="search"
            class="elevation-5">
            </v-data-table>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    methods: {
        ...mapActions(["getOrdersWithStatus", "getStates"]),

    },
    computed: {
        ...mapState(["orders", "states"]),
    },
    async created() {

        await this.getStates();
        

        await this.getOrdersWithStatus("ZATWIERDZONE");

        console.log(this.orders);
    },
    data() {
         return {
           mainHeaders: [
           { text: 'Data zatwierdzenia', value: 'approvalDate' },
           { text: 'Wartość (PLN)', value: 'totalOrderPrice' },
           { text: 'Produkty', value: 'products' },
               ],
            productHeaders: [
           { text: 'Nazwa', value: 'product.productName' },
           { text: 'Ilość', value: 'quantity' },
               ],
            search: ''
          }
         },
     
}
</script>