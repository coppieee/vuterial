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
      <mdc-top-app-bar-section align-start>
        <mdc-top-app-bar-action-item @click.native="emitClickLeftAction_()">{{leftActionIcon}}</mdc-top-app-bar-action-item>
        <mdc-top-app-bar-title>
          <slot name="title"/>
        </mdc-top-app-bar-title>
      </mdc-top-app-bar-section>
      <mdc-top-app-bar-section align-end role="toolbar">
        <slot name="aling-end"/>
      </mdc-top-app-bar-section>
    </div>
    <div class="vt-top-app-bar__tab-bar" v-if="$slots['tab-bar'] !== undefined">
      <slot name="tab-bar"/>
    </div>
  </component>
</template>
<style lang="postcss" scoped>
.vt-top-app-bar{
  position: absolute;
  left: 0;
  right:0;
}
.vt-top-app-bar--animating{
  transition: transform 0.2s;
}
.vt-top-app-bar__tab-bar{
  
}
</style>

<script lang="ts">
import { Component, Prop, Vue ,Watch } from 'vue-property-decorator'
import { VtAppState } from '@/components/vt-app/vt-app-state'
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
  @Prop({default:undefined,type:String}) leftActionIcon?:string

  emitUpdateHeight(){
    const height = this.top_ + this.$el.clientHeight
    this.$emit('update:height',height)
  }
  emitClickLeftAction_(){
    this.$emit('clickLeftAction')
  }

  @Watch('scrollTop') onScrollTop_(){
    this.onScroll_()
  }
  prevScrollTop_:number = 0
  top_:number = 0
  animating_:boolean = true
  scrollTargetElement_?:HTMLElement
  timeoutId?:number
  state_:VtAppState = new VtAppState()

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
  }
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
    // const scrollTop = this.getScrollTop_()
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
    if(this.watchDocumentScrollTop){
      document.addEventListener('scroll',this.onScroll_)
    }
    this.emitUpdateHeight()
    // document.addEventListener('toucstart',this.onTouchStart_)
    // document.addEventListener('touchmove',this.onTouchMove_)
    // document.addEventListener('touchend',this.onTouchEnd_)
    
  }
  beforeDestroy() {
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
