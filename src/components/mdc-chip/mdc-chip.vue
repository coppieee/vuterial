<template>
  <component :is="tab" class="mdc-chip" :class="{
    'mdc-chip--selected':selected,
  }" :tabindex="tabindex">
    <div v-if="checkmark" class="mdc-chip__checkmark">
      <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
        <path class="mdc-chip__checkmark-path" fill="none" stroke="black"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
    </div>
    <mdc-icon v-if="leadingIcon !== undefined" class="mdc-chip__icon mdc-chip__icon--leading">
      {{leadingIcon}}
    </mdc-icon>
    <div class="mdc-chip__text"><slot/></div>
    <mdc-icon v-if="trailingIcon" class="mdc-chip__icon mdc-chip__icon--trailing" tabindex="0" role="button">
      {{trailingIcon}}
    </mdc-icon>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
@Component({})
export default class MdcChip extends Vue{
  @Prop({default:'div'}) tab!:string
  @Prop({default:undefined}) tabindex?:number

  @Prop({default:undefined}) leadingIcon?:string

  @Prop({default:undefined}) trailingIcon?:string
  @Prop({default:false}) selected!:boolean

  @Prop({default:false}) checkmark!:boolean
}
</script>