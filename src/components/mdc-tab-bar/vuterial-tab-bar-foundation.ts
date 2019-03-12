import {MDCTabBarFoundation, MDCTabBarAdapter} from '@material/tab-bar'
export class VuterialTabBarFoundation extends MDCTabBarFoundation{
  constructor(adapter?:Partial<MDCTabBarAdapter>){
    super(adapter)
    
  }
  getPreviousActiveTabIndex():number{
    return this.adapter_.getPreviousActiveTabIndex()
  }
  // copy from https://github.com/material-components/material-components-web/issues/4226
  activateTab(index:number){
    const previousActiveIndex = this.adapter_.getPreviousActiveTabIndex()
    // if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
    if ( index === previousActiveIndex) {
      return
    }

    if (previousActiveIndex > -1) {
      this.adapter_.deactivateTabAtIndex(previousActiveIndex)
      this.adapter_.activateTabAtIndex(index, this.adapter_.getTabIndicatorClientRectAtIndex(previousActiveIndex))
    } else {
      this.adapter_.activateTabAtIndex(index, this.adapter_.getTabIndicatorClientRectAtIndex(index))
    }

    this.scrollIntoView(index)

    this.adapter_.notifyTabActivated(index)
  }
}