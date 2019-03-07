<template>
  <component :is="tag" class="mdc-image-list__item" :class="cssClass">
    <component :is="ripple ?'mdc-ripple':'div'" :to="to" >
      <div v-if="aspectContainer" class="mdc-image-list__image-aspect-container">
        <img class="mdc-image-list__image" :src="src">
      </div>
      <template v-else>
        <img class="mdc-image-list__image" :src="src">  
      </template>
      <template v-if="$slots.default !== undefined">
        <div class="mdc-image-list__supporting">
          <span class="mdc-image-list__label">
            <slot/>
          </span>
        </div>
      </template>
    </component>
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({})
export default class MdcImageListItem extends Vue{
  @Prop({default:'li'}) tag!:string
  @Prop() src!:string
  @Prop({type:Boolean,default:true}) aspectContainer!:boolean
  @Prop({default:undefined}) to?:string

  @Prop({default:true}) ripple?:boolean

  get cssClass(){
    return {}
  }
}
</script>