import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/HomePage';
import Pregunta1 from '../components/pages/pregunta1';
import Instrucciones from '../components/pages/Instrucciones';



Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
    {
        name: 'Instrucciones',
        path: '/instrucciones',
        component: Instrucciones
    },
    {
        name: 'Pregunta1',
        path: '/pregunta1',
        component: Pregunta1
    }
];

const router = new VueRouter({
    mode: 'history',
    base: 'localhost:8080',
    routes
});

export default router;
