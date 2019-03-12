<template>
  <div>
    <mdc-subtitle1>item width 30%</mdc-subtitle1>
    <vt-horizontal-list class="doc-contents" scroll-bar>
      <vt-horizontal-list-item v-for="id in times_(30)" :key="id" class="doc-h-list-item doc-h-list-item-30">
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
    
    <mdc-subtitle1>:custom-scroll-bar="false" :mouse-scroll="false"</mdc-subtitle1>
    <vt-horizontal-list class="doc-contents" :custom-scroll-bar="false" :mouse-scroll="false">
      <vt-horizontal-list-item v-for="id in times_(7)" :key="id" class="doc-h-list-item doc-h-list-item-30">
        <mdc-card class="doc-card doc-card-30">
          item {{id}}
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>

    <mdc-subtitle1>:scroll-bar="false" </mdc-subtitle1>
    <vt-horizontal-list class="doc-contents" :scroll-bar="false">
      <vt-horizontal-list-item v-for="id in times_(7)" :key="id" class="doc-h-list-item doc-h-list-item-30">
        <mdc-card class="doc-card doc-card-30">
          item {{id}}
        </mdc-card>
      </vt-horizontal-list-item>
    </vt-horizontal-list>

    <mdc-subtitle1>sync tab</mdc-subtitle1>
    <div class="doc-contents">
      <mdc-tab-bar ref="tabBar"
        :active-tab-index.sync="activeTabIndex"
        :scroll-move-rate="scrollMoveRate">
        <mdc-tab active>tab 0</mdc-tab>
        <mdc-tab>tab 1</mdc-tab>
        <mdc-tab>tab 2</mdc-tab>
      </mdc-tab-bar>
      <vt-horizontal-list class="doc-list" 
        :scroll-left-index.sync="activeTabIndex"
        :scroll-move-rate.sync="scrollMoveRate">
        <vt-horizontal-list-item v-for="id in times_(3)" :key="id" class="doc-h-list-item doc-h-list-item-100">
          <mdc-card class="doc-card doc-card-100">
            item {{id}}
          </mdc-card>
        </vt-horizontal-list-item>
      </vt-horizontal-list>
    </div>
    <div>activeTabIndex: {{activeTabIndex}}</div>
    <!-- <div>scrollMoveRate:{{scrollMoveRate}}</div> -->

    <mdc-subtitle1>sync tab :scroll="false</mdc-subtitle1>
    <div class="doc-contents">
      <mdc-tab-bar ref="tabBar"
        :active-tab-index.sync="activeTabIndex2" 
        >
        <mdc-tab active>tab 0</mdc-tab>
        <mdc-tab>tab 1</mdc-tab>
        <mdc-tab>tab 2</mdc-tab>
      </mdc-tab-bar>
      <vt-horizontal-list class="doc-list" 
        :scroll-left-index.sync="activeTabIndex2"
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

@Component<HorizontalList>({})
export default class HorizontalList extends Vue {
  activeTabIndex:number = 0
  scrollMoveRate:number = 0
  activeTabIndex2:number = 0
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

