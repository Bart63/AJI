<template>
    <div class="add_product">
        <h1>Order:</h1>
        <v-data-table
            :headers="this.headers"
            :items="this.order.products"
            :items-per-page="15"
            class="elevation-1">  

        <template v-slot:item.totalPrice="props">
          <div>{{ props.item.totalPrice.toFixed(2) }}</div>
        </template>
        <template v-slot:item.quantity="props">

        <div>
        <v-container>

        <v-row style="width: 200px;">

        <v-col>
            <div>{{ props.item.quantity }}</div>
        </v-col>

        <v-col>
        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"@click="_decreaseQuantity(props.item)">
            
            <v-icon dark>
            mdi-minus
            </v-icon>
        </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"@click="_increaseQuantity(props.item)">
            
            <v-icon dark>
            mdi-plus
            </v-icon>
        </v-btn>
        </v-col>
        </v-row>
        </v-container>
        </div>

        </template>
        </v-data-table>

        <v-text-field
              v-model="this.order.totalOrderPrice"
              label="Total cost"
              filled
              readonly
        ></v-text-field>

        <form @submit='_submitOrder'>
            <v-textarea
                outlined
                @change="_setOrderFormUsername"
                name="input1"
                label="Username"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setOrderFormEmail"
                name="input5"
                label="Email"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setOrderPNumber"
                name="input3"
                label="Phone number"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <br />
            <v-btn type='submit' color="lime darken-4" class="white--text">Submit</v-btn>
        </form>
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
        //...mapActions([]),
        ...mapMutations(["setOrderForm", "setProductQuantityInOrder"]),
        _submitOrder() {
            
        },
        _setOrderFormUsername(value) {
            this.setOrderForm({ key: 'username',
            value: value });
        },
        _setOrderFormEmail(value) {

            this.setOrderForm({ key: 'email',
            value: value });

        },
        _setOrderPNumber(value) {

            this.setOrderForm({ key: 'phoneNumber',
            value: value });

        },
        _increaseQuantity(value) {

            value.quantity += 1;

            this.setProductQuantityInOrder({ productId: value.product._id, newQuantity: value.quantity });

        },
        _decreaseQuantity(value) {

            value.quantity -= 1;

            if (value.quantity === 0)
                value.quantity = 1;


            this.setProductQuantityInOrder({ productId: value.product._id, newQuantity: value.quantity });
        }

    },
    computed: {
        ...mapState(["order"]),
        
    },
    created() {

    },
    data() {
         return {
           headers: [
           { text: 'Product name', value: 'product.productName' },
           { text: 'Quantity', value: 'quantity' },
           { text: 'Total price (PLN)', value: 'totalPrice' } ]
          }
         }
       
}
</script>