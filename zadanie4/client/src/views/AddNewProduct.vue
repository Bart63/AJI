<template>
    <div class="add_product">
        <h1>Add new product</h1>
        <form @submit='submitProduct'>
            <v-textarea
                outlined
                @change="_setFormName"
                name="input1"
                label="Product name"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setFormCategory"
                name="input2"
                label="Category"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setFormPrice"
                name="input3"
                label="Price"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setFormWeight"
                name="input4"
                label="Weight (kg)"
            ></v-textarea>
            <br />
            <v-btn type='submit' color="lime darken-4" class="white--text">Submit</v-btn>
        </form>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import router from '../router';

export default {
    methods: {
        ...mapMutations(["setProductForm"]),
        ...mapActions(["createProduct"]),
        _setFormName (value) {
            
            this.setProductForm({ key: 'productName',
            value: value });
        },
        _setFormCategory (value) {
            
            this.setProductForm({ key: 'category',
            value: value });
        },
        _setFormPrice (value) {
            
            this.setProductForm({ key: 'price',
            value: value });
        },
        _setFormWeight (value) {
            
            this.setProductForm({ key: 'weight',
            value: value });
        },
        async submitProduct(event) {
            event.preventDefault();
            let result = await this.createProduct();
            
            console.log(result);

            router.push('/');
        },

    },
    

}
</script>

