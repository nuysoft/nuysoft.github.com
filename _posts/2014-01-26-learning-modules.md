---
layout: post
title: "学习 Javascript 模块化编程"
description: ""
category-substitution: 翻译
tags: [翻译, 模块化, modules]
published: 

subgroup: "Learning modules"
---
{% include JB/setup %}

> 原文：<http://know.cujojs.com/tutorials>, <https://github.com/know-cujojs/know/tree/master/src/documents/tutorials/modules>

<!-- Modules are the cornerstone of cujoJS. They allow you to divide your application into manageable chunks that can be shared and reused. Just as importantly, you can consume modules that others have published. -->
模块化是 cujoJS 的核心理念。模块化使应用程序可以被分割为可管理、可共享、可复用的小块，也使应用程序可以使用其他人已发布的模块。

<!-- These tutorials cover module basics, including two popular module formats and how to load modules by their identifier. -->
这些教程覆盖了模块的基础知识，其中，包含了两种流行的模块格式，以及如何通过标识符来加载模块。
<!-- 
1. [Authoring AMD modules](/)
2. [Authoring CommonJS modules](/)
3. [Authoring UMD modules](/)
4. [Consuming modules: Module ids](/)
5. [Consuming modules: Locating modules in AMD](/)
 -->

<ol>
  {% for post in site.posts %}
    {% if post.pgroup == "Learning modules" %}
      {% if post.link == null %}
        <li>
            <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
            <br>
            <span>{{ post.tagline }}。{{ post.description }}</span>
        </li>
      {% else %}
        <li><a href="{{ post.link }}" target="_blank">{{ post.title }}</a></li>
      {% endif %}
    {% endif %}
  {% endfor %}
</ol>

<!-- 
## 扩展阅读
* Javascript 模块化编程 by 阮一峰
    * [模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)，[AMD 规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)，[require.js 的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
* [Javascript 模块化是什么及其优缺点介绍](http://www.jb51.net/article/41068.htm)
* [JavaScript Modules](http://blog.davidpadbury.com/2011/08/21/javascript-modules/)，[翻译 - JavaScript 模块化开发一瞥](http://www.ituring.com.cn/article/1091)
* [JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
* [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
* [浅谈模块化的 JavaScript](http://www.cnblogs.com/jinguangguo/archive/2013/04/06/3002515.html)
* [前端模块化开发的价值](https://github.com/seajs/seajs/issues/547) by 玉伯
* [LABjs、RequireJS、SeaJS 哪个最好用？为什么？](http://www.zhihu.com/question/20342350)
* [浅谈模块化加载的实现原理](http://www.cnblogs.com/hustskyking/p/how-to-achieve-loading-module.html)
* [Modules Wiki](http://wiki.commonjs.org/wiki/Modules)
* [Modular JS](http://www.cnblogs.com/snandy/category/360589.html) by Snandy
* [模块化的 JavaScript 开发的优势在哪里](http://www.chinaz.com/program/2012/1022/279182.shtml)
* [与 RequireJS 的异同](https://github.com/seajs/seajs/issues/277)
* [Javascript 的 AMD 规范](http://baike.baidu.com/subview/810/8174799.htm)
 -->
