<template>
  <component :is="tag" class="mdc-list-divider" role="separator"></component>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class MdcListItemText extends Vue{
  @Prop({default:'div'})
  tag!:string
}
</script>

