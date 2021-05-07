<template>
  <span class="mdc-list-item__text">
    <slot/>
    <span v-if="hasPrimary" class="mdc-list-item__primary-text">
      <slot name="primary"/>
    </span>
    <span v-if="hasSecondary" class="mdc-list-item__secondary-text">
      <slot name="secondary"/>
    </span>
  </span>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class MdcListItemText extends Vue{
  get hasPrimary(){
    return this.$slots['primary'] !== undefined
  }
  get hasSecondary(){
    return this.$slots['secondary'] !== undefined
  }
}
</script>
