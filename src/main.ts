import Vue from 'vue'
import App from './app.vue'
import router from './router'
import {Vuterial} from '@/components'
Vue.config.productionTip = false
Vue.use(Vuterial)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');;
