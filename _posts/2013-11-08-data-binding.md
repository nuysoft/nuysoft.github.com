---
layout: post
title: "数据双向绑定"
tagline: "BI-Directional / Two-Way Data-Binding with JavaScript"
description: ""
category: 
tags: []
published: false
---
{% include JB/setup %}

BI-Directional / Two-Way Data-Binding with JavaScript
MDV model-driven views

# 什么是数据双向绑定

数据绑定是在应用程序 UI 与业务逻辑之间建立连接的过程，数据
http://msdn.microsoft.com/en-us/library/ms752347.aspx#what_is_data_binding
http://msdn.microsoft.com/zh-cn/library/ms752347.aspx#fbid=0kGH3sbx6bN

数据绑定之于 HTML 模板，就像

雕版印刷 > 活字印刷

## 示例
## 历史
## 小结
* View 的改变会更新 Model
* Model 的改变会更新 View

# 关键技术点
1. 监听数据的变化 loop.js
2. 绑定数据到模板 ast.js scan.js
3. 绑定模板到数据 
3. 同步更新模板 flush.js

# 解决思路 - 字符串模板
1. 修改 AST，插入占位符
    1. 可以很好地解决 Expression，但是无法解决 Block（虽然可以在 Block 前插入占位符，但因为渲染顺序问题，无法准确定位）
    2. 局限于某个模板引擎，无法通用化
2. 修改 HTML 模板，插入占位符
    1. 简单暴力，正则太复杂和粗糙了
3. 修改数据，插入占位符
    1. 可以很好地解决 Expression，但是无法解决 Block
4. ~~修改 HTML 模板 + 修改数据~~
5. 修改编译后的渲染函数
    1. 

# TODO
* √ pos > slot
* √ $path binding>watch
* √ {{}} {{{}}}
* √ path > script
* √ script.value > script.path
* √ data.guid
* √ 延迟更新
* √ 优化渲染过程（只更新变化了的元素）
* √ {{^list}}{{/list}} 当没有数据时显示的内容
* √ 去掉表达式 path 的 guid，避免预渲染时因为 guid 变化导致最终的重复渲染
* X 预渲染比较时去掉高亮样式
* √ 浏览器兼容性测试
* √ AttributeNode
* √ helper
* √ checkbox
* √ new Object(), valueOf()
* √ lol testcase
* √ 打包
* √ 改造 src 代码的结构
* √ Hyde > BiSheng
* √ setTimeout vs setInterval
* √ unwatch
* √ unbind
* 定位符优化（预编译），避免重复解析定位符
* input 也需要定时检测吗？可以避免在通过代码修正 input 的值还需要触发 change 事件
* select 中默认选中的 option 需要在初始化时同步 value 吗？
* 数据与多个模板的绑定：
    * 绑定
    * 记录和跟踪
    * 移除绑定时，需要能移除与指定模板的绑定
* 转义 .
* X form: data-model=""
* form
    * √ input 如果由 input 触发，则不修改 input 的属性 value
    * √ radio 点击其中一个后，需要同步更新同名的其他 radio
* script > comment
* block: √ array, object, primitive
* array event: add delete update
* object event: add delete update
* img src
* wrapper: 默认为模板包裹一层，否则会取不到更新后的元素
* binding.js 的 DOM 操作代码移至 flush.js
* 为属性单独定义响应代码
* 测试用例增加名称 arguments.callee.name, test/loop.js
* Mocha 测试用例
* @三冰：
    * 插入了这么多标记，会影响 js操作吧
    * 多了些标签，js操作时用的选择器可能会变
    * 那种有结构的，数据什么的都是有非常固定的绑定规则的
    * 如果我想数据改变后，隔1s再刷新
* attribute-block
* attribute-expression

# 窗口
1. 数据
2. 字符串模板
3. 解析前，解析后
4. 编译前，编译后
5. 渲染前，渲染后

# 如何实现（关键步骤 & 实现原理）

## 解析模板
1. 字符串模板
    1. 无法区分 DOM 元素和 DOM 属性
    2. 在数据模型更新时，无法获取准确的对应模板
2. DOM 模板
    1. 修改

## 数据模型 - DOM 元素

1. 建立 DOM 元素和数据模型之间的映射关系
    1. √ 将模板编译为抽象语法树（AST）
    2. √ 修改 AST，在 Expression 和 Block 的前后插入占位符
    3. √ 占位符的属性包含了数据访问路径
    4. √ 占位符之间包含了 DOM 元素
2. DOM 元素更新时，需要同步到数据
    1. 基于浏览器事件系统，为表单元素绑定默认事件（例如，change）
    2. 默认事件触发时，将新数据更新到数据模型中
