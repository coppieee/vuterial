<template>
  <component :is="tag" class="mdc-typography--subtitle1">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcSubtitle1 extends Vue{
  @Prop({default:'h2'})
  tag!:string
}
</script>