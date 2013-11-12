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
## 示例
## 历史
## 小结
* View 的改变会更新 Model
* Model 的改变会更新 View

# 关键技术点

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
    2. 数据模型变化时，找到需要需要更新的 DOM 元素

**继续完善**

### Expression
1. √ 建立 Expression 与对应模板的映射关系
2. √ 建立 Expression 与对应数据的映射关系
3. √ 建立 Expression 与已渲染 DOM 元素的映射关系
4. 建立 Expression 与已渲染 DOM 属性的映射关系

### Block
1. √ 建立 Block 与对应模板的映射关系
2. √ 建立 Block 与对应数据的映射关系
3. √ 建立 Block 与已渲染 DOM 元素的映射关系
4. 建立 Block 与已渲染 DOM 属性的映射关系

## 数据模型 - DOM 属性（Attr）
1. TODO
2. 

## DOM 元素 - 自动数据模型 - DOM 元素
1. TODO
2. 

# 同类框架分析-百家争鸣
1. AngularJS
2. rivets
3. backbone.stickit
4. backbone.epox

# 扩展阅读-百尺竿头
* [How to Implement DOM Data Binding in JavaScript](http://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript)
* [Easy Two-Way Data Binding in JavaScript](http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/)
# 参考资料
* [Github](https://github.com/search?l=JavaScript&q=data+binding&ref=searchresults&type=Repositories)