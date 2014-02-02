---
layout: post
title: "angularjs"
description: ""
category-substitution: 
tags: []
published: false
---
{% include JB/setup %}

## 问题

* 如何解析 DOM 模板？
* 如果关联数据和视图？
* 如何更新视图？
* 指令是如何工作的？

### 技巧

* 注释嵌入代码，数据 scope 存储在 Cache 中

        if (node.nodeType == 1 /* element */ || node.nodeType == 9 /* document */ ) {
            $linkNode.eq(i).data('$scope', scope);
        }

* 再次指定 console.error() 的上下文有什么用？

        $log.error.apply($log, arguments);

* 循环变量 i、ii

        for (var i = 0, ii = length, part; i < ii; i++) {

* 倒序遍历，非常棒的技巧，巧妙的利用了表达式 `length--` 的计算顺序和计算结果。

        length = watchers.length;
        while (length--) {
            watch = watchers[length];
        }

* 忽略不产生输入的辅助按键 <http://en.wikipedia.org/wiki/Computer_keyboard#Modifier_keys>

        element.on('keydown', function(event) {
            var key = event.keyCode;
            
            // ignore
            //    command            modifiers                   arrows
            if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) return;

            deferListener();
        });

* 监听 input 元素的输入：`input`、`keydown`、`change`、`paste`、`cut`
    
        // angular.js/src/ng/directive/input.js

        if ($sniffer.hasEvent('input')) {
            element.on('input', listener);
        } else {
            element.on('keydown', function(event) {
            // if user paste into input using mouse, we need "change" event to catch it
            element.on('change', listener);
            // if user modifies input value using context menu in IE, we need "paste" and "cut" events to catch it
            if ($sniffer.hasEvent('paste')) {
                element.on('paste cut', deferListener);
            }
        }


### 启动

ready > angularInit(element, bootstrap) > bootstrap(element, modules) > compile(element)(scope)

### 如何解析 DOM 模板？

compile($compileNodes, transcludeFn, maxPriority, ignoreDirective) > 
compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective) > collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) > addAttrInterpolateDirective(node, directives, value, name) > 
$interpolate(text, mustHaveExpression, isTrustedContext)

## 首页翻译

<http://angularjs.org/>

