---
layout: post
title: "ECMAScript 6 and Destructuring Assignment"
tagline: "解构赋值"
description: "使用模式提取对象的部分"
category-substitution: 翻译
tags: [ECMAScript 6, JavaScript, Web]

short: "解构赋值"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and and Destructuring Assignment](http://ariya.ofilabs.com/2013/02/es6-and-destructuring-assignment.html)

<!-- In a programming language, destructuring assignment denotes the use of **patterns** to extract **parts** of an object. If we refer to [Common LISP](http://www.cs.cmu.edu/Groups/AI/html/cltl/clm/node252.html), destructuring assignment binds a set of variables to a corresponding set of values, where normally bind a value to a single variable. For the next-generation ECMAScript 6, [destructuring feature](http://wiki.ecmascript.org/doku.php?id=harmony:destructuring) is slated to be an important addition to the assignment expression. -->
在编程语言中，解构赋值表示使用**模式**提取对象的**部分**。如果我们参考 [Common LISP](http://www.cs.cmu.edu/Groups/AI/html/cltl/clm/node252.html)，解构赋值绑定一组变量到一组对应的值，通常是绑定一个值到一个唯一变量。对于下一代 ECMAScript 6，[解构功能](http://wiki.ecmascript.org/doku.php?id=harmony:destructuring) 被定位为赋值表达的重要补充。

<!-- Python developers might be already familiar with the concept of [sequence unpacking](http://docs.python.org/2/tutorial/datastructures.html#tuples-and-sequences). CoffeeScript also already has the syntax for [destructuring](http://coffeescript.org/#destructuring). SpiderMonkey, the JavaScript engine in Firefox, has been [supporting](https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.7) destructuring assignment for a while. The latest ECMAScript 6 defines the grammar for destructuring assignment in [Section 11.13.1](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.13.1). There are two different forms: array pattern and object pattern. -->
Python 开发人员可能已经熟悉[序列拆封](http://docs.python.org/2/tutorial/datastructures.html#tuples-and-sequences)的概念。CoffeeScript 也有[解构](http://coffeescript.org/#destructuring)语法。火狐的 JavaScript 引擎 SpiderMonkey 已经[支持](https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.7)解构赋值有一段时间了。最新的 ECMAScript 6 在 [11.13.1 节](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.13.1)定义了解构赋值。有两种不同的形式：数组模式和对象模式。

<!-- ## Array Pattern -->

## 数组模式

<!-- Variables can be initialized in one go. The following two lines have the same effect, the first one is employing an array pattern. -->
变量的初始化可以一气呵成。下面的两行代码具有相同的效果，其中第一行使用了数组模式。

    var [m, d, y] = [3, 14, 1977];
    var m = 3, d = 14, y = 1977;

<!-- Swapping two variables is rather trivial, this one works just as expected. Internally, it does the sequence as if there is a temporary variable temp and the usual value exchange. -->
交换两个变量相当琐碎，不过这一次正如预期的那样工作。在内部，就像有一个临时变量以及一般的值交换一样，来处理数组。

    x = 3; y = 4; [x, y] = [y, x]
    temp = [y, x]; x = temp[0]; y = temp[1];

<!-- Another typical use of array restructuring is for a function which has multiple return values. We don't need to wrap it in an object anymore. Also, there is no need to accept all elements in the array. -->
另一种使用数组重组的典型场景是有个返回值的函数。我们不再需要把返回值包装到一个对象中。另外，也不需要接受数组中的所有元素。

    function now() { return [2, 6, 2013, 8, 0]; }
    var [m, d] = now(); // m = 2, d = 6
    var [,,year] = now(); // year = 2013

<!-- With the [syntax visualization](http://esprima.googlecode.com/git-history/harmony/demo/parse.html) feature of Esprima, it is rather easy to illustrate the syntax tree of an array pattern. The following figure shows an example thereof. Compared to a vanilla assignment or variable declarator, the obvious different here is that we have an array pattern instead of a plain identifier. -->
利用 Esprima 的[可视化语法](http://esprima.googlecode.com/git-history/harmony/demo/parse.html)功能，说明数组模式的语法树相当容易。下图显示了一个例子。相比普通赋值或变量声明明显不同是，使用了一个数组模式，而不是一个普通的标识符。

![](http://ariya.ofilabs.com/wp-content/uploads/2013/02/destructuring.png)

<!-- ## Object Pattern -->

## 对象模式

<!-- This pattern is very similar, except it works by matching object properties instead of array indices. Thus, we can easily pick the ones we are interested in while ignoring the rest. A similar example as before, e.g. when processing the return value of a function: -->
对象模式与数据模式非常相似，除了工作原理是匹配对象，而不是匹配数组索引。因此，我们很容易的挑选哪些我们感兴趣的而忽略其余的。与前面的例子类似，下面是处理一个函数的返回值的例子：

    function today() { return { d: 6, m: 2, y: 2013 }; }
    var { m: month, y: year } = today(); // month = 2, year = 2013

<!-- Of course, instead of a pattern, nothing stops you from assigning a holder object before accessing each property. However, the lack of such extra object makes the code looks cleaner (or sweeter, since destructuring is supposed to be a syntactic sugar), in particular when it is part of a loop. -->
当前，在访问每个属性之前，没有什么可以阻止你指定一个持有（特定属性和值的）对象，而不是一个（持有所有属性和值的）对象模式。无论如何，由于没有这种额外的对象，代码看起来更干净（或者更甜，因为解构应该是一个语法糖），特别当它是循环的一部分时。

    books.forEach(function ({ title: title, author: author }) { console.log(title, author) }; )

<!-- In the above construct, every element in that books array may contain a lengthy information about that particular book. Since we just want some properties, it is possible to extract them directly via the object pattern. -->
在上面的结构中，数组 books 中的每个元素可能含有关于特定 book 的冗长的信息。而我们只需要部分属性，可以通过对象模式直接提取这些信息。

<!-- It gets even more interesting once we combine with [array comprehension](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.html). For example, the following line is exactly the same as the above snippet: -->
一旦结合使用[数组推导式](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.html)，情况会变得更加有趣。例如下面的这行代码与上面的代码片段完全等价：

    [console.log(t,a) for ({title: t, author: a} of books)];

<!-- How do you plan to (ab)use array and object pattern? -->
你计划如何使用数组模式和对象模式呢？





