---
layout: post
title: "Javascript Promise"
tagline: ""
description: ""
category-substitution: 翻译
tags: [翻译, JavaScript, Promise, Web]
---
{% include JB/setup %}

> 原文：[JavaScript Promises](http://wildermuth.com/2013/8/3/JavaScript_Promises)

![](http://wildermuth.com/images/pinky-promise_2.jpg)

<!-- No I am not talking the promise that JavaScript will fix everything if you use it. I don't even believe that ;) I am talking about the concept of a promise object that several JavaScript libraries use (including [AngularJS](http://angularjs.org/), [jQuery](http://jquery.com/), [Dojo](http://dojotoolkit.org/) and [WinJS](http://msdn.microsoft.com/en-us/library/windows/apps/br229773.aspx)). -->
哦不，我不是在谈论使用了 Promise 后，JavaScript 就可以解决所有问题，这点连我自己也不相信。我想谈论的是一些 JavaScript 库中用到的 Promise 概念，包括 [AngularJS](http://angularjs.org/), [jQuery](http://jquery.com/), [Dojo](http://dojotoolkit.org/) and [WinJS](http://msdn.microsoft.com/en-us/library/windows/apps/br229773.aspx)。

[AngularJS]: http://angularjs.org/
[jQuery]: http://jquery.com/
[Dojo]: http://dojotoolkit.org/
[WinJS]: http://msdn.microsoft.com/en-us/library/windows/apps/br229773.aspx

<!-- A promise is a pattern for handling asynchronous operations. The problem is that essentially when you start an asynchronous operation, you need to execute some code as the operation is completed. Asynchronous code is so common that most libraries have found a solution for passing in callbacks. But there is little commonality to how each libraries does this. Let's take jQuery as an example: -->
Promise 是一种异步操作模式。异步操作的基本问题在于，当你开始一个异步操作后，你需要在操作完成时执行一些代码。异步代码是如此的普遍，并且大多数库也已经找到了一个解决方案：传入回调函数。并且每个库的实现有着共通之处。让我们看一个 jQuery 示例：

<iframe style="width: 100%" height="300" src="http://jsfiddle.net/cuXqF/embedded/" frameborder="0" width="100%" allowfullscreen="allowfullscreen"></iframe>

<!-- In this example you can see the jQuery uses the success property of the settings object to specify the callback. This isn't a promise but a way to pass in the callback functions. When the ajax call is complete, it calls the success function. Depending on the library that uses asynchronous operations, you might pass in a set of callbacks (e.g. for success or failure). There are a ton of ways to accomplish this. -->
在上面这个例子中，你可以看到 jQuery 使用配置对象的属性 success 来指定回调函数。这不是 Promise，仅仅是一种传递回调函数的方式。当 ajax 请求完成时，它会调用函数 success。根据库对异步操作的实现，你可以传入一组回调函数（例如 success 或 failure）。然而，事实上有很多种方式可以实现这一点。

<!-- The promise pattern sets out to simplify this process. The asynchronous operation simply returns an object called a promise. The promise allows you to call a method called **then** that let's you specify the function(s) to use as the callbacks. Let's see how to consume a promise using jQuery as an example: -->
异步模式可以简化这个过程。异步操作简单地返回一个 Promise 对象，Promise 对象允许你调用一个命名为 **then** 的方法，来指定一些函数作为回调函数。让我们看看在 jQuery 中如何使用 Promise 对象：

<iframe style="width: 100%" height="300" src="http://jsfiddle.net/FDg6d/embedded/" frameborder="0" width="100%" allowfullscreen="allowfullscreen"></iframe>

<!-- What is interesting here, is that the object that **ajax** returns is the **xhr** object which implements the promise pattern so we can call **then** as seen here. The power of the call to then is that you can chain them by calling then for discrete operations and completing the operation with a call to done as shown here: -->
有趣的是，**ajax** 返回的是一个实现了 Promise 模式的 **xhr** 对象，所以我们可以调用 **then**，正如你所看到的。then 的魔力在于，你可以通过调用 then 把离散的操作串联起来，并且通过调用 done 来结束操作，就像下面这样：

<iframe style="width: 100%" height="400" src="http://jsfiddle.net/kWrpq/embedded/" frameborder="0" width="100%" allowfullscreen="allowfullscreen"></iframe>

<!-- Because many libraries are starting to take on the promise pattern, handling asynchronous operations should be easier no matter what code you're writing (e.g. NodeJS, in-browser JS, etc.). But what does a promise look like from the other side? -->
由于许多库开始采用 Promise 模式，对异步操作的处理将更加容易，并且不需要考虑所写的是哪种代码（例如 NodeJS、浏览器 JS 等等）。但是，如果从其他角度来看待 Promise 会是什么样子呢？

<!-- One important key to the pattern is that the then function can accept two functions. The first is for the success callback; the second for the failure callback like so: -->
Promise 模式的一个重要关键是，方法 then 可以接受两个参数。第一个是 success 回调函数，第二个是 failure 回调函数，就像这样：

<iframe style="width: 100%" height="400" src="http://jsfiddle.net/SwzkK/embedded/" frameborder="0" width="100%" allowfullscreen="allowfullscreen"></iframe>

<!-- Notice that in jQuery we're using a call to **always** to specify that we want to be called whether the success or failure was called. -->
请注意，在 jQuery 中，我们可以通过调用 **always** 来指定无论 success 或 failure 都会执行的回调函数。

<!-- Let's see how using a promise looks. Here is an example from AngularJS: -->
让我们看看如何使用一个 Promise 对象，下面是一个来自 AngularJS 的示例：

<iframe style="width: 100%" height="700" src="http://jsfiddle.net/s35B9/embedded/" frameborder="0" width="100%" allowfullscreen="allowfullscreen"></iframe>

<!-- AngularJS uses an implementation (see the **$q** variable) that is started with a call to **defer()**.  This returns an object that contains ways to mark a successful or failure condition as well as the promise itself. Notice that in the **_callMe** function the **d** variable is created by calling **$q.defer()** then the **d.promise** is returned from the function so that the caller can call the promise methods (e.g. **then**). When the actual asynchronous operation is performed (in this case mocked up as a **setTimeout** call), we can use the **resolve** method on the defer'd object to tell the promise that we completed successfully (and therefore call the first function in the **then** method below). If we were to call **reject**, the second method (the failure call) would be called instead. -->
在 AngularJS 的实现（见变量 **$q**）中，首先要调用 **defer()**。返回的对象包含了标记成功或失败状态的方法，以及 promise。注意：在函数 **_callMe** 中，变量 **d** 通过调用 **$q.defer()** 创建，然后 **d.promise** 被返回，调用方可以继续调用 promise 方法（例如 **then**）。当实际的异步操作完成后（在这个例子中用 **setTimeout** 模拟），我们可以使用 d 的方法 **resolve** 来告诉 promise（调用传给方法 **then** 的第一个函数）。如果我们调用 **reject**，第二个（失败）函数将被调用。

<!-- You can play with these examples in JSFiddle and see what you can make happen. Promises are a really simple and cool way to handle asynchronicity. What I really like about it is that it simplifies your code (so that you don't have the triangle of doom when you have to nest callback functions inside each other. This makes it easy. -->
你可以在 JSFiddle 中试验这些例子，看看会发生什么。Promise 以相当简单和出色的方式来处理异步性。我真正喜欢的是它可以简化你的代码，当必须彼此嵌入回调函数时，不会再有末日般的恐怖轮回。Promise 使这一点变得很容易。


