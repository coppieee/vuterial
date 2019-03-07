declare module '@material/tab-indicator'{
  import MDCFoundation from 'material__base/foundation'
  import MDCComponent from 'material__base/component'
  import {MDCTabIndicatorAdapter} from '@material/tab-indicator'
  import {MDCTabIndicatorFoundation} from '@material/tab-indicator'
  export type MDCTabIndicatorFactory = (el: Element, foundation?: MDCTabIndicatorFoundation) => MDCTabIndicator;
  export class MDCTabIndicator extends  MDCComponent<MDCTabIndicatorAdapter, MDCTabIndicatorFoundation> {
    constructor(root:Element,foundation?:MDCTabIndicatorFoundation)
    initialize():void
    computeContentClientRect(): ClientRect
    getDefaultFoundation():MDCTabIndicatorFoundation
    activate(previousIndicatorClientRect?: ClientRect):void
    deactivate():void
  }
}