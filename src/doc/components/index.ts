import { PluginObject} from 'vue'
import { Vue as _Vue } from 'vue-property-decorator'
import docContents from './doc-contents.vue'
import docH1 from './doc-h1.vue'
import docH2 from './doc-h2.vue'
import docH3 from './doc-h3.vue'
import docCode from './doc-code.vue'
const docComponents = {
  docContents,
  docH1,
  docH2,
  docH3,
  docCode,
}
export const DocComponents:PluginObject<any> = {
  install(Vue: typeof _Vue, options?: any):void{
    for(const [name,c] of Object.entries(docComponents)){
      Vue.component(name,c)
    }
  },
} 