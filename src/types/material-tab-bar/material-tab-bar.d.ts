declare module '@material/tab-bar'{
  import MDCFoundation from 'material__base/foundation'
  import MDCComponent from 'material__base/component'
  import MDCTabBarAdapter from '@material/tab-bar/adapter'
  import MDCTabBarFoundation from '@material/tab-bar/foundation'
  import {MDCTab, MDCTabFoundation} from '@material/tab/index'
  type MDCTabFactory = (el:Element)=>MDCTab
  type MDCTabScrollerFactory = (el:Element)=> any;//MDCTabScroller
  export class MDCTabBar extends  MDCComponent<MDCTabBarAdapter, MDCTabBarFoundation> {
    focusOnActivate:boolean
    useAutomaticActivation:boolean
    constructor(el:Element,foundation?:MDCTabBarFoundation,tabFactory?: MDCTabFactory,tabScrollerFactory?: MDCTabScrollerFactory)
    initialize(tabFactory?: MDCTabFactory,tabScrollerFactory?: MDCTabScrollerFactory):void
    initialSyncWithDOM():void
    destroy():void
    getDefaultFoundation():MDCTabBarFoundation
    activateTab(index: number):void
    scrollIntoView(index: number):void
  }
}