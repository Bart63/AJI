<template>
    <div class="show_products">
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


        <template v-slot:item.productName="props">
          <v-edit-dialog
            :return-value.sync="props.item.productName"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @close="close"
          >
            <div>{{ props.item.productName }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h5">
                Zmień nazwę
              </div>
              <v-text-field
                v-model="props.item.productName"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.description="props">
          <v-edit-dialog
            :return-value.sync="props.item.description"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @close="close"
          >
            <div>{{ props.item.description }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h5">
                Zmień opis
              </div>
              <v-text-field
                v-model="props.item.description"
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.category.categoryName="props">
          <v-edit-dialog
            :return-value.sync="props.item.category"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @close="close"
          >
            <div>{{ props.item.category.categoryName }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h5">
                Zmień kategorię
              </div>
               <v-select
                v-model="props.item.category"
                :items="categories"
                item-text="categoryName"
                item-value="_id"
            ></v-select>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.price="props">
          <v-edit-dialog
            :return-value.sync="props.item.price"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @close="close"
          >
            <div>{{ props.item.price.toFixed(2) }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h5">
                Zmień cenę
              </div>
              <v-text-field
                v-model="props.item.price"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.weight="props">
          <v-edit-dialog
            :return-value.sync="props.item.weight"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @close="close"
          >
            <div>{{ props.item.weight.toFixed(2) }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h5">
                Zmień wagę
              </div>
              <v-text-field
                v-model="props.item.weight"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';


export default {
    methods: {
        ...mapActions(["getProducts", "getCategories", "updateProduct"]),

        async save (value) {
      
            const r = await this.updateProduct(value);

            if (r.status === 200) {
                
                this.$notify({
                    group: 'Successes',
                    title: 'Success',
                    text: 'Product successfully updated', 
                    type: 'success'
                });
                
            }
            if (r.status === 400) {
                this.$notify({
                    group: 'Errors',
                    title: 'Error',
                    text: 'Unable to update\n' + r.errors, 
                    type: 'error'
                });
                
                }
            this.getProducts();
        },
        cancel () {
      
        },
        close () {

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
           { text: 'Waga (kg)', value: 'weight' }
               ],
            search: ''
          }
         }
       
}
</script>