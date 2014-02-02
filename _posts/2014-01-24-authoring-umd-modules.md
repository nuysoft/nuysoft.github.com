---
layout: post
title: "编写 UMD 模块"
tagline: "Authoring UMD modules"
description: ""
category: 
category-substitution: 翻译
tags: [翻译, 模块化, modules, AMD, CommonJS, UMD, curl]

short: "编写 UMD 模块"
pgroup: "Learning modules"
---
{% include JB/setup %}

<!-- If you run your code in a browser, [AMD modules](./authoring-amd-modules.html.md) are a great choice.  If your code runs in a server-side environment, such as RingoJS or node.js, [CommonJS modules](./authoring-cjs-modules.html.md) are the easiest option. -->
如果是在浏览器中运行代码，那么 [AMD 模块] 是个非常好的选择。如果运行在服务端环境，例如 [RingoJS] 或 [node.js]，那么 [CommonJS 模块] 是最简单的选择。

[RingoJS]: http://ringojs.org/
[node.js]: http://nodejs.org/
[AMD 模块]: ./authoring-amd-modules.html.md
[CommonJS 模块]: ./authoring-cjs-modules.html.md

<!-- > How can I write code that runs in both browsers and servers? -->
> 怎么才能写出可以同时运行在浏览器和服务端的代码？

<!-- Even if you never plan to use your code in a server-side environment, testing in node.js can be incredibly convenient.  Why not write it to work in both? -->
也许你从没打算让代码运行在服务端环境中，但是在 node.js 中执行测试却是非常方便的。所以，为什么不让它同时支持两种环境呢？

<!-- 
> Q: How do we write Javascript modules that will execute in multiple environments?
> *A: Universal Module Definition!*
 -->
> 问：怎么编写 JavaScript 模块，才能让它在多个环境中执行？

> *答：Universal Module Definition，UMD！*

<!-- UMD patterns provide compatibility with multiple environments.  Many, but not all, UMD patterns do this by wrapping your module code in an [Immediately Invoked Functional Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).  The resulting environment inside the IIFE is normalized to the particular environment that your module code expects by mocking and/or injecting variables.  The code outside the function bridges the environment inside the IIFE to the outside environment.  The normalized environment inside the IIFE is very AMD-like or very CommonJS-like, depending on the specific UMD flavor. -->
UMD 模式可以兼容多种环境。为了实现这一点，通常，但不总是，UMD 模式会把模块代码包裹进一个 [立即调用的函数表达式]（Immediately Invoked Function Expression，IIFE） 中。通过模拟或注入变量，IIFE 内部的环境最终被规格化为模块代码所期望的特定环境。IIFE 之外的代码则桥接了 IIFE 的内部环境和外部环境。规格化后的 IIFE 内部环境非常类似于 AMD 或 CommonJS，具体要取决于采用的 UMD 风格。

[立即调用的函数表达式]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/

