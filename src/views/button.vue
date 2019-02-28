<template>
  <div>
    <iframe height="462" style="width: 100%;" scrolling="no" title="vuterial-demo-button" src="//codepen.io/coppieee/embed/JzYXdX/?height=462&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/coppieee/pen/JzYXdX/'>vuterial-demo-button</a> by Daisuke Yagi
  (<a href='https://codepen.io/coppieee'>@coppieee</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
    <mdc-subtitle1>Text button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button">default</mdc-button>
      <mdc-button class="demo-button" dense>Dense</mdc-button>
      <mdc-button class="demo-button" icon="favorite">icon</mdc-button>
    </div>
    <mdc-subtitle1>Raised Button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button" raised>default</mdc-button>
      <mdc-button class="demo-button" raised dense>Dense</mdc-button>
      <mdc-button class="demo-button" raised icon="favorite">icon</mdc-button>
    </div>
    <mdc-subtitle1>Unelevated  Button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button" unelevated>default</mdc-button>
      <mdc-button class="demo-button" unelevated dense>Dense</mdc-button>
      <mdc-button class="demo-button" unelevated icon="favorite">icon</mdc-button>
    </div>
    <mdc-subtitle1>Outline  Button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button" outlined>default</mdc-button>
      <mdc-button class="demo-button" outlined dense>Dense</mdc-button>
      <mdc-button class="demo-button" outlined icon="favorite">icon</mdc-button>
    </div>
    <mdc-subtitle1>Shaped Button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button demo-shaped-button" raised>default</mdc-button>
      <mdc-button class="demo-button demo-shaped-button" raised dense>Dense</mdc-button>
      <mdc-button class="demo-button demo-shaped-button" raised icon="favorite">icon</mdc-button>
    </div>
    <mdc-subtitle1>disable ripple Button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button" :ripple="false">default</mdc-button>
      <mdc-button class="demo-button" :ripple="false" dense>Dense</mdc-button>
      <mdc-button class="demo-button" :ripple="false" icon="favorite">icon</mdc-button>
    </div>
    <mdc-subtitle1>disabled button</mdc-subtitle1>
    <div class="demo-buttons">
      <mdc-button class="demo-button" raised disabled>default</mdc-button>
      <mdc-button class="demo-button" raised dense disabled>Dense</mdc-button>
      <mdc-button class="demo-button" raised icon="favorite" disabled>icon</mdc-button>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.demo-buttons{
}
.demo-button{
  margin: 16px 32px
}
.demo-shaped-button{
  border-radius: 18px;
}
</style>

