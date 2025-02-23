import { createRouter, createWebHistory } from 'vue-router'
export const constantRouterMap = [
    {
        path: "/",
        component: () => import("@/views/layout/index.vue"),
        redirect: "/home",
        name: 'home',
        children: [
            {
                path: "home",
                component: () => import("@/views/home/index.vue"),
            },
        ],
    },
    {
        path: "/segment",
        component: () => import("@/views/layout/index.vue"),
        redirect: "/segment/customer",
        name: "segment",
        children: [
            {
                path: "customer",
                name: "customer",
                component: () => import("@/views/customer/index.vue")
            },
            {
                path: "customer/update/:id",
                name: "addCustomer",
                component: () => import("@/views/customer/update.vue"),
            },
            {
                path: "location",
                name: "location",
                component: () => import("@/views/location/index.vue"),
            },
            {
                path: "location/update/:id",
                name: "addLocation",
                component: () => import("@/views/location/update.vue"),
            },
            {
                path: "item",
                name: "item",
                component: () => import("@/views/item/index.vue"),
            },
            {
                path: "item/update/:id",
                name: "addItem",
                component: () => import("@/views/item/update.vue"),
            },
            {
                path: "item/detail/:id",
                name: "itemDetail",
                component: () => import("@/views/item/detail.vue"),
            },
        ],
    },
    {
        path: "/promotion",
        component: () => import("@/views/layout/index.vue"),
        redirect: "/promotion/list",
        name: "promotion",
        children: [
            {
                path: "list",
                component: () => import("@/views/promotion/index.vue"),
            },
            {
                path: "update/:id",
                name: "addPromotion",
                component: () => import("@/views/promotion/update.vue"),
            },
            {
                path: "detail/:id",
                name: "promotionDetail",
                component: () => import("@/views/promotion/detail.vue"),
            },
        ],
    },
    {
        path: "/login",
        name: 'login',
        component: () => import("@/views/login/index.vue"),
        hidden: true,
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap
})

export default router
