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
    <mdc-tab-indicator :active="active" ref="tabIndicator"></mdc-tab-indicator>
    <span class="mdc-tab__ripple"></span>
  </component>
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator'
import {MDCTab, MDCTabFoundation} from '@material/tab/index'
// import {MDCTabIndicator} from '@material/tab-indicator'
// import { MDCTabIndicatorFoundation} from '@material/tab-indicator'
// import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator'
import MdcTabIndicator from '@/components/mdc-tab-bar/mdc-tab-indicator.vue'
@Component({})
export default class MdcTabbar extends Vue{
  @Prop({default:'button',type:String}) tag!:string
  @Prop({default:undefined,type:String}) to?:string
  @Prop({default:false,type:Boolean}) autoActivatedByPath!:boolean
  @Prop({default:false,type:Boolean}) stacked!:boolean
  @Prop({default:undefined,type:String}) icon?:string
  @Prop({default:false,type:Boolean}) active!:boolean

  areaSelected = 'false'
  tabIndex = '0'
  /**
   * mdc-tab-barから呼ばれる
   */
  createMdcTab(el:Element){
    const tab = new MDCTab(el,
      new MDCTabFoundation({
        ...MDCTabFoundation.defaultAdapter,
        addClass: (className) => this.addCssClass(className),
        removeClass: (className) => this.removeCssClass(className),
        hasClass: (className) => this.hasCssClass(className),
        setAttr:(name,value)=>{
          if(name === 'aria-selected'){
            this.areaSelected = value
          }
          if(name === 'tabIndex'){
            this.tabIndex = value
          }
          this.$forceUpdate()
        },
      }),
      undefined,
      (el:Element)=>{
        return (this.$refs.tabIndicator as MdcTabIndicator).createTabIndicator(el)
      },
    )
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
    if(this.active){
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
    console.log('addCssClass',className)
    this.cssClass[className] = true
    this.$forceUpdate()
  }
  removeCssClass(className:string){
    delete this.cssClass[className]
    console.log('removeCssClass',className)
    this.$forceUpdate()
  }
  hasCssClass(className:string):boolean{
    return this.cssClass.hasOwnProperty(className) && this.cssClass[className]
  }
}
</script>
