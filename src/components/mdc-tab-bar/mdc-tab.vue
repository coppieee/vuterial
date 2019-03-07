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
import {MDCTabIndicator} from '@material/tab-indicator'
import { MDCTabIndicatorFoundation} from '@material/tab-indicator'
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator'
import MdcTabIndicator from '@/components/mdc-tab-bar/mdc-tab-indicator.vue'
@Component({})
export default class MdcTabbar extends Vue{
  @Prop({default:'button',type:String}) tag!:string
  @Prop({default:undefined,type:String}) to?:string
  @Prop({default:false,type:Boolean}) autoActivatedByPath!:boolean
  // @Prop({default:undefined,type:Number}) tabindex?:number

  // @Prop({default:false,type:Boolean}) areaSelected!:boolean

  @Prop({default:false,type:Boolean}) stacked!:boolean

  @Prop({default:undefined,type:String}) icon?:string
  // @Prop({default:undefined})
  // href!:string|undefined

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
          // console.log('setAttr',name,value)
          if(name === 'aria-selected'){
            this.areaSelected = value
          }
          if(name === 'tabIndex'){
            this.tabIndex = value
          }
          this.$forceUpdate()
          // MDCTabFoundation.defaultAdapter.setAttr(name,value)
        },
      }),
      undefined,
      (el:Element)=>{
        // console.log('createTabIndicator')
        return (this.$refs.tabIndicator as MdcTabIndicator).createTabIndicator(el)
        // console.log('MDCTabIndicatorFoundation defaultAdapter',MDCTabIndicatorFoundation)
        // this.mdcTabIndicator = new MDCTabIndicator(el,new MDCSlidingTabIndicatorFoundation({
        //   ...MDCTabIndicatorFoundation.defaultAdapter,
        //   addClass(name){
            
        //   },
        //   removeClass(name){

        //   },
        // }))
        // // console.log('mdcTabIndicator',this.mdcTabIndicator)
        // return this.mdcTabIndicator
      },
    )
    // tab.initialize(undefined,(el:Element)=>{
    //   this.mdcTabIndicator = new MDCTabIndicator(el)
    //   console.log('mdcTabIndicator',this.mdcTabIndicator)
    //   return this.mdcTabIndicator
    // })
    tab.listen('MDCTab:interacted',(e)=>{
      // console.log('lis',e)
    })
    this.mdcTab = tab
    return tab
  }
  mdcTabActive():boolean{
    // console.log('mdcTab',this.mdcTab)
    // if(this.mdcTab === undefined){return this.active}
    
    // return this.mdcTab.active
    // console.log('mdcTabActive')
    return this.hasCssClass('mdc-tab--active')
  }
  mdcTab?:MDCTab
  // mdcTabIndicator?:MDCTabIndicator
  mounted(){
    this.cssClass = {}
    if(this.stacked){
      this.addCssClass('mdc-tab--stacked')
      // console.log('stacked',[...this.cssClass])
    }
    if(this.active){
      this.addCssClass('mdc-tab--active')
      // console.log('active',[...this.cssClass])
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
  
  // private get mdcTabCssClass(){
  //   console.log(Object.keys(this.cssClass))
  //   return this.cssClass
  // }

}
</script>
