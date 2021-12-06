import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import router from '../router';
import * as productsService from '../services/products'
import * as categoriesService from '../services/categories'
import * as ordersService from '../services/orders'
import * as statesService from '../services/states'

const getDefaultState = () => {
    return {
        productForm: {
            productName: '',
            category: '',
            price: '',
            weight: ''
        },
        products: [],
        categories: [],
        states: [],
        orders: [],
    }
}

export default new Vuex.Store({
    state: {
        productForm: {
            productName: '',
            description: '',
            category: '',
            price: '',
            weight: ''
        },
        products: [{}],
        categories: [],
        states: [],
        orders: []
    },
    mutations: {
        setProductForm(state, { key, value }) {
            state.productForm[key] = value;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProduct(state, updatedProduct) {
            Object.assign(
                state.products.find(product => product._id === updatedProduct._id),
                updatedProduct);
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        },
        setOrders(state, orders) {
            Object.assign(state.orders, orders)
        },
        setStates(state, states) {
            Object.assign(state.states, states)
        },
    },
    actions: {
        async createProduct(context) {
            const r = await productsService.createProduct(context.state.productForm);

            return r;
        },
        async getCategories(context) {
            const categories = await categoriesService.getCategories();

            context.commit('setCategories', categories);
        },
        async getProducts(context) {
            const products = await productsService.getProducts();

            context.commit('setProducts', products);
        },
        async updateProduct(context, product) {
            const r = await productsService.updateProduct(product);

            if (r.status === 200) {
                context.commit('setProduct', product);
            }
            return r;
        },
        async resetState(context) {
            context.commit('resetState');
        },
        async getOrdersWithStatus(context, statusName) {
            const statusId = await context.state.states.find(item => (item.stateName === statusName))._id;
            const r = await ordersService.getOrdersWithStatus(statusId);

            context.commit("setOrders", r);
        },
        async getStates(context) {
            const r = await statesService.getOrdersStates();
            context.commit("setStates", r);
        }
    },
    modules: {},
});