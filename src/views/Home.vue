<template>
  <div class="home">
    <div>
      <p>VuterialはMaterial DesignするためのVue.js Componentsです。 </p>
      <p>Material Components for the webをVue.js用に拡張してます。</p>
      <p>CSSカスタマイズしやすいように作られてます。</p>
      <div class="demo-buttons">
        <mdc-button class="demo-button" tag="router-link" to="/getting-started" raised>はじめる</mdc-button>
        <mdc-button class="demo-button" tag="a" href="https://github.com/coppieee/vuterial" target="_blank" raised>GitHub</mdc-button>
      </div>
      <p>現在ドキュメント作成中。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<Home>({
})
export default class Home extends Vue {}
</script>
<style lang="postcss">
.demo-buttons{
  margin:1rem;
}
.demo-button{
  margin: 15px;
}
</style>
