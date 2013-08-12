---
layout: post
title: "ECMAScript 6 and Proxy "
tagline: "代理"
description: "拦截对象的操作"
category-substitution: 翻译
tags: [ECMAScript 6, JavaScript, Web]

short: "代理"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and Proxy](http://ariya.ofilabs.com/2013/07/es6-and-proxy.html)

<!-- Being able to intercept a certain operation to an object can be really useful, in particular during a troubleshooting session. With ECMAScript 6, this is possible via its new feature, **proxy**. Creating a proxy on a particular object allows a predefined handler to get notified when something happens. -->
能够拦截对象的某项特定操作可能非常有用，特别是排除故障时。通过 ECMAScript 6 的新功能**代理**，拦截变得可行起来。通过在特定对象上创建一个代理，可以使得预定义的处理程序在某些操作发生时收到通知。

<!-- In the latest [draft specification](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) (Rev 15, May 14, 2013), section 15.18 on Proxy Objects is still empty. It is safe to assume that more information will be available later, when the specification starts to stabilize. Meanwhile, there is some useful information on the [Direct Proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies) wiki page. At the time of this writing, proxy support is already available on the latest stable version of Firefox and Chrome (experimental flag needs to be enabled). -->
在最新的[规范草案](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)（15版，2013年5月14日）中，第 15.18 节关于代理对象的内容仍然是空的。不过可以肯定的是，当规范趋于稳定时，将会有更多有用的信息。[直接代理](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies)的维基页面提供了一些有用的信息。而且在本文写作之际，最新稳定版本的 Firefox 和 Chrome 已经提供了对代理的支持（需要启用实验性 JavaScript）。
> 译注：在 Chrome 中输入 `chrome://flags/#enable-javascript-harmony`，启用`实验性 JavaScript`。

<!-- The best way to illustrate a proxy is by a simple example (**note:** the code fragment is updated to use the new syntax, `Proxy(target, handler)`, and not the deprecated `Proxy.create`): -->
阐明代理的最佳方式是通过一个简单的例子（**注意：**更新后的代码片段使用了新语法 `Proxy(target, handler)`，而不是弃用的 `Proxy.create`）:

    var engineer = { name: 'Joe Sixpack', salary: 50 };
     
    var interceptor = {
      set: function (receiver, property, value) {
        console.log(property, 'is changed to', value);
        receiver[property] = value;
      }
    };
 
    engineer = Proxy(engineer, interceptor);

<!-- In the above code, we create a simple object `engineer`. This object will be replaced by another one as the result of installing a proxy via `Proxy()`. The second parameter for this function is denoting a handler, `interceptor` in our case. A handler can have many different functions, for this simple example we have only one, `set`. -->
在上面的代码中，我们创建了一个简单的对象 `engineer`。该对象将被替换为通过 `Proxy()` 创建的代理对象。函数的第二个参数表示一个拦截器，在这里是 `interceptor`。一个拦截器可以含有多个不同的函数，不过在这个简单的例子中只有一个 `set`。

<!-- Let’s see what happens if we executed the following code: -->
让我们来看看执行下面的代码会发生什么：

    engineer.salary = 60;

<!-- The handler will be called and its `set` function will be invoked. Thus, we will get: -->
拦截器将被触发，它的方法 `set` 将被调用。因此，我们将得到：

    salary is changed to 60

<!-- Every time a property of `engineer` is set, our interceptor will know about it. Obviously, there are various other operations which can be detected a proxy handler, such as property getter, `keys()`, iterator, and many others. Refer to the [Direct Proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies) wiki page for more details. **Note:** you might be also interested in [tvcutsem/harmony-reflect](https://github.com/tvcutsem/harmony-reflect) which contains the polyfills so that you can use the new Proxy API on top of the deprecated one. -->
每当 `engineer` 的某个属性被设置时，拦截器都会知道。而且显然拦截器还可以检测各种其他的操作，例如读取属性、`keys()`、迭代器等等。更多详情请参考[直接代理](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies)的维基页面。**注意：你也可能对 **[tvcutsem/harmony-reflect](https://github.com/tvcutsem/harmony-reflect) 提供的垫片感兴趣，它可以帮助你使用新的 Proxy API 来代替那些不推荐使用的 API。

<!-- Beside for debugging purposes, proxy can be helpful for libraries which implement *data binding*. Because a handler can be hooked to the data model, there is no need to use an alternative syntax (e.g. explicit `set` to change a value) or to continuously track the change (e.g. dirty state) to modify the model. -->
除了用于调试外，代理可以帮助库实现*数据绑定*。因为拦截器可以挂在数据模型上，没有必要再使用替代语法（例如明确调用 `set` 来更改属性值）或持续跟踪变化（例如脏数据检查）来修改数据模型。

<!-- How would you plan to use proxy? -->
你打算如何使用代理呢？



