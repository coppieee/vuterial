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
import {MDCTabBar} from '@material/tab-bar'
import MDCTabBarFoundation from '@material/tab-bar/foundation'
import MDCTabBarAdapter from '@material/tab-bar/adapter'
import {MDCTab} from '@material/tab/index'
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:true,type:Boolean})js!:boolean
  tabbar?:MDCTabBar
  private activateListener = (e:Event):void=>this.activate(e)
  private activate(e:Event){
    const ce = e as CustomEvent
    // console.log('activate',e)
    const index:number = ce.detail.index
    this.$emit('activate',{index})
  }
  mounted() {
    if(this.js){
    
      this.tabbar = new MDCTabBar(this.$el)
      this.tabbar.initialize((el:Element)=>{
        for(const ch of this.$children.filter(ch=>ch.$el === el)){
          // const tab:MDCTab|undefined = (ch as any).mdcTab
          // if(tab !== undefined){
          //   console.log('found',tab)
          //   return tab
          // }else{
          //   (ch as any).mdcTab = new MDCTab(el)
          //   return (ch as any).mdcTab
          // }
          // const tab = new MDCTab(el)
          const tab = (ch as any).createMdcTab(el)
          return tab
        }
        // console.log('mdcTab not found')
        return new MDCTab(el)
      })
      console.log((this.tabbar as any).tabList_)
      this.tabbar.listen('MDCTabBar:activated',this.activateListener)
      // this.tabbar.useAutomaticActivation = false
      // this.tabbar.focusOnActivate = false
    }
  }
  beforeDestroy() {
    if(this.tabbar !== undefined){
      this.tabbar.destroy()
    }
  }
}
</script>