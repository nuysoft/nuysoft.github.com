---
layout: post
title: "编写 CommonJS 模块"
tagline: "Authoring CommonJS modules"
description: ""
category: 
category-substitution: 翻译
tags: [翻译, 模块化, modules, CommonJS, curl]

short: "编写 CommonJS 模块"
pgroup: "Learning modules"
---
{% include JB/setup %}

> 原文：<http://know.cujojs.com/tutorials/modules/authoring-cjs-modules>

<!-- CommonJS modules were conceived during the early days of server-side JavaScript environments such as node.js and Narwhal.  As a result, CommonJS modules are optimized for these environments, not browser environments. -->
CommonJS 模块规范源于早期的服务端 JavaScript 环境，例如 [node.js] 和 [Narwhal]。后来，又专为这些环境进行了优化，但是不包括浏览器环境。

[node.js]: http://nodejs.org/
[Narwhal]: https://github.com/tlrobinson/narwhal/

<!-- In the browser, we've been conditioned to minimize slow HTTP fetches.  We typically concatenate the bulk of our code into a handful of bundles.  Server-side engines ignore these hassles since file access is nearly instantaneous, which allows them to limit each file to *exactly* one module.  This 1:1 file-to-module pattern is desirable for several reasons: -->
在浏览器中，我们已经习惯了尽量减少缓慢的 HTTP 请求。通常还会把大代码文件串联成少数几个文件（即合并文件）。服务端引擎则可以忽略这些麻烦，因为文件访问几乎瞬间就可以完成，进而可以约定：每个文件恰好对应一个模块。这种的 1:1 文件-模块 模式是可取的，原因如下：

<!-- 
* Each module can be authored individually, which increases team scalability.
* Each module can be debugged independently, which decreases testing costs.
* Each module's scope and context can be controlled, which can be used to isolate the modules.
 -->
* 每个模块可以单独编写，从而增加团队的可扩展性。
* 每个模块可以独立调试，从而降低测试成本。
* 每个模块的范围和内容是可控的，从而实现模块解耦。

<!-- The last point is worth investigating further. -->
最后一点值得进一步深入研究。

<!-- Server-side environments aren't encumbered by the shared global scope of browsers.  Rather than inject global variables, such as `document` and `window`, into the scope of the module, they can inject module-specific variables that can be used to help author the module. -->
服务器端环境没有受到浏览器端的全局共享作用域的影响。它没有向模块作用域中注入全局变量，例如 `document` 和 `window`，而是注入一些限定于模块作用域的变量，来帮助编写模块。

<!-- The CommonJS Modules/1.1 spec standardized these *scoped variables*: `require`, `exports`, and `module`.  Let's explore these by looking at the code of a very simple CommonJS module: -->
规范 CommonJS Modules/1.1 标准化了这些*模块作用域变量*：`require`、`exports` 和 `module`。我们用一个非常简单的 CommonJS 模块来讨论这些变量。

    // module app/mime-client
    var rest, mime, client;

    rest = require('rest');
    mime = require('rest/interceptor/mime');

    client = rest.chain(mime);

    // debug
    console.log(module.id); // should log "app/mime-client"

    exports.client = client;

<!-- Note the absence of a wrapper around this code, such as an [Immediately Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) or [AMD](./authoring-amd-modules.html.md)'s `define(factory)`.  It also appears as if we are working with global variables.  We are not!  Because each file executes in its own *module scope*, the `var` statements actually declare variables that are scoped to the module, just as if it were wrapped in a function. -->
注意：上面的代码并没有被封装起来，例如用 [立即调用的函数表达式（Immediately Invoked Function Expression，IIFE）] 或 [AMD] 的 `define(factory)`，看起来似乎全是一些全局变量，但事实上并非如此！因为每个文件运行在它自己的*模块作用域*中，`var` 语句声明的变量实际上被限制在了当前模块的作用域中，就像是被包裹在一个函数中。

[立即调用的函数表达式（Immediately Invoked Function Expression，IIFE）]:http://benalman.com/news/2010/11/immediately-invoked-function-expression/
[AMD]: ./authoring-amd-modules.html.md

<!-- Of course, the three CommonJS variables, `require`, `exports`, and `module`, are also scoped to the module.  Let's investigate each one in detail. -->
因为同样的原因，`require`, `exports` 和 `module` 这三个 CommonJS 变量也被限制在了模块的作用域中。我们来探讨下每个变量的细节。

## require

<!-- If your module requires other modules to do its work, you can declare references to the other modules into the current module's scope by using the `require` function.  Call `require(id)` for each module.  Typically, you assign each module to a local variable.  This example pulls in references to two modules: "rest" and "rest/interceptor/mime". -->
如果一个模块需要依赖其他模块才能工作，你可以通过 `require` 函数把其他模块引入当前模块的作用域。只需要为每个模块调用一次 `require(id)`。通常情况下，会把每个模块赋值给一个局部变量。前面的例子中引用了两个模块“rest”和 “rest/interceptor/mime”。

<!-- Notice that "rest/interceptor/mime" has slashes in it much like a file path or a url.  However, it is neither!  Like AMD, CommonJS uses slashes to indicate namespaces for modules.  The name before the first slash is the *package name*.  CommonJS modules are almost always grouped with related modules into a larger structure known as a *package*. -->
请注意：“rest/interceptor/mime”中的斜杠使它看起来像一个文件路径或 URL，但其实都不是！就像 AMD 一样，CommonJS 使用斜杠来表示模块的命名空间，其中，第一个斜杠之前的名称是*包名*。一个 CommonJS 模块与相关的模块组成一个更大的结构，这个结构称为*包*。

## exports

