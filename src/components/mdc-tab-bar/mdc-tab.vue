<template>
  <component :is="tag"
    class="mdc-tab"
    :class="_mdcTabCssClass" role="tab" aria-selected="true" :tabindex="tabindex">
    <span class="mdc-tab__content">
      <span v-if="icon" class="mdc-tab__icon material-icons" aria-hidden="true">{{icon}}</span>
      <span class="mdc-tab__text-label">
        <slot/>
      </span>
    </span>
    <span class="mdc-tab-indicator" :class="{'mdc-tab-indicator--active':active}">
      <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
    </span>
    <span class="mdc-tab__ripple"></span>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCTopAppBar} from '@material/top-app-bar/index'
@Component({})
export default class MdcTabbar extends Vue{
  @Prop({default:'button'})
  tag!:string
  @Prop({default:undefined})
  tabindex:number|undefined

  @Prop({default:false})
  areaSelected!:boolean

  @Prop({default:false})
  stacked!:boolean

  @Prop({default:undefined})
  icon?:string
  // @Prop({default:undefined})
  // href!:string|undefined

  get _areaSelected(){
    return this.areaSelected ? 'true':'false'
  }
  @Prop({default:false})
  active!:boolean
  get _mdcTabCssClass(){
    return {
      'mdc-tab--active':this.active,
      'mdc-tab mdc-tab--stacked':this.stacked,
    }
  }

}
</script>
