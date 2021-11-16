<template>
    <div class="add_product">
        <h1>Twój koszyk:</h1>
        <v-data-table
            :headers="this.headers"
            :items="this.order.products"
            :items-per-page="15"
            class="elevation-1">  

        <template v-slot:item.totalPrice="props">
          <div>{{ props.item.totalPrice }}</div>
        </template>
        <template v-slot:item.options="props">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="red"@click="_removeProduct(props.item)">
            
            <v-icon dark>
            mdi-delete
            </v-icon>
        </v-btn>
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
              label="Wartość (PLN)"
              filled
              readonly
        ></v-text-field>

        <form @submit='_submitOrder'>
            <v-textarea
                outlined
                name="input1"
                label="Nazwa użytkownika"
                background-color="#f5ffa8"
                no-resize
                rows="1"
                @change="_setOrderFormUsername"
            ></v-textarea>
            <v-textarea
                outlined
                name="input5"
                label="Email"
                background-color="#f5ffa8"
                no-resize
                rows="1"
                @change="_setOrderFormEmail"
            ></v-textarea>
            <v-textarea
                outlined
                name="input3"
                label="Nr telefonu"
                background-color="#f5ffa8"
                no-resize
                rows="1"
                @change="_setOrderPNumber"
            ></v-textarea>
            <br />
            <v-btn type='submit' color="lime darken-4" class="white--text">Złóż zamówienie</v-btn>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Vue from 'vue'
    import {
      Vuetify,VApp,VForm, VTextField,VSelect
    } from 'vuetify';
import router from '../router';

export default {
    methods: {
        ...mapActions(["submitOrder", "resetState"]),
        ...mapMutations(["setOrderForm", "setProductQuantityInOrder", "removeProductFromOrder"]),
        async _submitOrder() {

            event.preventDefault();

            if (this.order.products.length === 0) {

                this.$notify({
                    group: 'Errors',
                    title: 'Błąd',
                    text: 'Koszyk jest pusty', 
                    type: 'error'
                });

                return;
            }

            if (this.order.userData.username == '') {
                this.$notify({
                    group: 'Errors',
                    title: 'Błąd',
                    text: 'Nazwa użytkownika jest nieprawidłowa', 
                    type: 'error'
                });

                return;
            }

            const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!emailRe.test(this.order.userData.email)) {
                this.$notify({
                    group: 'Errors',
                    title: 'Błąd',
                    text: 'Adres email jest nieprawidłowy', 
                    type: 'error'
                });

                return;
            }

            var phoneNumberRe = /^\d{9}$/;

            if (!phoneNumberRe.test(this.order.userData.phoneNumber)) {
                this.$notify({
                    group: 'Errors',
                    title: 'Błąd',
                    text: 'Numer telefonu jest nieprawidłowy', 
                    type: 'error'
                });

                return;
            }

            const r = await this.submitOrder();


            if (r.status === 200) {

                this.$notify({
                    group: 'Successes',
                    title: 'Sukces',
                    text: 'Pomyślnie złożono zamówienie!', 
                    type: 'success'
                });

                this.resetState();

                router.push('/show-products');
            }

            if (r.status === 400) {
                this.$notify({
                    group: 'Errors',
                    title: 'Błąd',
                    text: 'Błąd: ' + r.errors, 
                    type: 'error'
                });
            }
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
        },
        _removeProduct(value) {
            this.removeProductFromOrder(value.product._id);

            this.$notify({
                    group: 'Warnings',
                    title: 'Uwaga!',
                    text: 'Produkt: ' + value.product.productName + ' usunięty z koszyka', 
                    type: 'warning'
                });
        }

    },
    computed: {
        ...mapState(["order"]),
        
    },

    data() {
         return {
           headers: [
           { text: 'Nazwa produktu', value: 'product.productName' },
           { text: 'Ilość', value: 'quantity' },
           { text: 'Całkowita cena (PLN)', value: 'totalPrice' },
           { text: 'Opcje', value: 'options' } ],
       
          }
         }
       
}
</script>