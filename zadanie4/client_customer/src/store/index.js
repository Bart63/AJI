import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//import router from '../router';
import * as productsService from '../services/products'
import * as categoriesService from '../services/categories'

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
            products: [ {
                product: {},
                quantity: '',
                totalPrice: ''
            } ]
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
            products: [ {
                product: {},
                quantity: '',
                totalPrice: ''
            } ]
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
                totalPrice: product.price * 1
            }
            
            if (state.order.products[0].quantity === '')
            {
                
                Object.assign(
                    state.order.products[0],
                    newProduct);
            }
            else 
            {
                state.order.products.push(newProduct);
            }
            
            
        },
        removeProductFromOrder(state, productID) {
            const i = state.order.products.map(item => item.product._id).indexOf(productID);
            state.order.products.splice(i, 1);
        },
        setOrderUserData(state, username, email, phoneNumber) {
            userData = {
                username: username,
                email: email,
                phoneNumber: phoneNumber,
            };

            Object.assign(
                state.order.userData,
                userData);
        },
        setProductInOrder(state, productId, quantity) {

            const product = state.order.products.find(product => product._id === productId);

            newProduct = {
                product: product,
                quantity: quantity,
                totalPrice: product.price * quantity
            };

            Object.assign(
                state.order.products.find(product => product._id === productID),
                newProduct);
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