<template>
  <component :is="currentTag"
    :to="to"
    class="mdc-tab"
    :class="cssClass" role="tab" :aria-selected="areaSelected" :tabIndex="tabIndex">
    <span class="mdc-tab__content">
      <span v-if="icon" class="mdc-tab__icon material-icons" aria-hidden="true">{{icon}}</span>
      <span class="mdc-tab__text-label">
        <slot/>
      </span>
    </span>
    <mdc-tab-indicator ref="tabIndicator"></mdc-tab-indicator>
    <span class="mdc-tab__ripple"></span>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCTab, MDCTabFoundation, MDCTabAdapter} from '@material/tab/index'
import MdcTabIndicator from '@/components/mdc-tab-bar/mdc-tab-indicator.vue'
import { MDCTabIndicator } from '@material/tab-indicator/index'
import { MDCTabIndicatorFactory } from '@material/tab-indicator/index'
@Component({})
export default class MdcTabbar extends Vue{
  @Prop({default:'button',type:String}) tag!:string
  @Prop({default:undefined,type:String}) to?:string
  @Prop({default:true,type:Boolean}) activateOnLink!:boolean
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:undefined,type:String}) icon?:string
  @Prop({default:false,type:Boolean}) active!:boolean
  active_:boolean = false

  areaSelected = 'false'
  tabIndex = '0'
  /**
   * mdc-tab-barから呼ばれる
   */
  createMdcTab(el:Element){
    const defaultAdapterMapper:MDCTabAdapter = {} as MDCTabAdapter
    for(const [name,value] of Object.entries(MDCTabFoundation.defaultAdapter)){
      (defaultAdapterMapper as any)[name] =
        (...args:any[]):any=>(defaultAdapter as any)[name](...args)
    }
    const adapter:MDCTabAdapter = {
      ...defaultAdapterMapper,
      addClass: (className) => this.addCssClass(className),
      removeClass: (className) => this.removeCssClass(className),
      hasClass: (className) => {
        return this.hasCssClass(className)
      },
      setAttr:(name,value)=>{
        if(name === 'aria-selected'){
          this.areaSelected = value
        }
        if(name === 'tabIndex'){
          this.tabIndex = value
        }
        this.$forceUpdate()
      },
    }
    const tabFoundation = new MDCTabFoundation(adapter)
    const tab = new MDCTab(el,tabFoundation)
    // hack: get private adapter_
    const defaultAdapter:MDCTabAdapter = (tab.getDefaultFoundation() as any).adapter_
    if(defaultAdapter === undefined){
      throw new Error('tab.getDefaultFoundation().adapter_ is undefined!')
    }
    const tabFactory:MDCTabIndicatorFactory = (el:Element)=>{
      const ref = (this.$refs.tabIndicator as MdcTabIndicator)
      const indicator = ref.createTabIndicator(el)
      if(this.active_){
        ref.activate()
      }
      return indicator
    }
    tab.initialize(undefined,tabFactory)
    
    // tab.focusOnActivate
    
    tab.listen('MDCTab:interacted',(e)=>{
      // console.log('lis',e)
    })
    this.mdcTab = tab
    return tab
  }
  mdcTabActive():boolean{
    return this.hasCssClass('mdc-tab--active')
  }
  mdcTab?:MDCTab
  mounted(){
    this.cssClass = {}
    if(this.stacked){
      this.addCssClass('mdc-tab--stacked')
    }
    this.active_ = this.active
    if(this.activateOnLink && this.to !== undefined){
      const {route} = this.$router.resolve(this.to)
      if(route.path === this.$route.path ){
        this.active_ = true
      }
    }
    if(this.active_){
      this.addCssClass('mdc-tab--active')
    }

  }
  beforeDestroy(){
  }
  private get currentTag(){
    if(this.to !== undefined){return 'router-link'}
    return this.tag
  }
  cssClass:{[key:string]:boolean} = {}
  addCssClass(className:string){
    this.$set(this.cssClass,className,true)
    // this.$forceUpdate()
  }
  removeCssClass(className:string){
    this.cssClass[className] = false
    // this.$forceUpdate()
  }
  hasCssClass(className:string):boolean{
    return this.cssClass[className] === true
  }
}
</script>
