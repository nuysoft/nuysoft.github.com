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

* 双向的数据绑定
* 模板
* MVVM
* 依赖注入（Dependency Injection，即 DI）
* Directives（指令）
* 测试
    * https://github.com/angular/angular-seed

## 参考资料
* [AngularJS Tutorial](http://docs.angularjs.org/tutorial)
* [AngularJS 入门教程](http://www.ituring.com.cn/minibook/303)
* OReilly AngularJS En.pdf