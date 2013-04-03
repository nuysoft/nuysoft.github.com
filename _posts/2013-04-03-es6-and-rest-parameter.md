---
layout: post
title: "Rest Parameter"
tagline: "可变参数"
description: ""
category: 翻译
tags: [es6, javascript, web]

short: "Rest Parameter"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and Rest Parameter](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)

> 译者：nuysoft

<!-- Handling a function with a variable number of arguments is always tricky in JavaScript. At least, we still have this `arguments` object which can be used to retrieve all arguments used to invoke a function. With the upcoming ECMAScript 6, no such hack is necessary anymore since we can start using its **rest parameter** feature. -->
在 JavaScript 中处理一个带有可变数目的参数的函数始终是棘手的。至少，我们还有 `arguments` 对象可以用于获取所有调用函数时的所有参数。随着即将到来的 ECMAScript 6，不再需要这样的技巧，因为我们可以使用它的**可变参数**功能。

<!-- To see how a rest parameter works, consider the following scenario. You drive a truck which delivers some supplies to a grocery store. As you unload the supplies, you add them to the store: -->
要看清可变参数是如何工作的，请考虑以下情况。你开一辆卡车给杂货店送货。当卸货后，你再把它们入库：

    store.add('fruit', 'apple');
    store.add('dairy', 'milk', 'cheese', 'yoghurt');
    store.add('pastries', 'donuts', 'croissants');

<!-- whereby `add` is implemented as something like: -->
其中 `add` 是这样实现的：

    store.add = function(category) {
      var items = [].slice.call(arguments, 1);
      items.forEach(function (item) {
        store.aisle[category].push(item);
      });
    };

<!-- Note how [arguments object](http://docs.webplatform.org/wiki/concepts/programming/javascript/functions#Using_the_arguments_object) can't be treated as a normal array, although it behaves [almost](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/arguments) like an array. A well-known trick with [Array.prototype.slice](http://es5.github.com/#x15.4.4.10) and [Function.prototype.call](http://es5.github.com/#x15.3.4.4) is the workaround, giving us the list of all arguments which comes after the first one (category). -->
请注意，[arguments 对象](http://docs.webplatform.org/wiki/concepts/programming/javascript/functions#Using_the_arguments_object)不能被视为一个正常的数组，虽然它的行为总是像一个数组。一个众所周知的伎俩是用 [Array.prototype.slice](http://es5.github.com/#x15.4.4.10) 和 [Function.prototype.call](http://es5.github.com/#x15.3.4.4) 作为解决方法，返回第一个参数之后的所有参数列表。

<!-- With a rest parameter ([Section 13.1](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.1), ES 6 draft [Rev 13](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)), the implementation is much simpler. It is even self-explanatory. -->
有了可变参数（[Section 13.1](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.1), ES 6 draft [Rev 13](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)），实现要简单的多。它甚至是自解释的。

    store.add = function(category, ...items) {
      items.forEach(function (item) {
        store.aisle[category].push(item);
      });
    };

<!-- Another typical use-case where a rest parameter could be useful is a pubsub-like pattern. If you write a Backbone.js-based application, triggering an event via [Backbone.Event.trigger](http://backbonejs.org/#Events-trigger) is a common practice. Because an event may require one or more parameters, the implementation of the trigger function itself looks like: -->

可变参数有用的另一个典型的用例是类发布-订阅模式。如果编写基于 Backbone.js 的应用程序，通过 [Backbone.Event.trigger](http://backbonejs.org/#Events-trigger) 触发事件是一种常见做法。由于一个事件可能需要一个或多个参数，trigger 函数的实现看起来像这样：

    trigger: function(name) {
        if (!this._events) return this;
        var args = slice.call(arguments, 1);
        /// ... do something with args ...
        return this;
    },

<!-- for which I'm sure you can come up with a slightly different look if you have the rest parameter feature as your disposal! -->
我敢肯定，如果有可变参数功能，你能拿出一个稍有不同的实现。

<!-- Obviously we don't need a rest parameter if we switch the API to accept an array as the second argument. However, in some cases, it would feel less natural. For example, a string formatter implementation is expected to follow the de-facto [printf format string](http://en.wikipedia.org/wiki/Printf_format_string) rather than grouping every parameters in a simple array. -->
很显然，如果我们修改 API 以接受一个数组作为第二个参数，就不需要可变参数了。然而在某些情况下，这么做会觉得不太自然。例如，一个字符串格式化程序的实现被期待遵循事实上的 [printf format string](http://en.wikipedia.org/wiki/Printf_format_string)，而不是把每个参数分组一个简单的数组中。

<!-- Just like other syntactic sugar in ECMAScript 6, a rest parameter does not radically change you write your JavaScript code. It does however make the code more [tool-friendly](http://ariya.ofilabs.com/2012/11/language-tools-for-reducing-mistakes.html), shifting the semantic interpretation of the code from the run-time behavior into something at the **syntax level**. Once editors and IDEs understand the construct, a simple code hint which reveals the function signature is more than enough to indicate that the said function accepts a variable number of arguments. -->
就像 ECMAScript 6 中的其他语法糖一样，可变参数并没有从根本上改变你编写 JavaScript 代码的方式。但是确实使代码更[工具友好](http://ariya.ofilabs.com/2012/11/language-tools-for-reducing-mistakes.html)，将代码语义解释从运行时行为转移到**语法级**。一旦编辑器和集成开发环境理解该结构，一个简单的代码提示显示的函数签名足以表名该函数接受一个可变书目的参数。

<!-- Isn't it exciting? -->
这太令人兴奋了，不是吗？





