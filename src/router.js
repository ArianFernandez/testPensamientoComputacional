import Vue from 'vue';
import VueRouter from 'vue-router';
import Pregunta1 from './components/pages/Pregunta1.vue';
import Pregunta2 from './components/pages/pregunta2.vue';
import Pregunta3 from './components/pages/pregunta3.vue';
import HomePage from './components/pages/home.vue';
import Pregunta2a from './components/pages/preg2a.vue';
import Pregunta2b from './components/pages/preg2b.vue';
import Pregunta2c from './components/pages/preg2c.vue';
import Pregunta3a from './components/pages/preg3a.vue';
import Pregunta3b from './components/pages/preg3b.vue';
import Pregunta3c from './components/pages/preg3c.vue';





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
            name: 'Pregunta2a',
            path: '/escenario1/pregunta2a/:id',
            component: Pregunta2a
        },
        {
            name: 'Pregunta2b',
            path: '/escenario1/pregunta2b/:id',
            component: Pregunta2b
        },
        {
            name: 'Pregunta2c',
            path: '/escenario1/pregunta2c/:id',
            component: Pregunta2c
        },
        {
            name: 'Pregunta3a',
            path: '/escenario1/pregunta3a/:id',
            component: Pregunta3a
        },
        {
            name: 'Pregunta3b',
            path: '/escenario1/pregunta3b/:id',
            component: Pregunta3b
        },
        {
            name: 'Pregunta3c',
            path: '/escenario1/pregunta3c/:id',
            component: Pregunta3c
        }
    ]

});

export default router;
