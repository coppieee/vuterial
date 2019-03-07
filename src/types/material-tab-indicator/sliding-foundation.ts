declare module '@material/tab-indicator'{
  import {MDCTabIndicatorFoundation} from '@material/tab-indicator'

  /* istanbul ignore next: subclass is not a branch statement */
  export class MDCSlidingTabIndicatorFoundation extends MDCTabIndicatorFoundation{
    activate():void
    deactivate():void
  }
}