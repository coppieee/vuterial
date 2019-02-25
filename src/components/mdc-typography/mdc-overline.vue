<template>
  <component :is="tag" class="mdc-typography--overline">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcOverline extends Vue{
  @Prop({default:'span'})
  tag!:string
}
</script>