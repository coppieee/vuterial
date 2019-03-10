import {MDCTabIndicatorFoundation} from '@material/tab-indicator/index'

const timeout = (time:number)=> new Promise(resolve=> setTimeout(resolve,time))
const nexTick = ()=>new Promise(resolve=>requestAnimationFrame(resolve))
export class VuterialSlidingTabIndicatorFoundation extends MDCTabIndicatorFoundation{
  async activate(previousIndicatorClientRect?: ClientRect) {
    if (!previousIndicatorClientRect) {
      this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE)
      return
    }

    const currentClientRect = this.computeContentClientRect()
    const widthDelta = previousIndicatorClientRect.width / currentClientRect.width
    const xPosition = previousIndicatorClientRect.left - currentClientRect.left
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION)
    this.adapter_.setContentStyleProperty('transform', `translateX(${xPosition}px) scaleX(${widthDelta})`)

    // this.computeContentClientRect()
    await nexTick()
    await nexTick()
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION)
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE)
    await nexTick()
    this.adapter_.setContentStyleProperty('transform', '')
  }

  async deactivate() {
    await nexTick()
    await nexTick()
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE)
  }
}