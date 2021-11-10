<template>
    <div class="add_product">
        <h1>Add new product</h1>
        <form @submit='submitProduct'>
            <v-textarea
                outlined
                @change="_setFormName"
                name="input1"
                label="Product name"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <v-select
                :items="categories"
                item-text="categoryName"
                item-value="_id"
                label="Select category"
                persistent-hint
                return-object
                single-line
                @change="_setFormCategory"
            ></v-select>
            <v-textarea
                outlined
                @change="_setFormPrice"
                name="input3"
                label="Price (PLN)"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setFormWeight"
                name="input4"
                label="Weight (kg)"
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
import { mapMutations, mapActions, mapState } from 'vuex';
import router from '../router';


export default {
    methods: {
        ...mapMutations(["setProductForm"]),
        ...mapActions(["createProduct", "getCategories"]),
        _setFormName (value) {
            
            this.setProductForm({ key: 'productName',
            value: value });
        },
        _setFormCategory (value) {
            
            this.setProductForm({ key: 'category',
            value: value._id });
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

            if (result.status === 400) {

                this.$notify({
                    group: 'Errors',
                    title: 'Error',
                    text: result.errors, 
                    type: 'error'
                });
            }

            if (result.status === 200) {
                this.$notify({
                    group: 'Successes',
                    title: 'Success',
                    text: 'Product successfully added', 
                    type: 'success'
                });

                this._setFormName("");
                this._setFormCategory("");
                this._setFormPrice("");
                this._setFormWeight("");

                router.push('/');
            }
        },

    },
    computed: {
        ...mapState(["categories"])
    },
    created() {
        this.getCategories();
    },
    
  
    

}
</script>



