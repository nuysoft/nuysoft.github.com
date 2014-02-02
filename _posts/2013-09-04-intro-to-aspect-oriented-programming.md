---
layout: post
title: "面向切面编程简介"
tagline: Intro to Aspect Oriented Programming
description: "面向切面编程（AOP）是一种增强对象和方法的行为的技术，可以无侵入地增加功能。AOP 允许你从“外部”增加新行为，以及合并和修改既有的行为。"
category-substitution: 翻译
tags: [翻译, AOP, JavaScript]
---
{% include JB/setup %}

<!-- Aspect Oriented Programming (AOP) is a technique for augmenting the behavior of objects, methods, and functions non-invasively. AOP allows you to add new behaviors and to combine and modify existing behaviors "from the outside". -->
面向切面编程（AOP）是一种增强对象和方法的行为的技术，可以无侵入地增加功能。AOP 允许你从“外部”增加新行为，以及合并和修改既有的行为。

<!-- While there are many techniques for adding and combining behavior, such as inheritance, composition, and delegation, AOP can prove to be more flexible and less invasive in many situations, and it is a worthwhile addition to your toolbox of techniques. -->
虽然有多项技术可以用于增加或合并行为，例如继承、组合和代码，但是 AOP 在许多情况下被证明更具灵活性和低侵入性，可以是你技术工具箱的一项有益补充。

<!-- To see how it works, let's look at a simple example. -->
让我们用一个简单的例子来看看它是如何工作的。

<!-- Imagine our codebase contains the following simple object. -->
假设我们的代码中含有下面的简单对象。

    function Thing() {}

    Thing.prototype.doSomething = function(x, y) {
        var result;

        // compute some result using x and y

        return result;
    };

<!-- Imagine that we use many instances of the object throughout our application via code that looks something like the following. -->
假设我们像下面这样，在应用程序中通过编码使用了上面对象的许多实例。

    var thing = new Thing();

    // some time later, and possibly even in
    // another part of the application
    var result = thing.doSomething(x, y);

<!-- ## Adding behavior -->
## 增加行为

<!-- Now imagine that we suspect that `Thing.prototype.doSomething` is the source of performance problems, and we'd like to log profiling information about its inputs, `x` and `y`, the time it takes to compute `result`, and the value of the `result`. -->
现在，假设我们怀疑 `Thing.prototype.doSomething` 是性能问题的根源，我们想要记录它的输入 `x` 和 `y`，计算 `result` 所花费的时间，以及 `result` 的值。

<!-- ### Modifying all the call sites -->
### 修改所有的调用点

<!-- One approach would be to log data in every spot that `Thing.prototype.doSomething` is called: -->
有一种方式可以在调用 `Thing.prototype.doSomething` 的每个场景记录数据：

    var start = Date.now();

    var result = thing.doSomething(x, y);

    console.log((Date.now() - start) + 'ms', x, y, result);

<!-- Obviously, if `Thing.prototype.doSomething` is used many times in the application, this could be *a lot of cut and paste*.  You might miss some places, or worse yet, you might forget to remove some after collecting the data. -->
显然，如果在应用程序中多次调用了 `Thing.prototype.doSomething`，那么上面的做法将会导致*大量的剪切和粘贴*。你可以会错过一些地方，或者更糟的是，在收集完数据之后你可能忘了移除某些代码。

<!-- ### Modifying the source -->
### 修改源代码

<!-- Another approach would be to modify the source of `Thing`: -->
另一种方式是修改 `Thing` 的源代码：

    Thing.prototype.doSomething = function(x, y) {
        var result;

        var start = Date.now();

        // compute some result using x and y

        console.log((Date.now() - start) + 'ms', x, y, result);

        return result;
    };

<!-- While this centralizes the change, it is also still fairly invasive: it requires changing the source code of `Thing`.  Imagine if `Thing.prototype.doSomething` were a more complex method, with multiple `return` points and a few `try/catch/finally` blocks.  It could be non-trivial to modify the code in a way that allows you to collect the data you want *without changing the method's behavior*. -->
虽然这种方式集中了变化，但具有相当的侵入性：需要改变 `Thing` 的源代码。假设 `Thing.prototype.doSomething` 是一个更复杂些的方法，含有多个 `return` 点，以及一些 `try/catch/finally` 块。此时，为了收集需要的数据而且**不改变方法的行为**，修改源代码并不容易。

<!-- If you ever wanted to profile other methods in a similar way, you would need to change their source code as well. -->
如果你还想以类似的方式来分析其他的方法，你仍然需要改变它们的源代码。

<a name="Using-inheritance"></a>
<!-- ### Using inheritance -->
### 使用继承

