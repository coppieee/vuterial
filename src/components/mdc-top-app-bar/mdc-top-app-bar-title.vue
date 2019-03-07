<template>
  <span class="mdc-top-app-bar__title">
    <slot/>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class MdcTopAppBarTitle extends Vue{
}
</script>
