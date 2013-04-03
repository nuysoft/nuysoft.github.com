---
layout: post
title: "ECMAScript 6 and Default Argument"
tagline: "默认参数"
description: ""
category: 翻译
tags: [es6, javascript, web]

short: "Default Argument"
pgroup: es6
---
{% include JB/setup %}

> 原文：http://ariya.ofilabs.com/2013/02/es6-and-default-argument.html

> 译者：nuysoft

Many programming languages support the concept of a [default argument](http://en.wikipedia.org/wiki/Default_argument) for a function parameter so that the caller does not always need to specify the argument value. Unfortunately, JavaScript does not have a default argument support in its syntax. This may soon change with the upcoming ECMAScript 6.

许多编程语言都支持将某个函数参数声明为[默认参数](http://en.wikipedia.org/wiki/Default_argument)这一概念，这样调用者不需要总是指定该参数的值。不幸的是，JavaScript 的语法不支持默认参数。随着即将到来的 ECMAScript 6，这种情况可能很快会改变。

<!-- A few JavaScript programmers employ various different **run-time tricks** to achieve the effect of an argument with a default value. The common approach is by leveraging the fact that if an argument is not given a value, then it`s simply `undefined`. -->

一些 JavaScript 程序员使用各种不同的**运行时技巧**实现某个参数的默认值效果。常用方法利用了这一事实：如果某个参数没有给定值，那么就是简单 `undefined`。

    function foobar(a) { return typeof a; }
    foobar(); // "undefined"

This can lead to some code like:
这可能会导致一些像这样的代码：

    function runApp(appName) { console.log('Running', appName || 'AUTOEXEC.BAT'); }

That function will print Running AUTOEXEC.BAT if invoked as `runApp()` only (without any argument). The use of **logical expression OR** (operator ||, see section 11.11 on [Binary Logical Operators](http://es5.github.com/#x11.11)) means that if the left side (appName) is true (see section 9.2 on [ToBoolean](http://es5.github.com/#x9.2)), then the short-circuiting kicks in, otherwise we will get the right side (AUTOEXEC.BAT). Note how the result is the same if you execute that function with other value such as `null`, `0`, `![]`, or even `~~{}`.

如果只调用 `runApp()`（不带任何参数），该函数将打印 Running AUTOEXEC.BAT。使用的**逻辑或表达式**（操作符 ||，查看[二进制逻辑运算符](http://es5.github.com/#x11.11) 上的 11.11 节）表示，如果左侧（appName）是 true（查看 [ToBoolean](http://es5.github.com/#x9.2) 上的 9.2 节），则短路生效，否则返回右边（AUTOEXEC.BAT）。注意，如果执行该函数时使用诸如 `null`、`0`、`![]`、甚至 `~~{}` 这样的参数值，结果是一样的。

Another variant which are often encountered is really **checking the type** of the parameter. Now we can distinguish between `undefined` and others. Therefore, a suitable value substitution can be carried out.
经常遇到的另一种变体是真正的**检测参数类型**。现在我们可以区分 `undefined` 和其他类型。因此，可以使用一个合适的替换值。

    function runApp(appName) {
      if (typeof appName === 'undefined') appName = 'AUTOEXEC.BAT';
      console.log('Running', appName);
    }

In other cases, we *really* really need to know whether the function is invoked with a certain number of argument or not. For this purpose, the `arguments` object comes to the rescue.

在其他情况下，我们**事实上**真的需要知道该函数是否用一定数量的参数被调用。为了这个目的，`arguments` 对象就派上用场了。

    function runApp(appName) {
      if (arguments.length === 0) appName = 'AUTOEXEC.BAT';
      console.log('Running', appName);
    }

All this fancy dance is not necessarily anymore once the syntax itself supports a default argument. In the [section 13](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13) of the [latest ECMAScript 6 draft](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts), it is mentioned that the formal parameter (for a function) is not a simple list of identifiers anymore (as in ECMAScript 5) as it is generalized to allow *BindingElement*. While this new construct is there to permit the object and array pattern (see my previous blog post on [destructuring assignment](http://ariya.ofilabs.com/2013/02/es6-and-destructuring-assignment.html)), it is important to realize that BindingElement supports an optional initialization, pretty much like in a variable declaration.

一旦语法本身支持默认参数，所有这一切花哨的技巧不再是必要的。在[最新的 ECMAScript 6 草稿]的 [13 节](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13)，提高（函数）的正式参数不再是一个简单的标识符列表（正如 ECMAScript 5 中定义的），因为参数被泛化为允许 *BindingElement*。虽然这种新结构允许对象或数组模式（参见我之前关于 [destructuring assignment](http://ariya.ofilabs.com/2013/02/es6-and-destructuring-assignment.html) 的博客文章），重要的是要认识到 BindingElement 支持一个可选的初始化，就像在一个变量声明。

[最新的 ECMAScript 6 草稿]: http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts

In plain English, this means that a function declaration can specify a default value for every parameter. The previous `runApp` function will turn into something as simple as:

说得明白点，这意味着一个函数声明可以为每个参数指定一个默认值。之前的 `runApp` 函数会变得如此简单：

    function runApp(appName = 'AUTOEXEC.BAT') {
      console.log('Running', appName);
    }

While waiting for browsers and JavaScript engines to implement this feature, such a construct can be used already these days with help of [Traceur](https://code.google.com/p/traceur-compiler/) or [TypeScript](http://www.typescriptlang.org/). It is interesting to note the different desugaring, Traceur will use the `arguments` object while TypeScript performs the `undefined` type check.

在等待浏览器和 JavaScript 引擎实现该功能期间，目前可以在 [Traceur](https://code.google.com/p/traceur-compiler/) 或 [TypeScript](http://www.typescriptlang.org/) 的帮助下使用这样的结构。有趣的是脱糖（降级）方式的不同，Traceur 将使用 `arguments` 对象，而 TypeScript 执行 `undefined` 类型检测。

Having a built-in syntax support for default argument is fantastic. A JavaScript editors could give a better [content assist](http://ariya.ofilabs.com/2013/02/javascript-editing-with-vmware-scripted.html) (autocomplete). A code analyzer will be able to track function invocation which omits parameters that do not have default values. I can't wait until a linter complains to me:

内置语法支持默认参数实在是太棒了。一个 JavaScript 编辑器可以提供更好的[帮助内容](http://ariya.ofilabs.com/2013/02/javascript-editing-with-vmware-scripted.html)（自动补全）。一个代码分析器将能够跟踪省略了无默认值参数的函数调用。我不能等到一个 linter 向我抱怨：

    guide.js:42 Specify the non-optional parameter 'stop' to function 'createSeries'
    为函数 'createSeries' 指定必选参数 'stop'

Better [language tools](http://ariya.ofilabs.com/2012/12/quality-code-via-multiple-layers-of-defense.html) will no doubt reduce any [coding mistake](http://ariya.ofilabs.com/2012/11/language-tools-for-reducing-mistakes.html) as best as it can.

更好的[语言工具](http://ariya.ofilabs.com/2012/12/quality-code-via-multiple-layers-of-defense.html)无疑将尽可能的减少任何[代码错误](http://ariya.ofilabs.com/2012/11/language-tools-for-reducing-mistakes.html)。




