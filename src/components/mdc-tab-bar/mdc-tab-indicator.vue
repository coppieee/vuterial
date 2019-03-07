<template>
  <span class="mdc-tab-indicator" :class="cssClass" :style="styles">
    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
  </span>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
// import {MDCTabIndicator,MDCTabIndicatorFoundation,MDCSlidingTabIndicatorFoundation} from '@material/tab-indicator'
import{tab as mdcTab,tabBar as mdcTabBar,tabIndicator} from 'material-components-web'
type MDCTabIndicator = tabIndicator.MDCTabIndicator
@Component({})
export default class MdcTabIndicator extends Vue{
  mdcTabIndicator?:MDCTabIndicator
  

  @Prop({default:false ,type:Boolean}) active!:boolean
  mounted(){
    this.cssClass = {}
    this.styles = {}
    if(this.active){
      this.addCssClass('mdc-tab-indicator--active')
    }
  }
  createTabIndicator(el:Element):MDCTabIndicator{
    this.mdcTabIndicator = new tabIndicator.MDCTabIndicator(this.$el,new tabIndicator.MDCSlidingTabIndicatorFoundation({
      ...tabIndicator.MDCTabIndicatorFoundation.defaultAdapter,
      addClass:name =>{
        this.addCssClass(name)
      },
      removeClass:name=>{
        this.addCssClass(name)
      },
      setContentStyleProperty:(name,key)=>{
        this.setContentStyleProperty(name,key)
      },
    }))
    return this.mdcTabIndicator
  }

  cssClass:{[key:string]:boolean} = {}
  addCssClass(className:string){
    this.cssClass[className] = true
    this.$forceUpdate()
  }
  removeCssClass(className:string){
    this.$forceUpdate()
  }
  styles:{[key:string]:string} = {}
  setContentStyleProperty(name:string,key:string){
    this.styles[name] = key
  }
  // hasCssClass(className:string):boolean{
  //   return this.cssClass.hasOwnProperty(className) && this.cssClass[className]
  // }
}
</script>