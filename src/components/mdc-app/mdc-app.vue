<template>
  <div class="vt-app" v-if="currentDrawerType === 'modal'">
    <div class="vt-scrollable">
      <slot name="top-app-bar"/>
      <div class="mdc-top-app-bar--fixed-adjust" key="mdc-top-app-bar--fixed-adjust"></div>
      <slot name="contents"/>
    </div>
    <div class="vt-modal-drawer-container">
      <slot name="drawer"/>
    </div>
  </div>
  <div class="vt-app" v-else>
    <slot name="top-app-bar"/>
    <div class="mdc-top-app-bar--fixed-adjust" key="mdc-top-app-bar--fixed-adjust"></div>
    <div class="vt-main-container">
      <slot name="drawer"/>
      <div class="vt-scrollable">
        <slot name="contents"/>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.vt-modal-drawer-container{
  position: absolute;
  top:0;
}
.vt-app{
  display: flex;
  flex-flow: column;
  height: 100vh;
  width:100%;
  & .vt-main-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height:100vh;
  }
}
.vt-scrollable{
  height: 100%;
  width:100%;
  overflow:auto;
}
</style>
<script lang="ts">
import {DrawerType} from '../mdc-drawer/'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {  DrawerBreakPoints } from '@/components/mdc-drawer/drawer-break-points'
@Component({})
export default class MdcApp extends Vue{
  @Prop({default:'modal'}) drawerType!:DrawerType | 'auto'
  get currentDrawerType():DrawerType{
    if(this.drawerType === 'auto'){
      return this.breakPoints.drawerType
    }
    return this.drawerType
  }

  breakPoints:DrawerBreakPoints  = new DrawerBreakPoints()

  constructor(){
    super()
  }
  mounted(){
    this.breakPoints 
    this.breakPoints.init()
  }
  beforeDestroy(){
    this.breakPoints.destroy()
  }
}
</script>