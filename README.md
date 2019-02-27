# Vuterial
VuterialはMaterial DesignするためのVue.js Componentsです。

## CDNで始める
```html
<html>
  <head>
    <meta charset="utf-8">
    <title>vuterial demo</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuterial"></script>
    <link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuterial/dist/vuterial.css">
  </head>
  <body>
    <div id="app">
      <md-button>button</md-button>
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

## Vue cli 3で始める
```
$ npm i -g @vue/cli
$ vue create my-project
$ cd my-project
$ npm i vuterial
```

## main.js
```
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
