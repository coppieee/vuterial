<template>
  <span class="mdc-tab-indicator" :class="cssClass">
    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline" :style="contentStyle"></span>
  </span>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCTabIndicator,MDCTabIndicatorFoundation,MDCSlidingTabIndicatorFoundation, MDCTabIndicatorAdapter} from '@material/tab-indicator/index'
import {VuterialSlidingTabIndicatorFoundation} from './vuterial-sliding-tab-indicator-foundation'
@Component({})
export default class MdcTabIndicator extends Vue{
  mdcTabIndicator?:MDCTabIndicator
  
  mounted(){
    this.cssClass = {}
    this.contentStyle = {transform:'translateX(0)'}
  }
  activate(){
    this.addCssClass('mdc-tab-indicator--active')
  }
  createTabIndicator(el:Element):MDCTabIndicator{
    const defaultAdapterMapper:Partial<MDCTabIndicatorAdapter> = {}
    for(const [key,value] of Object.entries(MDCTabIndicatorFoundation.defaultAdapter)){
      (defaultAdapterMapper as any)[key] = (...args:any[]) => defaultAdapter[key](...args)
    }
    const adapter:Partial<MDCTabIndicatorAdapter> = {
      ...defaultAdapterMapper ,
      addClass:name =>{
        this.addCssClass(name)
      },
      removeClass:name=>{
        this.removeCssClass(name)
      },
      setContentStyleProperty:(name,key)=>{
        this.setContentStyleProperty(name,key)
      },
    }
    const indicator = new MDCTabIndicator(this.$el,new VuterialSlidingTabIndicatorFoundation(adapter))
    const defaultAdapter =(indicator.getDefaultFoundation() as any).adapter_
    this.mdcTabIndicator = indicator
    return this.mdcTabIndicator
  }

  cssClass:{[key:string]:boolean} = {}
  addCssClass(className:string){
    // this.cssClass[className] = true
    this.$set(this.cssClass,className,true)
  }
  removeCssClass(className:string){
    this.cssClass[className] = false
  }
  contentStyle:{[key:string]:string} = {transform:'translateX(0)'}
  setContentStyleProperty(name:string,value:string){
    this.$set(this.contentStyle,name,value)
  }
}
</script>