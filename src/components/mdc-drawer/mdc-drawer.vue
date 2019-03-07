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
          'vt-drawer-open':drawerOpen,
          'vt-drawer-animation':drawerAnimation,
          'vt-drawer-close':drawerClose,
      }"
      key="drawer">
      <slot/>
    </aside>
    <div class="vt-drawer-area" :class="{
      'vt-drawer-open':drawerOpen,
      'vt-drawer-animation':drawerAnimation,
      'vt-drawer-close':drawerClose,
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
  mdcDrawer?:MDCDrawer

  @Prop({default:undefined}) drawerType?:DrawerType | 'auto'
  get currentDrawerType():DrawerType{
    if(this.drawerType !== undefined){
      if(this.drawerType !== 'auto'){
        return this.drawerType
      }
      console.log('breakPoints',this.breakPoints)
      return this.breakPoints.drawerType
    }
    if(this.modal){ return 'modal' }
    if(this.dismissible) { return 'dismissible' }
    if(this.permanent){ return 'permanent' }
    return 'modal'
  }

  @Prop({default:true}) js!:boolean

  breakPoints:DrawerBreakPoints = new DrawerBreakPoints()
  closeListener = ()=>{this.onClose()}

  drawerAnimation:boolean = false
  drawerOpen:boolean = false
  drawerClose:boolean = false

  constructor(){
    super()
  }
  @Watch('currentDrawerType') changeDrawerType(to:string,from:string){
    this.mountDrawer()
  }
  @Watch('open') async onOpen(){
    if(this.mdcDrawer !== undefined && this.currentDrawerType === 'modal'){
      this.mdcDrawer.open = this.open
    }else if(this.currentDrawerType === 'dismissible'){
      this.drawerOpen =  !this.open
      this.drawerClose = this.open
      await this.$nextTick()
      this.drawerAnimation = true
      await this.$nextTick()
      this.drawerOpen =  this.open
      this.drawerClose = !this.open
    }
  }
  onClose(){
    this.$emit('update:open',false)
  }
  async mountDrawer(){
    if(this.currentDrawerType === 'modal' && this.mdcDrawer === undefined){
      await this.$nextTick()
      const el = this.$refs.mdcModalDrawer as Element
      this.mdcDrawer = MDCDrawer.attachTo(el)
      this.$emit('update:open',false)
    }else if(this.currentDrawerType !== 'modal'){
      if(this.mdcDrawer !== undefined){
        this.mdcDrawer.destroy()
        this.mdcDrawer = undefined
      }
      this.$emit('update:open',true)
    }
  }
  mounted(){
    this.breakPoints.init()
    if(this.js){
      document.body.addEventListener('MDCDrawer:closed', this.closeListener)
      this.mountDrawer()
    }
  }
  beforeDestory(){
    if(this.mdcDrawer !== undefined){
      this.mdcDrawer.destroy()
    }
    document.body.removeEventListener('MDCDrawer:closed',this.closeListener)
    this.breakPoints.destroy()
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
  position:absolute;
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

