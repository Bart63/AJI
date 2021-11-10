<template>
    <div class="add_product">
        <h1>Products list</h1>
        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
    methods: {
        ...mapState(["products", "categories"]),
        ...mapActions(["getProducts", "getCategories"]),
    },
    computed: {
        
    },
    created() {

        this.getCategories();
        this.getProducts();
    },
}
</script>