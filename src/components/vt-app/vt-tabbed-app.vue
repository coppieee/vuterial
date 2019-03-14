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
.vt-tabbed-app--fixed-ajaust{
  height:inherit;
  padding-top:112px; /* topbar(64) + tab(48) */
}
@media (max-width: 599px){
  .vt-tabbed-app--fixed-ajaust{
    padding-top:104px; /* topbar(56) + tab(48) */
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VtAppState} from './vt-app-state'
import { ScrollState } from '@/components/vt-horizontal-list'
@Component<VtAppTabbed>({})
export default class VtAppTabbed extends Vue{
  @Prop({default:112,type:Number}) topAppBarHeight!:number
  
  get fixedAjaustStyles(){
    return {
      'padding-top':this.topAppBarHeight + 'px',
    }
  }
  // @Watch('topAppBarHeight') onTopAppBarHeight_(){
  //   console.log('changed')
  // }
}
</script>
