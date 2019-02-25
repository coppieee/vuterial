<template>
  <component :is="tag" class="mdc-top-app-bar" ref="topAppBar"
  :class="{
    'mdc-top-app-bar--short':short,
    'mdc-top-app-bar--short-collapsed':shortCollapsed,
    'mdc-top-app-bar--fixed':fixed,
    'mdc-top-app-bar--prominent':prominent,
    'mdc-top-app-bar--dense':dense,
  }">
    <div class="mdc-top-app-bar__row">
      <slot/>
    </div>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {MDCTopAppBar} from '@material/top-app-bar/index';
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:'header'})
  tag!:string

  @Prop({default:false})
  short!:boolean

  @Prop({default:false})
  shortCollapsed!:boolean

  @Prop({default:false})
  fixed!:boolean

  @Prop({default:false})
  prominent!:boolean

  @Prop({default:false})
  dense!:boolean

  topAppBar!:MDCTopAppBar
  mounted(){
    const topAppBarElement = this.$refs.topAppBar as Element
    this.topAppBar = new MDCTopAppBar(topAppBarElement);
  }
  beforeDestroy() {
    this.topAppBar.destroy()
  }
}
</script>