3. 数据模型更新时，需要同步到 DOM 元素
    1. 基于自定义事件系统（或者基于 Getters & Setters & Poll-fix），监听数据模型的变化
    2. √ 数据模型变化时，找到需要需要更新的 DOM 元素

**继续细化**

### Expression
1. √ 建立 Expression 与对应模板的映射关系（Expression - AST MustacheNode）
2. √ 建立 Expression 与对应数据的映射关系（Expression - PH Attr）
3. √ 建立 Expression 与已渲染 DOM 元素的映射关系（Expression - PH）
4. 建立 Expression 与已渲染 DOM 属性的映射关系

### Block
1. √ 建立 Block 与对应模板的映射关系（Block - AST BlockNode）
2. √ 建立 Block 与对应数据的映射关系（Block - PH Attr）
3. √ 建立 Block 与已渲染 DOM 元素的映射关系（Block - PH）
4. 建立 Block 与已渲染 DOM 属性的映射关系

## 数据模型 - DOM 属性（Attr）
1. 解析出 DOM 属性：标记、属性名、属性值
2. 之前插入占位符

如何实现：
1. 修改 HTML 模板，插入占位符
2. HTML 模板 > DOM 属性 > 找到属性模板 > 前后插入占位符

## DOM 元素 - 自动数据模型 - DOM 元素
1. TODO

## 关键技术
1. 如何监听模型的变化？
    1. defineProperty & defineProperties
1. 如何精确定模板中的 Expression？
    1. 定位：解析时，修改语法树，插入 **script** 节点
    2. 路径：渲染时，记录模型属性访问路径，插入路径信息
2. 如何精确定模板中的 Block？
    1. 定位：解析时，修改语法树，插入 **script** 节点
    2. 路径：渲染时，记录模型属性访问路径，插入路径信息

总结
1. 通过 **script** 定位 Block
2. 通过 **路径信息** 关联数据

# 同类框架分析-百家争鸣
1. [AngularJS — Superheroic JavaScript MVW Framework](http://angularjs.org/)
2. [Rivets.js — Lightweight and powerful data binding + templating solution for building modern web applications](https://github.com/mikeric/rivets)
3. [nytimes/backbone.stickit](https://github.com/nytimes/backbone.stickit)
4. [Epoxy.js — Elegant Data Binding for Backbone](https://github.com/gmac/backbone.epoxy)
5. [Ember.js — A framework for creating ambitious web applications](http://emberjs.com/)
6. [RubyLouvre/avalon — 迷你简单易用的MVVM框架](https://github.com/RubyLouvre/avalon)
    1. scanTag() > scanAttr() > executeBindings() > scanNodes() >
    2. [前端MVVM的应用](http://vdisk.weibo.com/s/aMO9PyIQCnLOF/1375154475)
7. [Knockout — Simplify dynamic JavaScript UIs with the Model-View-View Model (MVVM) pattern](http://knockoutjs.com/)
8. [backbone.modelbinding — Awesome model binding for Backbone.js](https://github.com/derickbailey/backbone.modelbinding/)

# 扩展阅读-百尺竿头
* [How to Implement DOM Data Binding in JavaScript](http://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript)
* [Easy Two-Way Data Binding in JavaScript](http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/)
* [Data Binding in Classical Template Systems](http://docs.angularjs.org/guide/databinding)

# 参考资料
* [Github](https://github.com/search?l=JavaScript&q=data+binding&ref=searchresults&type=Repositories)

### 迷你MVVM框架 avalonjs 入门教程
<http://www.cnblogs.com/rubylouvre/p/3181291.html#top5>

**双工绑定(ms-duplex)**

这功能抄自angular，原名ms-model起不得太好，姑且认为利用VM中的某些属性对表单元素进行双向绑定。打算启用一个新名字叫ms-duplex

这个绑定，它除了负责将VM中对应的值放到表单元素的value中，还对元素偷偷绑定一些事件，用于监听用户的输入从而自动刷新VM。具体如下：

* text, password, textarea
    * 默认是通过input事件进行监听，旧式IE是通过propertychange实现，换言之，每改一个字符串都触发。如果想在失去焦点时才触发，可以在元素上使用data-event="change"进行调整。 它要求VM对应的属性为一个字符串或数字，不过触发一次之后，属性就会变成字符串。
* radio
    默认是通过change事件进行监听，旧式IE是通过chick实现， 它要求VM对应的属性为一个布尔。
* checkbox
    默认是通过change事件进行监听， 它要求VM对应的属性为一个字符串数组。有时，我们需要将checkbox 当成radio用，就需要用ms-duplex-radio, 点我看此例子
* select
    默认是通过change事件进行监听， 它要求VM对应的属性为一个字符串或字符串数组（视multiple的值）。
