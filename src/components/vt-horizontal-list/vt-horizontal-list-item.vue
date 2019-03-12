<template>
  <component :is="tag" class="vt-horizontal-list-item">
    <slot/>
  </component>
</template>
<style lang="postcss" scoped>
.vt-horizontal-list-item{
  flex-shrink: 0;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class VtHorizontalListItem extends Vue{
  @Prop({default:'div'}) tag!:string
}
</script>