<!-- Yet another approach would be to use inheritance to avoid modifying `Thing`'s source: -->
还有一种方式可以避免修改 `Thing` 的源代码，即使用继承来：

    function ProfiledThing() {
        Thing.apply(this, arguments);
    }

    ProfiledThing.prototype = Object.create(Thing.prototype);

    ProfiledThing.prototype.doSomething = function() {
        var start = Date.now();

        var result = Thing.prototype.doSomething.apply(this, arguments);

        console.log((Date.now() - start) + 'ms', x, y, result);

        return result;
    }

<!-- This approach avoids modifying `Thing`'s source, but has a *significant* problem: it requires changing every spot in the code that constructs a `new Thing()`, to construct a `new ProfiledThing()` instead. -->
这种方式避免了修改 `Thing` 的源代码，但是有一个**重要**问题：需要改变代码中调用构造函数 `new Thing()` 的每个点，使它们转而调用构造函数 `new ProfiledThing()`。

<!-- There are ways to mitigate this problem, but by now it should be becoming clear that there simply has to be a better way to introduce this profiling behavior. -->
虽然有其他办法可以缓解这个问题，但是到目前为止，我们应该清晰的意识到，需要一种更好的方式来引入这种分析行为。

<!-- ## Unrelated Concerns -->
## 分离关注点

<!-- An interesting characteristic of this profiling behavior is that it is unrelated to `Thing`'s primary purpose.  It is a side effect. -->
这种分析行为有一个有趣的特性，它与 `Thing` 的主要或首要功能无关。它是一个（额外的）附属功能。

<!-- `Thing` has most likely been created to solve a particular problem in a particular domain.  The solutions above attempt to introduce this unrelated behavior into `Thing`'s domain, and it's highly likely that `Thing`'s problem domain has nothing to do with profiling. -->
创建 `Thing` 很可能是为了在特定的领域下解决特定的问题。而上面的方案则试图为 `Thing` 的领域引入与之无关的行为，而 `Thing` 的领域对于分析行为一无所知。

<!-- `Thing` need not know anything about profiling to do its job, but the solutions above force profiling concerns directly into `Thing`'s domain. -->
`Thing` 不需要知道任何有关分析行为的事情来完成其工作，但是上面的的方法却强制使 `Thing` 的领域关注分析行为。

<!-- What we need is a technique that allows us to introduce this kind of behavior in a controlled, non-invasive way.  That is, a way that makes strong guarantees about preserving `Thing`'s behavior, and without requiring that we modify `Thing`'s source code or every bit of code that creates or consumes a `Thing`. -->
我们需要的技术是，以一种可控的、无侵入的方式引入这类行为。不仅可以有力的保留 `Thing` 的行为，而且不需要修改 `Thing` 的源代码，或者修改任何创建或消费 `Thing` 的代码。

<!-- ## Enter AOP -->
## 引入 AOP

<!-- AOP, as we said above, is a technique for augmenting behavior non-invasively.  In JavaScript, it is quite simple.  You don't necessarily even need tools or a library to apply it, although they certainly help, as does any tool or library that helps you apply a reusable pattern. -->
正如前文所述，AOP 是一项可以无侵入地增加行为的技术。在 JavaScript 中，实现这项技术非常简单。甚至不需要借助任何工具或库就可以实现，尽管工具或库会有所帮助（建立一种可复用的模式）。

<!-- If you've ever done the following, you've done AOP in JavaScript: -->
如果你曾经实现过下面所示的代码，那么你已经在 JavaScript 中实现了 AOP：

    var origDoSomething = thing.doSomething;

    // Method replacement is a simple form of AOP
    thing.doSomething = function() {
        doSomethingElseFirst();

        return origDoSomething.apply(this, arguments);
    }

<!-- This effectively adds behavior to `thing.doSomething`.  Now, when `thing.doSomething` is called, it will `doSomethingElseFirst`, and then perform the original behavior. -->
上面的代码为 `thing.doSomething` 有效地增加了行为。现在，当 `thing.doSomething` 被调用时，`doSomethingElseFirst` 将先被执行，然后再执行原来的行为。

<!-- In AOP parlance, We can say that `doSomethingElseFirst` is a behavior aspect that has been applied to `thing.doSomething`.  Specifically, `doSomethingElseFirst` is called "before advice" ... that is, we have *advised* `thing.doSomething` that it should `doSomethingElseFirst` *before* doing it's original job.  AOP implementations typically provide many advice types, such as before, after, afterReturning, afterThrowing, and around. -->
从 AOP 的角度，我们可以说 `doSomethingElseFirst` 是应用于 `thing.doSomething` 的一个行为切面。明确地讲，`doSomethingElseFirst` 称作“before advice”...也就是说，我们*建议* `thing.doSomething` 应该在执行它本来的任务之前先执行 `doSomethingElseFirst`。AOP 实现通常会提供多种 advice 类型，例如 before、after、afterReturning、afterThrowing 以及 around。

