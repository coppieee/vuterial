<template>
  <component class="vt-horizontal-list" :is="tag"
    @mousedown="mousedown_"
    @mousemove="mousemove_"
    >
    <div class="vt-horizontal-list__scroll-area" :class="cssClass_" ref="scrollArea" :style="styles_">
      <slot/>
    </div>
    <div class="vt-horizontal-list__event-guard" :class="eventGuardCssClass_"></div>
  </component>
</template>
<style lang="postcss" scoped>
.vt-horizontal-list{
  position:relative;
  height:100%;
}
.vt-horizontal-list__scroll-area{
  overflow-x:auto;
  display: flex;
  flex-direction: row;
  height:inherit;
}
.vt-horizontal-list__scroll-area--fit-displayed-contents-height{
  overflow-y:hidden;
  transition:height 0.1s;
  align-items:flex-start;
}
.vt-horizontal-list--moving{
  user-select: none;
}
.vt-horizontal-list--scroll-hidden{
  overflow-x:hidden;
}
.vt-horizontal-list__scrollbar--hidden::-webkit-scrollbar{
  display:none;
}
.vt-hoeizontal-list__custom-scrollbar::-webkit-scrollbar{
  overflow:hidden;
  width:3px;
  background:#fafafa;
}
.vt-hoeizontal-list__custom-scrollbar::-webkit-scrollbar:horizontal{
  height:10px;
}
.vt-hoeizontal-list__custom-scrollbar::-webkit-scrollbar-button{
  width:0;
  height:0;
  display:none;
}
.vt-hoeizontal-list__custom-scrollbar.vt-horizontal-list--moving::-webkit-scrollbar-thumb{
  opacity:1;
  border: 4px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}
.vt-hoeizontal-list__custom-scrollbar::-webkit-scrollbar-thumb {
  opacity: 0;
  transition: background-color 0.2s;
  background-clip: padding-box;
  border-radius: 7px;

}
.vt-hoeizontal-list__custom-scrollbar::-webkit-scrollbar-corner{
  background:#333;
}
.vt-horizontal-list__contents{

}
.vt-horizontal-list__event-guard{
  display: none;
  position:absolute;
  top:0;
  left: 0;
  width:100%;
  height:100%;
}
.vt-horizontal-list__event-guard--moving{
  display:block;
}
</style>
<script lang="ts">

import { Component, Prop, Vue,Watch} from 'vue-property-decorator'
import {ScrollState} from './index'
interface ScreenPoint{screenX:number,screenY:number}
@Component<VtHorizontalList>({})
export default class VtHorizontalList extends Vue{
  @Prop({default:'div'}) tag!:string
  @Prop({default:-1}) maxScroll!:number
  @Prop({default:true,type:Boolean}) customScrollBar!:boolean
  @Prop({default:false,type:Boolean}) scrollBar!:boolean
  // @Prop({default:'move',type:String}) scrollBarVisibleType!:'always'|'move'
  @Prop({default:true,type:Boolean}) mouseScroll!:boolean
  @Prop({default:true,type:Boolean}) touchScroll!:boolean
  @Prop({default:true,type:Boolean}) scroll!:boolean
  @Prop({default:false,type:Boolean}) fitDisplayedContentsHeight!:boolean
  scrollLeftIndex_:number = 0
  scrollLeftRect_:{left:number,width:number} = {left:0,width:0}

  @Prop({default:()=>({type:'',from:'',index:-1,moveRate:0}) }) scrollState!:ScrollState

  get eventGuardCssClass_(){
    return {
      'vt-horizontal-list__event-guard--moving':this.touchmoving_,
    }
  }
  get styles_(){
    return {
      height:this.height_==-1?'inherit':this.height_ + 'px',
    }
  }
  height_:number = -1
  get cssClass_(){
    return {
      'vt-horizontal-list--scroll-hidden':!this.scroll,
      'vt-horizontal-list--moving':this.touchmoving_,
      'vt-horizontal-list__scrollbar--hidden':!this.scrollBar,
      'vt-hoeizontal-list__custom-scrollbar':this.customScrollBar,
      'vt-horizontal-list__scroll-area--fit-displayed-contents-height':this.fitDisplayedContentsHeight,
    }
  }
  get scrollAreaRef_(){
    const ref = this.$refs.scrollArea as HTMLElement
    if(ref === undefined){
      throw new Error('scrollArea is undefined.')
    }
    return ref
  }
  @Watch('scrollState') async onScrollState(state:ScrollState){
    if(state.type === 'init-index'){
      await this.scrollLeftToItemIndex(state.index,false)
    }
    else if(state.type === 'update-index'){
      if(this.scrollLeftIndex_ === state.index){ return}
      await this.scrollLeftToItemIndex(state.index)
    }else if(state.type === 'update-move-rate'){
      // skip
    }
  }
  touchmoving_:boolean = false
  touchStartScreenX_:number = 0
  touchStartScreenY_:number = 0
  touchStartScrollLeft_:number = 0
  touchmoveScreenX_:number = 0
  touchmoveTime_:number = 0
  touchmoveSpeed_:number = 0
  beforeTouchMove_:boolean = false
  isHorizontalMove_:boolean = false

