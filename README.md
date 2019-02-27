# Vuterial
VuterialはMaterial DesignするためのVue.js Componentsです。
[Material Components for the web](https://github.com/material-components/material-components-web)をVue.js用に拡張したものです。



## Vue CLI 3で始める
### インストール
```shell
$ npm i -g @vue/cli
$ vue create my-project
$ cd my-project
$ npm i vuterial
```

### script
```typescript
import Vue from 'vue'
import {Vuterial} from 'vuterial'
import 'vuterial/dist/vuterial.css'
Vue.use(Vuterial)
```

### Material Components for WebのCSS追加
VuterailはMaterial ComponentsのCSSも別途追加する必要があります。

一番簡単な方法はhtmlにCSSを追記する方法です。
```html
<link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
```
必要ならMaterial Iconとフォントも追加。
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" >
```

### 実行
```
$ npm run serve
```

## CDNで始める
```html
<html>
  <head>
    <meta charset="utf-8">
    <title>vuterial demo</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuterial@latest"></script>
    <link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" >
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuterial@latest/dist/vuterial.css">
  </head>
  <body>
    <div id="app">
      <mdc-button>hello vuterial</mdc-button>
    </div>
    <script>
      Vue.use(vuterial.Vuterial);
      new Vue({
        el:'#app',
      });
    </script>
  </body>
</html>
```
## さらに詳しく
Vuterial Documents
https://coppieee.github.io/vuterial/