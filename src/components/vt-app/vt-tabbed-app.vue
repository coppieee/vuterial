<template>
  <div class="vt-tabbed-app">
    <div class="vt-tabbed-app__main-contents">
      <slot name="top-app-bar"/>
      <mdc-top-app-bar
        :watch-document-scroll-top="false"
        :scroll-top="state.scrollTop"
        @update:height="state.topAppBarHeight = $event"
        :h-scroll.sync="state.hScroll"
        leftActionIcon="menu"
        @clickLeftAction="$emit('clickLeftAction')">
        <template #title>
          <slot name="title"/>
        </template>
        <template #tab-bar>
          <mdc-tab-bar :scroll-state.sync="state.hScroll">
            <slot name="tab-bar"/>
          </mdc-tab-bar>
        </template>
      </mdc-top-app-bar>
      <vt-top-app-bar-fixed-ajust :topAppBarHeight="state.topAppBarHeight">
        <!-- <slot name="horizontal-list"/> -->
        <vt-horizontal-list class="vh-tabbed-app__horizontal-list"
          :scroll-state.sync="state.hScroll">
          <slot name="horizontal-list"/>
        </vt-horizontal-list>
      </vt-top-app-bar-fixed-ajust>
    </div>
    <div class="vt-tabbed-app__modal-darwer">
      <!-- <slot name="drawer"/> -->
      <mdc-drawer :open.sync="state.drawerOpen">
        <slot name="drawer"/>
      </mdc-drawer>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.vt-tabbed-app__main-contents{
  position: relative;
  height:inherit;
}
.vh-tabbed-app__horizontal-list >>> .vt-horizontal-list-item{
  width: 100%;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VtAppState} from './vt-app-state'
@Component<VtTabbedApp>({})
export default class VtTabbedApp extends Vue{
  // @Prop({default:112,type:Number}) topAppBarHeight!:number
  @Prop() state!:VtAppState
}
</script>
