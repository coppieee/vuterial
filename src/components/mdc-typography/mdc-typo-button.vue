<template>
  <component :is="tag" class="mdc-typography--button">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcTypoButton extends Vue{
  @Prop({default:'span'})
  tag!:string
}
</script>