![](http://angularjs.org/img/AngularJS-large.png)
![](http://angularjs.org/img/AngularJS-small.png)

HTML enhanced for web apps!

HTML 增强

Why AngularJS?

为什么选择 AngularJS？

HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.

HTML 非常适合声明静态文档，当对于声明 Web 应用中的动态视图力不从心。AngularJS 允许您为应用扩展 HTML 语法。使您的应用极富表现力、可读性强，并快速开发。

Alternatives

替代方案

Other frameworks deal with HTML’s shortcomings by either abstracting away HTML, CSS, and/or JavaScript or by providing an imperative way for manipulating the DOM. Neither of these address the root problem that HTML was not designed for dynamic views.

其他框架通过对 HTML、CSS、JavaScript 进行抽象，或者提供某种方式用于操作 DOM，来处理 HTML 的先天不足。但是都没有解决根本问题：HTML 并不是为动态视频而设计。

Extensibility

可扩展性

AngularJS is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs. Read on to find out how.

为了构建最适合的应用开发框架，AngularJS 提供了一套工具。它是完全可扩展的，并且可以很好地与其他库协同工作。每个功能都可以被修改或替换，以满足您独特的开发流程和功能需求。请继续阅读，了解如何做。

The Basics

Add Some Control

添加控制器

Data Binding

数据绑定

Data-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This is awesome because it eliminates DOM manipulation from the list of things you have to worry about.

数据绑定是一项自动更新技术，当模型改变时自动更新视图，当视图改变时自动更新模型。这项技术非常神奇，因为它消除了 DOM 操作代码。

Controller

控制器

Controllers are the behavior behind the DOM elements. AngularJS lets you express the behavior in a clean readable form without the usual boilerplate of updating the DOM, registering callbacks or watching model changes.

控制器是指 DOM 元素背后的行为。AngularJS 允许通过注册回调函数或监听模型变化，以干净、可读的方式来描述行为，而不需要更新 DOM。

Plain JavaScript

普通的 JavaScript

Unlike other frameworks, there is no need to inherit from proprietary types in order to wrap the model in accessors methods. Angular models are plain old JavaScript objects. This makes your code easy to test, maintain, reuse, and again free from boilerplate.

不想其他的框架，没有必要通过继承专有类型，把模型封装在访问方法中。Angular 的模型时普通的 旧式 JavaScript 对象。这使你的代码易于测试、维护、重用、不受限制。

Wire up a Backend

连接后端

Deep Linking

深度链接

A deep link reflects where the user is in the app, this is useful so users can bookmark and email links to locations within apps. Round trip apps get this automatically, but AJAX apps by their nature do not. AngularJS combines the benefits of deep link with desktop app-like behavior.

深度链接反映了用户在应用程序中的位置，用户可以把它添加到书签，或者用电子邮件发送它，因此深度链接非常有用。普通应用可以自动得到深度链接，AJAX 应用则由于其性质无法得到深度链接。AngularJS 通过类似桌面应用的行为，兼顾了 AJAX 和深度链接。

Form Validation

表单验证

Client-side form validation is an important part of great user experience. AngularJS lets you declare the validation rules of the form without having to write JavaScript code. Write less code, go have beer sooner.

客户端表单验证是极致用户体验的重要组成部分。AngularJS 允许你声明表单的验证规则，而无需编写 JavaScript 代码。

Server Communication

服务器通信

AngularJS provides built-in services on top of XHR as well as various other backends using third party libraries. Promises further simplify your code by handling asynchronous return of data. In this example, we use the AngularFire library to wire up a [Firebase](https://www.firebase.com/) backend to a simple Angular app.

AngularJS 提供了内置基于 XHR 的服务端，就像各种使用第三方库的后端一样。用 Promises 处理异步返回的数据，从而简化你的代码。在着俄示例中，我们使用 AngularFire 库把一个 [Firebase](https://www.firebase.com/) 后端和一个简单 Angular 应用连接在一起。

Create Components

创建组件

Directives

指令

Directives is a unique and powerful feature available only in Angular. Directives let you invent new HTML syntax, specific to your application.

指定 Directives 是一项目独特而强大的功能，只适用于 Angular。指定 Directives 允许你创造新的、特定于应用的 HTML 语法。

Reusable Components

可重用组件

We use directives to create reusable components. A component allows you to hide complex DOM structure, CSS, and behavior. This lets you focus either on what the application does or how the application looks separately.

我们用指令 Directives 来创建可重用的组件。组件可以隐藏复杂的 DOM 结构、CSS 和行为。这使你可以专注于应用程序的功能，使用应用程序解耦合。

Localization

本地化

An important part of serious apps is localization. Angular's locale aware filters and stemming directives give you building blocks to make your application available in all locales.

应用程序的一个重要部分是本地化。Angular 的语言环境感知过滤器和拦截指令，使应用程序可以支持所有语言环境。

Embed and Inject

嵌入并注入

Embeddable

嵌入

AngularJS works great with other technologies. Add as much or as little of AngularJS to an existing page as you like. Many other frameworks require full commitment. This page has multiple AngularJS applications embedded in it. Because AngularJS has no global state multiple apps can run on a single page without the use of iframes. We encourage you to view-source and look around.

AngularJS 可以与其他技术无间地协作。可以随意向现有页面中添加 AngularJS 代码。许多其他框架则要求全盘接收。这个页面嵌入了多个 AngularJS 应用程序。因为 AngularJS 没有全局状态，多个应用程序可以在同一个页面中运行，而不需要使用 iframe。建议你查看源码，到处走走看看。

Injectable

注入

The dependency injection in AngularJS allows you to declaratively describe how your application is wired. This means that your application needs no main() method which is usually an unmaintainable mess. Dependency injection is also a core to AngularJS. This means that any component which does not fit your needs can easily be replaced.

AngularJS 的 依赖注入，允许以声明的方式，描述应用程序是如何组织的。这意味着，应用程序不需要 main() 方法 —— 它通常是不可维护的、混乱的。依赖注入也是 AngularJS 的核心。这意味着，任何不能满足需求的组件，可以很容易地被替换。

Testable

可测试

AngularJS was designed from ground up to be testable. It encourages behavior-view separation, comes pre-bundled with mocks, and takes full advantage of dependency injection. It also comes with end-to-end scenario runner which eliminates test flakiness by understanding the inner workings of AngularJS.

AngularJS 被设计为从头到底都是可测试的。它鼓励行为-视图分离，预绑定了 mocks，并且充分利用了依赖注入。它还配备了端到端的场景运行器，以消除测试碎片，通过理解 AngularJS 的内部运行机制。

## 总体结构

**AngularJS**

* Untilies
* JQLite
* Injector
* Browser

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
* [Localytics：AngularJS代替Backbone 代码减少一半](http://www.csdn.net/article/2013-04-12/2814864-Localytics-AngularJS-Backbone)
* [http://angular-tips.com/](http://angular-tips.com/)
* [How the $apply Runs a $digest](http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/)，[翻译](http://blog.csdn.net/leekangtaqi/article/details/10376363)
* [AngularJS框架研究（一）](http://www.cnblogs.com/walktree/p/angularJS_info_1.html)
* [源代码目录结构--AngularJS学习笔记（一）](http://www.cnblogs.com/htynkn/p/3505875.html)
* [启动和JQuery绑定--AngularJS学习笔记（二）](http://www.cnblogs.com/htynkn/p/AngularJS-2.html)
* [专访AngularJS框架创始人Misko Hevery：让Web开发更便捷](http://www.csdn.net/article/2013-10-08/2817118-AngularJS-Framework-Google)