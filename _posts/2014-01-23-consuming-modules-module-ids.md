---
layout: post
title: "模块标识符"
tagline: "Module ids"
description: ""
category: 
category-substitution: 翻译
tags: [翻译, 模块化, modules, curl]

short: "模块标识符"
pgroup: "Learning modules"
---
{% include JB/setup %}

<!-- Consuming modules: Module ids -->
<!-- 使用模块：模块标识符 -->

> 原文：<http://know.cujojs.com/tutorials/modules/consuming-modules-module-ids>

<!-- As we discussed briefly in [Authoring AMD Modules](./authoring-amd-modules.html.md), some modules require other modules to do their work.  The module author specifies these other modules by listing each module's *id* in the dependency list or in a "local require". -->
有些模块需要依赖其他模块才能运行，正如我们在 [编写 AMD 模块] 中所讨论的。通过在依赖列表中罗列每个模块的 *id*，或者执行“require”，当前模块的作者可以指定所依赖的其他模块。

[编写 AMD 模块]: ./authoring-amd-modules.html.md

<!-- ## Module ids -->
## 模块标识符

<!-- AMD and CommonJS both specify module ids that look very much like file paths or urls: ids consist of *terms* separated by slashes.  The definition of "terms" is fairly loose.  The CommonJS [spec](http://wiki.commonjs.org/wiki/Modules/1.1#Module_Identifiers) further restricts "terms" to be camelCase Javascript identifiers, but in practice, other popular file name characters, such as `-` are acceptable.  The proposed ES6 modules [spec](http://wiki.ecmascript.org/doku.php?id=harmony:modules) is much more flexible, but, realistically, ids should be compatible with file systems and urls. -->
AMD 和 CommonJS 都指定了看起来非常像文件路径或 URL 的模块标识符：由斜杠分隔的*词条*组成。词条的定义相当宽松。虽然 [CommonJS 规范] 进一步约束“词条”为驼峰式的 JavaScript 标识符，但是在实践中，其他流行文件名（例如 `-`）也是可以接受的。[ES6 的模块规范] 则更加宽松和实际，它要求标识符应该与文件系统和 URL 兼容。

[CommonJS 规范]: http://wiki.commonjs.org/wiki/Modules/1.1#Module_Identifiers
[ES6 的模块规范]: http://wiki.ecmascript.org/doku.php?id=harmony:modules

<!-- AMD reserves the `!` character to indicate that a [Loader Plugin](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins) should be used to load the module or other type of resource. -->
AMD 保留了 `!` 字符，如果标识符中含有该字符，则表示用 [加载器插件] 来加载模块或其他类型的资源。

> 译注：格式为 `[Plugin Module ID]![resource ID]`，例如 `text!../templates/start.html`。

[加载器插件]: https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins

<!-- Some examples of acceptable module ids: -->
一些合法的模块标识符示例：

    "wire/lib/functional"
    "poly/es5-strict"
    "app/billing/billTo/Customer"
    "jquery"

<!-- As with file systems and urls, the slashes delineate organizational hierarchies.  Typically, these hierarchies are mirrored by identical directory structures in the underlying file system, but this mirroring is not guaranteed. For example, curl.js exposes some extensibility API modules.  These modules have ids of the form "curl/<submodule>", but they don't actually exist as files. -->
和文件系统和 URL 一样，模块标识符中的斜杠描述了层次结构。通常情况下，层次结构与文件系统的目录结构是系统的，但是无法百分百保证。例如，curl.js 暴漏了一些扩展 API 模块，这些模块的标识符格式是“curl/<submodule>”，但是它们并不是真实存在的文件。

<!-- Be careful to capitalize correctly.  Because most modules typically map to files, spell and capitalize the module name exactly the same as the file name.  For example, "jQuery" is almost always *not* the correct module id (capital "Q")!  Here's how you would require jQuery in a module: -->
注意大小写是否正确。尽管大部分模块通常映射到了文件，即模块标识符的拼写和大小写与文件名完全一样。例如，“jQuery”就*不是*正确的模块标识符（大写了“Q”）！下面的代码演示了如何在一个模块中加载 jQuery：

    define(function (require) {

        var $ = require('jquery');
        $('body').text('Hello world!');

    });

<!-- ## Reserved ids -->
## 保留标识符

<!-- Most AMD environments reserve a few special module ids to refer to built-in modules and utilities.  For example, most AMD environments reserve the "require", "exports", and "module" ids to gain access to pseudo-modules that simulate the *free variables* of CommonJS.  AMD environments may reserve a few other ids, as well.  For example, a proposed feature of curl.js 0.8 is a `global` pseudo-module to help devs create code that works on the server and the browser.  -->
大多数 AMD 环境会保留几个特殊的模块标识符，用来引用内置模块或工具。例如，标识符“require”、“exports”和“module”用于模拟 CommonJS 中的*同名变量*，访问伪模块。AMD 环境可能还保留了一些其他的标识符。例如，curl.js 0.8 的一个推荐特性是伪模块 `global`，用来帮助开发人员编写可以同时运行在服务器和浏览器的代码。

    define(function (require) {

        // inspect the CommonJS "module" var
        var module = require('module');
        console.log(module.uri, module.id);

    });

<!-- Check your AMD environment's documentation for more information about reserved module ids. -->
关于保留标识符的详细信息，请查阅你正在用的 AMD 环境的文档。

<!-- ## Relative Ids -->
## 相对标识符

<!-- AMD and CommonJS also support the notion of *relative* module identifiers. Modules that reside in the same hierarchical level can be referenced by using `./` at the beginning of the id.  Modules that reside one level up from the current level can be referenced using `../`. -->
AMD 和 CommonJS 也支持*相对*标识符概念。处于同一层级下的模块，可以通过以 `.` 开头的标识符来引用。处于上一层级的模块，则通过 `../` 来引用。

<!-- At run time or build time, the AMD environment must translate relative ids to *absolute* ids.  Absolute ids are rooted at the top level of the module hierarchy and contain no `..` or `.`.  The process of removing the leading `..` or `.` is called "normalization".  For example, assuming app/billing/billTo/Customer is the id of the current module, the environment normalizes required ids as follows: -->
在运行时或构建时，AMD 环境必须将相对标识符转换为*绝对*标识符。绝对标识符位于模块层级的顶层，并且不包含 `..` 和 `.`。移除起始 `..` 和 `.` 的过程称为“规范化 normalization”。例如，假设当前模块的标识符是 `app/billing/billTo/Customer`，AMD 环境会像下面这样规范请求的标识符：

    // module app/billing/billTo/Customer
    define(function (require) {

        // normalizes to "app/billing/billTo/store"
        var store = require("./store");

        // normalizes to "app/billing/payee/Payee"
        var Payee = require("../payee/Payee");

    });

<!-- AMD and CommonJS also recognize bare `.` and `..` as module identifiers.  `.` normalizes to the module whose name is the same as the current level. `..` normalizes to the module whose name is the same as the level that is one level up from the current level.  _Yes, that is confusing!_  Perhaps that's why you don't see these used often.  Hopefully, some examples might help. For example, given that the current module is "app/billing/billTo/Customer", the environment normalizes these ids as follows: -->
AMD 和 CommonJS 也可以把单个的 `.` 和 `..` 解释为模块标识符。`.` 被规范为与当前层级同名的模块。`..` 被规范为与上一层级同名的模块。_是的，太混乱了！_也许这就是很少看到它们被使用的原因。但愿举一些例子会有所帮助。<!-- 用一些例子来说明可能会更清楚些。 -->例如，当前模块是 “app/billing/billTo/Customer”，AMD 环境会像下面这样规范请求的标识符：

    // module app/billing/billTo/Customer
    define(function (require) {

        // normalizes to "app/billing/billTo" (a module, not a folder!)
        var billTo = require(".");

        // normalizes to "app/billing" (a module, not a folder!)
        var billing = require("..");

    });

<!-- _Hint:_ Never use relative module ids to reference unrelated modules!  Relative modules are meant to be used *within* a "package" (defined later).  Also, more than one set of `../` may be a code smell that you need to organize your modules better.  The relative id may also be interpreted as a url, rather than an id by an AMD environment. -->
_提示：_永远不要使用相对标识符来引用不相关的模块！相对模块适用于在同一个“包 package”（后面再定义它）中的场景。此外，多个 `../` 是一种不好的代码味道，意味着你需要更好地组织你的模块。在 AMD 环境中，相对标识符还可能被解释为一个 URL 而不是标识符。

    // module app/billing/billTo/Customer
    define(function (require) {

        // OK: normalizes to "app/common/payee/Payee"
        // food for thought: should common and billing be separate packages?
        var Payee = require("../../common/payee/Payee");

        // BAD: normalizes to "../util/date" -- a URL, not an ID!
        var Date = require("../../../util/Date");

        // GOOD: use an absolute id to reference a different package
        var Date = require("util/Date"); // "Date" module in the "util" package

    });

<!-- > So, how does the AMD environment know where to find modules if I specify ids and not urls? -->
> 那么，如果我指定了标识符（而不是 URL），AMD 环境中是如何知道去哪里查找模块的呢？

<!-- That's the topic of [Consuming modules: locating modules in AMD](./consuming-locating-modules-in-amd.html.md). -->
那是 [定位模块] 的主题了。

[使用模块：如何定位模块]: ./consuming-locating-modules-in-amd.html.md
