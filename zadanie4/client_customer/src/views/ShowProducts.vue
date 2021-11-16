<template>
    <div class="add_product">
     <v-btn @click="$router.push('/show-products/order')" color="teal lighten-1" class="white--text">Przejdź do koszyka</v-btn>
        <h1>Produkty</h1>
        <v-text-field
            v-model="search"
            label="Szukaj"
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
          <v-btn @click="_addProductToCart(props.item)" color="teal lighten-2" class="white--text">Dodaj do koszyka</v-btn>
        </template>
        <template v-slot:item.price="props">
          <div>{{ props.item.price }}</div>
        </template>
        <template v-slot:item.weight="props">
          <div>{{ props.item.weight }}</div>
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

            this.$notify({
                    group: 'Successes',
                    title: 'Sukces',
                    text: 'Produkt: ' + value.productName + ' dodany do koszyka', 
                    type: 'success'
                });
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
           { text: 'Nazwa produktu', value: 'productName' },
           { text: 'Opis', value: 'description' },
           { text: 'Kategoria', value: 'category.categoryName' },
           { text: 'Cena (PLN)', value: 'price' },
           { text: 'Waga (kg)', value: 'weight' },
           { text: 'Opcje', value: 'options', sortable: false }
               ],
            search: ''
          }
         }
       
}
</script>