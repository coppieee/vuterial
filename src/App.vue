<template>
  <mdc-app :drawer-open="drawerOpen" drawerType="dismissible">
    <template #top-app-bar>
      <mdc-top-app-bar >
        <mdc-top-app-bar-section align-start>
          <mdc-top-app-bar-action-item @click.native="drawerOpen = !drawerOpen">menu</mdc-top-app-bar-action-item>
          <mdc-top-app-bar-title>Vuterial</mdc-top-app-bar-title>
        </mdc-top-app-bar-section>
        <mdc-top-app-bar-section align-end role="toolbar">
          <!-- <mdc-top-app-bar-action-item to="/">flie_download</mdc-top-app-bar-action-item>
          <mdc-top-app-bar-action-item to="/">print</mdc-top-app-bar-action-item>
          <mdc-top-app-bar-action-item to="/">bookmark</mdc-top-app-bar-action-item> -->
        </mdc-top-app-bar-section>
      </mdc-top-app-bar>
    </template>
    <template #drawer>
      <mdc-drawer :modal="false" :dismissible="true" :open.sync="drawerOpen">
        <mdc-list tag="nav">
          <mdc-list-item v-for="route in routes" :key="route.name"
            :to="route.path"
            auto-path-activated
            :icon="route.icon">
            {{route.name}}
          </mdc-list-item>
          <!-- <mdc-list-item to="/" auto-path-activated icon="inbox">home</mdc-list-item>
          <mdc-list-item to="/list" auto-path-activated icon="list"> list</mdc-list-item>
          <mdc-list-item to="/tab" auto-path-activated icon="tab"> tab</mdc-list-item>
          <mdc-list-item to="/typography" auto-path-activated icon="text_format"> Typography</mdc-list-item>
          <mdc-list-item to="/chip" auto-path-activated icon="bookmark">Chip</mdc-list-item>
          <mdc-list-item to="/card" auto-path-activated icon="crop_din">Card</mdc-list-item>
          <mdc-list-item to="/button" auto-path-activated icon="touch_app">button</mdc-list-item>
          <mdc-list-item to="/image-list" auto-path-activated icon="touch_app">image-list</mdc-list-item> -->
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
@import "@material/top-app-bar/mdc-top-app-bar";
@import "@material/drawer/mdc-drawer";
@import "@material/list/mdc-list";
@import "@material/tab-bar/mdc-tab-bar";
@import "@material/tab-scroller/mdc-tab-scroller";
@import "@material/tab-indicator/mdc-tab-indicator";
@import "@material/tab/mdc-tab";
@import "@material/typography/mdc-typography";
@import "@material/chips/mdc-chips";
@import "@material/card/mdc-card";
@import "@material/button/mdc-button";
@import "@material/icon-button/mdc-icon-button";
@import "@material/button/mdc-button";
@import "@material/image-list/mdc-image-list";
@import "@material/ripple/mdc-ripple";

</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {routeConfigs} from '@/router'
@Component({})
export default class App extends Vue {
  drawerOpen:boolean = false
  routes = routeConfigs
  mounted(){
  }
}
</script>

