---
layout: post
title: "用 Promises 控制异步错误处理"
tagline: "Mastering Async Error Handling with Promises"
description: ""
category-substitution: 翻译
tags: [翻译, JavaScript, Async, Promise, when]

pgroup: "异步编程"
---
{% include JB/setup %}

<!-- As we saw in [Async Programming is Messy](http://know.cujojs.com/tutorials/async/async-programming-is-messy.html.md), error handling in callback-based asynchronous code gets messy quickly, and loses many of the qualities of synchronous code that make it familiar and easier to reason about. In [Simplifying Async with Promises](http://know.cujojs.com/tutorials/async/simplifying-async-with-promises.html.md), we introduced Promises and saw how they restore call-and-return semantics, allow errors to propagate up the stack similarly to synchronous exceptions, and generally provide a cleaner approach to managing asynchrony, especially when handling errors. -->
正如我们在 [凌乱的异步编程](/2013/08/26/async-programming-is-messy/) 一文中看到的，基于回调函数的异步代码很快变得混乱起来，并且大大降低了同步代码部分的质量，从而更容易导致错误。在 [用 Promises 简化异步编程](/2013/08/27/simplifying-async-with-promises/) 一文中，我们引入了 Promises，看到了它们如何恢复调用-返回编程模型，并且提供一种更清晰方法来管理异步，特别是在处理错误时。

<!-- ## Try/catch/finally -->
## Try/catch/finally

<!-- In synchronous code, `try/catch/finally` provides a simple and familiar, yet very powerful idiom for performing a task, handling errors, and then always ensuring we can clean up afterward. -->
在同步代码中，`try/catch/finally` 提供了一种简单友好但非常强大的惯用语法来执行任务、处理错误，并且总是确保稍后可以执行清理。

> 译注：idiom [习语](http://baike.baidu.com/view/1678043.htm)

<!-- Here's a simple `try/catch/finally` example in the same vein as the original `getTheResult()` from Part 1: -->
下面是一个简单的 `try/catch/finally` 示例，与 [Part 1](/2013/08/28/async-programming-is-messy/) 中的原始 `getTheResult()` 一模一样：

    // Sync
    function getTheResult() {

        try {
            return thisMightFail();
        } catch(e) {
            return recoverFromFailure(e);
        } finally {
            alwaysCleanup();
        }

    }

<!-- As we've seen, attempting to simulate even the `try/catch` via a callback-based approach is fraught with pitfalls. Adding the notion of `finally`, that is, *guaranteed cleanup*, only makes things worse. -->
正如我们已经看到的那样，即使是试图以基于回调函数的方式来模拟 `try/catch` 也充满了陷阱。加入 `finally` 的概念后（即*确保执行清理*）只会使事情变得更糟。

<!-- Using Promises, we can build an approach that is analogous to this familiar `try/catch/finally` idiom, without deep callback structures. -->
使用 Promises，我们可以建立一种方法，类似于友好的惯用语法 `try/catch/finally`，并且没有深度回调结构。

<!-- ## Try/catch -->
## Try/catch
<!-- Let's start with a simpler version of example above that only uses `try/catch`, and see how we can use Promises to handle errors in the same way. -->
让我们从上面示例的简单版本开始，只使用 `try/catch`，然后看看如何用 Promises 以同样的方式处理错误。

    // Sync
    function getTheResult() {

        try {
            return thisMightFail();
        } catch(e) {
            return recoverFromFailure(e);
        }

    }

<!-- And now, as in Part 2, let's assume that `thisMightFail()` is asynchronous and returns a Promise. We can use `then()` to simulate `catch`: -->
现在，就像在 [Part 2](/2013/08/27/simplifying-async-with-promises/) 中一样，让我们假设 `thisMightFail()` 是异步的，并且返回一个 Promise。我们可以用 `then()` 来模拟 `catch`：

    // Async
    function thisMightFail() {
        //...
        return promise;
    }

    function getTheResult() {

        return thisMightFail()
            .then(null, recoverFromFailure);

    }

<!-- Waitaminit, that's *even less code* than using `try/catch`! What's going on here? -->
等等，比 `try/catch` 的*代码甚至更少*！这是怎么回事呢？

> 译注：Waitaminit, Wait a minute

<!-- ### Propagating a success -->
### 传播成功状态

<!-- This example introduces two very important facts about how Promises behave. The first of which is: -->
这个例子引入了两个关于 Promises 行为非常重要的事实。其中第一个是：

<!-- If no `onFulfilled` handler is provided to `then()`, the fulfillment value will propagate through unchanged to the returned Promise. -->
如果没有提供 `onFulfilled` 处理程序，结果值将原封不动地传播到返回的 Promise。

<!-- We're *not* supplying an `onFulfilled` handler when calling `then()`. This means that a successful result from `thisMightFail()` simply will propagate through and be returned to the caller. -->
在调用 `then()` 时，我们*没有*提供 `onFulfilled` 处理程序。这意外着 `thisMightFail()` 返回的成功结果将简单地传播，并返回给调用者。

<!-- ### Handling an error -->
### 处理错误

<!-- The other important behavior is: -->
另外一个重要的行为是：

<!-- A handler may produce either a successful result by returning a value, or an error by throwing or returning a rejected promise. -->
处理程序可以通过返回一个值来产生一个成功结果，也可以通过抛出错误或返回一个被拒的 Promise 来产生一个错误。

<!-- We *are* supplying an `onRejected` handler: `recoverFromFailure`. That means that any error produced by `thisMightFail` will be provided to `recoverFromFailure`. Just like the `catch` statement in the synchronous example, `recoverFromFailure` can handle the error and `return` a successful result, *or* it can produce an error by throwing or by returning a rejected Promise. -->
我们提供了一个 `onRejected` 处理程序：`recoverFromFailure`。这意外着，`thisMightFail` 产生的任何错误将被传给 `recoverFromFailure`。就像同步例子中的 `catch` 语句，`recoverFromFailure` 可以处理传入的错误并 `return` 一个成功结果，*也可以*通过抛出错误或返回一个被拒的 Promise 来产生一个错误。

<!-- Now we have a fully asynchronous construct that behaves like its synchronous analog, and is just as easy to write. -->
现在我们有一个完整的异步结构，它的行为就像是同步的模拟，并且也很容易编写。

<!-- ### Adding some sugar -->
### 添加一点语法糖

> 译注：Syntactic sugar [语法糖](http://baike.baidu.com/view/1805428.htm)

<!-- Hmmm, but what about that `null` we're passing as the first param? Why should we have to type `null` everywhere we want to use this asynchronous `try/catch`-like construct? Can't we do better? -->
嗯，但我们把 `null` 作为第一个参数传入是什么意思？在想要使用类似 `try/catch` 的异步结构的地方，我们为什么必须要键入 `null`？能不能做的更好点？

<!-- While the primary interface to a Promises/A+ Promise is its `then()` method, many implementations add convenience methods, built, with very little code, upon `then()`. For example, [when.js](https://github.com/cujojs/when) Promises provide an [`otherwise()` method](https://github.com/cujojs/when/blob/master/docs/api.md#otherwise) that allows us to write this example more intuitive and compactly: -->
虽然遵循 Promises/A+ 规范的 Promise 的主要接口是 `then()` 方法，但是许多实现都（用很少的代码）以 `then()` 为基础构建和添加了便捷方法。例如，[when.js](https://github.com/cujojs/when) Promises 提供了一个 [`otherwise()` 方法](https://github.com/cujojs/when/blob/master/docs/api.md#otherwise)，允许我们更直观、更紧凑地编写这个例子：

    // Async: Using when.js promise.otherwise();
    function getTheResult() {

        return thisMightFail()
            .otherwise(recoverFromFailure);

    }

<!-- Now we have something that reads nicely! -->
现在我们有了阅读起来很棒的异步结构！

<!-- ## Adding finally -->
## 添加 finally

<!-- Let's add `finally` back into the mix, and see how we can use Promises to achieve the same result for asynchronous operations. -->
让我们把 `finally` 添加到这种混合结构中，看看如何用 Promises 使异步操作达到同样的结果。

    // Sync
    function getTheResult() {

        try {
            return thisMightFail();
        } catch(e) {
            return recoverFromFailure(e);
        } finally {
            alwaysCleanup();
        }

    }

<!-- First, let's note that there are some very interesting things about this seemingly simple `finally` block. It: -->
首先让我们注意到的是，这个看似简单的 `finally` 块包含了一些有趣的东西：

<!-- 1. will always execute after thisMightFail and/or recoverFromFailure
1. does not have access to the value returned by `thisMightFail`, or to the thrown exception (`e`), or to the value returned by `recoverFromFailure`[^1].
1. cannot, in this case, transform an exception thrown by `recoverFromFailure` back into a successful result[^2].
1. *can* change a successful result (returned by either `thisMightFail` or `recoverFromFailure`) into a failure if `alwaysCleanup` throws an exception.
1. *can* substitute a new exception in place of one thrown by `recoverFromFailure`. That is, if both `recoverFromFailure` and `alwaysCleanup` throw exceptions, the one thrown by `alwaysCleanup` will propagate to the caller, and the one thrown by `recoverFromFailure` *will not*. -->

1. 总是在 `thisMightFail` 和/或 `recoverFromFailure` 之后执行
2. <a name="footnote-1-ref"></a>没有机会访问 `thisMightFail` 返回的值或抛出的异常 `e`，也没有机会访问 `recoverFromFailure` 返回的值[^1]。
3. <a name="footnote-2-ref"></a>在这种情况下，不能把 `recoverFromFailure` 抛出的异常转换回成功结果[^2]。
4. 如果 `alwaysCleanup` 抛出一个异常，*可以*把成功结果（由 `thisMightFail` 或 `recoverFromFailure`）转换为一个失败。
5. *可以*用一个新异常替换掉 `recoverFromFailure` 抛出的异常。也就是说，如果 `recoverFromFailure` 和 `alwaysCleanup` 都抛出了异常，`alwaysCleanup` 抛出的异常将传播到调用者，而由 `recoverFromFailure` 抛出的却*不会*。

<!-- This seems fairly sophisticated. Let's return to our asynchronous `getTheResult` and look at how we can achieve these same properties using Promises. -->
这似乎相当复杂。让我们回到异步的 `getTheResult`，看看如何用 Promises 实现同样的特性。

<!-- ### Always execute -->
### 总是会执行

<!-- First, let's use `then()` to ensure that `alwaysCleanup` will execute in all cases (for succinctness, we'll keep when.js's `otherwise`): -->
首先，让我们用 `then()` 确保 `alwaysCleanup` 在所有情况下都将会执行（为了简洁些，我们会保留 when.js 的 `otherwise`）：

    // Async
    function getTheResult() {

        return thisMightFail()
            .otherwise(recoverFromFailure);
            .then(alwaysCleanup, alwaysCleanup);
    }

<!-- That seems simple enough! Now, `alwaysCleanup` will be executed in all cases: -->
这似乎很简单！现在，`alwaysCleanup`在所有情况下都将会被执行：

<!-- 1. if `thisMightFail` succeeds,
1. if `thisMightFail` fails and `recoverFromFailure` succeeds, or
1. if `thisMightFail` and `recoverFromFailure` both fail. -->

1. 如果 `thisMightFail` 成功了，
2. 如果 `thisMightFail` 失败了，而 `recoverFromFailure` 成功了，
3. 如果 `thisMightFail` 和 `recoverFromFailure` 都失败了。

<!-- But wait, while we've ensured that `alwaysCleanup` will always execute, we've violated two of the other properties: `alwaysCleanup` *will* receive the successful result or the error, so has access to either/both, and it *can* transform an error into a successful result by returning successfully. -->
但等等，虽然我们已经确保了 `alwaysCleanup` 将总是会执行，但是也侵犯了其他两项特性：`alwaysCleanup` *会*收到成功结果或错误，因此有机会访问其中之一，或者两个，并且*可以*通过返回一个成功值把一个错误转换为一个成功结果。

<!-- ### Don't access result/error -->
### 不要访问结果/错误

<!--We can introduce a wrapper to prevent passing the result or error to `alwaysCleanup`:-->
我们可以引入一个包装函数，以防把结果或错误传给 `alwaysCleanup`：

    // Async
    function alwaysCleanupWrapper(resultOrError) {
        // don't pass resultOrError through
        return alwaysCleanup();
    }

    function getTheResult() {

        return thisMightFail()
            .otherwise(recoverFromFailure);
            .then(alwaysCleanupWrapper, alwaysCleanupWrapper);
    }

<!-- Now we've achieved one of the two properties we had lost: `alwaysCleanup` no longer has access to the result or error. Unfortunately, we had to add some code that feels unnecessary. Let's keep exploring, though, to see if we can achieve the remaining property. -->
现在，我们已经实现了曾丢掉的两项特性中的一项：`alwaysCleanup` 不再可以访问结果或错误。不幸的是，我们不得不添加一些感觉没必要的代码。不过，让我们继续探索，看看是否可以实现剩下的特性。

<!-- ### Don't change the result -->
### 不要改变结果

<!-- While `alwaysCleanupWrapper` prevents `alwaysCleanup` from accessing the result or error, it still allows `alwaysCleanup` to turn an error condition into a successful result. For example, if `recoverFromFailure` produces an error, it will be passed to `alwaysCleanupWrapper`, which will then call `alwaysCleanup`. If `alwaysCleanup` returns successfully, the result will be propagated to the caller, thus squelching the previous error. -->
虽然 `alwaysCleanupWrapper` 阻止了 `alwaysCleanup` 访问结果或错误，但是它仍然允许 `alwaysCleanup` 把一个错误状态转换一个成功结果。例如，如果 `recoverFromFailure` 产生一个错误，它将被传给 `alwaysCleanupWrapper`，然后调用 `alwaysCleanup`。如果 `alwaysCleanup` 成功返回，返回值将传播到调用者，从而消除了之前的错误。

<!-- That doesn't align with how our synchronous `finally` clause behaves, so let's refactor: -->
这与同步的 `finally` 之句的行为并不匹配，所以让我们重构它：

    // Async
    function alwaysCleanupOnSuccess(result) {
        // don't pass result through, *and ignore* the return value
        // of alwaysCleanup.  Instead, return original result to propagate it.
        alwaysCleanup();
        return result;
    }

    function alwaysCleanupOnFailure(error) {
        // don't pass result through, *and ignore* the result
        // of alwaysCleanup.  Instead, rethrow error to propagate the failure.
        alwaysCleanup();
        throw error;
    }

    function getTheResult() {

        return thisMightFail()
            .otherwise(recoverFromFailure);
            .then(alwaysCleanupOnSuccess, alwaysCleanupOnFailure);

    }

<!-- In both the success and failure cases, we've preserved the outcome: `alwaysCleanupOnSuccess` will execute `alwaysCleanup` but not allow it to change the ultimate result, and `alwaysCleanupOnFailure` will also execute `alwaysCleanup` and always rethrow the original error, thus propagating it even if `alwaysCleanup` returns successfully. -->
在成功和失败状态下，我们已经保存了结果：`alwaysCleanupOnSuccess` 将执行 `alwaysCleanup` 但不允许它改变最终结果，`alwaysCleanupOnFailure` 也将执行 `alwaysCleanup` 并总是抛出原始的错误，从而传播错误，即使 `alwaysCleanup` 成功返回。

<!-- ### The remaining two properties -->
### 剩下的两项特性

<!-- Looking at the refactor above, we can also see that the remaining two properties hold: -->
看看上面的重构，我们还可以发现它涵盖了剩下的两项特性：

<!-- In `alwaysCleanupOnSuccess`, if `alwaysCleanup` throws, the `return result` will never be reached, and this new error will be propagated to the caller, thus turning a successful result into a failure. -->
在 `alwaysCleanupOnSuccess` 中，如果 `alwaysCleanup` 抛出错误，`return result` 将永远不会被执行到 ，并且这个新错误将传播到调用者，从而把一个成功结果转换为一个失败结果。

<!-- In `alwaysCleanupOnFailure`, if `alwaysCleanup` throws, the `throw error` will never be reached, and the error thrown by `alwaysCleanup` will be propagated to the caller, thus substituting a new error. -->
在 `alwaysCleanupOnFailure` 中，如果 `alwaysCleanup` 抛出错误，`throw error` 将永远不会被执行到，并且这个由 `alwaysCleanup` 抛出的错误将传播到调用者，从而代之以一个新错误。

<!-- ## Finally? -->
## 圆满了吗？

<!-- With this latest refactor, we've created an asynchronous construct that behaves like its familiar, synchronous `try/catch/finally` analog. -->
通过最新重构的代码，我们已经创建了这样一个异步结构，它的行为就像友好的同步 `try/catch/finally` 的模拟。

<!-- ### More sugar -->
### 更多语法糖

<!-- Some Promise implementations provide an abstraction for the `finally`-like behavior we want. For example, when.js Promises provide an [`ensure()` method](https://github.com/cujojs/when/blob/master/docs/api.md#ensure) that has all of the properties we achieved above, but also allows us to be more succinct: -->
一些 Promise 提供了类似 `finally` 行为的抽象。例如，when.js Promises 提供了一个 [`ensure()` 方法](https://github.com/cujojs/when/blob/master/docs/api.md#ensure)，它具备我们前面实现的所有特性，但是更简洁：

    // Async: Using when.js promise.ensure();
    function getTheResult() {

        return thisMightFail()
            .otherwise(recoverFromFailure)
            .ensure(alwaysCleanup);

    }

<!-- ## Finally -->
## 小结

<!-- We started with the goal of finding a way to model the useful and familiar synchronous `try/catch/finally` behavior for asynchronous operations. Here's the simple, synchronous code we started with: -->
我们一开始的目标是为异步操作寻找一种方式来模拟有用且好用的同步 `try/catch/finally` 的行为。下面是我们开始时的简单同步代码：

    // Sync
    function getTheResult() {

        try {
            return thisMightFail();
        } catch(e) {
            return recoverFromFailure(e);
        } finally {
            alwaysCleanup();
        }

    }

<!-- And here is the asynchronous analog we ended up with something that is just as compact, and easily readable: -->
然后，下面是最终的异步模拟，结构紧凑，而且易于阅读：

    // Async
    function getTheResult() {

        return thisMightFail()
            .otherwise(recoverFromFailure)
            .ensure(alwaysCleanup);

    }

<!-- ## Try/finally -->
## Try/finally

<!-- Another common construct is `try/finally`. It is useful in executing cleanup code, but always allowing exceptions to propagate in the case where there is no immediate recovery path. For example: -->
另一种常见的结构是 `try/finally`。在执行清理代码时它很有用，但是在这种没有恢复路径（`catch`）的情况下，它总是允许异常传播。例如：

    // Sync
    function getTheResult() {

        try {
            return thisMightFail();
        } finally {
            alwaysCleanup();
        }

    }

<!-- Now that we've modeled a full `try/catch/finally` using Promises, modeling `try/finally` is trivial. Similarly to simply cutting out the `catch` above, we can cut out the `otherwise()` in our Promise version: -->
现在，我们已经 Promises 完整地模拟了 `try/catch/finally`，模拟 `try/finally` 就小菜一碟了。就像上面简单地删除掉 `catch` 一样，我们可以在 Promise 版本中删去 `otherwise()`：

    // Async
    function getTheResult() {

        return thisMightFail()
            .ensure(alwaysCleanup);

    }

<!--All of the constraints we've been attempting to achieve still hold--this asynchronous construct will behave analogously to its synchronous `try/finally` counterpart.-->
我们一直试图实现的制约（特性）仍然保留了下来——这个异步结构的行为类似于对应的同步 `try/finally`。

<!-- ## Using it -->
## 应用异步结构

<!-- Let's compare how we would use the synchronous and asynchronous versions of `getTheResult`. Assume we have the following two pre-existing functions for showing results and errors. For simplicity, let's also assume that `showResult` might fail, but that `showError` will not fail. -->
让我们来比较一下如何使用 `getTheResult` 的同步和异步版本。假设已经有下面两个用于展示结果和错误的函数。为了简单起见，我们还假设 `showResult` 可能会失败，而 `showError` 不会失败。

    // Assume showResult might fail
    function showResult(result) { /* Format and show the result */ }

    // Assume showError will never fail
    function showError(error) { /* Show the error, warn the user, etc. */ }

<!-- ### Synchronous -->
### 同步版本

<!-- First, the synchronous version, which we might use like this: -->
首先是同步版本，我们可能会像这样使用：

    // Sync
    try {
        showResult(getTheResult());
    } catch(e) {
        showError(e);
    }

<!-- It's quite simple, as we'd expect. If we get the result successfully, then we show it. If getting the result fails (by throwing an exception), we show the error. -->
正如我们预料的，它相当简单。如果我们成功地得到结果，然后就展示结果。如果得到失败的结果（通过抛出一个异常），就展示错误。

<!--It's also important to note that if `showResult` fails, we will show an error. This is an important hallmark of synchronous exceptions. We've written single `catch` clause that will handle errors from either `getTheResult` or `showResult`. The error propagation is *automatic*, and required no additional effort on our part.-->
同样需要重点注意的是，如果 `showResult` 失败了，将展示一个错误。这是同步异常的一个重要标志。我们写下的 `catch` 单句将处理来自 `getTheResult` 或 `showResult` 的错误。这种错误传播是*自动的*，不需要为之增加额外的代码。

<!-- ### Asynchronous -->
### 异步版本

<!-- Now, let's look at how we'd use the asynchronous version to accomplish the same goals: -->
现在，让我们看看如何用异步版本完成同样的目标：

    // Async
    getTheResult().then(showResult)
        .otherwise(showError);

<!-- The functionality here is analogous, and one could argue that visually, this is even simpler than the synchronous version. We get the result, or rather in this case, a Promise for the result, and when the actual result materializes (remember, this is all asynchronous!), we show it. If getting the result fails (by rejecting resultPromise), we show the error. -->
这里的功能是类似的，而且会惊讶于它看起来居然比同步版本更简单。我们得到了结果，或者更确切地说，是结果的一个 Promise，并且当真正的结果实现时（记住，一切都是异步的），我们将展示它。如果得到了失败的结果（通过拒绝 Promise），我们将展示错误。

<!-- Because Promises propagate errors similarly to exceptions, if `showResult` fails, we will also show an error. So, the automatic the behavior here is also parallel to the synchronous version: We've written single `otherwise` call that will handle errors from either `getTheResult` or `showResult`. -->
由于 Promises 像传播异常一样传播错误，因此如果 `showResult` 失败了，我们也会展示一个错误。因此，这种自动的行为与同步版本是也是等价的：我们编写的 `otherwise` 单句调用将处理来自 `getTheResult` 和 `showResult` 的错误。

<!-- Another important thing to notice is that we are able to use the same `showResult` and `showError` functions as in the synchronous version. We don't need artificial callback-specific function signatures to work with promises--just the same functions we'd write anyway. -->
另一件需要注意的事情是，同样的 `showResult` 和 `showError` 函数也可以使用在同步版本中。我们不需要为了能在 Promises 中运行而人工改造特定函数的签名——与我们在任意地方编写的函数完全一样。

<!-- ## Putting it all together -->
## 整合

<!-- We've refactored our `getTheResult` code to use Promises to eumlate `try/catch/finally`, and also the calling code to use the returned Promise to handle all the same error cases we would handle in the synchronous version. Let's look at the complete Promise-based asynchronous version of our code: -->
我们已经重构了 `getTheResult` 的代码，使之以 Promises 来模拟 `try/catch/finally`，也使调用代码用返回的 Promise 来处理与同步版本相同的错误。让我们完整地看看代码基于 Promise 的异步版本：

    // Using getTheResult()
    getTheResult().then(showResult)
        .otherwise(showError);

    function getTheResult() {
        return thisMightFail()
            .otherwise(recoverFromFailure)
            .ensure(alwaysCleanup);
    }

    function thisMightFail() {
        // Using the proposed Promises/A+ style API for promise creation
        return makePromise(function(resolve, reject) {
            var result, error;

            // Do work, then:

            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    }

<!-- ## The end? -->
## 结语

<!-- Of course, there will always be differences between synchronous and asynchronous execution, but by using Promises, we can narrow the divide. The synchronous and Promise-based versions we've constructed not only look very similar, they *behave* similarly. They have similar invariants. We can reason about them in similar ways. We can even *refactor* and *test* them in similar ways. -->
当然同步执行和异步执行之间总是有所差异，但是我们可以通过使用 Promises 缩小这种差异。同步版本和我们构建的基于 Promise 的版本不仅看起非常相似，而且它们的*行为*也相似。它们有着相似的固定格式。我们可以用相似的方式揣测它们。我们甚至能用相似的方式*重构*和*测试*它们。

<!-- Providing familiar and predictable error handling patterns and composable call-and-return semantics are two powerful aspects of Promises, but they are also only the beginning. Promises are a building block on which fully asynchronous analogs of many other familiar features can be built easily: higher order functions like map and reduce/fold, [parallel and sequential](https://github.com/cujojs/when/blob/master/docs/api.md#concurrency) task execution, and much more. -->
提供友好和可预测的错误处理模式，以及可组合的调用-返回语法，是 Promises 两个强大的特性，但是这仅仅是开始。基于 Promises 的异步结构，可以轻松地将许多其他功能完全异步化：高级功能（例如 map、reduce/fold）、[并行和顺序](https://github.com/cujojs/when/blob/master/docs/api.md#concurrency)的执行任务等等。

<hr>

<!--[^1]: You might be wondering why we want this property. For this article, we're choosing to try to model `finally` as closely as possible. The intention of synchronous `finally` is to cause *side effects*, such as closing a file or database connection, and not to transform the result or error by applying a function to it. Also, passing something that *might be a result or might be an error* to `alwaysCleanup` can be a source of hazards without *also* telling `alwaysCleanup` what kind of thing it is receiving. The fact that `finally` doesn't have a "parameter", like `catch` means that the burden is on the developer to grant access to the result or error, usually by storing it in a local variable before execution enters the `finally`. That approach will work for these promise-based approaches as well.-->

<!--[^2]: Note that `finally` *is* allowed to squelch exceptions by *explicitly* returning a value. However, in this case, we are not returning anything explicitly. I've never seen a realistic and useful case for squelching an exception that way.-->

[^1]: #footnote-1
[^2]: #footnote-2

1. <a name="footnote-1"></a>你可能会奇怪于为什么我们需要这个特性。在这篇文章中，我们选择尝试尽可能近似地模拟 `finally`。同步 `finally` 的意图是引发某种*副作用*，例如关闭一个文件或数据库连接，并不是执行一个函数来转换结果或错误。而且，向 `alwaysCleanup` 传入一个*可能是结果或错误*的参数，*却*不告诉 `alwaysCleanup` 正在接受的参数什么类型，可能是一个危害源。事实上，`finally` 没有”参数“，不像 `catch`，这意外着开发人员需要承担授权访问结果或错误的烦扰，通常的做法是在进入 `finally` 之前把结果或错误存储到一个局部变量中。这种做法也可以应用在基于 Promise 的方式中。<a href="#footnote-1-ref">↩</a>

2. <a name="footnote-2"></a>需要注意的是，`finally`*可以*通过*明确地*返回一个值消除异常。但是在这种情况下，我们没有明确地返回任何东西。我从来没有在现实中见过需要用这种方式来消除异常的情况。<a href="#footnote-2-ref">↩</a>

<hr>
> 原文：[Mastering Async Error Handling with Promises](http://know.cujojs.com/tutorials/async/mastering-async-error-handling-with-promises)

<!-- https://github.com/know-cujojs/know/blob/master/src/documents/tutorials/async/mastering-async-error-handling-with-promises.html.md -->

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