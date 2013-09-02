---
layout: post
title: "用 Promises 简化异步编程"
tagline: "Simplifying Async with Promises"
description: ""
category-substitution: 翻译
tags: [翻译, JavaScript, Async, Promise, when]

pgroup: "异步编程"
---
{% include JB/setup %}

<!-- In [Async Programming is Messy](http://know.cujojs.com/tutorials/async/async-programming-is-messy.html.md), we looked at the awkward situation created when we introduce callbacks to handle even a single asynchronous operation into an otherwise simple set of function calls. -->
在 [凌乱的异步编程](/2013/08/26/async-programming-is-messy) 一文中，当为一组简单的函数调用引入回调函数时，我们看到的是一副尴尬的局面，即使是用这种方式来处理单个异步操作。

<!-- As a quick review, have a look back at the code we started with, the messy end result when using callbacks, and the things we'd like to fix in order to get back to sanity: -->
快速回顾一下，看看我们最初的代码、使用回调函数时的凌乱结果，以及我们为了回到正途而想要解决的几个问题：

<!-- 1. We can no longer use a simple call-and-return programming model
1. We can no longer handle errors using try/catch/finally
1. We must add callback and errback parameters to every function signature that might eventually lead to an asynchronous operation -->

1. 我们再也不能使用简单的调用-返回编程模型。
1. 我们再也不能使用 try/catch/finally 来处理异常。
1. 我们必须为可能执行异步操作的每个函数的签名增加 callback 和 errback 参数。

## Promises

<!-- A Promise (aka Future, Delayed value, Deferred value) represents a value that is not yet available because the computation that will produce the value has not yet completed. A Promise is a placeholder into which the successful result or reason for failure will eventually materialize. -->
一个 Promise（又名 Future, Delayed value, Deferred value）代表一个尚不可用的值，因为产生这个值的计算过程尚未完成。一个 Promise 是最终的成功结果或失败原因的占位符。

> 在《jQuery技术内幕》一书中，把 Deferred 称为“异步队列”，把 Promise 称为“异步队列的只读副本”。

<!-- Promises also provide a simple API (see note below) for being notified when the result has materialized, or when a failure has occured. -->
Promises 还提供了一个简单的 API（见下文），用于在结果完成或故障发生时获取通知。

<!-- Promises are [not a new concept](http://en.wikipedia.org/wiki/Futures_and_promises), and have been implemented in many languages. While several implementations of the Promise concept in Javascript have been around for a while, they have started to gain more popularity recently as we start to build bigger, more complex systems that require coordinating more asynchronous tasks. -->
Promises [不是一个新概念](http://en.wikipedia.org/wiki/Futures_and_promises)，已经在许多语言中被实现。在 JavaScript 中，Promise 概念的实现已经有一段时间了，并且最近变得更加流行，因为我们开始构建更庞大、更复杂的系统，需要协调更多的异步任务。

<!-- (NOTE: Although there are [several proposed](http://wiki.commonjs.org/wiki/Promises) Promise API standards, [Promises/A+](http://promises-aplus.github.io/promises-spec/) has been implemented in several major frameworks, and appears to be becoming the defacto standard. In any case, the basic concepts are the same: 1) Promises act as a placeholder for a result or error, 2) they provide a way to be notified when the actual result has materialized, or when a failure has occurred.) -->
（注意：虽然 Promise API 标准存在[多个提案](http://wiki.commonjs.org/wiki/Promises)，但是 [Promises/A+](http://promises-aplus.github.io/promises-spec/) 已经在多个主流框架中被实现，似乎正在成为事实上的标准。无论哪种提案，基本的概念是相同的：1) Promises 作为结果或错误的占位符，2) 提供了一种在结果完成或错误发生时的通知方式。）

<!-- ## The Canonical XHR Example -->
## 典型的 XHR 示例

<!-- In the case of an XHR Get, the value we care about is the content of the url we're fetching. We know that XHR is an asynchonous operation, and that the value won't be available immediately. That fits the definition of a Promise perfectly. -->
在 XHR Get 示例中，我们关注的是获取 url 的内容。我们知道 XHR 是一个异步操作，值不会立即可用。这种情况完全符合一个 Promise 的定义。

<!-- Imagine that we have an XHR library that immediately returns a Promise, as a placeholder for the content, instead of requiring us to pass in a callback. We could rewrite our asynchronous `thisMightFail` function from Part 1 to look like this: -->
假设我们有一个 XHR 库，它立即返回一个 Promise 作为内容的占位符，而不是要求我们传入一个回调函数。我们可以重写 [Part 1](/2013/08/28/async-programming-is-messy/) 中的异步函数 `thisMightFail`，就像这样：

    function thisMightFail() {
        // Our XHR library returns a promise placeholder for the
        // content of the url.  The XHR itself will execute later.
        var promise = xhrGet('/result');

        // We can simply return the promise to our caller as if
        // it is the actual value.
        return promise;
    }

<!-- (Note that several popular Javascript libraries, including [Dojo](http://dojotoolkit.org/reference-guide/dojo/xhrGet.html) (see also this [great article on Dojo's Deferred](http://dojotoolkit.org/documentation/tutorials/1.6/deferreds/) by [@bryanforbes](https://twitter.com/bryanforbes)) and [jQuery](http://api.jquery.com/Types/#jqXHR), implement XHR operations using promises) -->
（需要注意的是，一些流行的 JavaScript 库，包括 [@bryanforbes](https://twitter.com/bryanforbes) 的 [Dojo](http://dojotoolkit.org/reference-guide/dojo/xhrGet.html)（请参考 [great article on Dojo's Deferred](http://dojotoolkit.org/documentation/tutorials/1.6/deferreds/)） 和 [jQuery](http://api.jquery.com/Types/#jqXHR)，使用了 Promises 来实现 XHR 操作）

<!-- Now, we can return the Promise placeholder *as if it were the real result*, and our asynchronous `thisMightFail` function looks very much like a plain old synchronous, call-and-return operation. -->
现在，我们可以返回 Promise 占位符，就像它是真正的结果，并且异步函数 `thisMightFail` 看起来非常像传统的同步操作和调用-返回操作。

<!-- ## Taking Back the Stack -->
## 调用栈

<!-- In a non-callback world, results and errors flow back *up* the call stack. This is expected and familiar. In a callback-based world, as we've seen, results and errors no longer follow that familiar model, and instead, callbacks must flow *down*, deeper into the stack. -->
在一个没有回调函数的世界里，结果和错误沿着调用栈*向上*回传。这是一种符合预期和友好的模式。而在一个基于回调函数的世界里，正如我们已经看到的，结果和错误不再遵循这种熟悉的模式，回调函数必须*向下传递，深入调用栈。

<!-- By using Promises, we can restore the familiar call-and-return programming model, and remove the callbacks. -->
通过使用 Promises，我们可以恢复到熟悉的调用-返回编程模型，并移除回调函数。

<!-- ### Restoring Call-and-return -->
### 恢复调用-返回编程模型

<!-- To see how this works, let's start with a simplified version of the [synchronous `getTheResult` function from Part 1](http://know.cujojs.com/tutorials/async/async-programming-is-messy.html.md), without try/catch so that exceptions will always propagate up the call stack. -->
为了看看它是如何工作的，让我们从 [Part 1](/2013/08/28/async-programming-is-messy/) 简化版本的同步函数 `getTheResult` 开始，不使用 try/catch，这样异常将总是沿着调用栈向上传播。

    function thisMightFail() {
        //...
        if(badThingsHappened) {
            throw new Error(...);
        }

        return theGoodResult;
    }

    function getTheResult() {
        // Return the result of thisMightFail, or let the exception
        // propagate.
        return thisMightFail();
    }

<!-- Now let's introduce the asynchronous `thisMightFail` from above that uses our Promise-based XHR lib. -->
现在，让我们为上面的代码引入异步的 `thisMightFail`，它使用了基于 Promise 的 XHR 库。

    function thisMightFail() {
        // Our XHR library returns a promise placeholder for the
        // content of the url.  The XHR itself will execute later.
        var promise = xhrGet('/result');

        // We can simply return the promise to our caller as if
        // it is the actual value.
        return promise;
    }

    function getTheResult() {
        // Return the result of thisMightFail, which will be a Promise
        // representing a future value or failure
        return thisMightFail();
    }

<!-- Using Promises, `getTheResult()` is identical in the synchronous and asynchronous cases! And in both, the successful result *or the failure* will propagate *up* the stack to the caller. -->
使用 Promises 时，`getTheResult()` 在同步和异步情况下是相同的！并且在这两种情况下，成功结果或*失败*将沿着调用栈传播到调用者。

<!-- ### Removing Callbacks -->
### 移除回调函数

<!-- Notice also that there are no callbacks or errbacks (or alwaysbacks!) being passed down the callstack, and they haven't polluted any of our function signatures. By using Promises, our functions now *look and act* like the familiar, synchronous, call-and-return model. -->
还要注意到的是，没有向调用栈传入回调函数或错误回调函数（或总是执行的回调函数！），也没有污染任何函数的签名。通过使用 Promises，现在我们的函数的*外观和行为*就像友好的、同步的调用-返回编程模型。

<!-- ### Done? -->
### 完成了吗？

<!-- We've used Promises to refactor our simplified `getTheResult` function, and fix two of the problems we identified in Part 1. We've: -->
我们已经使用 Promises 重构了简单的 `getTheResult` 函数，并且解决了在 [Part 1](/2013/08/28/async-programming-is-messy/) 提出的的两个问题。我们已经：

<!-- 1. restored call-and-return
1. removed callback/errback/alwaysback parameter propagation -->
1. 恢复了调用-返回编程模型
1. 移除了参数 callback/errback/alwaysback 的传播

<!-- But, what does this mean for callers of `getTheResult`? Remember that we're returning a Promise, and eventually, either the successful result (the result of the XHR) or an error will materialize into the Promise placeholder, at which point the caller will want to take some action. -->
但是，这对 `getTheResult` 的调用者意味着什么呢？别忘了，我们返回的是一个 Promise，并且，无论成功结果（XHR 的结果）或错误最终将落实到占位符 Promise，到那时，调用者将需要采取一些行动。

<!-- ## What about the Caller? -->
## 对调用者如何？

<!-- As mentioned above, Promises provide an API for being notified when either the result or failure becomes available. For example, in the proposed Promises/A spec, a Promise has a `.then()` method, and many promise libraries provide a `when()` function that achieves the same goal. -->
正如上面所提到的，Promises 提供了一个 API，用于在结果或错误可用时获取通知。例如，在 Promises/A 规范提案中，一个 Promise 含有一个 `.then()` 方法，而且许多 Promise 库提供了一个 `when()` 函数来实现同样的目标。

<!-- First, let's look at what the calling code might look like when using the callback-based approach: -->
首先，让我们看看在使用基于回调函数的方式时，调用代码可能是什么样子：

    // Callback-based getTheResult
    getTheResult(
        function(theResult) {
            // theResult will be the XHR reponse content
            resultNode.innerHTML = theResult;
        },
        function(error) {
            // error will be an indication of why the XHR failed, whatever
            // the XHR lib chooses to supply.  For example, it could be
            // an Error.
            errorNode.innerHTML = error.message;
        }
    );

<!-- Now, let's look at how the caller can use the Promise that `getTheResult` returns using the Promises/A `.then()` API. -->
现在，让我们看看调用者如何通过 Promises/A API `.then()` 使用 `getTheResult` 所返回的 Promise。

    // Call promise-based getTheResult and get back a Promise
    var promise = getTheResult();

    promise.then(
        function(theResult) {
            // theResult will be the XHR reponse content
            resultNode.innerHTML = theResult;
        },
        function(error) {
            // error will be an indication of why the XHR failed, whatever
            // the XHR lib chooses to supply.  For example, it could be
            // an Error.
            errorNode.innerHTML = error.message;
        }
    );

<!-- Or, more compactly: -->
或者，更紧凑一些：

    getTheResult().then(
        function(theResult) {
            // theResult will be the XHR reponse content
            resultNode.innerHTML = theResult;
        },
        function(error) {
            // error will be an indication of why the XHR failed, whatever
            // the XHR lib chooses to supply.  For example, it could be
            // an Error.
            errorNode.innerHTML = error.message;
        }
    );

![](http://know.cujojs.com/tutorials/async/funny-surprised-owl-WHAT.jpg)

(Image from [The Meta Picture](http://themetapicture.com/wat/))

<!-- Wasn't the whole point of this Promises stuff to *avoid using callbacks*? And here we are using them?!? -->
这就是 Promises 用来*避免使用回调函数*的全部内容？我们就这么使用它们？！？

<!-- ## Stay with Me -->
## 别着急

<!-- In Javascript, Promises are implemented using callbacks because there is no language-level construct for dealing with asynchrony. Callbacks are a necessary *implementation detail* of Promises. If Javascript provided, or possibly when it does provide in the future, other language constructs, promises could be implemented differently. -->
在 JavaScript 中，通过使用回调函数来实现 Promises，因为没有语言级的结构可以用于处理异步。回调函数是 Promises 必然的实现方式。如果 Javascript 已经提供或者未来可能提供其他的语言结构，那么 Promises 可能会以不同的方式实现。

<!-- However, there are several important advantages in using Promises over the deep callback passing model from Part 1. -->
然而，使用 Promises 解决（[Part 1](/2013/08/28/async-programming-is-messy/) 中）模块之间传递深度回调函数的问题具备几个重要的优点。

<!-- First, our function signatures are sane. We have removed the need to add callback and errback parameters to every function signature from the caller down to the XHR lib, and only the caller who is ultimately interested in the result needs to mess with callbacks. -->
首先，我们的函数签名是正常的。我们不再需要为从调用者到 XHR 库的每个函数签名添加 callback 和 errback 参数，并且只有对最终结果感兴趣的调用者才需要与回调函数厮混在一起。

<!-- Second, the Promise API standardizes callback passing. Libraries all tend to place callbacks and errbacks at different positions in function signatures. Some don't even accept an errback. *Most* don't accept an alwaysback (i.e. "finally"). We can rely on the Promise API instead of *many potentially different library APIs*. -->
其次，Promise API 标准化了回调函数的传递。所有库可能会把 callbacks 和 errbacks 参数放到函数签名的不同位置。某些库甚至不接受一个 errback 参数。*大部分* 不接受一个 alwaysback（即“finally”）。我们可以依赖 Promise API，而不是*许多有着潜在差异的库 API*。

<!-- Third, a Promise makes a set of *guarantees* about how and when callbacks and errbacks will be called, and how return values and exceptions thrown by callbacks will be handled. In a non-Promise world, the multitude of callback-supporting libraries and their many function signatures also means a multitude of different behaviors: -->
第三，Promise *保障*了回调函数和错误回调函数被调用的方式和时机，以及如何处理返回值和回调函数抛出的异常。在没有 Promise 的世界里，如果库和函数签名支持许多不同的回调函数，便意味着许多不同的行为：

<!-- 1. Are your callbacks allowed to return a value?
1. If so, what happens to that value?
1. Do all libraries allow your callback to throw an exception? If so, what happens to it? Is it silently eaten?
1. If your callback does throw an exception, will your errback be called, or not? -->

1. 你的回调函数允许返回一个值吗？
1. 如果允许返回会发生什么？
1. 是否所有库都允许你的回调函数抛出一个异常？如果允许抛出会发生什么？悄悄的把它吞掉吗？
1. 如果你的回调函数真的抛出一个异常，错误回调是否会被调用？

<!-- … and so on … -->
...等等...

<!-- So, while one way to think of Promises is as a standard API to callback registration, they also provide standard, predictable *behavior* for how and when a callback will be called, exception handling, etc. -->
所以，当考虑把 Promises 作为回调函数注册的标准 API 时，也为如何以及何时调用回调函数和处理异常提供了标准的、可预测的行为。

<!-- ## What about try/catch/finally? -->
## 怎么处理 try/catch/finally？

<!-- Now that we've restored call-and-return and removed callbacks from our function signatures, we need a way to handle failures. Ideally, we'd like to use try/catch/finally, or at least something that *looks and acts just like it* and works in the face of asynchrony. -->
现在，我们已经恢复了调用-返回编程模型，并从函数签名中移除了回调函数，我们还需要一种方式来处理失败的情况。理想情况下，我们希望使用 try/catch/finally，或者是至少在外观和行为上与它相似，并且在面对异步时可以正常工作。

<!-- In [Mastering Async Error Handling with Promises](http://know.cujojs.com/tutorials/async/mastering-async-error-handling-with-promises.html.md), we'll put the final piece of the puzzle into place, and see how to model try/catch/finally using Promises. -->
在 [用 Promises 控制异步错误处理](http://know.cujojs.com/tutorials/async/mastering-async-error-handling-with-promises.html.md) 一文中，我们将把拼图的最后一块填到位，看看如何用 Promises 模仿 try/catch/finally。

<hr>
> 原文：[Simplifying Async with Promises](http://know.cujojs.com/tutorials/async/simplifying-async-with-promises)

<!-- https://github.com/know-cujojs/know/blob/master/src/documents/tutorials/async/simplifying-async-with-promises.html.md -->

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