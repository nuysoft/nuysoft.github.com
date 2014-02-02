---
layout: post
title: "深入理解 JavaScript 模块模式"
tagline: "JavaScript Module Pattern: In-Depth"
description: ""
category: 
category-substitution: 翻译
tags: [翻译, 模块]
published: false
---
{% include JB/setup %}

> 原文：<http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html>，[Ben Cherry](http://www.adequatelygood.com/)，2010-03-12。其他翻译版本：[Javascript “组件模式” 深入研究](http://www.cnblogs.com/wbpmrck/archive/2012/02/20/2359591.html)，[刺客之家](http://www.cnblogs.com/wbpmrck/)，2012-02-20。

<!-- The module pattern is a common JavaScript coding pattern. It’s generally well understood, but there are a number of advanced uses that have not gotten a lot of attention. In this article, I’ll review the basics and cover some truly remarkable advanced topics, including one which I think is original. -->
模块模式是一种很常见的 JavaScript 编码模式。通常它很好理解，但是尚有一些高级用法未受到关注。在这篇文章中，我将回顾基础知识，并介绍一些真正了不起的高级主题，其中有一个应该是第一次被提到。

<!-- ## The Basics -->
## 基础知识

<!-- We’ll start out with a simple overview of the module pattern, which has been well-known since Eric Miraglia (of YUI) first [blogged about it](http://yuiblog.com/blog/2007/06/12/module-pattern/) three years ago. If you’re already familiar with the module pattern, feel free to skip ahead to “Advanced Patterns”. -->
我们将先概述一下模块模式，以此作为开始。自从 YUI 的 Eric Miraglia 三年前在 [博客] 上第一次介绍了模块模式后，这种模式就一直是众所周知。如果你已经熟知了模块模式，可以随时跳到“高级模式”部分。

[博客]: http://yuiblog.com/blog/2007/06/12/module-pattern/

<!-- ### Anonymous Closures -->
### 匿名闭包

<!-- This is the fundamental construct that makes it all possible, and really is the single **best feature of JavaScript**. We’ll simply create an anonymous function, and execute it immediately. All of the code that runs inside the function lives in a **closure**, which provides **privacy** and **state** throughout the lifetime of our application. -->
匿名闭包是一切的基础，是 **JavaScript 最棒的特性**。我们将简单地创建一个匿名函数，并立即执行它。匿名函数中的所有代码运行一个**闭包**中，闭包提供了贯穿应用程序生命周期的**私有作用域**和**内部状态**。

    (function () {
        // ... all vars and functions are in this scope only
        // still maintains access to all globals
    }());

<!-- Notice the () around the anonymous function. This is required by the language, since statements that begin with the token function are always considered to be **function declarations**. Including () creates a **function expression** instead. -->
注意匿名函数前后的 `()`。这是语言所要求的，因为以关键字 function 开头的语言会认为是**函数声明**，而用 `()` 包裹后，则创建的是一个**函数表达式**。

<!-- ### Global Import -->
### 输入全局变量

<!-- JavaScript has a feature known as **implied globals**. Whenever a name is used, the interpreter walks the scope chain backwards looking for a var statement for that name. If none is found, that variable is assumed to be global. If it’s used in an assignment, the global is created if it doesn’t already exist. This means that using or creating global variables in an anonymous closure is easy. Unfortunately, this leads to hard-to-manage code, as it’s not obvious (to humans) which variables are global in a given file. -->
JavaScript 拥有一个称为**隐含的全局变量**的特性。每当一个变量被使用时，解释器沿着作用域链向上遍历，查找该变量的声明语言。如果没找到，则认为该变量是全局的。如果是用在赋值语言中，并且未找到，则为之创建一个全局变量。这意味在匿名闭包中使用和创建全局变量是非常容易的。但不幸的是，这会导致代码难以管理，因为给定文件中的哪些变量是全局的，对于人来说很不明显。

<!-- Luckily, our anonymous function provides an easy alternative. By passing globals as parameters to our anonymous function, we **import** them into our code, which is both **clearer** and **faster** than implied globals. Here’s an example: -->
幸运的事，匿名函数提供了一种简单的替代方案。通过把全局变量作为参数传给匿名函数，我们把全局变量导入了代码中。相较于隐含的全局变量，这种方式即**清晰**又**快速**。下面是一个例子：

    (function ($, YAHOO) {
        // now have access to globals jQuery (as $) and YAHOO in this code
    }(jQuery, YAHOO));

<!-- ### Module Export -->
### 输出模块

<!-- Sometimes you don’t just want to use globals, but you want to declare them. We can easily do this by exporting them, using the anonymous function’s **return value**. Doing so will complete the basic module pattern, so here’s a complete example: -->
有时你不是想使用全局变量，而是想声明它们。通过获取匿名函数的返回值，我们可以轻易地实现这一点。这种方式完善了基本的模块模式，下面是一个完整示例：

    var MODULE = (function () {
        var my = {},
            privateVariable = 1;

        function privateMethod() {
            // ...
        }

        my.moduleProperty = 1;
        my.moduleMethod = function () {
            // ...
        };

        return my;
    }());

<!-- Notice that we’ve declared a global module named MODULE, with two public properties: a method named MODULE.moduleMethod and a variable named MODULE.moduleProperty. In addition, it maintains **private internal state** using the closure of the anonymous function. Also, we can easily import needed globals, using the pattern we learned above. -->
请注意，我们声明了一个名为 `MODULE` 的模块，其中含有两个属性：一个名为 `MODULE.moduleMethod` 的方法，和一个名为 `MODULE.moduleProperty` 的变量。除此以外，利用匿名函数的闭包，还维护了**私有内部状态。加上前面学到的模式，我们可以很容易地引入所需的全局变量。

<!-- ## Advanced Patterns -->
## 高级模式

<!-- While the above is enough for many uses, we can take this pattern farther and create some very powerful, extensible constructs. Lets work through them one-by-one, continuing with our module named MODULE. -->
虽然上面的模式足以应付大多数场景，但我们可以创建一些非常强大的、可扩展的结构，让这种模式走的更远。仍然以模块 `MODULE` 为例，我们来挨个介绍它们，

<!-- ### Augmentation -->
### 增益模式

<!-- One limitation of the module pattern so far is that the entire module must be in one file. Anyone who has worked in a large code-base understands the value of splitting among multiple files. Luckily, we have a nice solution to **augment modules**. First, we import the module, then we add properties, then we export it. Here’s an example, augmenting our MODULE from above: -->
到目前为止，模块模式的局限性在于，整个模块必须写在一个文件中。任何曾经在大型代码库中工作过的人，都会理解分割成多个文件的价值。幸运的事，我们有个一种很好的解决方案来**增强模块**。首先引入该模块，然后为之添加属性，然后导出它。下面的例子增强了前面的 `MODULE`：

    var MODULE = (function (my) {
        my.anotherMethod = function () {
            // added method...
        };

        return my;
    }(MODULE));

<!-- We use the var keyword again for consistency, even though it’s not necessary. After this code has run, our module will have gained a new public method named MODULE.anotherMethod. This augmentation file will also maintain its own private internal state and imports. -->
为了保持一致性，我们再次使用了关键字 `var`，尽管 `var` 不是必须的。这段代码运行后，模块将获得一个名为 `MODULE.anotherMethod` 的新公开方法。这个增强文件还将维护它自己的私有内部状态和输入。

<!-- ### Loose Augmentation -->
### 松耦合增益

<!-- While our example above requires our initial module creation to be first, and the augmentation to happen second, that isn’t always necessary. One of the best things a JavaScript application can do for performance is to load scripts asynchronously. We can create flexible multi-part modules that can load themselves in any order with **loose augmentation**. Each file should have the following structure: -->
在上面的例子中，要求先创建和初始化模块，然后才能增强它，这种要求并不总是必要的。JavaScript 应用程序可以异步地载入脚本来提高性能。我们可以创建灵活的、有多部分组成的模块，并且无需地加载它们，即**松耦合增益**。为了实现这一点，每个文件应该具备下面的结构：

    var MODULE = (function (my) {
        // add capabilities...

        return my;
    }(MODULE || {}));

<!-- In this pattern, the var statement is always necessary. Note that the import will create the module if it does not already exist. This means you can use a tool like LABjs and load all of your module files in parallel, without needing to block. -->
在这种模式中，`var` 语言始终是必要的。请注意，如果引入的模块尚不存在，则会创建它。这意味着，你可以使用类似 LABjs 的工具来并行地加载所有模块，而不需要阻塞。

<!-- ### Tight Augmentation -->
### 紧耦合增益

<!-- While loose augmentation is great, it does place some limitations on your module. Most importantly, you cannot override module properties safely. You also cannot use module properties from other files during initialization (but you can at run-time after intialization). **Tight augmentation** implies a set loading order, but allows **overrides**. Here is a simple example (augmenting our original MODULE): -->
尽管松耦合增益很棒，但它还是有一些限制。最重要的一点是，无法安全地重载模块的属性。在初始化过程中，你也无法使用其他文件中的模块属性（但是在运行时可以）。**紧耦合增益**依赖于加载顺序，但允许**重载**。下面是一个简单示例（增强原始模块 `MODULE`）：

    var MODULE = (function (my) {
        var old_moduleMethod = my.moduleMethod;

        my.moduleMethod = function () {
            // method override, has access to old through old_moduleMethod...
        };

        return my;
    }(MODULE));

<!-- Here we’ve overridden MODULE.moduleMethod, but maintain a reference to the original method, if needed. -->
在这里，我们重载了 `MODULE.moduleMethod`，并且保持了对原始方法的引用（如果有必要的话）。

<!-- ### Cloning and Inheritance -->
### 克隆与继承

    var MODULE_TWO = (function (old) {
        var my = {},
            key;

        for (key in old) {
            if (old.hasOwnProperty(key)) {
                my[key] = old[key];
            }
        }

        var super_moduleMethod = old.moduleMethod;
        my.moduleMethod = function () {
            // override method on the clone, access to super through super_moduleMethod
        };

        return my;
    }(MODULE));

<!-- This pattern is perhaps the **least flexible** option. It does allow some neat compositions, but that comes at the expense of flexibility. As I’ve written it, properties which are objects or functions will not be duplicated, they will exist as one object with two references. Changing one will change the other. This could be fixed for objects with a recursive cloning process, but probably cannot be fixed for functions, except perhaps with eval. Nevertheless, I’ve included it for completeness. -->
这种模式可能是**最不灵活**的选择了。它确实允许一些巧妙的组合，但是以牺牲灵活性为代价。在上面的代码中，对象和函数不会被复制，但却有两份引用。改变其中一个也将改变另一个。对于对象，可以通过递归克隆来修正这个问题，但是无法修正函数，除非使用 `eval`。为了保持完整性，我仍然把它放到了这篇文章里。

<!-- ### Cross-File Private State -->
### 跨文件私有状态

<!-- One severe limitation of splitting a module across multiple files is that each file maintains its own private state, and does not get access to the private state of the other files. This can be fixed. Here is an example of a loosely augmented module that will **maintain private state** across all augmentations: -->
把模块分隔为多个文件的一个严重限制是，每个文件只能维护它自己的私有状态，无法访问其他文件的私有状态。这个问题是可修复的。下面是一个松耦合增益模块的示例，它将可以**维护所有增益功能的私有状态**。

    var MODULE = (function (my) {
        var _private = my._private = my._private || {},
            _seal = my._seal = my._seal || function () {
                delete my._private;
                delete my._seal;
                delete my._unseal;
            },
            _unseal = my._unseal = my._unseal || function () {
                my._private = _private;
                my._seal = _seal;
                my._unseal = _unseal;
            };

        // permanent access to _private, _seal, and _unseal

        return my;
    }(MODULE || {}));

<!-- Any file can set properties on their local variable \_private, and it will be immediately available to the others. Once this module has loaded completely, the application should call MODULE._seal(), which will prevent external access to the internal \_private. If this module were to be augmented again, further in the application’s lifetime, one of the internal methods, in any file, can call _unseal() before loading the new file, and call _seal() again after it has been executed. This pattern occurred to me today while I was at work, I have not seen this elsewhere. I think this is a very useful pattern, and would have been worth writing about all on its own. -->
任何文件都可以为局部变量 `_private` 设置属性，并且立即对其他文件生效。一旦模块加载完成，应用程序应该调用 `MODULE._seal()`，以阻止外部访问内部的 `_private`。在应用程序未来的生命周期中，如果需要再次增益该模块，任何文件中的内部方法，可以在加载新文件之前调用 `_unseal()`，然后在执行完成之后再次调用 `_seal()`。我在工作中曾经应用过这种模式，但没有在其他地方看见过。我认为这是一个非常有用的模式，很值得把它写在这篇文章中。

<!-- ### Sub-modules -->
### 子模块

<!-- Our final advanced pattern is actually the simplest. There are many good cases for creating sub-modules. It is just like creating regular modules: -->
最后一个高级模式实际上是最简单的。创建子模块有很多好处，而且创建方式就像创建普通模块一样：

    MODULE.sub = (function () {
        var my = {};
        // ...

        return my;
    }());

<!-- While this may have been obvious, I thought it worth including. Sub-modules have all the advanced capabilities of normal modules, including augmentation and private state. -->
尽管子模块模式一目了然，但我认为它值得包含进来。子模块具有普通模块的所有高级特性，包括增益和私有状态。

<!-- ## Conclusions -->
## 结论

<!-- Most of the advanced patterns can be combined with each other to create more useful patterns. If I had to advocate a route to take in designing a complex application, I’d combine **loose augmentation**, **private state**, and **sub-modules**. -->
大部分高级特性可以相互结合以创建更有用的模式。在设计复杂应用程序时，如果必须给出一个选择的话，我会合并**松耦合增益**、**私有状态**和**子模块**。

<!-- I haven’t touched on performance here at all, but I’d like to put in one quick note: The module pattern is **good for performance**. It minifies really well, which makes downloading the code faster. Using **loose augmentation** allows easy non-blocking parallel downloads, which also speeds up download speeds. Initialization time is probably a bit slower than other methods, but worth the trade-off. Run-time performance should suffer no penalties so long as globals are imported correctly, and will probably gain speed in sub-modules by shortening the reference chain with local variables. -->
到目前为止，我们还没有谈到性能问题，我做一个快速批注：模块模式**对性能是友好的**。它可以很好地压缩，从而下载代码时更快。使用**松耦合增益**时，允许无阻塞的并行下载，也会加快下载速度。比其他方法的初始化时间可能会慢一些，但权衡之后仍是值得的。运行时的性能不受任何影响，因为正确地导入了全局变量；通过缩短局部变量的引用链条，可能会提升子模块的性能。

<!-- To close, here’s an example of a sub-module that loads itself dynamically to its parent (creating it if it does not exist). I’ve left out private state for brevity, but including it would be simple. This code pattern allows an entire complex heirarchical code-base to be loaded completely in parallel with itself, sub-modules and all. -->
下面是一个子模块的示例，它动态地在父对象上加载自身（如果不存在则创建自身）。为了简洁起见，我没有涉及私有状态，但是要把私有状态加进来也很简单。对于结构复杂的代码库，这种模式允许并行地加载模块、子模块等。

    var UTIL = (function (parent, $) {
        var my = parent.ajax = parent.ajax || {};

        my.get = function (url, params, callback) {
            // ok, so I'm cheating a bit :)
            return $.getJSON(url, params, callback);
        };

        // etc...

        return parent;
    }(UTIL || {}, jQuery));

<!-- I hope this has been useful, and please leave a comment to share your thoughts. Now, go forth and write better, more modular JavaScript! -->
我希望这篇文章对各位有所帮助，请发表评论并分享您的看法。从现在开始，编写更好、更模块化的 JavaScript！

<!-- _This post was featured on Ajaxian.com, and there is a little bit more discussion going on there as well, which is worth reading in addition to the comments below._ -->
_这篇文章被[收录在 Ajaxian.com](http://ajaxian.com/archives/a-deep-dive-and-analysis-of-the-javascript-module-pattern)，那里正在进行一些讨论，后面的评论值得一读。_

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