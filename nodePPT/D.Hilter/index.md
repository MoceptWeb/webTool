title: vue
speaker: D.Hilter
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# vue
## 演讲者：D.Hilter

[slide]
# 移动端弹性布局
# Vuex 开发相关
# 小工具

[slide]
# 移动端弹性布局

[slide] 内容优先，移动优先

* 百分比
* meida query
* [rem](https://dmodaii.github.io/2016/06/21/rem-flexible/)
* [dpr-flexible](https://dmodaii.github.io/2016/06/21/dpr-flexible/)
* [flexbox](https://dmodaii.github.io/2016/06/22/flexbox/)

# 移动端布局主要问题
[slide]
# border 1px
在dpr为2的屏幕上只需要0.5px即显示为表物理物理像素上的1px, 然而0.5px在某些设备上并不支持

```css
@define-mixin border-1px $color {
  position: relative;
  &:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid $color;
    width: 100%;
    content: '';
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    &:after {
      transform: scaleY(0.67);
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    &:after {
      transform: scaleY(0.5);
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    &:after {
      transform: scaleY(0.3);
    }
  }
}
```
[slide]
# 高清图片
- css图片

在不同dpr分辨率下显示对应最合适的图片， 使图片高清显示
```css
@define-mixin dpr-img $image, $size: 100% 100%{
    background-size: $size;
    background-image: url(../../images/mobile/$(image)@2x.png);
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
     background-image: url(../../images/mobile/$(image)@3x.png);
    }
}
```
- 动态图片

 直接通过图片url载入的图片图需要图片服务器支持

[小图](https://betacs.101.com/v0.1/static/preproduction_content_cscommon/avatar/2107161302/2107161302.jpg?size=80)
[中图](https://betacs.101.com/v0.1/static/preproduction_content_cscommon/avatar/2107161302/2107161302.jpg?size=320)
[大图](https://betacs.101.com/v0.1/static/preproduction_content_cscommon/avatar/2107161302/2107161302.jpg?size=640)

[slide]
# 配合缩放页面方式解决以上问题

- 根据当前dpr设置页面缩放和根字体大小
- 页面尺寸变化和页面重载重新设置页面缩放和字体大小
>强烈建议大家采用统一标准来计算rem基准，特别是公用组件，否则公用组件的rem的相对值有问题不能使用，需要全部覆写css

[slide]

[magic data-transition="earthquake"]
## 改变viewport和font-size
-----
```
(function(designWidth) {
        'use strict';
        var docEl = document.documentElement;
        var dpr = Math.min(Math.floor(window.devicePixelRatio), 3);
        var scale = 1 / dpr;
        var $viewport = document.querySelector('meta[name="viewport"]');
        var setDpr = function() {
            docEl.setAttribute("data-dpr",dpr);
            var content = 'initial-scale=' + scale + ',maximum-scale='
             + scale + ',minimum-scale=' + scale +
             ',user-scalable=no,width=device-width';
            if ($viewport) {
                $viewport.setAttribute('content', content);
            } else {
                var metaViewport =
                '<meta name="viewport" content="' + content + '"/>';
                document.write(metaViewport);
            }
            var width = docEl.clientWidth;
            if (width / dpr > 450) {
                width = dpr * 450;
                /* 使页面居中显示
                docEl.querySelector('body').style.width = 450;
                docEl.querySelector('body').style.margin = '0 auto';
                */
            }
            var fontSize = width / designWidth * 100;
            docEl.style.fontSize = fontSize + 'px';
        }

        setDpr();
        window.addEventListener('resize', setDpr);
        document.addEventListener('DOMContentLoaded', setDpr);
    })(640);
```
========
## border-1px和img
-----
```
@define-mixin dpr-img $image, $size: 100% 100%{
    background-size: $size;
    [data-dpr="1"] & {
      background-image: url(../../images/mobile/$(image)@2x.png);
    }
    [data-dpr="2"] & {
      background-image: url(../../images/mobile/$(image)@2x.png);
    }
    [data-dpr="3"] & {
      background-image: url(../../images/mobile/$(image)@3x.png);
    }
}
@define-mixin border-1px $color {
  position: relative;
  &:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: '';
    [data-dpr="1"] & {
      border-top: 1px solid $color;
    }
    [data-dpr="2"] & {
      border-top: 2px solid $color;
    }
    [data-dpr="3"] & {
      border-top: 3px solid $color;
    }
  }

```
[/magic]

# 字体大小问题

- rem
字体大小由根font-size相对大小设置，对于不同宽度的屏幕（当前可以设置超过某一最大宽度后固定最大根font-size，防止字体过大）
- px
字体大小只和当前dpr有关

```css
@define-mixin dpr-font $font-size{
      [data-dpr="1"] & {
          font-size: calc($font-size / 2);
      }
      [data-dpr="2"] & {
        font-size: $font-size;
      }
      [data-dpr="3"] & {
        font-size: calc($font-size * 3 / 2);
      }
}
```

[slide]
# flexbox 弹性盒子
- 各种对齐形式：垂直水平居中，左右对齐
- 不知道个数还要自适应

>谨记需配合和box-sizing: border-box使用, 否则单个flex元素的大小会受影响

[flexbox](https://dmodaii.github.io/2016/06/22/flexbox/)

[slide]
[实际效果1](http://www.dayhr.com/views/perf/app.html#!/message/5000000138691013/5000000138683084/1/0)

[实际效果2](http://www.dayhr.com/views/perf/app.html#!/remind/5000000138690994?data=[2,3,5]&title=aa)

<div class="columns-2">
    <img class="img_show" src='/img/flexbox1.png'/>
    <img class="img_show" src='/img/flexbox2.png'/>
</div>


[slide]
# Vuex 状态管理
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

[slide]
- State:
    - 状态树: 包含所有应用级别状态的对象
- Action:
    - 组件内部用来分发 mutation 事件的函数
- Mutation:
    - 修改状态的事件回调函数（更改 Vuex 的 store 中的状态的唯一方法是提交 mutation）
- Getter:
    - 在组件内部获取 store 中状态的函数（可以认为是 store 的计算属性）

>mutation 都是同步事务.Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。{:&.pull-right}

<!--## 参考资料
- https://dmodaii.github.io/2017/04/19/flux/
- https://vuex.vuejs.org/zh-cn/
-->

[slide]
# 适用场景
- 共享数据多的应用(在最外层app经常使用的变化状态， 例如progress， toast; 还有全局认证信息)
- 多个组件依赖于同一状态， 来自不同组件的行为需要变更同一状态(修改对应某条数据进入编辑页面需要保存状态)
- vue实例内做的操作和数据的计算现在都交由对象store来做， 希望简化和清晰化vue页面的应用

>如果您的应用够简单，您最好不要使用Vuex {:&.pull-right}

[slide]
Action type
使用常量定义好对应的actionType，用来接收对应的action以及触发的mutate

```javascript
import {
  FETCH_LOG_LIST,
  DELETE_LOG
} from '../constants'
```

[slide]
state和getters
----
<div class="columns-2">
    <pre><code class="javascript">
const state = {
  logList: {
    time: null,
    items: []
  },
  logInfo: {
  }
}
    </code></pre>

    <pre><code class="javascript">
const getters = {
  logList: state => state.logList,
  logInfo: state => state.logInfo
}
    </code></pre>
</div>


[slide]
action和mutate

```javascript
const actions = {
  fetchLogList: createAction(FETCH_LOG_LIST, payload => {
    return request(`${base}/records`, {
      params: payload
    }).then(response => {
      return {
        count: 28,
        items: response
      }
    })
  })
}
```
```javascript
const mutations = {
  [FETCH_LOG_LIST]: handleAction({
    success: (state, mutation) => {
      state.logList = mutation
      state.logList.time = Date.now()
    },
    error: state => {
      state.logList.time = Date.now()
    }
  })
}
```


[slide]
暴露state供外部调用

```javascript
export default {
  state,
  getters,
  actions,
  mutations
}
```
[slide]
progress

[slide]
store

```javascript

const SET_PROGRESS = 'SET_PROGRESS'
const state = {
  progress: 0
}
const getters = {
  progress: state => state.progress
}
const actions = {
  setProgress ({ commit }, progress) {
    commit(SET_PROGRESS, progress)
    if (progress === 100) {
      setTimeout(() => {
        commit(SET_PROGRESS, 0)
      }, 500)
    }
  }
}
const mutations = {
  [SET_PROGRESS] (state, payload) {
    state.progress = payload
  }
}
```

[slide]
router

```javascript
router.beforeEach((to, from, next) => {
  store.dispatch('setProgress', 80)
  if (to.matched.some(m => m.meta.auth) && !store.getters.authorized) {
    next('/')
  } else {
    next()
  }
})

router.afterEach(() => {
  store.dispatch('setProgress', 100)
})
```

[slide]
view
```
<c-progress id="progress"
  v-show="progress"
  :progress="progress"></c-progress>

...mapGetters(['authorized', 'lang', 'i18n', 'progress', 'toast']),

```

### 使用 `translate3d` 实现动画
----
```
<template>
  <div class="c-progress">
    <div class="c-progress-content"
      :style="{transform: 'translate3d(-' + (100 - progress) + '%, 0, 0)'}"></div>
  </div>
</template>
<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
      validator (val) {
        return +val >= 0 && +val <= 100
      }
    }
  }
}
</script>
<style src="styles/components/core/progress"></style>
```



[slide]
----
<!--* 多语言 {:&.fadeIn}-->
* 多语言
    * i18n {:&.动效类型}
* 开发调试工具
    * Vue.js devtools
* 一些插件和工具
    * 掘金 https://juejin.im/
    * hexo博客 https://hexo.io/zh-cn/docs/commands.html
    * nodePPT
    * [emoji gitmessage commit](https://gitmoji.carloscuesta.me/)


[slide]
# THANKS
