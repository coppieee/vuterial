<template>
  <section class="mdc-top-app-bar__section"
    :class="{
      'mdc-top-app-bar__section--align-start':alignStart,
      'mdc-top-app-bar__section--align-end':alignEnd,
    }">
      <slot/>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class MdcTopAppBarSection extends Vue{
  @Prop({default:'header'})
  tag!:string

  @Prop({type:Boolean,default:false})
  alignStart!:boolean

  @Prop({type:Boolean,default:false})
  alignEnd!:boolean
}
</script>