> 译注：advice 表示具体要执行的操作，通过 before、after、afterReturning、afterThrowing  来区别是在之前、之后、返回之后还是异常之后执行 advice，通过 around 代替（之前+之后，或模拟）原来的操作。

<!-- There are several important things to note about this simple example: -->
关于上面的简单例子，有几个重要的事情需要注意：

<!-- * The source code of `Thing` hasn't been modified.
* The consumers of `thing` do not need to change.
* The behavior of the original `doSomething`, i.e. *its contract* has been preserved.
* `Thing` has no knowledge of `doSomethingElseFirst`, and no dependency on it.  Thus, `Thing`'s unit tests do not need to be updated.  Of course, we need to write unit tests for `doSomethingElseFirst`, but any new code requires unit tests. -->

* `Thing` 的源代码没有被改变。
* `thing` 的消费者不需要改变。
* `doSomething` 的行为得以保留，例如它的*上下文和参数*。
* `Thing` 对 `doSomethingElseFirst` 一无所知，并且不依赖它。因此 `Thing` 的单元测试也不需要更新。当然，我们需要为 `doSomethingElseFirst` 编写单元测试，但除此之外，再没有新的代码需要测试用例。

<!-- ### AOPing the example -->
### AOP 应用示例

<!-- Let's use a similar approach to AOP to add profiling to all the `Thing`s. -->
让我们以 AOP 的方式来为 `Thing` 增加分析行为。

    var origDoSomething = Thing.prototype.doSomething;

    Thing.prototype.doSomething = function() {
        var start = Date.now();

        var result = origDoSomething.apply(this, arguments);

        console.log((Date.now() - start) + 'ms', x, y, result);

        return result;
    }

<!-- We've again used the method replacement technique, but this time we've replaced a method on `Thing`'s prototype.  All `Thing` instances will have this new, profiling version of `doSomething`.  This type of aspect is called "around" advice because it does something both before and after (thus, "around") the original method. -->
我们再次使用了方法替换技术，但是这次替换的是 `Thing` 原型上的一个方法。所有的 `Thing` 示例将使用这个新的、具备分析行为的 `doSomething`。这类切面称为“around advice”，因为是同时在原始方法的之前和之后执行了某些额外的行为。

<!-- While this looks very similar to the [inheritance](#Using-inheritance) example above, there is one very important difference: We've not introduced a new constructor, and thus consumers of `Thing` do not need to change. -->
尽管这看起来与前面的[继承](#Using-inheritance)示例非常类似，但是有一个非常重要的区别：我们没有引入新的构造函数，因此 `Thing` 的消费者不需要改变。

<!-- ## AOP in practice -->
## AOP 实践

<!-- Non-invasively adding profiling to a single method of a single prototype is a simple way to show how AOP can be applied easily in JavaScript, but the technique can be used to do much more sophisticated and interesting things, such as: -->
通过无侵入地为单个原型的单个方法添加分析行为，简单地演示了 AOP 在 JavaScript 中是如何实现的，不知如此，该技术还可以用于执行更复杂和更有趣的事情，例如：

<!-- * Collect profiling data about an entire application
* Trace program execution to visualize the call tree
* Automatically retry failed asynchronous I/O, such as XHR or database queries
* Connect collaborating components in an application in a loosely coupled way without using events or pubsub. -->
* 收集整个引用的分析数据
* 跟踪程序执行过程来可视化调用树（栈）
* 自动重新执行失败的异步 I/O，例如 XHR 或数据库请求
* 在应用程序中以松耦合的方式连接合作组件（协同工作），而不是使用事件或 Pub/Sub。

<!-- In upcoming tutorials, we'll look at more examples of how to apply AOP, and the kinds of problems it is good at solving. -->
在后面的教程中，我们将看到更多的关于如何实现 AOP 的例子，以及它的适用场景。

> 译注：
>
1. AOP 的适用场景包括但不限于日志记录、性能统计、安全控制、事务处理、异常处理等等。
2. [JBoss AOP 1.3 Javadoc](http://docs.jboss.org/aop/1.3/aspect-library/api/)

<!-- 权限认证、权限管理、缓存、错误处理（包括捕捉）、资源池（管理）、资源（延时）加载、调试、日志记录、跟踪、分析、监控、性能优化、数据持久化、同步（锁）、事务、数据校验（例如表单输入）等等。 -->

<hr>
> 原文：[Intro to Aspect Oriented Programming](http://know.cujojs.com/tutorials/aop/intro-to-aspect-oriented-programming)

<!-- https://github.com/know-cujojs/know/edit/master/src/documents/tutorials/aop/intro-to-aspect-oriented-programming.html.md -->

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