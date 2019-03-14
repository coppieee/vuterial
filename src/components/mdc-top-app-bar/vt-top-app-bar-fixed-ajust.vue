<template>
  <div :style="fixedAjustStyles">
    <slot/>
  </div>
</template>
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