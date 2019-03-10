<template>
  <div class="mdc-tab-bar" :class="{'mdc-tab--stacked':stacked}" role="tablist">
    <div class="mdc-tab-scroller">
      <div class="mdc-tab-scroller__scroll-area">
        <div class="mdc-tab-scroller__scroll-content">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCTabBar, MDCTabBarFoundation, MDCTabBarAdapter} from '@material/tab-bar'
import {MDCTab, MDCTabFoundation} from '@material/tab/index'
import {VuterialTabBarFoundation} from './vuterial-tab-bar-foundation'
import MdcTab from './mdc-tab.vue'
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:true,type:Boolean})js!:boolean
  tabbar?:MDCTabBar
  private activateListener_ = (e:Event):void=>this.activate_(e)
  private activate_(e:Event){
    const ce = e as CustomEvent
    const index:number = ce.detail.index
    this.$emit('activate',{index})
  }
  mounted() {
    if(this.js){
      const adapterMapper:MDCTabBarAdapter = {} as MDCTabBarAdapter
      for(const key of Object.keys(MDCTabBarFoundation.defaultAdapter)){
        (adapterMapper as any)[key] = (...args:any[])=>(defaultAdapter as any)[key](...args)
      }
      const foundation =new VuterialTabBarFoundation({
        ...adapterMapper,
      })
      this.tabbar = new MDCTabBar(this.$el,foundation)
      const defaultAdapter:MDCTabBarAdapter = (this.tabbar.getDefaultFoundation() as any).adapter_
      if(defaultAdapter === undefined){ throw new Error('tabbar.getDefaultFoundation().adapter_ is undeinfed')}
      this.tabbar.initialize((el:Element)=>{
        for(const ch of this.$children.filter(ch=>ch.$el === el)){
          const tab = (ch as MdcTab).createMdcTab(el)
          return tab
        }
        return new MDCTab(el)
      })
      this.tabbar.listen('MDCTabBar:activated',this.activateListener_)
    }
  }
  beforeDestroy() {
    if(this.tabbar !== undefined){
      this.tabbar.destroy()
    }
  }
}
</script>