import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueKonva from "vue-konva";
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.config.productionTip = false
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(VueKonva);

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
