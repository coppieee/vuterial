<template>
  <component class="vt-horizontal-list" :is="tag"
    @mousedown="mousedown_"
    @mousemove="mousemove_"
    >
    <div class="vt-horizontal-list__scroll-area" :class="cssClass_" ref="scrollArea">
      <slot/>
    </div>
    <div class="vt-horizontal-list__event-guard" :class="eventGuardCssClass_"></div>
    <!-- <div class="vt-horizontal-list__contents">
      
    </div> -->
  </component>
</template>
<style lang="postcss" scoped>
.vt-horizontal-list{
  position:relative;
  width:100%;
  height:100%;
}
.vt-horizontal-list__scroll-area{
  /* width:100%; */
  /* height:100%; */
  overflow-x:auto;
  display: flex;
  flex-direction: row;
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
  /* height: 6px; */
  opacity: 0;
  transition: background-color 0.2s;
  /* background-color:rgba(0,0,0,0); */
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
  /* background-color:rgba(0,0,0,.5) */
}
.vt-horizontal-list__event-guard--moving{
  display:block;
}
</style>
<script lang="ts">
import { Component, Prop, Vue,Watch} from 'vue-property-decorator'
interface ScreenPoint{screenX:number,screenY:number}
@Component({})
export default class VtHorizontalList extends Vue{
  @Prop({default:'div'}) tag!:string
  @Prop({default:-1}) maxScroll!:number
  @Prop({default:true,type:Boolean}) customScrollBar!:boolean
  @Prop({default:true,type:Boolean}) scrollBar!:boolean
  // @Prop({default:'move',type:String}) scrollBarVisibleType!:'always'|'move'
  @Prop({default:true,type:Boolean}) mouseScroll!:boolean
  @Prop({default:true,type:Boolean}) touchScroll!:boolean
  @Prop({default:true,type:Boolean}) scroll!:boolean
  @Prop({default:0,type:Number}) scrollLeftIndex!:number
  scrollLeftIndex_:number = 0
  scrollLeftRect_:{left:number,width:number} = {left:0,width:0}
  @Prop({default:0,type:Number}) scrollMoveRate!:number
  get eventGuardCssClass_(){
    return {
      'vt-horizontal-list__event-guard--moving':this.touchmoving_,
    }
  }
  get cssClass_(){
    return {
      'vt-horizontal-list--scroll-hidden':!this.scroll,
      'vt-horizontal-list--moving':this.touchmoving_,
      'vt-horizontal-list__scrollbar--hidden':!this.scrollBar,
      'vt-hoeizontal-list__custom-scrollbar':this.customScrollBar,
    }
  }
  get styles_(){
    return {}
  }
  get scrollAreaRef_(){
    return this.$refs.scrollArea as Element
  }
  @Watch('scrollLeftIndex') async onScrollLeftIndex_(to:number,from:number){
    if(to === -1){return}
    if(to === from){return}
    // this.scrollLeftIndex_ = to
    await this.scrollLeftToItemIndex(to)
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
    const time = Date.now()
    const index = this.scrollLeftIndex_
    const move = currentScreenX - this.touchStartScreenX_
    // console.log('move',move)
    let scrollMoveRate = -move/this.scrollLeftRect_.width
    if(index +scrollMoveRate < 0){
      scrollMoveRate = 0
    }
    if(index + scrollMoveRate +1> this.$children.length){
      scrollMoveRate = this.$children.length -index -1
    }
    // console.log('scrollRate',scrollRate)
    this.touchmoveSpeed_ = (currentScreenX - this.touchmoveScreenX_) / (time - this.touchmoveTime_)
    this.touchmoveScreenX_ = currentScreenX
    this.touchmoveTime_ = time
    this.scrollAreaRef_.scrollLeft = this.touchStartScrollLeft_ - move

    this.$emit('update:scrollMoveRate',scrollMoveRate)
  }
  async touchEndItem_(event:Event){
    if(!this.isHorizontalMove_){ return }
    if(event.cancelable){
      event.preventDefault()
    }
    const prevScrollLeft = this.scrollAreaRef_.scrollLeft
    const {left} = this.scrollAreaRef_.getBoundingClientRect()
    const rects = this.$children
      .map(x=>x.$el.getBoundingClientRect())
      .map(x=>({
        left:x.left - left + prevScrollLeft,
        width:x.width,
      }))
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
        }
        this.$emit('update:scrollLeftIndex',i)
        await this.scrollLeftToItemIndex(i)
        break
      }
    }
    this.touchmoving_ = false
    // this.scrollLeftIndex_ = index
    
  }
  async scrollLeftToItemIndex(index:number){
    const prevScrollLeft = this.scrollAreaRef_.scrollLeft
    const {left} = this.scrollAreaRef_.getBoundingClientRect()
    const rect = [this.$children[index]]
      .map(x=>x.$el.getBoundingClientRect())
      .map(x=>({
        left:x.left - left + prevScrollLeft,
        width:x.width,
      }))[0]
    this.scrollLeftRect_ = rect
    this.scrollLeftIndex_ = index
    const diff = rect.left - prevScrollLeft
    const max = 15
    for(let i=0;i<max;i++){
      await new Promise(resolve=>setTimeout(resolve,17))
      const t = (i+1)/max
      this.scrollAreaRef_.scrollLeft = prevScrollLeft + diff * t*(2-t)
    }
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
  mounted(){
    window.addEventListener('mouseup',this.mouseupWindow_)
    this.$el.addEventListener('touchstart',this.touchstart_,{passive:false})
    this.$el.addEventListener('touchmove',this.touchmove_,{passive:false})
    this.$el.addEventListener('touchend',this.touchendListener_,{passive:false})
    this.scrollLeftToItemIndex(this.scrollLeftIndex)
  }
  beforeDestroy(){
    window.removeEventListener('mouseup',this.mouseupWindow_)
    this.$el.removeEventListener('touchstart',this.touchstart_)
    this.$el.removeEventListener('touchmove',this.touchmove_)
    this.$el.removeEventListener('touchend',this.touchendListener_)
  }
}
</script>
