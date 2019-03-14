<template>
  <router-link v-if="to!==undefined" :to="to" class="material-icons mdc-top-app-bar__navigation-icon">
    <slot/>
  </router-link>
  <button v-else class="material-icons mdc-top-app-bar__navigation-icon"> 
    <slot/>
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class MdcTopAppBarActionItem extends Vue{

  @Prop({type:Boolean,default:false}) alignStart!:boolean

  @Prop({type:Boolean,default:false}) alignEnd!:boolean

  @Prop({default:undefined}) to?:string
}
</script>
