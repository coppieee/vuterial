declare module '@material/tab-bar/adapter'{
export default interface MDCTabBarAdapter{
  /**
   * Scrolls to the given position
   * @param {number} scrollX The position to scroll to
   */
  scrollTo(scrollX:number):void

  /**
   * Increments the current scroll position by the given amount
   * @param {number} scrollXIncrement The amount to increment scroll
   */
  incrementScroll(scrollXIncrement:number):void

  /**
   * Returns the current scroll position
   * @return {number}
   */
  getScrollPosition():number

  /**
   * Returns the width of the scroll content
   * @return {number}
   */
  getScrollContentWidth():number

  /**
   * Returns the root element's offsetWidth
   * @return {number}
   */
  getOffsetWidth():number

  /**
   * Returns if the Tab Bar language direction is RTL
   * @return {boolean}
   */
  isRTL():boolean

  /**
   * Sets the tab at the given index to be activated
   * @param {number} index The index of the tab to activate
   */
  setActiveTab(index:number):void

  /**
   * Activates the tab at the given index with the given client rect
   * @param {number} index The index of the tab to activate
   * @param {!ClientRect} clientRect The client rect of the previously active Tab Indicator
   */
  activateTabAtIndex(index:number, clientRect:ClientRect):void

  /**
   * Deactivates the tab at the given index
   * @param {number} index The index of the tab to deactivate
   */
  deactivateTabAtIndex(index:number):void

  /**
   * Focuses the tab at the given index
   * @param {number} index The index of the tab to focus
   */
  focusTabAtIndex(index:number):void

  /**
   * Returns the client rect of the tab's indicator
   * @param {number} index The index of the tab
   * @return {!ClientRect}
   */
  getTabIndicatorClientRectAtIndex(index:number):ClientRect

  /**
   * Returns the tab dimensions of the tab at the given index
   * @param {number} index The index of the tab
   * @return {!MDCTabDimensions}
   */
  getTabDimensionsAtIndex(index:number):any

  /**
   * Returns the length of the tab list
   * @return {number}
   */
  getTabListLength():number

  /**
   * Returns the index of the previously active tab
   * @return {number}
   */
  getPreviousActiveTabIndex():number

  /**
   * Returns the index of the focused tab
   * @return {number}
   */
  getFocusedTabIndex():number

  /**
   * Returns the index of the given tab
   * @param {string} id The ID of the tab whose index to determine
   * @return {number}
   */
  getIndexOfTabById(id:string):number

  /**
   * Emits the MDCTabBar:activated event
   * @param {number} index The index of the activated tab
   */
  notifyTabActivated(index:number):void
}
}