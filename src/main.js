import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueKonva from "vue-konva";

Vue.config.productionTip = false

Vue.use(VueKonva);

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
