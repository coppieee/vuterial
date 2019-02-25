<template>
  <button class="mdc-button" :class="cssClass"
    :disabled="disabled"
    @click="click">
    <i v-if="icon" class="material-icons mdc-button__icon" aria-hidden="true">
      {{icon}}
    </i>
    <span class="mdc-button__label">
      <slot/>
    </span>
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import {MDCRipple} from '@material/ripple'
import { VNode ,PropOptions } from 'vue'
@Component({})
export default class MdcList extends Vue{
  @Prop({default:undefined}) icon?:string

  @Prop({type:Boolean,default:false}) disabled!:boolean
  @Prop({type:Boolean,default:false}) raised!:boolean
  @Prop({type:Boolean,default:false}) unelevated!:boolean
  @Prop({type:Boolean,default:false}) outlined!:boolean
  @Prop({type:Boolean,default:false}) dense!:boolean

  @Prop({type:Boolean,default:true}) ripple!:boolean

  get cssClass(){
    return {
      'mdc-button--raised':this.raised,
      'mdc-button--unelevated':this.unelevated,
      'mdc-button--outlined':this.outlined,
      'mdc-button--dense':this.dense,
    }
  }
  @Emit() click(){
  }
  mdcRipple?:MDCRipple
  mounted(){
    if(this.ripple){
      this.mdcRipple= new MDCRipple(this.$el)
    }
  }
  beforeDestory(){
    if(this.mdcRipple !== undefined){
      this.mdcRipple.destroy()
    }
  }
}
</script>

