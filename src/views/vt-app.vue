<template>
  <div class="doc-vt-app">
    <vt-tabbed-app-template class="doc-vt-app__app-tabbed"
      :top-app-bar-height="state.topAppBarHeight">
      <template #top-app-bar>
        <mdc-top-app-bar class="doc-top-app-bar"
          :watch-document-scroll-top="false"
          :scroll-top="state.scrollTop"
          @update:height="state.topAppBarHeight = $event"
          :h-scroll.sync="state.hScroll"
          leftActionIcon="menu">
          <template #title>
            vt-tabbed-app
          </template>
          <template #tab-bar>
            <mdc-tab-bar :scroll-state.sync="state.hScroll">
              <mdc-tab raised active>tab0</mdc-tab>
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
    </vt-tabbed-app-template>
    <br/>
    <vt-tabbed-app :state="state2" class="doc-vt-app__app-tabbed"
      @clickLeftAction="state2.drawerOpen = !state2.drawerOpen">
      <template #title>
        hello
      </template>
      <template #tab-bar>
        <mdc-tab raised v-for="i in 3" :key="i">tab{{i}}</mdc-tab>
      </template>
      <template #horizontal-list>
        <vt-horizontal-list-item 
          y-scroll
          @update:scrollTop="state2.scrollTop = $event"
          v-for="i in 3" :key="i">
          <mdc-card>
            <div v-for="i in 30" :key="i">card{{i}}</div>
          </mdc-card>
        </vt-horizontal-list-item>
      </template>
      <template #drawer>
        <mdc-list tag="nav">
          <mdc-list-item activated>hello</mdc-list-item>
          <mdc-list-item>hello</mdc-list-item>
        </mdc-list>
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
/* .doc-vt-app >>> .vt-app-tabbled__main-contents{
  position: relative;
} */
/* .doc-vt-app .doc-top-app-bar{
  position: absolute;
  left: 0;
  right: 0;
} */
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
  state2:VtAppState = new VtAppState()
  onUpdateTopAppBarHeight_(height:number){
    this.topAppBarHeight = height
    // console.log('ONUPDATE TOPPAPPBARHEIGHT',height)
  }
}
</script>

