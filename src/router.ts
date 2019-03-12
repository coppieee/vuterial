import Vue, { VueConstructor } from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Button from './views/button.vue'
import Card from './views/card.vue'
import Chip from './views/chip.vue'
import Home from './views/home.vue'
import GettingStarted from './views/getting-started.vue'
import ImageList from './views/image-list.vue'
import List from './views/list.vue'
import Tab from './views/tab.vue'
import Typography from './views/typography.vue'
import Ripple from './views/ripple.vue'
import HorizontalList from './views/horizontal-list.vue'
import { Component } from '@vue/test-utils'
Vue.use(Router)
interface Config{
  components:ComponentConfig[]
  sort:boolean
}
type ComponentConfig = [string,any,ConfigOption?]
interface ConfigOption{
  icon?:string
  path?:string
  link?:string
}
const x = [{Home}]
const configs:Config[] = [
  {
    components:[
      ['home',Home,{path:'/'}],
      ['getting-started',GettingStarted,{}],
    ],
    sort:false,
  },
  {
    components:[
      ['button',Button,{icon:'touch_app'}],
      ['card',Card,{icon:'crop_din'}],
      ['chip',Chip,{icon:'bookmark'}],
      ['image-list',ImageList,{icon:'collections'}],
      ['list',List,{icon:'list'}],
      ['tab',Tab,{icon:'tab',path:'/tab/:id?',link:'/tab'}],
      ['typography',Typography,{icon:'text_format'}],
      ['ripple',Ripple,{icon:'touch_app'}],
      ['Horizontal-list',HorizontalList,{icon:'list'}],
    ],
    sort:true,
  },
]
export const routeConfigs:(RouteConfig & ConfigOption)[] =  configs.flatMap(config=>{
  let entries = config.components.map(([name,component,option])=>{
    return {
      name:name.toLowerCase(),
      component,
      option,
    }
  })
  // let entries = Object.entries(config.components)
  if(config.sort){
    entries = entries.sort((a,b)=>{
      return a.name > b.name ? 1 : -1
    })
  }
  return entries.map(x=>{
    const name = x.name
    const component = x.component
    const option = x.option || {}
    // const name = key.toLowerCase()
    const path = option.path || `/${name}`
    const config:RouteConfig = {
      path,
      name,
      component,
      link: path,
      ...option,
    }
    return config
  })
})
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routeConfigs,
})