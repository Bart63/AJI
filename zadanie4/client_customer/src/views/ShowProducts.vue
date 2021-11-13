<template>
    <div class="add_product">
     <v-btn @click="$router.push('/show-products/order')" color="teal lighten-1" class="white--text">Finalize order</v-btn>
        <h1>Products list</h1>
        <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details>
            </v-text-field>
        <v-data-table
            :headers="this.headers"
            :items="this.products"
            :items-per-page="15"
            :search="search"
            class="elevation-1">

        <template v-slot:item.options="props">
          <v-btn @click="_addProductToCart(props.item)" color="teal lighten-2" class="white--text">Add to cart</v-btn>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Vue from 'vue'
    import {
      Vuetify,VApp,VForm, VTextField,VSelect
    } from 'vuetify'

export default {
    methods: {
        ...mapActions(["getProducts", "getCategories", "addProductToOrder"]),
        ...mapMutations(["addProductToOrder"]),
        _addProductToCart(value) {
            this.addProductToOrder(value);
        }
        
        
    },
    computed: {
        ...mapState(["products", "categories"]),
        
    },
    created() {

        this.getProducts();
        this.getCategories();
    },
    data() {
         return {
           headers: [
           { text: 'Product name', value: 'productName' },
           { text: 'Description', value: 'description' },
           { text: 'Category', value: 'category.categoryName' },
           { text: 'Price (PLN)', value: 'price' },
           { text: 'Weight (kg)', value: 'weight' },
           { text: 'Options', value: 'options', sortable: false }
               ],
            search: ''
          }
         }
       
}
</script>