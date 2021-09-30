import Vue from 'vue';
import VueRouter from 'vue-router';
import Pregunta1 from '../components/pages/pregunta1';
import Pregunta2 from '../components/pages/pregunta2';
import Pregunta3 from '../components/pages/pregunta3';
import HomePage from '../components/pages/home';
// import Instrucciones from '../components/pages/instrucciones';




Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },

    {
        name: 'Pregunta1',
        path: '/escenario1/pregunta1/:id',
        component: Pregunta1
    },
    {
        name: 'Pregunta2',
        path: '/escenario1/pregunta2/:id',
        component: Pregunta2
    },
    {
        name: 'Pregunta3',
        path: '/escenario1/pregunta3/:id',
        component: Pregunta3
    }
];

const router = new VueRouter({
    mode: 'history',
    base: 'localhost:8080',
    routes
});

export default router;
