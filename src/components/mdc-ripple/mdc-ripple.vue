<template>
  <component :is="_tag" class="mdc-ripple-surface vuterial-ripple" :to="to" @click="click">
    <slot/>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
// import {MDCRipple} from '@material/ripple'
import{ripple} from 'material-components-web'
type MDCRipple = ripple.MDCRipple
@Component({})
export default class MdcRipple extends Vue{
  @Prop({default:'div'}) tag!:string
  @Prop({default:undefined}) to?:string

  @Prop({default:true}) js!:boolean

  get _tag():string{
    if(this.to !== undefined){
      return 'router-link'
    }
    return this.tag
  }
  ripple?:MDCRipple
  mounted(){
    if(this.js){
      console.log('mounted image list item')
      this.ripple= new ripple.MDCRipple(this.$el as Element)
    }
  }
  beforeDestory(){
    if(this.ripple !== undefined){
      this.ripple.destroy()
    }
  }
  @Emit()
  click(){

  }
}
</script>
<style lang="scss" scoped>
@import "@material/ripple/mdc-ripple";

.vuterial-ripple{
  display: block;
  // background-color: transparent;
  // border: none;
  cursor: pointer;
  // outline: none;
  // padding: 0;
  // appearance: none;

  @include mdc-ripple-surface;
  @include mdc-ripple-radius-bounded;
  @include mdc-states;
}
</style>


