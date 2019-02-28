<template>
  <div>
    <doc-h1>Getting Started</doc-h1>
    <doc-h2>Vue CLI 3で始める</doc-h2>
    <doc-h3>インストール</doc-h3>
    <doc-code>
$ npm i -g @vue/cli
$ vue create my-project
$ cd my-project
$ npm i vuterial
    </doc-code>
    <doc-h3>script</doc-h3>
    <doc-code>
import Vue from 'vue'
import {Vuterial} from 'vuterial'
import 'vuterial/dist/vuterial.css'
Vue.use(Vuterial)
    </doc-code>
    <doc-h3>Material Components for WebのCSS追加</doc-h3>
    <p>VuterailはMaterial ComponentsのCSSも別途追加する必要があります。
      一番簡単な方法はhtmlにCSSを追記する方法です。</p>
    <doc-code>
&lt;link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"&gt;
    </doc-code>
    <p>
      必要ならMaterial Iconとフォントも追加。</p>
    <doc-code>
&lt;link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"&gt;
&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"&gt;
    </doc-code>
    <doc-h3>実行</doc-h3>
    <doc-code>$ npm run serve</doc-code>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class GettingStart extends Vue{
  cmsSource = ''

}
</script>

