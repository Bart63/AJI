import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/create-product",
        name: "create-product",
        component: () => import('../views/AddNewProduct.vue')
    },
    {
        path: "/show-products",
        name: "show-products",
        component: () => import('../views/ShowProducts.vue')
    },
    {
        path: "/show-unrealized-orders",
        name: "show-unrealized-orders",
        component: () => import('../views/ShowUnrealizedOrders.vue')
    },
    {
        path: "/show-orders",
        name: "show-orders",
        component: () => import('../views/ShowOrders.vue')
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;