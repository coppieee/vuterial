declare module '@material/tab-bar'{
  import MDCFoundation from 'material__base/foundation'
  import MDCComponent from 'material__base/component'
  import MDCTabBarAdapter from '@material/tab-bar/adapter'
  import MDCTabBarFoundation from '@material/tab-bar/foundation'
  export class MDCTabBar extends  MDCComponent<MDCTabBarAdapter, MDCTabBarFoundation> {
    focusOnActivate:boolean
    useAutomaticActivation:boolean

    activateTab(index:number):void
  }
}