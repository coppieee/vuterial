<template>
  <div>
    <mdc-ripple class="demo-ripple">
      <div class="demo-contents">mdc-ripple</div>
    </mdc-ripple>
    <mdc-ripple class="demo-ripple" :js="false">
      <div class="demo-contents">mdc-ripple js off</div>
    </mdc-ripple>
  </div>
</template>
<style lang="postcss" scoped>
.demo-ripple{
  width: fit-content;
}
.demo-contents{
  margin: 10px;
  width: 300px;
  height:200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

