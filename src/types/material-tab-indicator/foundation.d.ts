
declare module '@material/tab-indicator'{
  import MDCFoundation from 'material__base/foundation'
  import {MDCTabIndicatorAdapter} from '@material/tab-indicator'
  export abstract class MDCTabIndicatorFoundation extends MDCFoundation<MDCTabIndicatorAdapter>{
    static defaultAdapter: MDCTabIndicatorAdapter
    constructor(adapter?: Partial<MDCTabIndicatorAdapter>)
    computeContentClientRect(): ClientRect
  
    abstract activate(previousIndicatorClientRect?: ClientRect): void;
    abstract deactivate(): void;
  }
  export default MDCTabIndicatorFoundation
}