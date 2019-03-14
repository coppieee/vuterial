import { PluginObject} from 'vue'
import { Component, Prop, Vue as _Vue } from 'vue-property-decorator'
import {mdcTopAppBarComponents} from '@/components/mdc-top-app-bar'
import { mdcListComponents } from './mdc-list'
import { mdcDrawerComponents } from './mdc-drawer'
import { MdcAppComponents as mdcAppComponents } from './mdc-app'
import { mdcIconComponents } from './mdc-icon'
import { mdcTabComponents } from './mdc-tab-bar'
import { mdcTypographyComponents } from './mdc-typography'
import { mdcChipComponents } from './mdc-chip'
import { mdcCardComponents } from './mdc-card'
import { mdcButtonComponents } from './mdc-button'
import { mdcImageListComponents } from './mdc-image-list'
import { mdcRippleComponents } from './mdc-ripple'
import {vtHorizontalListComponents}from './vt-horizontal-list'
import { vtAppComponents } from './vt-app'
export { VtAppState } from './vt-app/vt-app-state'
export const Vuterial:PluginObject<any> = {
  install(Vue: typeof _Vue, options?: any):void{
    const list = [
      mdcTopAppBarComponents,
      mdcDrawerComponents,
      mdcListComponents,
      mdcAppComponents,
      mdcIconComponents,
      mdcTabComponents,
      mdcTypographyComponents,
      mdcChipComponents,
      mdcCardComponents,
      mdcButtonComponents,
      mdcImageListComponents,
      mdcRippleComponents,
      vtHorizontalListComponents,
      vtAppComponents,
    ]

    for(const cs of list){
      for(const [name,c] of Object.entries(cs)){
        Vue.component(name,c)
      }
    }
  },
} 