---
layout: post
title: "angularjs"
description: ""
category-substitution: 
tags: []
published: false
---
{% include JB/setup %}

## 总体结构

### 初始化
1. IIFE
2. bindJQuery()
3. publishExternalAPI(angular);
    1. extend(angular, {})
    2. angularModule = setupModuleLoader(window);
    3. angularModule('ngLocale');
4. angularInit(document, bootstrap);

## 6 个特性

### [Javascript教程：AngularJS的五个超酷特性](http://www.chinaz.com/design/2012/0725/264318.shtml)
* 双向的数据绑定
* 模板
* MVVM
* 依赖注入（Dependency Injection，即 DI）
* Directives（指令）
* 测试
    * https://github.com/angular/angular-seed

## 亮点
* 非常友好的文档
    * 站在用户的交互
    * 用 git 控制教程的步骤
    * 用 github 展示相邻步骤之间的代码差异
    * 概述 + 源码 + 说明 + 测试用例 + 联系
    * 教程小节之间的衔接流畅自然
* 代码结构非常棒，职责分明
* service
    * 服务层工厂函数
    * 脱裤子放屁，例如 $route service、$http service
* Provider
    * 服务实例
    * Providers are objects that provide (create) instances of services and expose configuration APIs that can be used to control the creation and runtime behavior of a service.
* module
    * 一切都是模块
    * Angular modules solve the problem of removing global state from the application and provide a way of configuring the injector.
    * As opposed to AMD or require.js modules, Angular modules don't try to solve the problem of script load ordering or lazy script fetching. These goals are orthogonal and both module systems can live side by side and fulfil their goals.
* DI
    * 感觉可有可无
    * lazily instantiates 延迟初始化
* 滥用链式语法和函数参数
    * 要理解每个方法的返回值到底是什么
    * 要理解参数格式
    * 多层嵌套影响阅读
    * 代码格式非常不靠谱
* 看似简单的语句背后是复杂的概念引用
    * step-11 $scope.phones = Phone.query();
* 依赖注入
    * 延迟初始化 + 运行时注入
    * 核心思想是运行时注入，Angular 并没有实现这一点（事实上，有必要吗？）
    * 必须要有某种方法实现运行时依赖注入：配置文件？额外的注解？参数签名！参数签名不靠谱啊，会被压缩，为此又增加了手动声明，没有必要。
* future
    * 引入了多线程的概念
* 复制 Spring 的成功路线
    * Java 是强类型语言，通过控制反转和依赖注入可以灵活的配置 Java。
    * 通过配置文件（XML）、注解（Anotation）
    * 


## 参考资料
* [AngularJS Tutorial](http://docs.angularjs.org/tutorial)
* [AngularJS 入门教程](http://www.ituring.com.cn/minibook/303)
* OReilly AngularJS En.pdf