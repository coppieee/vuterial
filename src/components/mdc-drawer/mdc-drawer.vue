<template>
  <div>
    <aside class="mdc-drawer vuterial-drawer" :class="{
        'mdc-drawer--dismissible':dismissible,
        'vuterial-drawer--dismissible':dismissible,
        'mdc-drawer--modal':modal,
      }" ref="mdcDrawer">
      <div class="mdc-drawer__content">
        <slot/>
      </div>
    </aside>
    <div v-if="modal" class="mdc-drawer-scrim"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {MDCDrawer} from '@material/drawer'
@Component({})
export default class MdcDrawer extends Vue{
  @Prop({default:false}) dismissible!:boolean
  @Prop({default:false}) modal!:boolean
  @Prop({default:false}) open!:boolean
  mdcDrawer?:MDCDrawer

  @Prop({default:true}) js!:boolean

  @Watch('open') _onOpen(){
    if(this.mdcDrawer !== undefined){
      this.mdcDrawer.open = this.open
    }
  }
  _closeListener!:()=>void
  onClose(){
    console.log('closeListner',this)
    this.$emit('update:open',false)
  }
  mounted(){
    if((this.modal || this.dismissible) && this.js){
      const el = this.$refs.mdcDrawer as Element
      this._closeListener = ()=>{this.onClose()}
      console.log('mounted',el)
      this.mdcDrawer = MDCDrawer.attachTo(el)
      // this.mdcDrawer.listen('closed',this._closeListener)
      // console.log('body',document)
      document.body.addEventListener('MDCDrawer:closed', this._closeListener)
      // document.body.addEventListener('MDCDrawer:closed', ()=>{console.log('CLOSED')})
    }
  }
  beforeDestory(){
    if(this.mdcDrawer !== undefined){
      this.mdcDrawer.destroy()
      document.body.removeEventListener('MDCDrawer:closed',this._closeListener)
    }
  }
}
</script>
<style lang="postcss" scoped>
.vuterial-drawer{

}
.vuterial-drawer--dismissible{
  height:calc(100% - 64px)
}
</style>

