<template>
  <router-link :to="to" class="material-icons mdc-top-app-bar__navigation-icon">
    <slot/>
  </router-link>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
export default class ActionItem extends Vue{
  @Prop({default:'header'})
  tag!:string

  @Prop({default:false})
  alignStart!:boolean

  @Prop({default:false})
  alignEnd!:boolean

  @Prop({default:undefined})
  to!:string
}
</script>
