<template>
  <component :is="tag" class="mdc-chip-set"
    :class="{
      'mdc-chip-set--choice':choice,
      'mdc-chip-set--filter':filter,
      'mdc-chip-set--input':input,
    }"
  >
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCChipSet} from '@material/chips'
@Component({})
export default class MdcChipSet extends Vue{
  chipSet?:MDCChipSet
  @Prop({default:'div'}) tag!:string

  @Prop({default:false}) filter!:boolean
  @Prop({default:false}) input!:boolean
  @Prop({default:false}) choice!:boolean

  @Prop({default:true}) js!:boolean

  onInteraction(e:Event):void{
    this.$emit('MDCChip:interaction',e)
    // console.log('onInteracton',e)
  }
  onSelection(e:Event):void{
    this.$emit('MDCChip:selection',e)
    // console.log('onSelection',e)
  }
  onRemoval(e:Event):void{
    this.$emit('MDCChip:removal',e)
    // console.log('onRemoval',e)
  }
  mounted(){
    if(this.js){
      console.log('mounted chip')
      this.chipSet = new MDCChipSet(this.$el)
      this.chipSet.listen('MDCChip:interaction',e=>this.onInteraction(e))
      this.chipSet.listen('MDCChip:selection',(e)=>this.onSelection(e))
      this.chipSet.listen('MDCChip:removal',(e)=>this.onRemoval(e))
    }
  }
  beforeDestroy(){
    if(this.chipSet){
      this.chipSet.destroy()
    }
  }
}
</script>