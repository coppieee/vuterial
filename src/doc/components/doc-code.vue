<template>
  <code class="doc-code">
    <slot/>
  </code>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class DocCode extends Vue {
}
</script>
<style scoped>
.doc-code{
  display: block;
  background-color: #f6f8fa;
  padding: 0 1rem;
  margin: .5rem 0;
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  line-height: 1.45;
  white-space:pre-wrap;
}
</style>

