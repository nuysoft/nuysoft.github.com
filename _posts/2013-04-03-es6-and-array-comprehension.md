---
layout: post
title: "ECMAScript 6 and Array Comprehension"
tagline: "数组推导式"
description: "基于另一个数组创建数组的简洁方式"
category: 翻译
tags: [ECMAScript 6, JavaScript, Web]

short: "Array Comprehension"
pgroup: es6
---
{% include JB/setup %}


> 原文：[ECMAScript 6 and Array Comprehension](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.md)

<!-- Many modern programming languages support [list comprehension](http://en.wikipedia.org/wiki/List_comprehension), a concise way to create a list based another list where each entry is the result of some operations. If comprehension is used properly, it eliminates the need for the traditional and error-prone manual iteration. Next-generation JavaScript will have the similar feature via **array comprehension**. -->

很多现代编程语言支持[列表推导式](http://en.wikipedia.org/wiki/List_comprehension)，一种基于另一个列表创建列表的简洁方式，另一个列表中的每个条目是某些操作的结果。如果适当的使用推导式，将消除传统的、容易出错的手动迭代的需求。下一代 JavaScript 通过**数组推导式**提供类似的功能。

<!-- First of all, let’s do a quick refresh on Array’s `map` and `filter` functions. -->

首先，让我们快速回顾一下 Array 的 `map` 和 `filter` 方法。

## Array.prototype.map

<!-- [Section 15.4.4.19](http://es5.github.com/#x15.4.4.19) of the official [ECMAScript 5.1 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) defines the official behavior of Array.prototype.map. This function returns a new array resulting from applying the given callback function to each entry. -->

官网的 [ECMAScript 5.1 规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm)的 [15.4.4.19](http://es5.github.com/#x15.4.4.19) 节定义了 Array.prototype.map 的官方行为。这个函数返回一个新数组，针对每个条件应用给定的回调函数，新数组由回调函数的返回值组成。

<!-- Two quick examples: -->

两个简单的例子：

    [1, 2, 3].map(function (i) { return i * i }); // [1, 4, 9]
    [650,123,4567].map(String).join('-'); // "650-123-4567"

<!-- This facilitates a one-liner to build a sequence of numbers: -->
用单行代码创建一组数字序列：

    Array.apply(0, Array(3)).map(function(x, y) { return y }); // [0, 1, 2]

<!-- or even English alphabets ‘ABCDEFGHIJKLMNOPQRSTUVWXYZ’: -->
甚至是英文字母表“ABCDEFGHIJKLMNOPQRSTUVWXYZ”：

    Array.apply(0, Array(26)).map(function(x,y) {
        return String.fromCharCode(y + 65);
    }).join('');

<!-- For other variants, see also Brandon Benvie's usage of [apply-map](https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html) and Ben Alman's [Object.keys](https://gist.github.com/4477847) technique. -->
对于其他的变种，查看 Brandon Benvie 的 [apply-map](https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html) 用法和 Ben Alman 的 [Object.keys](https://gist.github.com/4477847) 技术。

## Array.prototype.filter

<!-- [Section 15.4.4.20](http://es5.github.com/#x15.4.4.20) of the official ECMAScript 5.1 defines the official behavior of Array.prototype.filter. As the name says, this function lets you include or exclude some entries of the array based on some certain criteria. Take a look at the following example: -->
官方的 ECMAScript 5.1 的 [15.4.4.20](http://es5.github.com/#x15.4.4.20) 节定义了 Array.prototype.filter 的官方行为。正如名字所示，这个函数使你可以按照一定的条件包括或排除数组中某些条目。来看看下面的例子：

    [1,4,2,3,-8].filter(function(i) { return i < 3 }); // [1, 2, -8]

<!-- Let's extend the previous sequence number generation, say to have only odd number: -->
让我们扩展之前的数字序列生成过程，只含有奇数：

    Array.apply(0, Array(6)).map(function(x,y) { return y }).
    filter(function(x,y) { return y & 1 }); // [1, 3, 5]

<!-- We can also do a complicated dance to print all consonants by excluding the vowels: -->
我们也可以做一个复杂的处理来打印除了元音之外的所有辅音：

    Array.apply(0, Array(26)).map(function(x,y) { return String.fromCharCode(y + 65) }).
    filter(function(s) { return 'AEUIO'.indexOf(s) < 0 }).join('');

<!-- Real-world applications are likely more practical than the above snippets. It could be something like: -->
真实世界的应用程序可能比上面的代码片段更实用。它可能是这样的：

<!-- Give me the list of house prices in a certain ZIP code
What is the total expense of our Engineering department?
Find the best paid professions of Gen X -->
* 给出某个邮政编码地区的房价列表 
* 工程部门的总开支是多少？ 
* 找出 X 一代薪酬最高的职业 

> 译注：Generation X n. 无名一代；X一代；被遗忘的一代（出生于1970年代的美国人）

<!-- ##  Array Comprehension -->

## 数组推导式

<!-- [Array comprehension](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Predefined_Core_Objects#Array_comprehensions) is a syntax feature which has been available in Firefox for a while. It is however not part of the 5th edition of ECMAScript and hence no other browser supports it. The good news is that array comprehension is being incorporated into the next [ECMAScript 6](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts). The latest 2012/12/21 draft includes the grammar of array comprehension in [section 11.1.4.2](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.1.4.2). -->
数组推导式是一个语法特性，Firefox 支持它已经有一段时间了。然而它不是 ECMAScript 5 的一部分，因此没有其他的浏览器支持它。好消息是，数组推导式被并入下一个 [ECMAScript 6](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)。最新的 2012/12/21 草稿的 [11.1.4.2 节](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.1.4.2) 包含了数组推导式。

<!-- An easy way to understand how array comprehension works is by comparing it with map and filter. See the following two lines, they give the same exact result. The second line is something you have seen in the previous map example. -->
理解数组推导式是如何工作的一个简单方法是，把它与 map 和 filter 比较。参阅下面的两个代码，它们给出完全相同的结果。其中第二行在前面的 map 示例中已经看到过。

    [i * i for i of [1, 2, 3]]; // [1, 4, 9]
    [1, 2, 3].map(function (i) { return i * i }); // [1, 4, 9]

<!-- The fun part is when you use two `for` clauses or more. The following line creates a list which contains the references to all 64 possible squares in a chess board, from 'a1' to 'h8'. -->
当你使用两个或更多个 `foo` 之句时，事情变得有趣起来。下面这行代码创建一个列表，包含了棋盘从“A1”到“H8”的所有 64 个可能的方块。

    [(x+y) for x of 'abcdefgh'.split('') for y of '12345678'.split('')];

<!-- If this still looks confusing, I highly recommend understanding the syntax tree, for example by using Esprima's [syntax visualization](http://esprima.googlecode.com/git-history/harmony/demo/parse.html). -->
如果看起来仍然很混乱，我非常推荐理解它的语法树，例如通过使用 Esprima 的[可视化语法](http://esprima.googlecode.com/git-history/harmony/demo/parse.html)。

![es6comprehension](http://ariya.ofilabs.com/wp-content/uploads/2013/01/es6comprehension.png)

<!-- **Note:** A minor syntax difference between ES6 and Firefox is that ES6 does not use brackets for the for clause. Firefox's array comprehension also support for-in form (I am not sure whether this will make it into ES6). It can simplify some construct, generating a sequence of numbers can be rewritten as `[j for (j in Array.apply(0, Array(3)))]`. -->
**注：** ES6 和 Firefox 之间有微小语法差异，就是 ES6 中的 for 子句不使用括号。Firefox 的数组推导式还支持 for-in 形式（我不知道是否会进入 ES6）。它可以简化某些构造过程，例如要产生一组数字序列，可以改写为 `[j for (j in Array.apply(0, Array(3)))]`。

<!-- Filtering using array comprehension is straightforward. Again, compare the two different forms here: -->
使用数组推导式执行过滤是简单的。在这里再次比较两种不同的形式：

    [i for i of [1,4,2,3,-8] if (i < 3)]; 
    [1,4,2,3,-8].filter(function(i) { return i < 3 }); // [1, 2, -8]

<!-- And the simplification of printing the sequence of all alphabets: -->
以及简化字母表序列的打印：

    [String.fromCharCode(65 + i) for i of  Array.apply(0, Array(26)).
    map(function(x, y) { return y; })].join('');

<!-- and just the consonants: -->
以及只包含辅音：

    [j for j of [String.fromCharCode(65 + i)
    for i of Array.apply(0, Array(26)).map(function(x, y) { return y; })]
    if ('AEUIO'.indexOf(j) < 0)].join('');

<!-- As an exercise, analyze the following expression. What it does is producing the list of all prime numbers less than 100. You can see that there is no need for a manual loop at all. Note that since we are talking about next-generation JavaScript, we also use the arrow function ([Section 13.2](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.2)) to shorten the incantation. -->

分析下面的表达式作为一个练习。它的作用是产生小于 100 的素数列表。可以看到没有必要手动的循环遍历所有数字。请注意，由于我们是在谈论下一代 JavaScript，我们还可以使用 Arrow Function（[13.2 节](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.2)）来缩短代码。

> 译注：incantation n. 咒语

    [x
      for x of Array.apply(0, Array(99)).map((x, y) => y + 2)
      if [(x % i)
         for i of Array.apply(0, Array(1 + Math.round(Math.sqrt(x)))).map((x, y) => y)
         if ((i > 1) && ((x % i) === 0))
      ].length === 0
    ];

With the support for array comprehension, JavaScript is getting more and more functional. If you come from Python, Haskell, Scala, or another modern language, you won't feel so powerless anymore!

随着对数组推导式的支持，JavaScript 具备越来越多的功能。如果你来自 Python、Hashhell、Scala 或其他现代语言，你就不会干到那么无能为力了！




