---
layout: post
title: "ECMAScript 6 and Spread Operator"
tagline: "展开操作符"
description: "把数组转换成连续的参数"
category-substitution: 翻译
tags: [ECMAScript 6, JavaScript, Web]

short: "展开操作符"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and Array Comprehension](http://ariya.ofilabs.com/2013/03/es6-and-spread-operator.html)

<!-- We have seen how a [rest parameter](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html) can help the handling of a variable number of function arguments. What about the other way around? Can we turn an array into a series of function arguments? Apparently, ECMAScript 6 defines a new type of operator called the **spread operator** which does exactly that. -->
我们已经看到了[可变参数](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)可以帮助处理可变数目的函数参数。其他方式怎么样呢？我们可以把一个数组转换成连续的函数参数吗？显然地，ECMAScript 6 定义了一个称为**展开操作符**的新操作符，用于处理这个操作。

<!-- Let us review again our [previous example](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html) with a supplier truck and a grocery store. Assuming the API of the store accepts a variable number of items for a particular category : -->
让我们再次回顾[前面的例子](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)，其中有一辆供货卡车和一间杂货铺。假设杂货铺的 API 接受一个特定类目和可变数目的货物。

    store.add('fruit', 'apple');
    store.add('dairy', 'milk', 'cheese', 'yoghurt');
    store.add('pastries', 'donuts', 'croissants');

<!-- We assume that these delicious items are stored in some boxes, each box happens to be an array: -->
我们假设这些美味的货物存储在一个箱子里，每个箱子恰好是一个数组：

    var dairyBox = ['milk', 'cheese', 'yoghurt'];

<!-- A possible solution (out of many others) to invoke store’s add function with the items in the above array is by using [Function.prototype.apply](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/apply). Since we need to pass the food category as the first argument, a little bit dancing with [Array.concat](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/concat) is necessary: -->
用上面的数组调用杂货铺的 add 函数，一个可能的解决方案是使用 [Function.prototype.apply](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/apply)。由于需要把食品类目作为第一个参数传入，[Array.concat](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/concat) 是必需的。

    store.add.apply(store, ['dairy'].concat(dairyBox));

<!-- For the untrained eyes, it looks like one of those magical JavaScript incantations. -->
对于未经过训练的眼睛，上面的代码看起来就像是神奇的 JavaScript 咒语。

<!-- With ECMAScript 6, this can be simplified by using `...` prefix in a spread expression (section [11.2.5](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.2), ES6 draft [Rev 14](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)). -->
在 ECMAScript 6 中，上面的代码可以通过使用展开表达式（[11.2.5](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.2) 节, ES6 草稿 [Rev 14](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)）的前缀 `...` 简化。

    store.add('dairy', ...dairyBox);

<!-- That dairyBox array is simply spread to fill the [remaining argument list](http://www.2ality.com/2011/08/spreading.html). -->
数组 dairyBox 被简单的展开，以填充[其余参数列表](http://www.2ality.com/2011/08/spreading.html)。

![](http://ariya.ofilabs.com/wp-content/uploads/2013/03/spreadexpression.png)

<!-- Obviously, one possibly common place where spreading is always useful is when dealing with arrays. We know that `push` accepts multiple number of arguments. The implementation of `add` function originally looks like: -->
显然，在可能处理数组的地方，展开操作总是有用的。我们知道 `push` 可以接受多个参数。函数 `add` 最初的实现看起来就像这样：

    store.add = function(category, ...items) {
      items.forEach(function (item) {
        store.aisle[category].push(item);
      });
    };

<!-- which can be further shortened to become something like the following fragment. Nifty, isn’t it? -->
可以进一步缩短为类似下面的代码片段。很俏，不是吗？

    store.add = function(category, ...items) {
      store.aisle[category].push(...items);
    };

(This is of course unnecessary if you choose to change the API to simply accept a single array for the items, instead of a rest parameter combined with spreading).

（当然，如果你改变 API 以简单的接受一个货物数组，而不是使用了展开操作符的可变参数，上面的做法是不必要的。）

The use of a spread operator can lead to a different way of combining arrays:
展开操作符的使用可以延伸出一种合并数组的不同方式：

    var x = [1, 2];
    var y = [3, 4];
    x.push(...y);  // x is [1, 2, 3, 4]

What other tricks do you have in mind once you have the spread operator ready to abuse?
一旦滥用展开操作符，你头脑中会有什么其他的技巧？




