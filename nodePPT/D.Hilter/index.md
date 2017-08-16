title: vue
speaker: D.Hilter
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# 移动端弹性布局和Vuex
## 演讲者：戴智明


[slide]
# 移动端弹性布局

[slide] 
# 内容优先，移动优先
* 百分比
* meida query
* [rem](https://dmodaii.github.io/2016/06/21/rem-flexible/)
* [dpr-flexible](https://dmodaii.github.io/2016/06/21/dpr-flexible/)
* [flexbox](https://dmodaii.github.io/2016/06/22/flexbox/)
* 多列布局

[slide]
# 移动端布局主要问题
[slide]
# border 1px
在dpr为2的屏幕上只需要0.5px即显示为表物理物理像素上的1px, 然而0.5px在某些设备上并不支持

> 目前设计是给的dpr2的640的设计图的border都是2px

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
- css静态图片

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
# 字体大小

- 直接px `但是是写的应该是dpr为1时候的px`
- 将px按照一定比例换算为rem


[slide]
# 字体大小的单位取舍

> 具体要看设计，在各种屏幕上想要保持怎样的字体或者某些位置的字体需要特殊显示 （`一般的做法是字体和行高是px， 其他宽高都是rem`）

-  要针对相同dpr、 不同宽度的设备的是要显示同样的字体大小就用px方式
- 要针对相同dpr、 不同宽度的设备的是不同的字体大小小就用rem方式


[slide]
# dpr配合缩放页面方式解决以上问题

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
            // 自定义最大宽度的显示效果
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

[slide] 
# 字体大小问题

- rem

字体大小由根font-size相对大小设置，对于不同宽度的屏幕（当前可以设置超过某一最大宽度后固定最大根font-size，防止字体过大）， 在当前设置的基准rem下， 其余px/100得到正确的rem
- px

字体大小只和当前dpr有关， 如果全部采用px来写字体大小和行高则需要对应在不同的dpr上做对应转换

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

.font-22-24{
font-size: .22rem;
line-height: .24rem;
}
```

[slide]
# rem和dpr-flexible

- 其实dpr-flexible就是基于rem上再针对dpr做了页面缩放
 
如果我们只打算写dpr为1的（不页面缩放的）， 我们同样可以使用相同的js和css，只需要去除flexible.js中设置dpr属性的代码和css中[data-dpr="1"]之类的代码即可

- 例如这个css mixin就是无论是否缩放都是适用的

```css
@define-mixin dpr-img $image, $size: 100% 100%{
    background-size: $size;
    background-image: url(../../images/mobile/$(image)@2x.png);
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
     background-image: url(../../images/mobile/$(image)@3x.png);
    }
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

```

[slide]
# flexbox 弹性盒子
- 各种对齐形式：垂直水平居中，左右对齐
- 不知道个数还要自适应

>谨记需配合和box-sizing: border-box使用, 否则单个flex元素的大小会受影响

[slide]
# flex 容器
- `flex` [设置或检索弹性盒模型对象的子元素如何分配空间](/resource/flexible/flex.html)
- `justify-content` [属性定义了项目在主轴上的对齐方式](/resource/flexible/justify-content.html)
- `align-items` [定义项目在交叉轴上如何对齐](/resource/flexible/align-items.html)
- `align-content` [定义了多根轴线的对齐方式。](/resource/flexible/align-content.html)

> 如果项目只有一根轴线，该属性不起作用 <small></small> {:&.pull-right}

- `flex-flow`  [属性决定主轴的方向（即项目的排列方向）](/resource/flexible/flex-flow.html)

# flex元素
- `align-self` [设置或检索弹性盒模型对象的子元素如何分配空间](/resource/flexible/align-self.html)


# [dpr-flexible例子](/resource/dpr-flexible/index.html)

> flexbox新旧兼容写法很多， 建议使用postcss插件编写兼容性 {:&.pull-right}

[slide]

# 多列布局
-  `column-width`   [用长度值来定义列宽](/resource/column/column-width.html)
-  `column-count`    用整数值来定义列数

[slide]
# Vuex 状态管理
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

> 形式化了集中处理数据存储的过程，并提供了所有功能方法去处理那些数据

[slide]
- `State` 状态树: 包含所有应用级别状态的对象
- `Action` 组件内部用来分发 mutation 事件的函数
- `Mutation` 修改状态的事件回调函数（更改 Vuex 的 store 中的状态的唯一方法是提交 mutation）
- `Getter`  在组件内部获取 store 中状态的函数（可以认为是 store 的计算属性）



>mutation 都是同步事务.Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。{:&.pull-right}

<!--## 参考资料
- https://dmodaii.github.io/2017/04/19/flux/
- https://vuex.vuejs.org/zh-cn/
-->

[slide]
# 适用场景
- 共享数据多的模块(在最外层app经常使用的变化状态， 例如progress， toast; 还有全局认证信息)
- 多个组件依赖于同一状态， 来自不同组件的行为需要变更同一状态(修改对应某条数据进入编辑页面需要保存状态)
- vue实例内做的操作和数据的计算现在都交由对象store来做， 希望简化和清晰化vue页面的应用
- 多个兄弟组件公用数据， 但是简单的父子组件可以直接用$emit即可
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
Action type 使用常量定义好对应的actionType，用来接收对应的action以及触发的mutate
import {
  FETCH_LOG_LIST,
  DELETE_LOG
} from '../constants'
```

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

[vuex实例](http://localhost:3010/#/records)

[slide]
Progress

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
# Vuex  plugins

```js
const plugins = [
  store => {
    // 实现进度条、错误提示
    store.subscribe(({ payload }) => {
      if (!payload || !payload.__status__) {
        return
      }
      switch (payload.__status__) {
        case 'pending':
          store.dispatch('setProgress', 60)
          break
        case 'success':
          store.dispatch('setProgress', 100)
          break
        case 'error':
          store.dispatch('setProgress', 100)
          store.dispatch('addToast', payload.__payload__)
          break
        default:
      }
    })
  }
]

import plugins from './plugins'
Vue.use(Vuex)
export default new Vuex.Store({
  modules,
  plugins
})
```

[slide] Toast

[slide] state
```
const state = {
  toast: null
}
const getters = {
  toast: state => state.toast
}
let timeoutId
const actions = {
  addToast ({ state, commit }, payload) {
    function doAddToast () {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      commit(ADD_TOAST, payload)
      timeoutId = setTimeout(() => {
        commit(DELETE_TOAST)
      }, 3000)
    }
    if (state.toast) {
      setTimeout(doAddToast, 3000)
    } else {
      doAddToast()
    }
  }
}
const mutations = {
  [ADD_TOAST] (state, payload) {
    state.toast = payload
  },

  [DELETE_TOAST] (state) {
    state.toast = null
  }
}
```

[slide] view

```
<transition name="fade">
  <c-toast v-if="toast"> {{toast}} </c-toast>
</transition>

```

### 使用 `transition` 实现动画
```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
```

[slide] 
# 具体页面的Vuex

[slide]
# [获取列表](http://192.168.50.163:4444/md/index.md#18)
通过store中定义好的action: fetchLogList来修改对应的getters：logList然后通过mapGetters获取


```
...mapGetters(['logList', 'logInfo'])

...mapActions(['fetchLogList', 'deleteLog'])

```

>state树种存储各种`元数据`, 供各种其他模块使用


[slide] 

[magic data-transition="earthquake"]
## 删除修改
-----
```
const actions = {
  deleteLog: createAction(DELETE_LOG, payload => {
    const { id } = payload
    return request(`${base}/records/${id}`, {
      method: 'delete'
    })
  })
const mutations = {
  [DELETE_LOG]: handleAction({
    success: (state, mutation) => {
      state.logInfo = {
        time: Date.now(),
        delete: true
      }
    },
    error: state => {
      state.logInfo.delete = false
    }
  })
}
```
========
## 保存各种小数据
- 如果可以通过父子组件传递，则尽量不污染state
- 添加唯一标识符来确认自己存储的小数据
例如根据某条数据编辑表单数据时候就可以存储该条数据在特定state中，切换到另外一调数据时候，先更改存储的state信息

========
## 在对应的views页面监听对应状态做对应修改
-----

```
  watch: {
    'logList' (newVal, oldVal) {
      this.fetchLog = false
      this.loading = false
      if (this.items.length === 0) {
        this.noData = true
      }
      this.items = !this.firstLoad ? this.items.concat(newVal.items) : newVal.items
      if (this.items.length === newVal.count && newVal.count !== 0) {
        this.noMore = true
        this.showMore = true
      }
      this.firstLoad = false
    },
    'logInfo.time' () {
      if (this.logInfo.delete) {
        const deleteId = this.deleteId
        this.deleteDone = true
        setTimeout(() => {
          this.items = this.items.filter(item => {
            return item.record_id !== deleteId
          })
          this.deleteDone = false
          this.deleteId = undefined
          if (this.items.length === 0) {
            this.reset()
          }
        }, 1000)
      }
    }
  }
```
[/magic]

[slide] state的数据存储
- vuex 中state是直接存在内存中的
- 也可以定制化存在localStorage(依模块需要)

```
import createPersist from 'vuex-localstorage'
const persist = createPersist(ENV_KEY, {
  lang: navigator.language.split('-')[0],
  i18n: null,
  transition: true, // 默认开启动画效果
  authorized: false
}, {
  expires: ONE_WEEK
})
const state = persist.get()
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
