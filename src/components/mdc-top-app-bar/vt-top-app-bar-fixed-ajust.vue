<template>
  <div class="vt-top-app-bar--fixed-ajust" :style="fixedAjustStyles">
    <slot/>
  </div>
</template>
<style lang="postcss" scoped>
.vt-top-app-bar--fixed-ajust{
  height:inherit;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component<VtAppTabbed>({})
export default class VtAppTabbed extends Vue{
  @Prop({default:112,type:Number}) topAppBarHeight!:number
  
  get fixedAjustStyles(){
    return {
      'padding-top':this.topAppBarHeight + 'px',
    }
  }
}
</script>