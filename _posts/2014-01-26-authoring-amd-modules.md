---
layout: post
title: "编写 AMD 模块"
tagline: "Authoring AMD modules"
description: "AMD 是最流行的 JavaScript 模块规范，专为浏览器环境而设计，也可以应用在非浏览器环境中。编写 AMD 模块只需要记住三点：把代码封装到 define()，列出依赖关系，返回一个值。"
category: 
category-substitution: 翻译
tags: [翻译, 模块化, modules, AMD, curl]

short: "编写 AMD 模块"
pgroup: "Learning modules"
---
{% include JB/setup %}

> 原文：<http://know.cujojs.com/tutorials/modules/authoring-amd-modules>

<!-- Asynchronous Module Definition (AMD) is the most widely supported JavaScript module format. It's used by cujo.js, jQuery, dojo, Mootools, and several dozens of other libraries and frameworks. AMD is specifically designed for browser environments, but you can also use it in non-browser environments. -->
Asynchronous Module Definition（AMD）是最流行的 JavaScript 模块规范，被 [cujo.js]、[jQuery]、[dojo]、[Mootools]，以及其他无数的库和框架所采用。AMD 专为浏览器环境而设计，<!-- 不过 -->也可以应用在非浏览器环境中。

[cujo.js]: http://cujojs.com/
[jQuery]: http://jquery.com/
[dojo]: http://dojotoolkit.org/
[Mootools]: http://mootools.net/

<!-- Authoring AMD modules is super easy.  There are just three things to remember: -->
编写 AMD 模块非常简单，只需要记住三点：

<!-- 
1. Wrap your code in a `define()`.
2. List your dependencies.
3. Return something!
 -->
1. 把代码封装到 `define()`。
2. 列出依赖关系。
3. 返回一个值。

## define()

<!-- Let's start with `define()`.  The `define` function announces to the AMD environment that you wish to declare a module.  The signature of this function is pretty flexible, but let's start by focusing on the most common usage. -->
在 AMD 中，函数 `define()` 用来声明一个模块。它的参数签名非常灵活，不过我们先专注于最常见的用法。

    define(dependencyIds, factoryFunction);

<!-- As you can see from the first parameter, `dependencyIds`, you can pass an array of ids into `define`.  These are the ids of other modules that your module requires to do its work.  The second parameter, `factoryFunction`, is a function that creates your module and will be run *exactly once*.  The factory is called with the dependent modules as parameters.  Furthermore, it is guaranteed to run only after all of the dependencies are known to be available.  In practice, the factory typically runs just before it's needed. -->
第一个参数 `dependencyIds` 是一个模块名数组，指定了当前模块运行时所依赖的其他模块。第二个参数 `factoryFunction` 是一个工厂函数，用于创建当前模块，并且**只会运行一次**。工厂函数被调用时，它所依赖的模块被作为参数传入。并且，只有在所有依赖都就绪之后，工厂函数才会运行。事实上，工厂函数通常是在需要时才会运行。

<!-- Here's a simple example. -->
下面是一个简单的例子。

    // module app/mime-client
    define(['rest', 'rest/interceptor/mime'], function (rest, mime) {
        var client;

        client = rest.chain(mime);

        return client;
    });

<!-- Our module, "app/mime-client", relies on two other modules, "rest" and "rest/interceptor/mime".  The two required modules are mapped onto the factory's parameter list as `rest` and `mime`.  You may name these however you wish, of course. -->
模块“app/mime-client”依赖于另外两个模块：“rest” 和 “rest/interceptor/mime”。这两个模块被映射到了工厂函数的参数 `rest` 和 `mime`。当然，你也可以随意地重新命名它们。

<!-- Note that slashes in a module id do not indicate it is an url.  AMD ids use slashes to indicate a *namespace*.  In this example, the "app/mime-client" module depends on a module in the "rest/interceptor" namespace.  (You're getting a sneak preview of AMD "packages" here.  We'll cover those in more detail in another tutorial.) -->
请注意，在 AMD 中，模块名中的斜杠并不意味着它是一个 URL，而是用来表示*命名空间*。在前面的例子中，模块“app/mime-client”依赖于命名空间“rest/interceptor”下的一个模块。（这里只是预热一下 AMD 的“包”概念，更多细节将在另一篇教程中介绍。）