<!-- There are dozens of UMD variations in use in the wild.  You can find several samples in this [UMD repo](https://github.com/umdjs/umd), as well other [robust UMD patterns](https://gist.github.com/unscriptable/4118495) around the web. -->
UMD 有很多“野生”变种。你可以在 [UMD 仓库] 以及 [强大的 UMD 模式] 找到一些示例。

[UMD 仓库]: https://github.com/umdjs/umd
[强大的 UMD 模式]: https://gist.github.com/unscriptable/4118495

<!-- Many patterns also provide a way to expose your module as a global variable (or property on a global variable).  ***Don't do this!***  Your application code should never declare any globals.  **Globals will make your code harder to reuse and harder to test.**  Besides, [modules are the future of Javascript](http://wiki.ecmascript.org/doku.php?id=harmony:modules), so why fight it? -->
许多模式还提供了一种方式使模块暴漏为全局变量（或全局变量上的属性）。***不要这么干！***应用代码不应该声明任何全局变量，因为**全局变量会导致代码难以重用和难以测试。**此外，[模块化是 JavaScript 的趋势]，为什么要和趋势对着干呢？

[模块化是 JavaScript 的趋势]: http://wiki.ecmascript.org/doku.php?id=harmony:modules

<!-- We've picked our favorite UMD patterns to help streamline your decision.  The generic patterns in the following sections work great in virtually all environments, Netscape 7.2 and IE6 days to cutting edge Firefox and Chromium releases, as well as server-side environments like RingoJS and node.js. -->
我们已经挑选了一些最喜欢的 UMD 模式，以帮助简化你的选择。下面章节中的通用模式可以运行在几乎所有的环境中：Netscape 7.2、IE6、Firefox 和 Chromium，以及服务端环境，例如 RingoJS 和 node.js。

---

<!-- If you haven't done so already, please review the tutorials on [Authoring AMD modules](./authoring-amd-modules.html.md) and [Authoring CommonJS modules](./authoring-cjs-modules.html.md) before proceeding. -->
如果你不知道我在说些什么，说明你尚未准备好，请先温习下教程 [编写 AMD 模块] 和 [编写 CommonJS 模块]，然后再继续。

[编写 AMD 模块]: ./authoring-amd-modules.html.md
[编写 CommonJS 模块]: ./authoring-cjs-modules.html.md

---

<!-- ## Normalize to classic AMD -->
## 重构为经典的 AMD

    define(dependencyIds, factoryFunction(module1, module2 ...))

<!-- If you're converting AMD modules with dependency lists, this pattern requires very little refactoring. -->
如果你正在换转带有依赖列表的 AMD 模块，那么只需要很少量的重构。

    // app/CachingStore
    (function (define) {

        // dependencies are listed in the dependency array
        define(['./store', 'meld'], function (store, meld) {
            "use strict";
            var cache = {};

            // create the module
            meld.around(store, 'get', function (jp) {
                var key = jp.args.join('|');
                return key in cache ? cache[key] : cache[key] = jp.proceed();
            };

            // return your module's exports
            return store;
        });

    }(
        typeof define == 'function' && define.amd
            ? define
            : function (ids, factory) {
                // note: the lambda function cannot be removed in some CJS environments
                var deps = ids.map(function (id) { return require(id); });
                module.exports = factory.apply(null, deps);
            }
    ));

<!-- The entire module is wrapped in an IIFE, and the `define` function is passed in as a parameter.  At the bottom of the file, the code snippet, `typeof define == 'function' && define.amd`, is the standard "sniff" for an AMD environment.  If the sniff evaluates to `true`, then the environment is AMD and the global `define` is passed into the IIFE.  You "export" your module in the usual AMD way by returning something from the factory. -->
整个模块被包裹在一个 IIFE 中，并且函数 `define` 被作为一个参数传入。文件最后的代码片段 `typeof define == 'function' && define.amd` 是嗅探 AMD 环境的标准方式。如果检测结果为 `true`，则说明当前环境是 AMD，可以把全局函数 `define` 传入 IIFE。通过由工厂函数返回一个值，模块“export”以正常的 AMD 方式输出。

<!-- If the AMD-sniff evaluates to `false`, the code mimics a node-like CommonJS environment.  To work with your AMD code, the IIFE injects a function that behaves similarly to AMD's `define`: it resolves all ids to modules and injects them into the factory function as arguments.  It then takes the return value from the factory and sets `module.exports` in typical node.js fashion. -->
如果 AMD 嗅探的结果为 `false`，代码则模拟一个类似 node.js 的 CommonJS 环境。为了使 AMD 代码能够运行，IIFE 注入了一个行为类似于 AMD `define` 的函数：把所有的 ids 加载为模块，并把它们作为参数注入工厂函数。然后，该函数获取到工厂函数的返回值，并以经典的 node.js 方式赋值给 `module.exports`。

<!-- ## Normalize to an AMD factory with injected require() -->
## 为 AMD 工厂函数注入 require()

    define(factoryFunction(require))

<!-- If you already specify dependencies using AMD's "local require", this pattern won't feel like much of a change. -->
如果已经通过 AMD 的“require”指定了依赖关系，也不需要太大的变化。

    // app/CachingStore
    (function (define) {

        // using the define signature that triggers AMD-wrapped CommonJS
        define(function (require) {
            "use strict";
            var store, meld, cache = {};

            // use the injected require() to specify dependencies
            store = Object.create(require('./store'));
            meld = require('meld');

            // create the module
            meld.around(store, 'get', function (jp) {
                var key = jp.args.join('|');
                return key in cache ? cache[key] : cache[key] = jp.proceed();
            };

            // return your module's exports
            return store;
        });
        
    }(
        typeof define == 'function' && define.amd
            ? define
            : function (factory) { module.exports = factory(require); }
    ));

<!-- Again, the entire module is wrapped in an IIFE, and the `define` function is injected as parameter.  The code at the bottom of the IIFE is a bit simpler this time because it more closely mimics CommonJS than the previous pattern.  In fact, it just injects CommonJS's scoped `require` in place of AMD's "local require".  Finally, `module.exports` receives the the return value of the factory. -->
整个组件再次被包裹在一个 IIFE 中，并且函数 `define` 作为参数被注入。这次，IIFE 底部的代码稍微简单一些，因为在这种情况下，AMD 的参数签名原本就与 CommonJS 很相似。事实上，它只注入了 CommonJS 的 `require`，来替换掉 AMD 的 `require`。最后，`module.exports` 被赋予了工厂函数的返回值。

<!-- The cujo.js team uses this pattern quite often. -->
对于这种模式，cujo.js 使用的很频繁。

<!-- ## Normalize to full AMD-wrapped CommonJS -->
## 把 CommonJS 包裹为 AMD

    define(factoryFunction(require, exports, module))

<!-- If your module code is already in node.js or CommonJS format, you can use this wrapper to keep it that way. -->
如果模块代码已经是 node.js 或 CommonJS 格式，可以用下面的包裹方式来格式化。

    // app/CachingStore
    (function (define) {

        // note: we're injecting all three CommonJS scoped variables
        define(function (require, exports, module) {
            "use strict";
            var store, meld, cache = {};

            // use CommonJS patterns to require() dependencies
            store = Object.create(require('./store'));
            meld = require('meld');

            // create the module
            meld.around(store, 'get', function (jp) {
                var key = jp.args.join('|');
                return key in cache ? cache[key] : cache[key] = jp.proceed();
            };

            // you can use node.js and/or pure CommonJS export patterns!
            exports.store = store;
        });

    }(
        typeof define == 'function' && define.amd
            ? define
            : function (factory) { factory(require, exports, module); }
    ));

<!-- This time, all three CommonJS scoped variables (require, exports, module) are injected.  The environment inside the IIFE mimics CommonJS and probably works for all modules that do not access environment-specific variables, such as node's `__dirname`. -->
这一次，三个模块作用域变量（require, exports, module）都被注入。IIFE 中的环境模仿了 CommonJS，适用于所有不访问特定环境变量（例如 node.js 的 `__dirname`）的模块。

<!-- Note that the factory *does not return the exports* in this variation.  It expects that you'll decorate the provided `exports` object or assign to `module.exports`. -->
需要注意的是，在这个变种中，工厂函数*没有返回 exports*。它期望你动态的将功能附加到对象 `exports` 到上，或者复制给 `module.exports`。

<!-- 'Tis the season for wrapping! -->
<!-- TODO 面向模块编程季 -->

<link rel="stylesheet" type="text/css" href="/assets/github.css">
<link href="/assets/codemirror/lib/codemirror.css" rel="stylesheet">
<link href="/assets/codemirror/theme/neat.css" rel="stylesheet">
<script src="/assets/codemirror/lib/codemirror.js"></script>
<script src="/assets/codemirror/addon/runmode/runmode.js"></script>
<script src="/assets/codemirror/mode/javascript/javascript.js"></script>
<script type="text/javascript">
    $('pre').each(function(index, el){
        $(this).hide()
        var ctn = $('<pre class="cm-s-neat">').insertAfter(this)
        CodeMirror.runMode($(this).find('code').text(), 'javascript',
                 ctn.get(0));
    })
</script>