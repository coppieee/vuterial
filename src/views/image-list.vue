<template>
  <div>
    hello
    <mdc-image-list class="demo-standard-image-list" text-protection>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container>logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container>logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container>logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container>logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container>logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container>logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')" aspect-container></mdc-image-list-item>
    </mdc-image-list>
    <mdc-image-list class="demo-masonry-image-list" masonry>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
      <mdc-image-list-item :src="require('../assets/logo.png')">logo</mdc-image-list-item>
    </mdc-image-list>
  </div>
</template>
<style lang="scss" scoped>
// @import "@material/image-list/mdc-image-list";

.demo-standard-image-list{
  max-width:960px;
  // @include mdc-image-list-standard-columns(5);
}
.demo-masonry-image-list{
  column-count: 5;
  -webkit-column-gap: 16px;
  column-gap: 16px;
  max-width: 900px;
  // @include mdc-image-list-masonry-columns(5);
}
</style>
