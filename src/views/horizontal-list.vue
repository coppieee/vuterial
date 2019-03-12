<template>
  <div>
    <mdc-headline2>Horizontal list</mdc-headline2>
    <div>横方向にスライドするリスト。Vuterialオリジナル。</div>
    <mdc-subtitle1>item width 30%</mdc-subtitle1>
    <vt-horizontal-list class="doc-contents">
      <vt-horizontal-list-item v-for="id in times_(30)" :key="id" class="doc-h-list-item doc-h-list-item-30">
        <mdc-card class="doc-card doc-card-30" >
          <mdc-ripple class="doc-card__contents" @click="clickId=id">
          item {{id}}
          </mdc-ripple>
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>
    <div>click:{{clickId}}</div>

    <mdc-subtitle1>item width 30%</mdc-subtitle1>
    <vt-horizontal-list class="doc-contents">
      <vt-horizontal-list-item v-for="id in times_(2)" :key="id" class="doc-h-list-item doc-h-list-item-30">
        <mdc-card class="doc-card doc-card-30" >
          <mdc-ripple class="doc-card__contents" @click="clickId=id">
          item {{id}}
          </mdc-ripple>
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>
    <div>click:{{clickId}}</div>

    <mdc-subtitle1>item width 100%</mdc-subtitle1>
    <vt-horizontal-list class="doc-contents" >
      <vt-horizontal-list-item v-for="id in times_(5)" :key="id" class="doc-h-list-item doc-h-list-item-100">
        <mdc-card class="doc-card doc-card-100">
          item {{id}}
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>

    <mdc-subtitle1>scroll-bar </mdc-subtitle1>
    <vt-horizontal-list class="doc-contents" scroll-bar>
      <vt-horizontal-list-item v-for="id in times_(7)" :key="id" class="doc-h-list-item doc-h-list-item-30">
        <mdc-card class="doc-card doc-card-30">
          item {{id}}
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>

    <mdc-subtitle1>scroll-bar :custom-scroll-bar="false" :mouse-scroll="false"</mdc-subtitle1>
    <vt-horizontal-list class="doc-contents" scroll-bar :custom-scroll-bar="false" :mouse-scroll="false">
      <vt-horizontal-list-item v-for="id in times_(7)" :key="id" class="doc-h-list-item doc-h-list-item-30">
        <mdc-card class="doc-card doc-card-30">
          item {{id}}
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>

    <mdc-subtitle1>sync tab</mdc-subtitle1>
    <div class="doc-contents">
      <mdc-tab-bar ref="tabBar"
        :scroll-state.sync="scrollState">
        <mdc-tab to="/horizontal-list/0">tab 0</mdc-tab>
        <mdc-tab to="/horizontal-list/1">tab 1</mdc-tab>
        <mdc-tab to="/horizontal-list/2">tab 2</mdc-tab>
      </mdc-tab-bar>
      <vt-horizontal-list class="doc-list" 
        :scroll-state.sync="scrollState"
        >
        <vt-horizontal-list-item v-for="id in times_(3)" :key="id" class="doc-h-list-item doc-h-list-item-100">
          <mdc-card class="doc-card doc-card-100">
            item {{id}}
          </mdc-card>
        </vt-horizontal-list-item>
      </vt-horizontal-list>
    </div>

    <mdc-subtitle1>sync tab :scroll="false</mdc-subtitle1>
    <div class="doc-contents">
      <mdc-tab-bar ref="tabBar"
        :scroll-state.sync="scrollState2"
        >
        <mdc-tab active>tab 0</mdc-tab>
        <mdc-tab>tab 1</mdc-tab>
        <mdc-tab>tab 2</mdc-tab>
      </mdc-tab-bar>
      <vt-horizontal-list class="doc-list" 
        :scroll-state.sync="scrollState2"
        :scroll="false"
        >
        <vt-horizontal-list-item v-for="id in times_(3)" :key="id" class="doc-h-list-item doc-h-list-item-100">
          <mdc-card class="doc-card doc-card-100">
            item {{id}}
          </mdc-card>
        </vt-horizontal-list-item>
      </vt-horizontal-list>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.doc-contents{
  border:solid 1px #000;
  margin-bottom: 10px;
}
.doc-list{

}
.doc-h-list-item-30{
  width:30%;
}
.doc-card{
  height:100px;
  background-color: #eee;
}
.doc-card-30{
  margin:0.5rem;
}
.doc-h-list-item:nth-child(even) .doc-card{
  /* background-color:#eee; */
}
.doc-card__contents{
  height:100%;
  width:100%;
}
.doc-h-list-item-100{
  width:100%;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ScrollState } from '@/components/vt-horizontal-list'

@Component<HorizontalList>({})
export default class HorizontalList extends Vue {
  scrollState:ScrollState = {type:'',from:'',index:0,moveRate:0}
  scrollState2:ScrollState = {type:'',from:'',index:0,moveRate:0}
  // activeTabIndex2:number = 0
  clickId:number = -1
  times_(count:number):number[]{
    const xs:number[] = []
    for(let i=0;i<count;i++){
      xs.push(i)
    }
    return xs
  }

}
</script>

