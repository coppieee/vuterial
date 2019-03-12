<template>
  <component class="vt-horizontal-list" :class="cssClass_" :is="tag"
    @mousedown="mousedown_"
    @mousemove="mousemove_"
    >
    <slot/>
    <!-- <div class="vt-horizontal-list__contents">
      
    </div> -->
  </component>
</template>
<style lang="postcss" scoped>
.vt-horizontal-list{
  overflow-x:auto;
  width:100%;
  display: flex;
  flex-direction: row;
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
.vt-horizontal-list--animated{
}
</style>
<script lang="ts">
import { Component, Prop, Vue,Watch} from 'vue-property-decorator'
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

  touchStartItem_({screenX,screenY}:{screenX:number,screenY:number}){
    this.touchStartScrollLeft_ = this.$el.scrollLeft
    this.touchStartScreenX_ = screenX
    this.touchStartScreenY_ = screenY
    this.touchmoving_ = true
  }
  touchmoveItem_(currentScreenX:number){
    const time = Date.now()
    const index = this.scrollLeftIndex_
    const move = currentScreenX - this.touchStartScreenX_
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
    this.$el.scrollLeft = this.touchStartScrollLeft_ - move

    this.$emit('update:scrollMoveRate',scrollMoveRate)
  }
  async touchEndItem_(){
    
    const prevScrollLeft = this.$el.scrollLeft
    const {left} = this.$el.getBoundingClientRect()
    const rects = this.$children
      .map(x=>x.$el.getBoundingClientRect())
      .map(x=>({
        left:x.left - left + prevScrollLeft,
        width:x.width,
      }))
    const v = this.touchmoveSpeed_
    const innerWidth = this.$el.getBoundingClientRect().width
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
    const prevScrollLeft = this.$el.scrollLeft
    const {left} = this.$el.getBoundingClientRect()
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
      this.$el.scrollLeft = prevScrollLeft + diff * t*(2-t)
    }
  }
  
  touchstart_(e:TouchEvent){
    if(!this.touchScroll || !this.scroll){return}
    // if(e.cancelable){
    //   e.preventDefault()
    // }
    this.beforeTouchMove_ = true
    const touch = e.touches[0]
    this.touchStartItem_(touch)
  }

  touchmove_(e:TouchEvent){
    if(!this.touchScroll || !this.scroll){return}

    const currentTouch = e.touches[0]
    if(this.beforeTouchMove_){
      const diffX = Math.abs(currentTouch.screenX - this.touchStartScreenX_)
      const diffY = Math.abs(currentTouch.screenY - this.touchStartScreenY_)
      this.isHorizontalMove_ = diffX > diffY
      this.beforeTouchMove_ = false
    }
    if(!this.isHorizontalMove_){
      return
    }
    if(e.cancelable){
      e.preventDefault()
    }
    this.touchmoveItem_(currentTouch.screenX)
  }
  touchendListener_ = (e:TouchEvent)=>{this.touchend_(e)}
  async touchend_(e:TouchEvent){
    if(!this.touchScroll || !this.scroll){return}
    if(!this.isHorizontalMove_){ return }
    if(e.cancelable){
      e.preventDefault()
    }
    this.touchEndItem_()
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
    this.touchmoveItem_(e.screenX)
  }
  mouseup_(e:MouseEvent){
    if(!this.mouseScroll || !this.scroll){return}
    if(!this.isMouseDown_){return}
    this.touchEndItem_()
    this.isMouseDown_ = false
  }
  mounted(){
    window.addEventListener('mouseup',this.mouseup_)
    this.$el.addEventListener('touchstart',this.touchstart_,{passive:false})
    this.$el.addEventListener('touchmove',this.touchmove_,{passive:false})
    this.$el.addEventListener('touchend',this.touchendListener_,{passive:false})
    this.scrollLeftToItemIndex(this.scrollLeftIndex)
  }
  beforeDestroy(){
    window.removeEventListener('mouseup',this.mouseup_)
    this.$el.removeEventListener('touchstart',this.touchstart_)
    this.$el.removeEventListener('touchmove',this.touchmove_)
    this.$el.removeEventListener('touchend',this.touchendListener_)
  }
}
</script>
