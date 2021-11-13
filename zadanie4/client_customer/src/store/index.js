import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//import router from '../router';
import * as productsService from '../services/products'
import * as categoriesService from '../services/categories'

var money = require("money-math");

const getDefaultState = () => {
    return {

        products: [],
        categories: [],
        order: {
            userData: {
                username: '',
                email: '',
                phoneNumber: '',
            },
            products: [],
            totalOrderPrice: ''
        }
    }
  }
export default new Vuex.Store({
    state: {

        products: [],
        categories: [],
        order: {
            userData: {
                username: '',
                email: '',
                phoneNumber: '',
            },
            products: [],
            totalOrderPrice: '0'
        }

    },
    mutations: {
    
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
        addProductToOrder(state, product) {

            const newProduct = {
                product: product,
                quantity: 1,
                totalPrice: product.price
            }
            
            state.order.products.push(newProduct);
            
            const sum = money.add(state.order.totalOrderPrice, newProduct.totalPrice);
            state.order.totalOrderPrice = sum;
        },
        removeProductFromOrder(state, productID) {
            const i = state.order.products.map(item => item.product._id).indexOf(productID);
            state.order.products.splice(i, 1);

            let sum = 0;

            state.order.products.forEach(item => sum = money.add(sum.toString(), item.totalPrice));

            state.order.totalOrderPrice = sum.toString();
        },
        setOrderUserData(state, username, email, phoneNumber) {
            const userData = {
                username: username,
                email: email,
                phoneNumber: phoneNumber,
            };

            Object.assign(
                state.order.userData,
                userData);
        },
        setProductQuantityInOrder(state, data) {

            const product = state.order.products.find(item => item.product._id === data.productId);

            let totalCost = money.mul(data.newQuantity.toString()+".00", product.product.price.toString());

            const newProduct = {
                product: product.product,
                quantity: data.newQuantity,
                totalPrice: totalCost
            };

            Object.assign(
                state.order.products.find(item => item.product._id === data.productId),
                newProduct);

            let sum = 0;

            state.order.products.forEach(item => sum = money.add(sum.toString(), item.totalPrice));

            state.order.totalOrderPrice = sum;
        },
        setOrderForm(state, {key, value}) {
            state.order.userData[key] = value;
        },
        
        
    },
    actions: {
        
        async getCategories(context) {
            const categories = await categoriesService.getCategories();
                
            context.commit('setCategories', categories);
        },
        async getProducts(context) {
            const products = await productsService.getProducts();

                
            context.commit('setProducts', products);
        },
        async resetState(context) {
            context.commit('resetState');
        },
        
        


    },
    modules: {},
    
  
});