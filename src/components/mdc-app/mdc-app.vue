<template>
  <div class="vuterial-app" :class="{'vuterial-dismissble-drawer-open':drawerOpen && drawerType==='dismissible'}">
    <div class="vuterial-top-app-bar-container">
      <slot name="top-app-bar"/>
    </div>
    <div class="vuterial-main-container">
      <div class="vuterial-drawer-container">
        <div class="mdc-top-app-bar--fixed-adjust"></div>
        <div class="vuterial-drawer-wapper">
          <slot name="drawer"/>
        </div>
      </div>
      <div class="vuterial-content-container">
        <div class="mdc-top-app-bar--fixed-adjust"></div>
        <div class="vuterial-content-wapper">
          <slot name="contents"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.vuterial-app{
  display: flex;
  flex-flow: column;
  height: 100vh;
  width:100%;
  & .vuterial-top-app-bar-container{

  }
  & .vuterial-main-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height:100vh;
    & .vuterial-drawer-container{
      display: flex;
      flex-direction:column;
      & .vuterial-drawer-wapper{
        flex:1;
        /* overflow-y: auto; */
        & >>> .mdc-drawer--modal{
          top:0;
        }
      }
    }
    & .vuterial-content-container{
      transition:padding 0.2s;
      width:100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      & .vuterial-content-wapper{
        width:100%;
        flex:1;
        overflow-y: auto;
      }
    }
  }
}
.vuterial-dismissble-drawer-open{
  & .vuterial-content-container{
    padding-left: 256px;
  }
}
</style>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({})
export default class MdcApp extends Vue{
  @Prop({default:'modal'})
  drawerType!:'modal'|'permanent' | 'dismissible'

  @Prop({default:false})
  drawerOpen!:boolean
}
</script>