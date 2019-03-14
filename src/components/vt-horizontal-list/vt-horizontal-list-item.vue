<template>
  <component :is="tag" class="vt-horizontal-list-item"
  :class="cssClass_"
  @scroll="onScroll_">
    <slot/>
  </component>
</template>
<style lang="postcss" scoped>
.vt-horizontal-list-item{
  flex-shrink: 0;
}
.vt-horizontal-list-item--y-scroll{
  overflow-y:auto;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class VtHorizontalListItem extends Vue{
  @Prop({default:'div'}) tag!:string

  @Prop({default:false,type:Boolean}) yScroll!:boolean
  get cssClass_(){
    return {
      'vt-horizontal-list-item--y-scroll':this.yScroll,
    }
  }
  onScroll_(ev:UIEvent){
    const scrollTop = this.$el.scrollTop
    this.$emit('update:scrollTop',scrollTop)
  }
}
</script>
