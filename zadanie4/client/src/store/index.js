import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import router from '../router';
import * as ideasService from '../services/ideas'
import * as productsService from '../services/products'
import * as categoriesService from '../services/categories'

const getDefaultState = () => {
    return {
        form: {
            idea: ''
        },
        productForm : {
            productName: '',
            category: '',
            price: Number,
            weight: Number
        },
        ideas: [],
        products: [],
        categories: [],
        
    }
  }
export default new Vuex.Store({
    state: {
        form: {
            idea: ''
        },
        productForm : {
            productName: '',
            description: '',
            category: '',
            price: Number,
            weight: Number
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
        },
        setProduct(state, updatedProduct) {
            Object.assign(
            state.products.find(product => product._id === updatedProduct._id),
            updatedProduct);
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
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
        },
        async updateProduct(context, product) {
            const r = await productsService.updateProduct(product);

            if (r.status === 200)
            {
                context.commit('setProduct', product);
            }

            return r;
        },
        async resetState(context) {
            context.commit('resetState');
        }

    },
    modules: {},
    
  
});