<template>
  <div class="mdc-tab-bar" :class="{'mdc-tab--stacked':stacked}" role="tablist" ref="tabbar">
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
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:false})
  stacked!:boolean
  tabbar!:MDCTabBar
  _activateListener = (e:Event):void=>this._activate(e)
  _activate(e:Event){
    const ce = e as CustomEvent
    console.log('activate',e)
    const index:number = ce.detail.index
    this.$emit('activate',{index})
  }
  mounted() {
    this._activateListener = (e:Event):void=>this._activate(e)
    const el =(this.$refs.tabbar as HTMLElement)
    // tabbar.addEventListener('MDCTabBar:activated',this._activateListener)
    this.tabbar = new MDCTabBar(el)
    this.tabbar.listen('MDCTabBar:activated',this._activateListener)
    // this.tabbar.activateTab(1);
  }
  beforeDestroy() {
    // const el =(this.$refs.tabbar as HTMLElement)
    this.tabbar.destroy()
  }
}
</script>