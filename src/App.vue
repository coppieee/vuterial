<template>
  <mdc-app :drawerType="drawerType">
    <template #top-app-bar>
      <mdc-top-app-bar :fixed="true">
        <mdc-top-app-bar-section align-start>
          <mdc-top-app-bar-action-item @click.native="drawerOpen = !drawerOpen">menu</mdc-top-app-bar-action-item>
          <mdc-top-app-bar-title>Vuterial</mdc-top-app-bar-title>
        </mdc-top-app-bar-section>
        <mdc-top-app-bar-section align-end role="toolbar">
        </mdc-top-app-bar-section>
      </mdc-top-app-bar>
    </template>
    <template #drawer>
      <mdc-drawer :drawerType="drawerType" :open.sync="drawerOpen" ref="drawer">
        <mdc-list tag="nav">
          <mdc-list-item v-for="route in routes" :key="route.name"
            :to="route.link"
            auto-activated-by-path
            :icon="route.icon"
            @click.native="clickDrawerItem()">
            {{route.name}}
          </mdc-list-item>
          <mdc-list-item>hello</mdc-list-item>
          <mdc-list-item>hello</mdc-list-item>
          <mdc-list-item>hello</mdc-list-item>
          <mdc-list-item>hello</mdc-list-item>
          <mdc-list-item>hello</mdc-list-item>
        </mdc-list>
      </mdc-drawer>
    </template>
    <template #contents>
      <doc-contents>
        <router-view/>
      </doc-contents>
    </template>
  </mdc-app>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  width:100%;
  // overflow:hidden;
}
button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
// @import "@material/top-app-bar/mdc-top-app-bar";
// @import "@material/drawer/mdc-drawer";
// @import "@material/list/mdc-list";
// @import "@material/tab-bar/mdc-tab-bar";
// @import "@material/tab-scroller/mdc-tab-scroller";
// @import "@material/tab-indicator/mdc-tab-indicator";
// @import "@material/tab/mdc-tab";
// @import "@material/typography/mdc-typography";
// @import "@material/chips/mdc-chips";
// @import "@material/card/mdc-card";
// @import "@material/button/mdc-button";
// @import "@material/icon-button/mdc-icon-button";
// @import "@material/button/mdc-button";
// @import "@material/image-list/mdc-image-list";
// @import "@material/ripple/mdc-ripple";

</style>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import {routeConfigs} from '@/router'
import { DrawerType } from '@/components/mdc-drawer'
import MdcDrawer from '@/components/mdc-drawer/mdc-drawer.vue'
@Component({})
export default class App extends Vue {
  drawerOpen:boolean = false
  drawerType = 'auto'
  routes = routeConfigs
  mounted(){
  }
  beforeDestory(){

  }
  clickDrawerItem(){
    const drawer = this.$refs.drawer as MdcDrawer
    if(drawer.currentDrawerType === 'modal'){
      this.drawerOpen = false
    }
  }
}
</script>

