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
# vue 开发相关 
# 小工具

[slide]
# 移动端弹性布局
* meida query
* 百分比
* rem
https://dmodaii.github.io/2016/06/21/rem-flexible/

* dpr-flexible
https://dmodaii.github.io/2016/06/21/dpr-flexible/

* flexbox
https://dmodaii.github.io/2016/06/22/flexbox/

[slide]
# vuex 状态管理
[slide]
# 不可变数据、规范化、持久化

* 严格遵守单向数据流；
* 避免使用双向绑定, 避免使用 v-model。
    * 双向绑定会使状态的改变变得不清晰，
* 在 mutation handler 外改变 state，
Vuex 会发出警告。

>当然，在不使用 Vuex 等状态管理工具的情况下，
没有以上限制。

## 参考资料
- https://dmodaii.github.io/2017/04/19/flux/
- https://github.com/facebook/immutable-js
- https://vuex.vuejs.org/zh-cn/


[slide]
# 第三方库的使用、代码分割、懒加载

[slide]
- 第三方库的使用
    - NO jQuery: 构建自定义的 jQuery
    - polyfill vs shim
    - whatwg-fetch vs $.ajax
- 代码分割
    - 单一职责
    ```
    import isPlainObject from 'lodash/isPlainObject'
    import assignWith from 'lodash/assignWith'
    ```
    ```
    import {isPlainObject, assignWith} from 'lodash/isPlainObject'
    ```
- 懒加载
```
{
    path: '/',
    component: resolve => require(['views/user'], resolve),
    meta: {
      auth: false
    }
  }
```
[slide]
# 组件设计

[slide]
#非侵入式、碎片化
   - 智能组件smart stateful fat screens

   - 木偶dumb skinny components pure

-碎片化 Single Responsibility Principle（单一职责原则）


>编写尽量小的碎片化的组件，
通过灵活地组装来应对多变的需求。

>根据实际需求，
在碎片化的基础上封装一些偏重的组件

[slide]
# props
```
prop 是单向绑定的
不应该在子组件内部改变 prop

Function 类型的 prop 会使得状态不清晰
应尽量避免 Function 类型的 prop
用于回调方法时，应使用 $emit 代替
用于计算数据时，应尽量在父组件直接计算后传递给子组件
```

[slide]
# 小工具

[slide]
----
* 多语言 
    * i18n {:&.动效类型}
    * teto-tool
* 开发调试工具
    * eslint 简单错误验证， 避免更大错误
    * devTools
* 一些插件和工具
    * 掘金 https://juejin.im/
    * hexo博客 https://hexo.io/zh-cn/docs/commands.html
* [GIT 提交规范]
   - emoji gitmessage commit
   - https://gitmoji.carloscuesta.me/
   - https://github.com/dannyfritz/commit-message-emoji

[slide]
# THANKS