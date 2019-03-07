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
import { Component, Prop, Vue } from 'vue-property-decorator'
// import {MDCTopAppBar} from '@material/top-app-bar/index'
import{topAppBar} from 'material-components-web'
@Component({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:'header'})
  tag!:string

  @Prop({default:false,type:Boolean})
  short!:boolean

  @Prop({default:false,type:Boolean})
  shortCollapsed!:boolean

  @Prop({default:false,type:Boolean})
  fixed!:boolean

  @Prop({default:false,type:Boolean})
  prominent!:boolean

  @Prop({default:false,type:Boolean})
  dense!:boolean

  topAppBar!:topAppBar.MDCTopAppBar
  mounted(){
    const topAppBarElement = this.$refs.topAppBar as Element
    this.topAppBar = new topAppBar.MDCTopAppBar(topAppBarElement)
  }
  beforeDestroy() {
    this.topAppBar.destroy()
  }
}
</script>
