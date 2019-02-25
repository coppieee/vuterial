<template>
  <component :is="tag" class="mdc-typography--body2">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcBody2 extends Vue{
  @Prop({default:'p'})
  tag!:string
}
</script>