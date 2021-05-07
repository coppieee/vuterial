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
import {MDCTab} from '@material/tab/index'
import {VuterialTabBarFoundation} from './vuterial-tab-bar-foundation'
import MdcTab from './mdc-tab.vue'
import {ScrollState} from '@/components/vt-horizontal-list/'
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:true,type:Boolean}) js!:boolean

  // @Prop({default:-1,type:Number}) activeTabIndex!:number
  // @Prop({default:0,type:Number}) scrollMoveRate!:number

  @Prop({default:()=>({type:'',from:'',index:-1,moveRate:0}) }) scrollState!:ScrollState

  tabbar_?:MDCTabBar
  tabbarFoundation_?:VuterialTabBarFoundation
  get cssClass_(){
    return {
      'mdc-tab--stacked':this.stacked,
      'vt-tab-bar--raised':false,
    }
  }
  activeTabIndex_:number = -1
  // @Watch('scrollMoveRate') onScrollMoveRate_(to:number,from:number){
  //   if(this.activeTabIndex <= -1){return}
  //   (this.$children[this.activeTabIndex] as MdcTab)
  //     .tabIndicator
  //     .onScrollMoveRate_(to)
  // }
  // @Watch('activeTabIndex') onActiveTabIndex_(to:number,from:number){
  //   if(to === from){return}
  //   if(to <= -1){return}
  //   if(this.tabbar_ === undefined || this.tabbarFoundation_ === undefined){return}
  //   const prevIndex = this.tabbarFoundation_.getPreviousActiveTabIndex()
  //   if(prevIndex === to){return}
  //   this.tabbar_.activateTab(to)
  // }
  @Watch('scrollState') onScrollState_(state:ScrollState){
    if(state.type === 'update-index'){
      this.activeTabIndex_ = state.index
      if(this.tabbar_ === undefined || this.tabbarFoundation_ === undefined){return}
      if(state.index === this.tabbarFoundation_.getPreviousActiveTabIndex()){ return}
      this.tabbar_.activateTab(state.index)
    }else if(state.type === 'update-move-rate'){
      if(this.activeTabIndex_ <= -1){return}
      (this.$children[this.activeTabIndex_] as MdcTab)
        .tabIndicator
        .onScrollMoveRate_(state.moveRate)
    }
  }
  private activateListener_ = (e:Event):void=>this.activate_(e)
  private activate_(e:Event){
    const ce = e as CustomEvent
    const index:number = ce.detail.index
    // this.$emit('update:activeTabIndex',index)
    this.$emit('activate',{index})
    this.$emit('update:scrollState',{
      index,
      type:'update-index',
      from:'tab-bar',
      moveRate:0,
    } as ScrollState)
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
      const prevIndex = foundation.getPreviousActiveTabIndex()
      if(prevIndex >= 0){
        // this.$emit('update:activeTabIndex',prevIndex)
        this.$emit('update:scrollState',{
          from:'tab-bar',
          type:'init-index',
          index:prevIndex,
          moveRate:0,
        }as ScrollState)
      }
      // console.log('prevIndex',prevIndex)
    }
    
  }
  beforeDestroy() {
    if(this.tabbar_ !== undefined){
      this.tabbar_.destroy()
    }
  }
}
</script>