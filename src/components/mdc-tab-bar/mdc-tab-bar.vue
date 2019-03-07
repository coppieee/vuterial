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
// import {MDCTabBar} from '@material/tab-bar'
// import MDCTabBarFoundation from '@material/tab-bar/foundation'
// import MDCTabBarAdapter from '@material/tab-bar/adapter'
// import {MDCTab} from '@material/tab/index'
import{tab,tabBar} from 'material-components-web'
type MDCTab = tab.MDCTab
type MDCTabBar = tabBar.MDCTabBar
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:true,type:Boolean})js!:boolean
  tabbar?:MDCTabBar
  private activateListener = (e:Event):void=>this.activate(e)
  private activate(e:Event){
    const ce = e as CustomEvent
    const index:number = ce.detail.index
    this.$emit('activate',{index})
  }
  mounted() {
    if(this.js){
    
      this.tabbar = new tabBar.MDCTabBar(this.$el)
      this.tabbar.initialize((el:Element)=>{
        for(const ch of this.$children.filter(ch=>ch.$el === el)){
          const tab = (ch as any).createMdcTab(el)
          return tab
        }
        return new tab.MDCTab(el)
      })
      this.tabbar.listen('MDCTabBar:activated',this.activateListener)
    }
  }
  beforeDestroy() {
    if(this.tabbar !== undefined){
      this.tabbar.destroy()
    }
  }
}
</script>