  updateIsHorizontalMove_({screenX,screenY}:ScreenPoint){
    const diffX = Math.abs(screenX - this.touchStartScreenX_)
    const diffY = Math.abs(screenY - this.touchStartScreenY_)
    this.isHorizontalMove_ = diffX > diffY
  }

  touchStartItem_({screenX,screenY}:ScreenPoint){
    this.beforeTouchMove_ = true
    this.touchStartScrollLeft_ = this.scrollAreaRef_.scrollLeft
    this.touchStartScreenX_ = screenX
    this.touchStartScreenY_ = screenY
    this.touchmoveSpeed_ = 0
    // this.touchmoving_ = true
  }
  touchmoveItem_(event:Event,screenPoint:ScreenPoint){
    const time = Date.now()
    if(this.beforeTouchMove_){
      this.updateIsHorizontalMove_(screenPoint)
      this.beforeTouchMove_ = false
    }
    if(!this.isHorizontalMove_){
      return
    }
    if(event.cancelable){
      event.preventDefault()
    }
    this.touchmoving_ = true
    const currentScreenX = screenPoint.screenX
    const index = this.scrollLeftIndex_
    const move = currentScreenX - this.touchStartScreenX_
    let scrollMoveRate = -move/this.scrollLeftRect_.width
    if(index +scrollMoveRate < 0){
      scrollMoveRate = 0
    }
    const items = this.getListItems_()
    if(index + scrollMoveRate +1> items.length){
      scrollMoveRate = items.length -index -1
    }
    this.touchmoveSpeed_ = (currentScreenX - this.touchmoveScreenX_) / (time - this.touchmoveTime_)
    this.touchmoveScreenX_ = currentScreenX
    this.touchmoveTime_ = time
    this.scrollAreaRef_.scrollLeft = this.touchStartScrollLeft_ - move
    this.updateScrollAreaHeight_()
    this.$emit('update:scrollMoveRate',scrollMoveRate)
    this.$emit('update:scrollState',{
      from:'horizontal-list',
      index,
      moveRate:scrollMoveRate,
      type:'update-move-rate',
    }as ScrollState)
  }
  async touchEndItem_(event:Event){
    if(!this.isHorizontalMove_){ return }
    if(event.cancelable){
      event.preventDefault()
    }
    const prevScrollLeft = this.scrollAreaRef_.scrollLeft
    const rects = this.getItemRects_()
    const v = this.touchmoveSpeed_
    const innerWidth = this.scrollAreaRef_.getBoundingClientRect().width
    const rectWidth = rects[0].width
    const movePointScrollLeft = (prevScrollLeft -v * rectWidth * 2)
    let diffScrollLeft = movePointScrollLeft - this.touchStartScrollLeft_
    const max = innerWidth * 2 - rectWidth
    if(Math.abs(diffScrollLeft) >max){
      diffScrollLeft = Math.sign(diffScrollLeft)* max
    }
    const targetScrollLeft = this.touchStartScrollLeft_ + diffScrollLeft

    for(let i=0;i<rects.length;i++){
      const rect = rects[i]
      if( rect.left - rect.width/2 < targetScrollLeft && targetScrollLeft <= rect.left + rect.width/2){
        if(this.scrollLeftIndex_ === i){
          this.$emit('update:scrollMoveRate',0)
          const state:ScrollState = {
            from:'horizontal-list',
            index:i,
            type:'update-move-rate',
            moveRate:0,
          }
          this.$emit('update:scrollState',state)
        }
        this.$emit('update:scrollLeftIndex',i)
        this.$emit('update:scrollState',{
          from:'horizontal-list',
          index:i,
          type:'update-index',
          moveRate:0,
        } as ScrollState)
        await this.scrollLeftToItemIndex(i)
        break
      }
    }
    this.updateScrollAreaHeight_()
    this.touchmoving_ = false
  }
  async scrollLeftToItemIndex(index:number,transition:boolean = true){
    const prevScrollLeft = this.scrollAreaRef_.scrollLeft
    const {left} = this.scrollAreaRef_.getBoundingClientRect()
    const child = this.getListItems_()[index]
    if(child === undefined){
      throw new Error(`vt-horizontal-list index:${index} child is undefined`)
    }
    const childRect = child.getBoundingClientRect()
    const rect = {
      left:childRect.left - left + prevScrollLeft,
      width:childRect.width,
    }
    this.scrollLeftRect_ = rect
    this.scrollLeftIndex_ = index
    const diff = rect.left - prevScrollLeft
    const max = transition ? 15:0
    for(let i=0;i<max;i++){
      const t = (i)/max
      this.scrollAreaRef_.scrollLeft = prevScrollLeft + diff * t*(2-t)
      await new Promise(resolve=>setTimeout(resolve,17))
    }
    this.scrollAreaRef_.scrollLeft = prevScrollLeft + diff
    this.updateScrollAreaHeight_()
  }
  
