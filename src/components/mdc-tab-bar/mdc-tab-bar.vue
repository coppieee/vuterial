<template>
  <div class="mdc-tab-bar" :class="cssClass_" role="tablist">
    <div class="mdc-tab-scroller">
      <div class="mdc-tab-scroller__scroll-area">
        <div class="mdc-tab-scroller__scroll-content">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>

<script lang="ts">
import { Component, Vue,Prop,Watch } from 'vue-property-decorator'
import {MDCTabBar, MDCTabBarFoundation, MDCTabBarAdapter} from '@material/tab-bar'
import {MDCTab, MDCTabFoundation} from '@material/tab/index'
import {VuterialTabBarFoundation} from './vuterial-tab-bar-foundation'
import MdcTab from './mdc-tab.vue'
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:true,type:Boolean})js!:boolean

  @Prop({default:-1,type:Number}) activeTabIndex!:number

  @Prop({default:0,type:Number}) scrollMoveRate!:number

  tabbar_?:MDCTabBar
  tabbarFoundation_?:VuterialTabBarFoundation
  get cssClass_(){
    return {
      'mdc-tab--stacked':this.stacked,
      'vt-tab-bar--raised':false,
    }
  }
  @Watch('scrollMoveRate') onScrollMoveRate_(to:number,from:number){
    // console.log('on scrollMoveRate',to)
    (this.$children[this.activeTabIndex] as MdcTab)
      .tabIndicator
      .onScrollMoveRate_(to)
  }
  @Watch('activeTabIndex') onActiveTabIndex_(to:number,from:number){
    if(to === from){return}
    if(to <= -1){return}
    // if(to === this.tabbar_.)
    if(this.tabbar_ === undefined || this.tabbarFoundation_ === undefined){return}
    const prevIndex = this.tabbarFoundation_.getPreviousActiveTabIndex()
    if(prevIndex === to){return}
    this.tabbar_.activateTab(to)
  }
  private activateListener_ = (e:Event):void=>this.activate_(e)
  private activate_(e:Event){
    const ce = e as CustomEvent
    const index:number = ce.detail.index
    this.$emit('update:activeTabIndex',index)
    this.$emit('activate',{index})
  }
  mounted() {
    if(this.js){
      const adapterMapper:MDCTabBarAdapter = {} as MDCTabBarAdapter
      for(const key of Object.keys(MDCTabBarFoundation.defaultAdapter)){
        (adapterMapper as any)[key] = (...args:any[])=>(defaultAdapter as any)[key](...args)
      }
      const foundation = new VuterialTabBarFoundation({
        ...adapterMapper,
      })
      this.tabbarFoundation_ = foundation
      this.tabbar_ = new MDCTabBar(this.$el,foundation)
      const defaultAdapter:MDCTabBarAdapter = (this.tabbar_.getDefaultFoundation() as any).adapter_
      if(defaultAdapter === undefined){ throw new Error('tabbar.getDefaultFoundation().adapter_ is undeinfed')}
      this.tabbar_.initialize((el:Element)=>{
        for(const ch of this.$children.filter(ch=>ch.$el === el)){
          const tab = (ch as MdcTab).createMdcTab(el)
          return tab
        }
        return new MDCTab(el)
      })
      this.tabbar_.listen('MDCTabBar:activated',this.activateListener_)
    }
  }
  beforeDestroy() {
    if(this.tabbar_ !== undefined){
      this.tabbar_.destroy()
    }
  }
}
</script>