<!-- The most critical CommonJS variable is `exports`.  This object becomes the public API of your module.  It is the only part of your module that is exposed to the rest of the environment.  All objects, functions, constructors, etc. that your module provides must be declared as properties of the `exports` object.  The example assigns the `client` property to the `client` function that was returned from `rest.chain(mime)`.  The rest of the module is not exposed. -->
最关键的 CommonJS 变量是 `exports`。这个对象是模块的公开 API，其中只包含了暴漏给环境中其他模块的那部分。模块所提供的所有对象、函数、构造函数等等，都必须声明为 `exports` 对象的属性。例如，在前面的例子中，设置属性 `client` 为 `rest.chain(mime)` 所返回的 `client` 函数。模块的剩余部分则不会暴漏。

## module

<!-- The `module` variable was originally conceived to provide metadata about the module.  It holds the `id` and unique `uri` of each module.  However, to overcome an inconvenience with the `exports` pattern (see below), node.js extended `module` to expose the `exports` object as a property.  Many other environments have followed node.js's lead, so `module.exports` is very common. -->
变量 `module` 的初衷是提供关于模块的元数据。它持有每个模块的 `id` 和唯一 `uri`。但是，为了克服 `exports` 模式的不便（见下文），node.js 在 `module` 上扩展了一个属性 `exports`，来暴漏 `exports` 对象。许多其他的环境遵循了 node.js 的实现，所以 `module.exports` 是通用的。

### exports vs. module.exports

<!-- The `exports` variable is an object literal.  It holds all the functions and properties that your module provides.  It's too deep to explain fully in this tutorial, but this authoring pattern allows developers to *intentionally* create *resolvable* circular dependencies. -->
变量 `exports` 是一个对象直接量，它持有当前模块所提供的所有方法和属性。要充分说明这一点，对于这篇教程来说太高深了，但是有一点，这种编码模式允许开发人员*自然而然地*构造*可解析的*循环依赖。

<!-- However, what if your module is simply a function, a constructor, or a string template?  Many developers believe that a module should be able to export any object, *especially functions*, despite the risk of creating an unresolvable circular dependency.  Therefore, `module.exports` was born. -->
但是，如果当前模块是一个简单的函数、构造函数或字符串模板，又该如何呢？许多开发人员认为一个模块应该能够输出任意对象，*尤其是函数*，尽管这可能导致无法解决的循环依赖。就这样，`module.exports` 诞生了。

<!-- Let's contrast how the two different export patterns look. -->
我们来对比下这两种输出模式有何不同。

<!-- In the previous code sample, a dependent module would acquire the `client` function with the following code: -->
延续前面的代码示例，另一个模块可以用下面的代码获取到 `client` 函数：

    // we have to require the client module and then access the client property
    var client = require('app/mime-client').client;

<!-- If the module exports only the `client` function, then why dereference it at all?  Let's rewrite the module using `module.exports` so we don't have to: -->
如果当前模块只输出了 `client` 函数，会如何呢？我们用 `module.exports` 来重写前面示例中的模块：

    // module app/mime-client
    var rest, mime, client;

    rest = require('rest');
    mime = require('rest/interceptor/mime');

    client = rest.chain(mime);

    // debug
    console.log(module.id); // should log "app/mime-client"

    // here is the interesting bit:
    module.exports = client;

<!-- Now we can consume `client` more intuitively: -->
现在，我们可以更直观地使用 `client`：

    // this is much cleaner!
    var client = require('app/mime-client');

<!-- ## Limitations of CommonJS modules -->
## CommonJS 模块的局限性

<!-- Many developers view CommonJS as a very clean *authoring format* for modules.  However, browsers can't consume them directly because browsers don't create the CommonJS scoped variables.  Performance also suffers dramatically when browsers must load dozens or hundreds of modules in any non-trivial application.  You resolve this problem by using tools that generate *transport formats* to allow CommonJS modules to be concatenated and wrapped so they can operate in browsers.  Many of these tools just use AMD for the transport format since it does the job efficiently and is so widely supported. -->
许多开发人员把 CommonJS 视为一种非常清爽的模块*书写格式*。但是浏览器无法直接使用它们，因为浏览器不会创建 CommonJS 模块作用域变量。在任何应用程序中，当浏览器必须加载数十或数百个模块时，性能都会受到严重影响。你可以通过用工具生成 *传输格式* 来解决这一问题，工具会把 CommonJS 模块串联和封装起来，使它们能够在浏览器中运行。许多这样的工具只使用 AMD 作为传输格式，因为 AMD 可以有效地完成这一任务，并且被广泛支持。

<!-- For example, cujo.js's cram.js wraps CommonJS modules inside AMD modules and bundles all the modules together for efficient loading. -->
例如，cujo.js 的 cram.js 把 CommonJS 模块封装为 AMD 模块，并且把所有模块合并在一起，以便高效加载。

<!-- Unfortunately, most of these tools require a build step to convert from an authoring format to a transport format.  cujo.js's curl.js does *not* require a build step, in most cases.  The build step complicates the development process and makes it harder to get started on a new project. -->
不幸的是，大多数这些工具都需要一个构建过程，来把书写格式转换成传输格式。而 cujo.js 的 curl.js 在大多数情况下不需要这一步骤。构建使开发过程变得复杂，并且很难应用在一个新项目中。

<!-- *Why can't we just write in a module format that's friendly to both server and browser environments?*  Actually, we can!  It's called UMD, , but that's a topic for our next lesson. -->
*为什么不能用某种对服务端和浏览器都友好的格式编写模块呢？*其实是可以的！那就是 UMD（Universal Module Format，通用模块格式），但这是下一节课的话题了。

<!-- For further reading on CommonJS Modules, visit http://wiki.commonjs.org/wiki/Modules/1.1 -->
关于 CommonJS 模块的更多细节，请访问 <http://wiki.commonjs.org/wiki/Modules/1.1>。

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