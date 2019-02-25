<template>
  <div class="mdc-card" :class="{'mdc-card--outlined':outlined}">
    <div class="mdc-card__primary-action" :tabindex="tabindex">
      <div v-if="mediaSrc!== undefined" 
        class="mdc-card__media mdc-card__media--16-9"
        :class="{
          'mdc-card__media--square':mediaSquare,
          'mdc-card__media--16-9':media16_9,
          'mdc-card__media-content':mediaContent,
        }"
        :style="{'background-img':'url('+mediaSrc+')'}"
      >
      </div>
      <slot/>
      <div class="vuterial-card-primary">
        <mdc-headline6 class="vuterial-card-title" v-if="hasSlot('title')">
          <slot name="title"/>
        </mdc-headline6>
        <mdc-subtitle2 class="vuterial-card-subtitle"
          :class="{'vuterial-card-theme-text-secondary':themeTextSecondary}"
          v-if="hasSlot('subtitle')">
          <slot name="subtitle"/>
        </mdc-subtitle2>
        <mdc-body2 v-if="_isPrimaryBody" class="vuterial-card-body">
          <slot name="body"/>
        </mdc-body2>
      </div>
      <div class="vuterial-card-secondary"
        v-if="!_isPrimaryBody && hasSlot('body')"
        :class="{'vuterial-card-theme-text-secondary':themeTextSecondary}">
        <mdc-body2 class="vuterial-card-body">
          <slot name="body"/>
        </mdc-body2>
      </div>
      <slot/>
    </div>
    <div v-if="hasSlot('buttons') || hasSlot('icons')" class="mdc-card__actions">
      <div v-if="hasSlot('buttons')" class="mdc-card__action-buttons">
        <slot name="buttons"/>
      </div>
      <div v-if="hasSlot('icons')" class="mdc-card__action-icons">
        <slot name="icons"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcCard extends Vue{
  @Prop({type:Boolean,default:false}) outlined!:boolean

  @Prop({default:undefined}) tabindex?:number
  @Prop({type:Boolean,default:false}) mediaSquare!:boolean
  @Prop({type:Boolean,default:false}) media16_9!:boolean
  @Prop({type:Boolean,default:false}) mediaContent!:boolean
  hasSlot(name:string):boolean{
    return this.$slots[name] !== undefined
  }
  @Prop({default:undefined})
  mediaSrc?:string

  get _isPrimaryBody(){
    return !(this.hasSlot('title') || this.hasSlot('subtitle'))
  }
  @Prop({type:Boolean,default:true})
  themeTextSecondary!:boolean
}
</script>
<style lang="postcss" scoped>
.vuterial-card-primary{
  padding: 1rem;
}
.vuterial-card-secondary{
  padding: 0 1rem 8px;
}
.vuterial-card-title{

}
.vuterial-card-theme-text-secondary{
  color:var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54))
}
</style>
