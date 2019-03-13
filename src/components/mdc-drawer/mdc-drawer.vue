<template>
  <div v-if="currentDrawerType==='modal'" class="vt-drawer-root">
    <aside class="mdc-drawer mdc-drawer--modal vt-drawer" ref="mdcModalDrawer" key="drawer">
      <slot/>
    </aside>
    <div class="mdc-drawer-scrim"></div>
  </div>
  <div v-else class="vt-drawer-root">
    <aside class="mdc-drawer vt-drawer" 
      :class="{
          'vt-drawer--dismissible':currentDrawerType === 'dismissible',
          'vt-drawer-open':drawerOpen_,
          'vt-drawer-animation':drawerAnimation_,
          'vt-drawer-close':drawerClose_,
      }"
      key="drawer">
      <slot/>
    </aside>
    <div class="vt-drawer-area"
    :class="{
      'vt-drawer-open':drawerOpen_,
      'vt-drawer-animation':drawerAnimation_,
      'vt-drawer-close':drawerClose_,
    }"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {MDCDrawer} from '@material/drawer'
import {DrawerType} from './'
import { DrawerBreakPoints } from '@/components/mdc-drawer/drawer-break-points'
@Component({})
export default class MdcDrawer extends Vue{
  @Prop({default:false,type:Boolean}) dismissible!:boolean
  @Prop({default:false,type:Boolean}) modal!:boolean
  @Prop({default:false,type:Boolean}) permanent!:boolean
  @Prop({default:false,type:Boolean}) open!:boolean
  @Prop({default:true}) js!:boolean
  @Prop({default:undefined,type:String}) drawerType?:DrawerType | 'auto'

  get currentDrawerType():DrawerType{
    if(this.drawerType !== undefined){
      if(this.drawerType !== 'auto'){
        return this.drawerType
      }
      return this.breakPoints_.drawerType
    }
    if(this.modal){ return 'modal' }
    if(this.dismissible) { return 'dismissible' }
    if(this.permanent){ return 'permanent' }
    return 'modal'
  }

  mdcDrawer_?:MDCDrawer
  breakPoints_:DrawerBreakPoints = new DrawerBreakPoints()
  closeListener_ = ()=>{this.onClose_()}
  drawerAnimation_:boolean = false
  drawerOpen_:boolean = false
  drawerClose_:boolean = false

  constructor(){
    super()
  }
  @Watch('currentDrawerType') changeDrawerType(to:string,from:string){
    this.mountDrawer_()
  }
  @Watch('open') async onOpen_(){
    if(this.mdcDrawer_ !== undefined && this.currentDrawerType === 'modal'){
      this.mdcDrawer_.open = this.open
    }else if(this.currentDrawerType === 'dismissible'){
      this.drawerOpen_ =  !this.open
      this.drawerClose_ = this.open
      await this.$nextTick()
      this.drawerAnimation_ = true
      await this.$nextTick()
      this.drawerOpen_ =  this.open
      this.drawerClose_ = !this.open
    }
  }
  onClose_(){
    this.$emit('update:open',false)
  }
  async mountDrawer_(){
    if(this.currentDrawerType === 'modal' && this.mdcDrawer_ === undefined){
      await this.$nextTick()
      const el = this.$refs.mdcModalDrawer as Element
      this.mdcDrawer_ = MDCDrawer.attachTo(el)
      this.$emit('update:open',false)
    }else if(this.currentDrawerType !== 'modal'){
      if(this.mdcDrawer_ !== undefined){
        this.mdcDrawer_.destroy()
        this.mdcDrawer_ = undefined
      }
      this.$emit('update:open',true)
    }
  }
  mounted(){
    this.breakPoints_.init()
    if(this.js){
      document.body.addEventListener('MDCDrawer:closed', this.closeListener_)
      this.mountDrawer_()
    }
  }
  beforeDestory(){
    if(this.mdcDrawer_ !== undefined){
      this.mdcDrawer_.destroy()
    }
    document.body.removeEventListener('MDCDrawer:closed',this.closeListener_)
    this.breakPoints_.destroy()
  }
}
</script>
<style lang="postcss" scoped>
.vt-drawer-root{
  height:100%;
}
.vt-drawer{
  overflow: auto;
  height: 100%;
}
.vt-drawer-area{
  width:260px;
}
.vt-drawer--dismissible{
  height:calc(100% - 64px);
  position:fixed;
}
.vt-drawer--open{
  transform: translateX(0);
  margin-right:0;
}
.vt-drawer-close{
  transform: translateX(-100%);
  margin-right:-255px;

}
.vt-drawer-animation{
  transition:transform 0.2s, margin-right 0.2s;
}
</style>

