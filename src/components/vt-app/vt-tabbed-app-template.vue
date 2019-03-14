<template>
  <div class="vt-tabbed-app">
    <div class="vt-tabbed-app__main-contents">
      <slot name="top-app-bar"/>
      <vt-top-app-bar-fixed-ajust :topAppBarHeight="topAppBarHeight">
        <slot name="horizontal-list"/>
      </vt-top-app-bar-fixed-ajust>
    </div>
    <div class="vt-tabbed-app__modal-darwer">
      <slot name="drawer"/>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.vt-tabbed-app__main-contents{
  position: relative;
  height:inherit;
}
</style>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VtAppState} from './vt-app-state'
@Component<VtTabbedApp>({})
export default class VtTabbedApp extends Vue{
  @Prop({default:112,type:Number}) topAppBarHeight!:number
}
</script>
