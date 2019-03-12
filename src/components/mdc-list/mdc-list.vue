<template>
  <component class="mdc-list vt-list" :class="{
    'mdc-list--two-line':twoLine,
    'mdc-list--avatar-list':avatar,
    }" :is="tag">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {MDCList} from '@material/list'
@Component({})
export default class MdcList extends Vue{
  @Prop({default:'div'}) tag!:string
  @Prop({default:false,type:Boolean})twoLine!:boolean
  @Prop({default:false,type:Boolean})avatar!:boolean
  mdcList_!:MDCList
  mounted(){
    this.mdcList_ = new MDCList(this.$el)
  }
  beforeDestroy(){
    this.mdcList_.destroy()
  }
}
</script>
<style lang="postcss" scoped>
.vt-list.mdc-list--avatar-list >>> .mdc-list-item__graphic {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
}
</style>
