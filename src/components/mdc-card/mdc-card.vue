<template>
  <div class="mdc-card" :class="{'mdc-card--outlined':outlined}">
    <slot/>
    <div v-if="hasPrimaryAction_" class="vt-card__primary-action" :tabindex="tabindex">
      <div v-if="mediaSrc!== undefined" 
        class="mdc-card__media"
        :class="{
          'mdc-card__primary-action ':primaryRipple,
          'mdc-card__media--square':mediaSquare,
          'mdc-card__media--16-9':media16_9,
          'mdc-card__media-content':mediaContent,
        }"
        :style="{'background-img':'url('+mediaSrc+')'}"
      >
      </div>
      <div class="vt-card-primary">
        <mdc-headline6 class="vt-card-title" v-if="hasSlot_('title')">
          <slot name="title"/>
        </mdc-headline6>
        <mdc-subtitle2 class="vt-card-subtitle"
          :class="{'vt-card-theme-text-secondary':themeTextSecondary}"
          v-if="hasSlot_('subtitle')">
          <slot name="subtitle"/>
        </mdc-subtitle2>
        <mdc-body2 v-if="isPrimaryBody_" class="vt-card-body">
          <slot name="body"/>
        </mdc-body2>

      </div>
      <div class="vt-card-secondary"
        v-if="!isPrimaryBody_ && hasSlot_('body')"
        :class="{'vt-card-theme-text-secondary':themeTextSecondary}">
        <mdc-body2 class="vt-card-body">
          <slot name="body"/>
        </mdc-body2>
      </div>
    </div>
    <div v-if="hasSlot_('buttons') || hasSlot_('icons')" class="mdc-card__actions">
      <div v-if="hasSlot_('buttons')" class="mdc-card__action-buttons">
        <slot name="buttons"/>
      </div>
      <div v-if="hasSlot_('icons')" class="mdc-card__action-icons">
        <slot name="icons"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component,Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcCard extends Vue{
  @Prop({type:Boolean,default:false}) outlined!:boolean
  @Prop({default:undefined}) tabindex?:number
  @Prop({type:Boolean,default:false}) mediaSquare!:boolean
  @Prop({type:Boolean,default:false}) media16_9!:boolean
  @Prop({type:Boolean,default:false}) mediaContent!:boolean
  @Prop({type:Boolean,default:false}) primaryRipple!:boolean
  @Prop({default:undefined}) mediaSrc?:string
  @Prop({type:Boolean,default:true}) themeTextSecondary!:boolean
  hasSlot_(name:string):boolean{
    return this.$slots[name] !== undefined
  }
  get hasPrimaryAction_(){
    return this.hasSlot_('title') || 
      this.hasSlot_('subtitle') || 
      this.hasSlot_('body') ||
      this.mediaSrc !== undefined
  }
  get isPrimaryBody_(){
    return !(this.hasSlot_('title') || this.hasSlot_('subtitle'))
  }
  
}
</script>
<style lang="postcss" scoped>
.vt-card-primary{
  padding: 1rem;
}
.vt-card__primary-action{
  flex:1;
}
.vt-card-secondary{
  padding: 0 1rem 8px;
}
.
.vt-card-title{

}
.vuterial-card-theme-text-secondary{
  color:var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54))
}
</style>