<!-- Inside the factory, we create the "app/mime-client" module *and return it*.  In this case, our module is a function since [rest.js](//github.com/cujojs/rest) is a suite of composable REST functions.  However, you can create modules that are *any valid Javascript type*. -->
在工厂函数中，我们创建了“app/mime-client”模块，并*把它返回*。此时该模块是一个函数，因为 [rest.js](//github.com/cujojs/rest) 是一组 REST 功能的集合。不止如此，还可以创建*任何有效 JavaScript 类型*（即返回值）的模块。

## AMD-wrapped CommonJS

<!-- AMD supports another `define` signature that helps bridge the gap between AMD and [CommonJS](./authoring-cjs-modules.html.md).  If your factory function accepts parameters, but you omit the dependency array, the AMD environment assumes you wish to emulate a CommonJS module environment.  The standard `require`, `exports`, and `module` variables are injected as parameters to the factory.  This variation is often called "AMD-wrapped CommonJS", surprisingly. ;) -->
AMD 的 `define` 还支持另外一种参数签名，以消除 AMD 和 [CommonJS](./authoring-cjs-modules.html.md) 之间的差异。工厂函数可以接受几个参数，其中，如果忽略了依赖模块数组 `dependencyIds`，AMD 会假设你想要模拟一个 CommonJS 模块。此时，CommonJS 规范中的 `require`、`exports` 和 `module` 会作为参数传给工作函数。这一变种通常被称为“AMD-wrapped CommonJS”，很神奇吧 ;)。

<!-- Here's the previous example as AMD-wrapped CommonJS. -->
下面是前一个例子的 AMD-wrapped CommonJS 版本。

    // module app/mime-client
    define(function (require, exports, module) {
        var rest, mime, client;

        rest = require('rest');
        mime = require('rest/interceptor/mime');

        client = rest.chain(mime);

        module.exports = client;
    });

<!-- Notice that the factory receives *up to* three arguments that emulate the CommonJS `require`, `exports`, and `module` variables. -->
请注意，工厂函数接受了三个参数 `require`、`exports` 和 `module`，以此来模拟 CommonJS 变种（规范）。

<!-- In CommonJS, dependencies are assigned to local variables using `require(id)`.  This convention is known as the *free require* (or less commonly, the *scoped require*). In AMD it is known as the *local require*. -->
在 CommonJS 中，依赖关系通过为变量设置 `require(id)` 来指定，这一约定被称为 *free require* 或 *scoped require*（不常见），而在 AMD 中，则被称为 *local require*。

<!-- You should export your module, rather than return it.  You may export in one of two ways.  The simplest way, shown above, is to assign the module directly to `module.exports`. Note: `module.exports = ` is not strictly CommonJS.  However, it is a node.js extension to CommonJS that is widely supported. -->
在这种情况下，你应该导出模块，而不是返回它。有两种方式可以实现这点。最简单的方式即上面例子所演示的，直接把模块赋予 `module.exports`。注意：`module.exports = ` 并不是严格的 CommonJS 格式。然而不管如何，它算是一种对 CommonJS 的有效扩展方式，而 CommonJS 又是被广泛支持的。

<!-- The second way is to set properties on the `exports` object.  There are use cases for each export mechanism, but that's a great topic for an upcoming tutorial. -->
第二种方式是在 `exports` 对象上设置属性。尽管可以用很多用例来演示每种导出机制，但这是一个很大的话题，我们会在后面的教程中展开。

<!-- ## Other variations -->
## 其他变种

<!-- There are many other variations of `define` parameters and even variations of the AMD-wrapped CommonJS format -- too many to cover in a simple tutorial.  However, as you're browsing other cujo.js tutorials, there's one more variation you'll see a lot.  We recommend the following variation when declaring [wire.js](//github.com/cujojs/wire) "spec" modules. -->
函数 `define()` 的参数签名还有许多其他的变种，即使是 AMD-wrapped CommonJS 也有许多变种 -- 以至于在一篇简单的教程中无法覆盖到，在阅读 cujo.js 的其他教程时，你会看到更多的变种。我比较喜欢下面这种方式，它用来声明符合 [wire.js](//github.com/cujojs/wire) 规范的模块。

    define({
        message: "I haz been wired",
        helloWired: {
            create: {
                module: 'hello-wired',
                args: { $ref: 'dom!hello' }
            },
            init: {
                sayHello: { $ref: 'message' }
            }
        },
        plugins: [
            { module: 'wire/dom' }
        ]
    });

<!-- As you can see, the `factoryFunction` parameter does not always have to be a function!  When the exported value is static, as in the case above, the function wrapper may be omitted.  The AMD environment detects non-functions in the last position and automatically wraps them in a factory function.    Also, because this module does not have explicit dependencies, we can skip the dependency array, too. -->
正如你所看到的，参数 `factoryFunction` 并不总是一个函数！如果导出的值是一个直接量，就可以省略掉包裹模块代码的工厂函数，就像上面的例子那样。AMD 会检测最后一个参数是否为函数，如果不是，则自动把它包裹到一个工厂函数中。同时，因为当前模块没有明确的依赖关系，所以也省略了依赖模块数组 `dependencyIds`。

<!-- Pretty simple, no? -->
很简单，不是吗？

<!-- For further reading on AMD modules, visit https://github.com/amdjs/amdjs-api/wiki/. -->
关于 AMD 模块的更多细节，请访问 <https://github.com/amdjs/amdjs-api/wiki/>。

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