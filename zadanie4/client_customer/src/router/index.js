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
        path: "/show-products",
        name: "show-products",
        component: () => import('../views/ShowProducts.vue')
    },
    {
        path: "/show-products/order",
        name: "show-order",
        component: () => import('../views/Order.vue')
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;