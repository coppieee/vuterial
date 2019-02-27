<template>
  <div class="home">
    <div>
      <p> VuterialはMaterial DesignするためのVue.js Componentsです。 </p>
      <p>Material Components for the webをVue.js用に拡張してます。</p>
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
