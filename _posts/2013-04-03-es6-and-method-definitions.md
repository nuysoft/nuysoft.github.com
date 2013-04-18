---
layout: post
title: "ECMAScript 6 and Method Definitions"
tagline: "方法定义"
description: "定义一个属性方法，而不使用关键字 function"
category-substitution: 翻译
tags: [ECMAScript 6, JavaScript, Web]

short: "Method Definitions"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and Method Definitions](http://ariya.ofilabs.com/2013/03/es6-and-method-definitions.html)

<!-- Using an object literal populated with some member functions is a common practice in any serious JavaScript applications. This is also useful for all kind of frameworks, in particular to setup object prototypes. The upcoming ECMAScript 6 introduces **method definition**, a nice shorthand which eliminates the need to use `function` when using that pattern. -->
在任何严肃的 JavaScript 应用程序中，使用含有一些成员函数的对象字面量是一种常见的做法。这种做法对所有类型的框架也是非常有用的，特别是建立对象原型。即将到来的 ECMAScript 6 引入了**方法定义**，一种非常好的简写方式，使用这种模式可以消除对 `function` 的需要。

<!-- Before we see method definition in action, let us have a quick refresh on property setter and getter. This is part of the current ECMAScript 5.1, see [Section 11.1.5](http://es5.github.com/#x11.1.5) on Object Initialiser. The idea is to use `set` and `get` to bind an object property to a function which will be invoked when that property is set and looked up, respectively. The following code fragment demonstrates its usage: -->
在查看方法定义之前，我们先快速回顾一下属性 setter 和 getter。这是当前 ECMAScript 5.1 的一部分，请参见 [11.1.5 节](http://es5.github.com/#x11.1.5) 的对象初始化。总的思想是使用 `set` 和 `get` 将一个对象属性绑定到一个函数，当时属性被设置或读取时函数被调用。下面的代码片段演示了这种用法：

    var BigLoco = {
      locoName: 'Gordon',
      get name() { return this.locoName; },
      set name(n) { this.locoName = n }
    };
     
    console.log(BigLoco.name); // 'Gordon'

<!-- Practically, we have a way to define a function without using the `function` keyword. With ECMAScript 6, this is extended further so that the syntax applies not only to property getter and setter, but also to [plain functions](http://www.2ality.com/2012/04/arrow-functions.html). This is called *Method Definitions*, see [Section 13.3](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.3) in the latest [ES6 draft](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts). -->
实际上，我们有办法定义一个函数而不使用关键字 `function` 。在 ECMAScript 6 中，这种语法被进一步扩展，不只适用于属性的 getter 和 setter，也适用于[普通函数](http://www.2ality.com/2012/04/arrow-functions.html)。这种语法被称为*方法定义*，请参见最新的 [ES6 草案](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) 的 [13.3 节](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.3)。

<!-- Take a look at an example ECMAScript 6 code here, in particular to the `start` and `stop` functions. -->
看一看这里的 ECMAScript 6 代码示例，特别是 `start` 和 `stop` 函数。

    var SteamEngine = {
      color: 'blue',
      get name() { return 'Thomas' },
      start() { console.log('Hurry up!'); },
      stop() { console.log('Screech...! That was close.'); }
    };
     
    console.log('My name is', SteamEngine.name);
    SteamEngine.start();
    SteamEngine.stop();

<!-- If we were about to transpile the code to ES5, the construct will look like: -->
如果我们想要把这段代码转换为 ES5，结构会看起来像这样：

    var SteamEngine = {
      color: 'blue',
      get name() { return 'Thomas' },
      start: function() { console.log('Hurry up!'); },
      stop: function() { console.log('Screech...! That was close.'); }
    };

<!-- The ECMAScript 6 version shows a nice symmetry thanks to this syntactic sugar. Every property on that literal looks the same and it's not really difficult to spot the functions due to the necessary parentheses. Sweet! -->
ECMAScript 6 对于这一语法糖显示出了良好的对称性。对象字面量中的每个属性看起来一样，并且由于必要的括号不难识别出其中的函数。


