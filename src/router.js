import Vue from 'vue';
import VueRouter from 'vue-router';
import Pregunta1 from './components/pages/Pregunta1.vue';
import Pregunta2 from './components/pages/pregunta2.vue';
import Pregunta3 from './components/pages/pregunta3.vue';
import HomePage from './components/pages/home.vue';
import Prueba from './components/pages/prueba.vue';

// import Instrucciones from '../components/pages/instrucciones';




Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes : [
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
        },
        {
            name: 'Prueba',
            path: '/prueba',
            component: Prueba
        }
    ]

});

export default router;