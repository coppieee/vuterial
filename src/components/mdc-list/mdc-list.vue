<template>
  <component class="mdc-list vuterial-list" :class="{
    'mdc-list--two-line':twoLine,
    'mdc-list--avatar-list':avatar,
    }" :is="tag" ref="mdcList">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {MDCList} from '@material/list'
@Component({})
export default class MdcList extends Vue{
  @Prop({default:'div'}) tag!:string
  @Prop({default:false})
  twoLine!:boolean
  @Prop({default:false})
  avatar!:boolean
  mdcList!:MDCList
  mounted(){
    const el = this.$refs.mdcList as Element
    this.mdcList = new MDCList(el)
  }
  beforeDestroy(){
    this.mdcList.destroy()
  }
}
</script>
<style lang="postcss" scoped>
.vuterial-list.mdc-list--avatar-list >>> .mdc-list-item__graphic {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
}
</style>
