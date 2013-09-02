---
layout: post
title: "凌乱的异步编程"
tagline: "Async Programming is Messy"
description: ""
category-substitution: 翻译
tags: [翻译, JavaScript, Async, Promise, when]

pgroup: "异步编程"
---
{% include JB/setup %}

<!-- ## Exceptions and try/catch -->
## 异常和 try/catch
<!-- Exceptions and try/catch are an intuitive way to execute operations that may fail. They allow us to recover from the failure, or to let the failure propagate up the call stack to a caller by either not catching the exception, or explicitly re-throwing it. -->
当执行可能失败的操作时，异常和 try/catch 是一种直观的操作。通过这种方式，我们可以从失败中恢复，也可以不捕获异常，或者明确地将异常再次抛出，让异常沿着调用栈向上传播到调用者。

<!-- Here's a simple example: -->
下面是一个简单的例子：

    function thisMightFail() {
        //...
        if(badThingsHappened) {
            throw new Error(...);
        }

        return theGoodResult;
    }

    function recoverFromFailure(e) {
        //...
        return recoveryValue;
    }

    function getTheResult() {

        var result;

        try {
            result = thisMightFail();
        } catch(e) {
            result = recoverFromFailure(e);
        }

        return result;
    }

<!-- In this case, `getTheResult` handles the case where `thisMightFail` does indeed fail and throws an `Error` by catching the `Error` and calling `recoverFromFailure` (which could return some default result, for example). This works because `thisMightFail` is synchronous. -->
在这个例子中，当 `thisMightFail` 失败并抛出一个 `Error` 时，`getTheResult` 捕获抛出的 `Error`，并调用 `recoverFromFailure`（例如，可以返回某个默认结果）。这个例子之所以能够工作，是因为 `thisMightFail` 是同步的。

<!-- ## Going Async -->
## 面向异步

<!-- What if `thisMightFail` is *asynchronous*? For example, it may perform an asynchronous XHR to fetch the result data: -->
如果 `thisMightFail` 是*异步*的会如何呢？例如，它可能执行一个异步的 XHR 来获取数据：

    function thisMightFail(callback, errback) {
        xhrGet('/result', callback, errback);
    }

<!--Now it's impossible to use try/catch, and we have to supply a callback and errback to handle the success and failure cases. That's pretty common in Javascript applications, so no big deal, right? But wait, now `getTheResult` also has to change:-->
现在使用 try/catch 是不可能的了，我们必须提供一个 callback 和 errback 来处理成功和失败的情况。这在 JavaScript 应用程序中相当常见，所以没什么大不了的，真是这样吗？先别急，现在 `getTheResult` 也需要改变：


    function getTheResult(callback) {

        // Simulating the catch-and-recover behavior of try/catch
        thisMightFail(callback, function(e) {

            var result = recoverFromFalure(e);
            callback(result);

        });

    }

<!--At the very least, `callback` (and possibly `errback`, read on) must now be added to every function signature all the way back up to the caller who is ultimately interested in the result.-->
现在，对最终执行结果感兴趣的调用方，必须至少为每个函数签名增加 `callback`（也可能是 `errback`，请继续往下读）。

<!-- ## More Async -->
## 更多异步

<!--If `recoverFromFailure` is also asynchronous, we have to add yet another level of callback nesting:-->
如果 `recoverFromFailure` 也是异步的，我们不得不再添加一层嵌套的回调函数：

    function getTheResult(callback) {

        // Simulating the catch-and-recover behavior of try/catch
        thisMightFail(callback, function(e) {

            recoverFromFailure(callback, function(e) {
                // What do we do here?!?!
            });

        });
    }

<!--This also raises the question of what to do if `recoverFromFailure` itself fails. When using synchronous try/catch, `recoverFromFailure` could simply throw an `Error` and it would propagate up to the code that called `getTheResult`. To handle an asynchronous failure, we have to introduce another `errback`, resulting in both `callback` and `errback` infiltrating every function signature from `recoverFromFailure` all the way up to a caller who must ultimately supply them.-->
这就提出了另一个问题：如果 `recoverFromFailure` 失败了该如何处理呢？当使用同步的 try/catch 时，`recoverFromFailure` 可以简单的抛出一个 `Error`，`Error` 将传播到调用 `getTheResult` 的代码。为了处理异步失败，我们不得不引入另一个 `errback`，这就导致在从 `recoverFromFailure` 到调用方的路径上，`callback` 和 `errback` 侵入了每个函数的签名，而且调用方必须提供它们。

