import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/vue-toasted'
import './plugins/v-mask'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import Default from "./layouts/Default.vue"


// layouts
Vue.component('default-layout', Default)


import Vuelidate from 'vuelidate';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
Vue.use(VueToast);

Vue.config.productionTip = false
Vue.use(Vuelidate);

//components
Vue.component('logo', require('./components/Logo').default)
Vue.component('widget-tile', require('./components/WidgetTile').default)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
