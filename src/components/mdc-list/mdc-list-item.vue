<template>
  <component :is="_is" :to="to" class="mdc-list-item" :class="_cssClass">
    <i v-if="icon!==undefined" class="material-icons mdc-list-item__graphic" aria-hidden="true">
      {{icon}}
    </i>
    <slot/>
    <span class="mdc-list-item__text">
      <span v-if="hasSlot('primary')" class="mdc-list-item__primary-text">
        <slot name="primary"/>
      </span>
      <span v-if="hasSlot('secondary')" class="mdc-list-item__secondary-text">
        <slot name="secondary"/>
      </span>
    </span>
    <span v-if="hasSlot('meta')" class="mdc-list-item__meta" aria-hidden="true">
      <slot name="meta"/>
    </span>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
@Component({})
export default class MdcList extends Vue{
  @Prop({type:Boolean,default:false}) areaSelected!:boolean
  @Prop({type:Boolean,default:false}) activated!:boolean
  @Prop({type:Boolean,default:false}) selected!:boolean
  @Prop({default:undefined}) to?:string
  @Prop({default:'div'}) tag!:string
  @Prop({default:undefined}) icon?:string

  @Prop({type:Boolean,default:false}) autoPathActivated!:boolean

  get _is():string{
    return this.to !== undefined ? 'router-link' : this.tag
  }

  get _cssClass(){
    return {
      'mdc-list-item--activated':this.activated || (this.autoPathActivated && this.to === this.$route.path),
      'mdc-list-item--selected':this.selected,
    }
  }
  hasSlot(name:string):boolean{
    return this.$slots[name] !== undefined
  }
}
</script>
