<template>
  <component :is="tag" class="mdc-typography--headline2">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcHeadline2 extends Vue{
  @Prop({default:'h1'})
  tag!:string
}
</script>