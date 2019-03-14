import { DrawerType } from '../mdc-drawer'
import { ScrollState } from '../vt-horizontal-list'

export class VtAppState{
  drawer:VtDrawerState = new VtDrawerState()
  topAppBarHeight:number = 0
  scrollTop:number = 0
  hScroll:ScrollState = {
    type:'',
    from:'',
    index:0,
    moveRate:0,
  }
}
export class VtDrawerState {
  drawerType:DrawerType | 'auto' = 'auto'
  open:boolean = false
}
export class VtTabBarState{
  height:number = 0
}