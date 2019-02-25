<template>
  <component :is="tag" class="material-icons" :class="cssClass">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({})
export default class MdcIcon extends Vue{
  @Prop({default:'i'}) tag!:string
  get cssClass(){
    return {}
  }
}
</script>