  touchstart_(e:TouchEvent){
    if(!this.touchScroll || !this.scroll){return}
    // if(e.cancelable){
    //   e.preventDefault()
    // }
    
    const touch = e.touches[0]
    this.touchStartItem_(touch)
  }

  touchmove_(e:TouchEvent){
    if(!this.touchScroll || !this.scroll){return}

    const currentTouch = e.touches[0]
    
    this.touchmoveItem_(e,currentTouch)
  }
  touchendListener_ = (e:TouchEvent)=>{this.touchend_(e)}
  async touchend_(e:TouchEvent){
    if(!this.touchScroll || !this.scroll){return}

    this.touchEndItem_(e)
  }
  isMouseDown_:boolean = false
  mousedown_(e:MouseEvent){
    if(!this.mouseScroll || !this.scroll){return}
    this.isMouseDown_ = true
    this.touchStartItem_(e)
  }
  mousemove_(e:MouseEvent){
    if(!this.mouseScroll || !this.scroll){return}
    if(!this.isMouseDown_){ return }
    this.touchmoveItem_(e,e)
  }
  mouseupWindow_(e:MouseEvent){
    if(!this.mouseScroll || !this.scroll){return}
    if(!this.isMouseDown_){return}
    this.touchEndItem_(e)
    this.isMouseDown_ = false
  }
  getListItems_():HTMLElement[]{
    return this.$children
      .filter(x=>x.$el.classList.contains('vt-horizontal-list-item'))
      .map(x=>x.$el as HTMLElement)
  }
  getItemRects_():{left:number,width:number,outerHeight:number}[]{
    const prevScrollLeft = this.scrollAreaRef_.scrollLeft
    const {left} = this.scrollAreaRef_.getBoundingClientRect()

    return this.getListItems_()
      .map(x=>{
        const boundingRect = x.getBoundingClientRect()
        const {marginTop,marginRight,marginBottom,marginLeft} = window.getComputedStyle(x)
        const mtop = marginTop === null ? 0 : Number.parseFloat(marginTop)
        const mbottom = marginBottom === null? 0 : Number.parseFloat(marginBottom)
        return {
          left:boundingRect.left - left + prevScrollLeft,
          width:boundingRect.width,
          outerHeight:x.offsetHeight + mtop + mbottom,
          // offsetWidth:x.offsetWidth,
          // offsetHeight:x.offsetHeight,
          // height:boundingRect.height,
        }
      })
      // x.getBoundingClientRect())
      // .map(x=>({

    // }))
  }
  getItemMaxHeight_():number{
    const scrollLeft = this.scrollAreaRef_.scrollLeft
    const scrollAreaRect = this.scrollAreaRef_.getBoundingClientRect()
    const left = scrollAreaRect.left
    const width = Math.floor(scrollAreaRect.width)
    const rects = this.getItemRects_().filter(x=>
      x.left < scrollLeft + width && 
      scrollLeft < x.left + Math.floor(x.width))
    // console.log('getItemMaxHeight rect.lenth',rects.map(x=>{
    //   return `left:${x.left}, right:${x.left+x.width}, scrollLeft:${scrollLeft}, scrollRight:${scrollLeft+width}`
    // }))
    const height= rects.reduce((prev,c)=>Math.max(prev,c.outerHeight),0)
    return height
  }
  updateScrollAreaHeight_(){
    if(!this.fitDisplayedContentsHeight){return}
    const el = this.scrollAreaRef_
    const scrollBarHeight = el.offsetHeight - el.clientHeight
    const height = this.getItemMaxHeight_() + scrollBarHeight
    this.height_ = height
  }
  
  mounted(){
    window.addEventListener('mouseup',this.mouseupWindow_)
    const el = this.$el as HTMLElement
    el.addEventListener('touchstart',this.touchstart_,{passive:false})
    el.addEventListener('touchmove',this.touchmove_,{passive:false})
    el.addEventListener('touchend',this.touchendListener_,{passive:false})
    this.updateScrollAreaHeight_()
  }
  beforeDestroy(){
    window.removeEventListener('mouseup',this.mouseupWindow_)
    const el = this.$el as HTMLElement
    el.removeEventListener('touchstart',this.touchstart_)
    el.removeEventListener('touchmove',this.touchmove_)
    el.removeEventListener('touchend',this.touchendListener_)
  }
}
</script>
