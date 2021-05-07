<template>
  <component :is="tag" class="mdc-image-list" :class="cssClass">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class MdcImageList extends Vue{
  @Prop({default:'ul'}) tag!:string
  @Prop({type:Boolean,default:false}) masonry!:boolean
  @Prop({type:Boolean,default:false}) textProtection!:boolean
  
  get cssClass(){
    return {
      'mdc-image-list--masonry':this.masonry,
      'mdc-image-list--with-text-protection':this.textProtection,
    }
  }
}
</script>