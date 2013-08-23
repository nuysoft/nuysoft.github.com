---
layout: post
title: "Task Management"
description: ""
category: 
tags: []
published: false
---
{% include JB/setup %}

## Task 是什么？

函数包括：

* 任务
    * 异步任务
    * 顺序（同步或异步）任务

* 模块（旧瓶旧酒）
    * 模块规范
    * 设计模式：外观、中介

## Callbacks
* 增强对回调函数的管理，支持添加、移除、触发、锁定、禁用。
* 支持标记 once、memory、unique、stopOnFalse。
* 内部通过一个数组保存回调函数，其他方法则围绕这个数组进行操作和检测。

## Deferred
* 增强回调函数机器状态的管理，支持添加、触发、传播装。
* 解耦异步任务和回调函数。
* 内部维护了多个回调函数列表，其他方法则围绕这三个列表进行操作和检测。

## Promise
* 只能添加函数、获取状态
* 不能触发。
* Deferred 的只读副本！

## Queue
* 应用于任何需要顺序执行函数的场景。
    * 多个动画顺序执行
    * 多步骤任务
    * 测试框架执行测试用例
    * 模块依赖加载
    * SPA 的嵌套加载
    * MVC 加载数据和模板然后渲染
* 通过数组方法 .push() 和 .shift() 实现入队和出队操作。
* 通过函数方法 .call() 执行函数。

## AOP
* 增强单个函数
* getter/setter, proxy

## AER Automatic Event Registration

## 模块与模块之间
* Observer
* Facade
* Mediator
* AER

## 模块与模块之间
* 

## 实现原理

## 参考资料
* [Promises Wiki](http://wiki.commonjs.org/wiki/Promises)
* [jQuery Deferred](http://api.jquery.com/category/deferred-object/)