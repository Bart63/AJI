<template>
    <div class="add_product">
        <h1>Products list</h1>
        <v-data-table
            :headers="this.headers"
            :items="this.products"
            :items-per-page="15"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
    methods: {
        ...mapActions(["getProducts", "getCategories"]),
    },
    computed: {
        ...mapState(["products", "categories"])

    },
    created() {

        
        this.getProducts();
        
    },
    data() {
         return {
           headers: [
           { text: 'Product name', value: 'productName' },
           { text: 'Category', value: 'category' },
           { text: 'Price (PLN)', value: 'price' },
           { text: 'Weight (kg)', value: 'weight' }
               ],

          }
         }
       
}
</script>