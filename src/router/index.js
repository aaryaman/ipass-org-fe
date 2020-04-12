import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Organization from '../views/Organization.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: Dashboard.name,
        component: Dashboard,
        meta: {
            auth: true
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Organization
            }
        ]
    },
    {
        path: '/login',
        name: Login.name,
        component: Login
    }
];

const router = new VueRouter({
    routes,
    base: process.env.APPLICATION_PATH,
    mode: process.env.HISTORY_MODE ? 'history' : 'hash'
});

export default router;