<!--It may also mean that we have to check to see if callback and errback were actually provided, and if they might throw exceptions:-->
这也可能意味着我们不得不检查是否真地提供了 callback 和 errback，以及它们是否会抛出异常：

    function thisMightFail(callback, errback) {
        xhrGet('/result', callback, errback);
    }

    function recoverFromFailure(callback, errback) {
        recoverAsync(
            function(result) {
                if(callback) {
                    try {
                        callback(result);
                    } catch(e) {
                        // Ok, callback threw an exception, let's switch to errback
                        // At least this will let the caller know that something went wrong.
                        // But now, both the callback and errback will have been called, and
                        // and the developer may not have accounted for that!
                        errback(e);
                    }
                }
            },
            function(error) {
                if(errback) {
                    try {
                        errback(error);
                    } catch(ohnoes) {
                        // What do we do now?!?
                        // We could re-throw or not catch at all, but no one can catch
                        // the exception because this is all asynchronous.
                        // And now console.error has infiltrated deep into our code, too!
                        console.error(ohnoes);
                    }
                }
            }
        );
    }
    
    function getTheResult(callback, errback) {

        // Simulating the catch-and-recover behavior of try/catch
        thisMightFail(callback, function(e) {

            recoverFromFailure(callback, errback);

        });

    }

<!--The code has gone from a simple try/catch to deeply nested callbacks, with `callback` and `errback` in every function signature, plus additional logic to check whether it's safe to call them, and, ironically, *two try/catch blocks* to ensure that `recoverFromFailure` can indeed recover from a failure.-->
这段代码已经从一个简答的 try/catch 变为深度嵌套的回调函数，每个函数的签名需要增加 `callback` 和 `errback`，需要增加额外的逻辑来检查是否可以安全地调用它们，而且讽刺的是，需要用*两个 try/catch 块*来确保 `recoverFromFailure` 真的可以从失败中恢复。

<!--## And what about finally?-->
## 如何处理 finally？

<!--Imagine if we were also to introduce `finally` into the mix--things would need to become even more complex. There are essentially two options, neither of which is as simple and elegant as the language-provided `finally` clause. We could: 1) add an `alwaysback` callback to all function signatures, with the accompanying checks to ensure it is safely callable, or 2) always write our callback/errback to handle errors internally, and be sure to invoke `alwaysback` in all cases.-->
试想一下，如果我们再将 `finally` 引入这种混乱的实现方式，事情必然会变得更复杂。基本上有两种选择：1) 为所有方法的签名增加一个 `alwaysback` 回调函数，并做相应的检查以确保可以安全地调用它，或者 2) 在 callback/errback 的内部处理异常，并确保总是会调用 `alwaysback`。然后无论哪种选择都不如语言所提供的 `finally` 简单和优雅。

<!--## Summary-->
## 总结

<!--Using callbacks for asynchronous programming changes the basic programming model, creating the following situation:-->
在异步编程中使用回调函数改变了传统的编程模型，并且引发了下面的问题：

<!--1. We can no longer use a simple call-and-return programming model
1. We can no longer handle errors using try/catch/finally
1. We must add callback and errback parameters to every function signature that might eventually lead to an asynchronous operation-->

1. 我们再也不能使用简单的调用-返回编程模型。
1. 我们再也不能使用 try/catch/finally 来处理异常。
1. 我们必须为可能执行异步操作的每个函数的签名增加 callback 和 errback 参数。

<!--We can do better. There is another model for asynchronous programming in Javascript that more closely resembles standard call-and-return, follows a model more like try/catch/finally, and doesn't force us to add two callback parameters to a large number of functions.-->
事实上我们可以做得更好。在 JavaScript 中，还有另一种异步编程模型，更接近于标准的调用-返回模型，非常类似于 try/catch/finally，并且不会强迫我们为大量的函数增加两个回调函数参数。

<!--Next, we'll look at [Promises](http://know.cujojs.com/tutorials/async/simplifying-async-with-promises.html.md), and how they help to bring asynchronous programming back to a model that is simpler and more familiar.-->
下一步，我们将看看 [Promises](http://know.cujojs.com/tutorials/async/simplifying-async-with-promises.html.md)，以及它们如何帮助异步编程回归到更简单、更友好的模型。

<hr>
> 原文：[Async Programming is Messy](http://know.cujojs.com/tutorials/async/async-programming-is-messy)

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