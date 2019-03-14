<template>
  <component :is="tag" class="mdc-top-app-bar vt-top-app-bar"
  :class="{
    'mdc-top-app-bar--short':short,
    'mdc-top-app-bar--short-collapsed':shortCollapsed,
    'mdc-top-app-bar--fixed':fixed,
    'mdc-top-app-bar--prominent':prominent,
    'mdc-top-app-bar--dense':dense,
    'vt-top-app-bar--animating':animating_,
  }"
  :style="{
    transform:'translateY('+top_+'px)',
  }">
    <div class="mdc-top-app-bar__row" ref="topAppBarRow">
      <slot/>
    </div>
    <div class="vt-top-app-bar__tab-bar" v-if="$slots['tab-bar'] !== undefined">
      <slot name="tab-bar"/>
    </div>
    <!-- <div>hello</div> -->
  </component>
</template>
<style lang="postcss" scoped>
.vt-top-app-bar{
  position: fixed;
}
.vt-top-app-bar--animating{
  transition: transform 0.2s;
}
.vt-top-app-bar__tab-bar{
  
}
</style>

<script lang="ts">
import { Component, Prop, Vue ,Watch, Emit } from 'vue-property-decorator'
// import {MDCTopAppBar} from '@material/top-app-bar/index'
@Component<MdcTopAppBar>({})
export default class MdcTopAppBar extends Vue{
  @Prop({default:'header'}) tag!:string
  @Prop({default:false,type:Boolean}) short!:boolean
  @Prop({default:false,type:Boolean}) shortCollapsed!:boolean
  @Prop({default:false,type:Boolean}) fixed!:boolean
  @Prop({default:false,type:Boolean}) prominent!:boolean
  @Prop({default:false,type:Boolean}) dense!:boolean
  @Prop({default:true,type:Boolean}) watchDocumentScrollTop!:boolean
  @Prop({default:0,type:Number}) scrollTop!:number
  // @Prop({default:0,type:Number}) height!:number

  emitUpdateHeight(){
    const height = this.top_ + this.$el.clientHeight
    this.$emit('update:height',height)
  }
  

  @Watch('scrollTop') onScrollTop_(){
    this.onScroll_()
  }
  // topAppBar_!:MDCTopAppBar
  prevScrollTop_:number = 0
  top_:number = 0
  animating_:boolean = true
  scrollTargetElement_?:HTMLElement
  timeoutId?:number

  get topAppBarRow_():HTMLElement{
    return this.$refs.topAppBarRow as HTMLElement
  }
  getScrollTop_():number{
    if(this.watchDocumentScrollTop){
      const el = document.scrollingElement
      if(el === null){return 0}
      return el.scrollTop
    }else{
      return this.scrollTop
    }
    // const e = this.scrollTargetElement_ || document.scrollingElement
    // if(e === null){return 0}
    // return e.scrollTop
  }
  // setScrollTargetElement(el:HTMLElement){
  //   document.removeEventListener('scroll',this.onScroll_)
  //   if(this.scrollTargetElement_ !== undefined){
  //     this.scrollTargetElement_.removeEventListener('scroll',this.onScroll_)
  //   }
  //   this.scrollTargetElement_ = el
  //   el.addEventListener('scroll',this.onScroll_)
  // }
  onScroll_(){
    if(this.timeoutId !== undefined){
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
    const targetScrollTop = this.getScrollTop_()
    const height = this.topAppBarRow_.clientHeight
    const scrollTop = - targetScrollTop
    const diff = this.prevScrollTop_- scrollTop
    this.top_ -= diff
    if(this.top_ < -height){
      this.top_ = -height
    }
    if(this.top_ > 0){
      this.top_ = 0
    }

    this.prevScrollTop_ = scrollTop
    this.emitUpdateHeight()
    this.timeoutId = setTimeout(async ()=>{
      this.timeoutId = undefined
      await this.scrollEnd_()
    },220)
  }
  async scrollEnd_(){
    const scrollTop = this.getScrollTop_()
    const height = this.topAppBarRow_.clientHeight
    this.animating_ = true
    await this.$nextTick()
    if(- this.top_ < height){
      this.top_ = 0
    }else{
      this.top_ = -height
    }
    this.emitUpdateHeight()
    // this.isTouching = false
    await new Promise(resolve=>setTimeout(resolve,200))
    // await this.$nextTick()
    // await this.$nextTick()
    this.animating_ = false
  }
  // isTouching:boolean = false
  // onTouchStart_(){
  //   this.isTouching = true
  // }
  // onTouchMove_(){
  //   this.onScroll_()
  // }
  // async onTouchEnd_(){
  //   const scrollTop = this.getScrollTop_()
  //   const height = this.$el.clientHeight
  //   this.animating_ = true
  //   // await this.$nextTick()
  //   await this.$nextTick()
  //   // await new Promise(resolve=>setTimeout(resolve,34))
  //   if(- this.top_ < height /2){
  //     this.top_ = 0
  //   }else{
  //     this.top_ = -height
  //   }
  //   this.isTouching = false
  //   await new Promise(resolve=>setTimeout(resolve,200))
  //   // await this.$nextTick()
  //   // await this.$nextTick()
  //   this.animating_ = false
  // }
  mounted(){
    // this.topAppBar_ = new MDCTopAppBar(this.$el)
    if(this.watchDocumentScrollTop){
      document.addEventListener('scroll',this.onScroll_)
    }
    // document.addEventListener('toucstart',this.onTouchStart_)
    // document.addEventListener('touchmove',this.onTouchMove_)
    // document.addEventListener('touchend',this.onTouchEnd_)
    
  }
  beforeDestroy() {
    // this.topAppBar_.destroy()
    document.removeEventListener('scroll',this.onScroll_)
    if(this.scrollTargetElement_){
      this.scrollTargetElement_.removeEventListener('scroll',this.onScroll_)
    }
    // document.removeEventListener('toucstart',this.onTouchStart_)
    // document.removeEventListener('toucmove',this.onTouchMove_)
    // document.removeEventListener('touchend',this.onTouchEnd_)
  }
}
</script>
