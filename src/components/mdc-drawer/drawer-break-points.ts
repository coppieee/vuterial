import { DrawerType } from '.'
export interface DrawerBreakPointOption{
  query?:()=>boolean
  maxWidth?:number
  type:DrawerType
}
export class DrawerBreakPoints{
  _resizeListener:(e:UIEvent)=>void
  get drawerType():DrawerType{return this._drawerType}
  _drawerType:DrawerType = 'modal'
  constructor(){
    this._resizeListener = e=>this._onResize(e)
  }
  _onResize(e:UIEvent):void{
    
    this._justfy()
  }
  _justfy(){
    if(this._config === undefined){ return }
    for(const bp of this._config){
      if(bp.query === undefined && bp.maxWidth === undefined){
        this._emit(bp.type)
        return
      }
      if(bp.query !== undefined && bp.query()){
        this._emit(bp.type)
        return
      }
      if(bp.maxWidth !== undefined &&  window.innerWidth <= bp.maxWidth){
        return this._emit(bp.type)
      }
    }
    console.log('noting match')
    this._emit('modal')
  }
  _emit(drawerType:DrawerType){
    // console.log('emit',drawerType)
    this._drawerType = drawerType
    if(this._listener){
      this._listener(drawerType)
    }
  }
  _config!:DrawerBreakPointOption[]
  _listener?:(drawerType:string)=>void
  init(config:DrawerBreakPointOption[] = defaultDrawerConfig,listner:(drawerType:string)=>void = ()=>{}){
    this._config = config
    this._listener = listner
    window.addEventListener('resize',this._resizeListener)
    this._justfy()
  }
  destroy(){
    window.removeEventListener('resize',this._resizeListener)
  }
}
const defaultDrawerConfig:DrawerBreakPointOption[] = [
  {maxWidth:1023,type:'modal'},
  // {maxWidth:767,type:'dismissible'},
  {type:'dismissible'},
]