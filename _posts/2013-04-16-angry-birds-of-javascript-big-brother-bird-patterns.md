---
layout: post
title: "模式"
tagline: "Patterns"
description: "成熟的设计模式和有限状态机。"
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript", "jQuery"]
published: true

short: "模式"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Big Brother Bird - Patterns](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-big-brother.html)

<!-- ## Introduction -->
## 简介
![](http://3.bp.blogspot.com/-mwxJ0DGmvGI/UWCKOt-Lx6I/AAAAAAAAZ14/od_wDw_B5mk/s1600/angry-birds-big-red-bird.jpg)
<!-- ![](http://3.bp.blogspot.com/-mwxJ0DGmvGI/UWCKOt-Lx6I/AAAAAAAAZ14/od_wDw_B5mk/s320/angry-birds-big-red-bird.jpg) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些咸猪敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

<!-- > Check out the **[series introduction post]** for a list of all the birds and their attack powers. -->

[series introduction post]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html

> 阅读**[系列介绍文章]**，查看所有小鸟以及它们的攻击力。

[系列介绍文章]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html

![](http://4.bp.blogspot.com/-wqME_pIXlMg/UWCKU5PVcVI/AAAAAAAAZ2A/yoODl8TYwKU/s1600/big-brother-bird.png)
![](http://4.bp.blogspot.com/-wqME_pIXlMg/UWCKU5PVcVI/AAAAAAAAZ2A/yoODl8TYwKU/s1600/big-brother-bird.png)
          
<!-- ### Previous Attacks -->
### 战报
* [Red Bird - IIFE](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html)
* [Blue Bird - Events](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html)
* [Yellow Bird - RequireJS](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)
* [Black Bird - Backbone](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-black-bird.html)
* [White Bird - Linting](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-white-bird.html)
* [Green Bird - Mocking](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-green-bird.html)
* [Orange Bird - Templating](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-orange-bird.html)

<!-- ### Big Brother Bird Attacks -->
### 大鸟哥的攻击

<!-- In this post we will take a look at the Big Brother Bird who pulls out the big guns with his finite state machine and other proven design patterns of destruction. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这篇文章中，我们将看到大鸟哥祭出它的大规模杀伤性武器：有限状态机以及成熟的设计模式。渐渐的，小鸟们将一个接一个的夺回属于它们的东西！

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- The birds knew how to program for the most part, but they never had a common terminology that they all understood to represent common scenarios they kept encountering. Then one day a Big Brother Bird came along and documented a set of common Design Patterns and them names and descriptions so they could all be on the same page when talking about architecture. Big Brother Bird ended up writing these patterns in a popular piece that became known as the **Gang of Foul** book. -->
小鸟们了解如何编程的大部分知识，但是从未形成通用的术语，一些代表了常见场景、同时能被大家理解的术语。然后某一天大鸟哥出现了，并记录了一组常见的设计模式的名称和描述，这样它们在谈论架构时就可以达成共识（就有了共同的语言）。最终大鸟哥的模式广受欢迎，并以**四人帮**一书闻名于鸟界。

> 译注：这段文字欢乐的很。

<!-- However, during a recent invasion the pigs stole the birds' Gang of Fowl book! As a result, one of the Big Brother Birds has been tasked to reclaim what has been stolen. He will use his overwhelming power of trickery to help destroy the pigs in order to take back what is theirs. -->
然而在最近的一次猪群入侵中，小鸟们的**四人帮**书惨重失窃！现在，大鸟哥被派去找回被盗的书。它将用压到一切诡计的力量摧毁猪群，夺回属于它们的东西。

<!-- ## Gang of Fowl Patterns -->
## 鸟界的四人帮（23 种）

<!-- ### Creational Patterns -->
### 创建模式（5 种）

创建模式涉及到将对象实例化，这类模式都提供一个方法，将客户从所需实例化的对象中解耦。

* **Abstract Factory** <br> 抽象工厂。提供一个接口，用于创建相关或依赖对象的家族，而不需要明确指定具体类。
* **Builder** <br> 构造器。封装一个产品的构造过程，并允许按步骤构造。
* **Factory Method** <br> 工厂方法。定义了一个创建对象的方法，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。
* **Prototype** <br> 原型。当创建给定类的实例的过程很昂贵或很复杂时，就使用原型模式。
* **Singleton** <br> 单例。确保一个类只有一个实例，并提供一个全局访问点。

<!-- ### Structural Patterns -->
### 结构模式（7 种）

结构模式可以让你把类或对象组合到更大的结构中

* **Adapter** <br> 适配器。将一个类的接口，转换成客户期望的另一个接口。适配器让原来接口不兼容的类可以合作无间。
* **Bridge** <br> 桥接。不只改变你的实现，也改变你的抽象。
* **Composite** <br> 组合。允许你将对象组合成树形结构来表现“整体/部分”层次结构。组合能让客户以一致的方式处理个别对象以及对象组合。
* **Decorator** <br> 装饰者。动态地将责任附加到对象上。若要扩展功能，装饰者提供了比继承更有弹性的替代方案。
* **Facade** <br> 外观。提供了一个统一的接口，用来访问子系统中的一群接口。外观定义了一个高层接口，让子系统更容易使用。
* **Flyweight** <br> 蝇量。让某个类的一个实例能用来提供许多“虚拟实例”。
* **Proxy** <br> 代理。为另一个对象提供一个替身或占位符以控制对这个对象的访问。

<!-- ### Behavioral Patterns -->
### 行为模式（11 种）

* **Chain of Resp.** <br> 责任链。让一个以上的对象有机会处理某个请求。
* **Command** <br> 命令。将“请求”封装成对象，以便使用不同的请求，队列或者日志来参数化其他对象。命令模式也支持可撤销的操作。
* **Interpreter** <br> 解释器。为语言创建解释器。
* **Iterator** <br> 迭代器。提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。
* **Mediator** <br> 中介者。集中相关对象之间复杂的沟通和控制方式。
* **Memento** <br> 备忘录。让对象返回之前的状态。
* **Observer** <br> 观察者。定义了对象之间的一对多依赖，这样一来，当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新。
* **State** <br> 状态。允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。
* **Strategy** <br> 策略。定义了算法族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户。
* **Template Method** <br> 模板方法。在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以在不改变算法结构的情况下，重新定义算法的某些步骤。
* **Visitor** <br> 访问者。当你想要为一个对象的组合增加新的能力，且封装并不重要时，就使用访问者模式。

<!-- ## Some These Patterns in JavaScript -->
## JavaScript 中的设计模式

<!-- ### Singleton -->
### 单例模式

<!-- The most basic form of singleton is the object literal as shown below. We are basically just creating an object and there is one of them. Technically someone could `Object.create` on us, but for the most part this fulfills the singleton definition. You can find a more robust solution in one of the resources recommended near the end of this post. -->
单例模式最简单的实现是采用对象字面量，如下面的代码所示。基本上，我们只是创建了一个对象，含有一些属性。从技术角度讲，有人可能会建议使用 `Object.create`，但是大部分情况下，对象字面量符合单例模式的定义。你可以在本文末尾的推荐资源中找到更强大的解决方案。

> 译注：Object.create(proto \[, propertiesObject \]) 创建一个拥有指定原型和若干个指定属性的对象。

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=singleton.js">
  </script>

<!-- ### Factory -->
### 工厂模式
<!-- A factory is a way to create new objects without actually using the `new` keyword. The idea is that there is something abstracted away from you in the factory method. In the following example we are aren't necessarily doing anything fancy, but you could imagine that we could add some custom code down the road and the external API wouldn't change, which is the point of this pattern. -->
工厂模式实际是一种不使用 `new` 关键字来创建新对象的方式。理念是在工厂方法中提取抽象。在下面的例子中，我们不一定要做很多事情，但是你可以想象的到，我们可以沿着这个方向添加一些自定义代码和不会改变的额外 API，这才是工厂模式的关键点所在。

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=factory.js">
  </script>

<!-- ### Bridge -->
### 桥接模式
In the following snippet of code we are creating a small bridge between an event handler and the code that will be executed. By creating a little bridge it will enabled the executed code to be tested easier since it won't have a dependency on the element context that was passed by jQuery.
在下面的代码片段中，我们在事件处理函数和将要执行的代码（`getUrl( url, callback )`）之间建立了一个简单的桥接。从而使得被执行的代码（`getUrl( url, callback )`）更易于测试，因为它不再依赖于 jQuery 传入的上下文元素。

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=bridge.js">
  </script>

<!-- ### Facade -->
### 外观模式
A facade is common place in front-end web development since there is so much cross-browser inconsistencies. A facade brings a common API to something that could vary under the covers. In the following snippet we abstract the addEventListener logic for various browser implementations.
外观模式在 Web 前端开发中很普遍，因为有如此多的跨浏览器不一致问题。外观模式为这种不一致提供了一个统一的 API。在下面的代码中，我们将 addEventListener 在不同浏览器中的实现进行逻辑抽象。

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=facade.js">
  </script>

<!-- ### Adapter -->
### 适配器模式
<!-- An adapter is a nice way to massage one piece of code to work with another piece of code. This can be useful when you need to switch to another library, but can't afford to rewrite much of your code. In the following example we are modifying jQuery's `$.when` method to work with the `WinJS.Promise`. This is some code I wrote back when I worked for appendTo when we were making jQuery working with Windows 8 apps. You can find this repository at [jquery-win8]. -->
一个适配器可以轻量的处理一段代码，让其与另一段代码无间合作。当你需要切换到另一个库又无法忍受重写大量代码时，适配器会非常有用。在下面的示例中，我们将修改 jQuery 的 `$.when` 方法以支持 `WinJS.Promise`。这是我在 appendTo 工作期间写下的代码，当时我们想让 Windows 8 APP 可以使用 jQuery。你可以在 [jquery-win8](https://github.com/appendto/jquery-win8) 找到这个库。

[jquery-win8]: https://github.com/appendto/jquery-win8

<!-- > Much of the jquery-win8 repository is not needed anymore since Jonathan Sampson has worked with the jQuery team to make sure the changes he made to the shim was added to the 2.0 version of jQuery as noted in the [following blog post] -->
> jquery-win8 库的大部分功能已经不再需要了，因为 Jonathan Sampson 已经与 jQuery 开发团队一起协作，以确保他对这一垫片的更新被添加到 jQuery 2.0 版本中，[这篇文章]记录了这一点。

[following blog post]: http://appendto.com/blog/2013/03/windows-store-applications-with-jquery-2-0/
[这篇文章]: http://appendto.com/blog/2013/03/windows-store-applications-with-jquery-2-0/

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=adapter.js">
  </script>

<!-- ### Observer -->
### 观察者模式
<!-- We've covered the Observer pattern already in the [Blue Bird] past a while back in this series, but it is a powerful pattern that can help decouple various components. My recommendation is to use the [postal.js library]. -->
我们已经在这个系列的 [Blue Bird] 一文中阐述了观察者模式，这是一个功能强大的模式，可以实现各种组件的解耦。个人推荐使用 [postal.js 库]。

[Blue Bird]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html
[postal.js library]: https://github.com/postaljs/postal.js
[postal.js 库]: https://github.com/postaljs/postal.js

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=observer.js">
  </script>

<!-- ## Many More Patterns -->
## 更多模式
<!-- ### Inheritance -->
### 继承
<!-- There are several ways to implement inheritance in JavaScript. It is good to know some of these patterns as you create new objects in your application. -->
在 JavaScript 中有多种方式实现继承。当你在应用程序中创建对象时，最好了解一下这些模式。

<!-- **Prototypal Inheritance** -->
**原型继承**

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=prototypal-inheritance.js">
  </script>

<!-- **Pseudoclassical Ineritance** -->
**模拟继承**

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=pseudoclassical-inheritance.js">
  </script>

<!-- ### Chaining -->
### 链式语法
<!-- In the front-end world chaining became popular by the jQuery library. It is actually a really easy pattern to implement. You essentially just have to return `this` from every function so that other functions can be immediately called. See the following for an example. -->
因为 jQuery 库的缘故，链式语法在前端界变得非常流行。实际上这是一种非常容易实现的模式。基本上，你只需要让每个函数返回 'this'，这样其他函数就可以立即被调用。看看下面的例子。

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=chaining.js">
  </script>

<!-- ### Encapsulating -->
### 封装模式
<!-- We've already covered encapsulating in the [Red Bird](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html) past where we talked about the IIFE pattern. This allows you to have public and private properties and methods to help encapsulate your code. The follow is a very brief example of that. Check out the [Red Bird](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html) post for more details. -->
我们在 [Red Bird] 一文中已经阐述了封装模式，不过当时说的 IIFE 模式。封装模式允许你拥有公共和私有的属性和方法，以此来封装你的代码。下面是一个非常简单的示例。更多细节请参阅文章 [Red Bird]。

[Red Bird]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=encapsulating.js">
  </script>

<!-- ### Finite State Machine -->
### 有限状态机
<!-- One of my favorite pattern is the Finite State Machine. My friend Jim Cowart ([@ifandelse](http://twitter.com/ifandelse)) created the [Machina.js Library](https://github.com/ifandelse/machina.js) to implement this pattern in JavaScript. The following is an example of using states to describe the game of Angry Birds. For more information check out his [blog post](http://freshbrewedcode.com/jimcowart/2012/03/12/machina-js-finite-state-machines-in-javascript/) and [GitHub repository](https://github.com/ifandelse/machina.js). -->
有限状态机是我最喜欢的模式之一。我的朋友 Jim Cowart（[@ifandelse]）创建了 [Machina.js 库]，用来在 JavaScript 中实现这一模式。下面的示例使用状态来描述愤怒的小鸟游戏。更多信息请参阅它的[博客文章]和 [GitHub 库]。

[@ifandelse]: http://twitter.com/ifandelse
[Machina.js Library]: https://github.com/ifandelse/machina.js
[Machina.js 库]: https://github.com/ifandelse/machina.js
[blog post]: http://freshbrewedcode.com/jimcowart/2012/03/12/machina-js-finite-state-machines-in-javascript/
[博客文章]: http://freshbrewedcode.com/jimcowart/2012/03/12/machin
[GitHub repository]: https://github.com/ifandelse/machina.js
[GitHub 库]: https://github.com/ifandelse/machina.js

  <script src="https://gist.github.com/elijahmanor/5328936.js?file=finite-state-machine.js">
  </script>

<!-- ## Recommendations -->
## 建议
<!-- In addition to learning these patterns I would recommend that you pick one of your favorite libraries and start to source dive into their repository. There is a wealth of information you can learn there. At first it could be semi-overwhelming, but over time you can glean a lot from developers who really know some of these patterns. You might try just looking at one particular method and start picking it apart. If you aren't sure exactly where to look for a particular method why don't you pick jQuery and use James Padolsey's ([@padosley](http://twitter.com/padosley)) [jQuery Source Viewer](http://james.padolsey.com/jquery) to help find it for you? -->
除了学习这些模式之外，我建议你挑一个喜欢的库，并钻研它们的源代码。在其中你可以学到丰富的知识。起初你可能觉得云山雾罩，但过一段时间你可以从真正理解这些模式的开发者身上收集到大量的模式。你也可以试着只着眼于一个特别的方法并剖析它。如果你不知道到底要去哪里寻找这么一个特别的方法，那么为什么不选择 jQuery 并使用 James Padolsey（[@padosley]）的 [jQuery 源码查看器]来帮助你寻找呢？

[@padosley]: http://twitter.com/padosley
[jQuery Source Viewer]: http://james.padolsey.com/jquery
[jQuery 源码查看器]: http://james.padolsey.com/jquery

<!-- ## Additional Resources -->
## 其他资源
There are far too many patterns for me to list here. Many have blogged about these before me and will continue to. If I have missed any good ones please let me know.
已经有太多的模式以至我无法在这里一一列出。在我之前，已经有许多人撰写了关于这些模式的博客，并且以后还会有。如果我错过了什么好模式，请告诉我。

* [JavaScript Design Patterns](http://www.joezimjs.com/javascript/javascript-design-patterns-singleton/) by Joe Zim ([@JoeZimJS](http://twitter.com/JoeZimJS))
* [JavaScript Design Patterns](http://www.joezimjs.com/javascript/javascript-design-patterns-singleton/) by Joe Zim ([@JoeZimJS](http://twitter.com/JoeZimJS))
* [Understanding Design Patterns in JavaScript](http://net.tutsplus.com/tutorials/javascript-ajax/digging-into-design-patterns-in-javascript/) by Tilo Mitra ([@tilomitra](http://twitter.com/tilomitra))
* [Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) by Addy Osmani ([@addyosmani](http://twitter.com/addyosmani))
* [JS Patterns](http://shichuan.github.io/javascript-patterns/) by Shi Chuan ([@shichuan](http://twitter.com/shichuan))
* [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do) by Stoyan Stefanov ([@xyz](http://twitter.com/xyz))
* [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do) by Douglas Crockford

<!-- ## Attack! -->
## 攻击！
下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Big Brother Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射大鸟哥，你也可以使用方向键。

[![](http://1.bp.blogspot.com/-HjiGrN3B7jg/UWDO-fHTJgI/AAAAAAAAZ2Q/-sshCm882k4/s1600/big-brother-bird-game.png)](http://jsfiddle.net/k6VCt/show)

<!-- ## Conclusion -->
## 结论
<!-- The good news is you don't have to know all the answers to be successful in front-end web development, but what does help is knowing some of the common patterns that come up again and again during development. Once you get accustomed to these patterns it will become easier talking about these architectural solutions and figure out solutions should come quicker. Take some time and look through the recommended resources above and start mulling over some of them for yourself.  -->
好消息是，你不必知道所有的答案也顺利完成 Web 前端开发，但多少了解一些开发中反复遇到的通用模式确实很有帮助。一旦你习惯了这些模式，谈论架构方案将变得更容易，也可以更快的找出解决方案。花一些时间浏览前面推荐的资源，然后仔细考虑那些适合你的模式。

<!-- There is one more front-end architecture technique that has been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有更多的前端架构技术被猪偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!



