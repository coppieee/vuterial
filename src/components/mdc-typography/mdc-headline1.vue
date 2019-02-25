<template>
  <component :is="tag" class="mdc-typography--headline1">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcHeadline1 extends Vue{
  @Prop({default:'h1'})
  tag!:string
}
</script>