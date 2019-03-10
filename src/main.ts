import Vue from 'vue'
import App from './app.vue'
import router from './router'
import {Vuterial} from '@/components'
import { DocComponents } from './doc/components'
import 'material-components-web/dist/material-components-web.css'
Vue.config.productionTip = false
Vue.use(Vuterial)
Vue.use(DocComponents)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
