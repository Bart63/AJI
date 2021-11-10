import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import router from '../router';
import * as ideasService from '../services/ideas'
import * as productsService from '../services/products'
import * as categoriesService from '../services/categories'

export default new Vuex.Store({
    state: {
        form: {
            idea: ''
        },
        productForm : {
            productName: '',
            category: '',
            price: '',
            weight: ''
        },
        ideas: [],
        products: [],
        categories: [],
        
    },
    mutations: {
        setForm(state, {key, value}) {
            state.form[key] = value;
        },
        setProductForm(state, {key, value}) {
            state.productForm[key] = value;
        },
        setIdeas(state, ideas) {
            state.ideas = ideas;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setIdea(state, updatedIdea) {
            Object.assign(
            state.ideas.find(idea => idea._id === updatedIdea._id),
            updatedIdea);
        }
    },
    actions: {
        async createIdea(context) {

            await ideasService.createIdea(context.state.form);

            router.push('/');
        },
        async createProduct(context) {

            const r = await productsService.createProduct(context.state.productForm);
            
            return r;
        },
        async getIdeas(context) {
            const ideas = await ideasService.getIdeas();
                
            context.commit('setIdeas', ideas);
        },
        async getCategories(context) {
            const categories = await categoriesService.getCategories();
                
            context.commit('setCategories', categories);
        },
        async getProducts(context) {
            const products = await productsService.getProducts();
                
            context.commit('setProducts', products);
        },
        async upVoteIdea(context, idea) {
            
            const updatedIdea = await ideasService.upVoteIdea(idea._id);
                context.commit('setIdea', updatedIdea);
        },
        async downVoteIdea(context, idea) {
            const updatedIdea = await ideasService.downVoteIdea(idea._id);
            
            
            context.commit('setIdea', updatedIdea);
        }
    },
    modules: {}
});