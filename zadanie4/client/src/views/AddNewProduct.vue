<template>
    <div class="add_product">
        <h1>Dodaj nowy produkt</h1>
        <form @submit='submitProduct'>
            <v-textarea
                outlined
                @change="_setFormName"
                name="input1"
                label="Nazwa produktu"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setFormDescription"
                name="input5"
                label="Opis"
                background-color="#f5ffa8"
                no-resize
                rows="5"
            ></v-textarea>
            <v-select
                :items="categories"
                item-text="categoryName"
                item-value="_id"
                label="Wybierz kategorię"
                persistent-hint
                return-object
                single-line
                @change="_setFormCategory"
            ></v-select>
            <v-textarea
                outlined
                @change="_setFormPrice"
                name="input3"
                label="Cena (PLN)"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <v-textarea
                outlined
                @change="_setFormWeight"
                name="input4"
                label="Waga (kg)"
                background-color="#f5ffa8"
                no-resize
                rows="1"
            ></v-textarea>
            <br />
            <v-btn type='Zapisz' color="lime darken-4" class="white--text">Submit</v-btn>
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
        _setFormDescription (value) {
            
            this.setProductForm({ key: 'description',
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
                    title: 'Błąd',
                    text: result.errors, 
                    type: 'error'
                });
            }

            if (result.status === 200) {
                this.$notify({
                    group: 'Successes',
                    title: 'Success',
                    text: 'Produkt pomyślnie dodany', 
                    type: 'success'
                });


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



