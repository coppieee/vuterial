<template>
  <div class="doc-vt-app">
    <vt-tabbed-app class="doc-vt-app__app-tabbed"
      :top-app-bar-height="state.topAppBarHeight">
      <template #top-app-bar>
        <mdc-top-app-bar class="doc-top-app-bar"
          :watch-document-scroll-top="false"
          :scroll-top="state.scrollTop"
          @update:height="state.topAppBarHeight = $event">
          <mdc-top-app-bar-section align-start>
            <mdc-top-app-bar-action-item >menu</mdc-top-app-bar-action-item>
            <mdc-top-app-bar-title>vt-app-tabbed</mdc-top-app-bar-title>
          </mdc-top-app-bar-section>
          <mdc-top-app-bar-section align-end role="toolbar">
          </mdc-top-app-bar-section>
          <template #tab-bar>
            <mdc-tab-bar :scroll-state.sync="state.hScroll">
              <mdc-tab raised>tab0</mdc-tab>
              <mdc-tab raised>tab1</mdc-tab>
              <mdc-tab raised>tab2</mdc-tab>
            </mdc-tab-bar>
          </template>
        </mdc-top-app-bar>
      </template>
      <template #horizontal-list>
        <vt-horizontal-list :scroll-state.sync="state.hScroll" 
          class="doc-vt-app__h-list">
          <vt-horizontal-list-item class="doc-vt-app__h-list-item"
            y-scroll
            @update:scrollTop="state.scrollTop = $event"
            v-for="i in 3" :key="i"
          >
            <mdc-card class="doc-vt-app__card">card0
              <div v-for="i in 30" :key="i">card{{i}}</div>
            </mdc-card>
          </vt-horizontal-list-item>
        </vt-horizontal-list>
      </template>
      <template #drawer>
        <mdc-drawer>
        </mdc-drawer>
      </template>
    </vt-tabbed-app>
  </div>
</template>
<style lang="postcss" scoped>
.doc-vt-app__app-tabbed{
  border: solid 1px #000;
  overflow:hidden;
  height:400px;
}
.doc-vt-app >>> .vt-app-tabbled__main-contents{
  position: relative;
}
.doc-vt-app .doc-top-app-bar{
  position: absolute;
  left: 0;
  right: 0;
}
.doc-vt-app__h-list-item{
  width:100%;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VtAppState } from '@/components/vt-app/vt-app-state'
@Component<VtApp>({})
export default class VtApp extends Vue{
  scrollState = {type:'',from:'',index:0,moveRate:0}
  scrollTop:number = 0
  topAppBarHeight:number = 0
  state:VtAppState = new VtAppState()
  onUpdateTopAppBarHeight_(height:number){
    this.topAppBarHeight = height
    // console.log('ONUPDATE TOPPAPPBARHEIGHT',height)
  }
}
</script>

