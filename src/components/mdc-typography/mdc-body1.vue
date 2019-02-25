<template>
  <component :is="tag" class="mdc-typography--body1">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcBody1 extends Vue{
  @Prop({default:'p'})
  tag!:string
}
</script>