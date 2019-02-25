<template>
  <span class="mdc-top-app-bar__title">
    <slot/>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {MDCTopAppBar} from '@material/top-app-bar/index';
@Component({})
export default class MdcTopAppBarTitle extends Vue{
}
</script>
