import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Button from './views/button.vue'
import Card from './views/card.vue'
import Chip from './views/chip.vue'
import Home from './views/home.vue'
import ImageList from './views/image-list.vue'
import List from './views/list.vue'
import Tab from './views/tab.vue'
import Typography from './views/typography.vue'
import Ripple from './views/ripple.vue'
Vue.use(Router)
export const routeConfigs:RouteConfig[] = [
  {Home},
  {
    Button,Card,Chip,ImageList,List,Tab,Typography,Ripple,
  },
].flatMap(obj=>
  Object.entries(obj).sort(([akey],[bkey])=>{
    return akey > bkey ? 1 : -1
  }).map(([key,component])=>{
    const name = key.toLowerCase()
    return {
      path:name ==='home'?'/':`/${name}`,
      name,
      component,
    }
  })
)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routeConfigs,
})