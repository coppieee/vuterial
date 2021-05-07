<template>
  <span class="mdc-tab-indicator vt-tab-indicator" :class="cssClass">
    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline" :style="contentStyle"></span>
  </span>
</template>
<style lang="scss">
@import "@material/tab-indicator/mixins";
.vt-tab-indicator.vt-tab-indicator--raised{
  @include mdc-tab-indicator-underline-color(on-primary);
  @include mdc-tab-indicator-icon-color(on-secondary);
}
</style>

<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCTabIndicator,MDCTabIndicatorFoundation, MDCTabIndicatorAdapter} from '@material/tab-indicator/index'
import {VuterialSlidingTabIndicatorFoundation} from './vuterial-sliding-tab-indicator-foundation'
@Component({})
export default class MdcTabIndicator extends Vue{
  @Prop({default:false,type:Boolean}) raised!:boolean
  mdcTabIndicator?:MDCTabIndicator
  
  // @Prop({default:0,type:Number}) scrollMoveRate!:number

  // @Watch('scrollMoveRate') 
  onScrollMoveRate_(to:number){
    const {width} = this.$el.getBoundingClientRect()
    const xPosition = to*width
    // console.log('xPosition',xPosition)
    this.addCssClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION)
    this.setContentStyleProperty('transform', `translateX(${xPosition}px`)
    
  }

  mounted(){
    this.cssClass = {}
    if(this.raised){
      this.addCssClass('vt-tab-indicator--raised')
    }
    this.contentStyle = {}
  }
  activate(){
    this.addCssClass('mdc-tab-indicator--active')
  }
  createTabIndicator(el:Element):MDCTabIndicator{
    const defaultAdapterMapper:Partial<MDCTabIndicatorAdapter> = {}
    for(const [key] of Object.entries(MDCTabIndicatorFoundation.defaultAdapter)){
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
  contentStyle:{[key:string]:string} = {}
  setContentStyleProperty(name:string,value:string){
    this.$set(this.contentStyle,name,value)
  }
}
</script>