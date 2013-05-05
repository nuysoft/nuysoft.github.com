---
layout: post
title: "事件 &amp; 消息"
tagline: "Events &amp; Messaging"
description: "在 Web 应用中可以使用事件和消息实现组件通信。事件允许一个组件同自身通信，消息则允许一个组件以非硬编码的方式监听其他组件。"
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript", "Web", "jQuery", "postal.js"]

short: "事件 &amp; 消息"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Blue Bird - Events](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html)

<!-- ## Introduction -->
## 简介
<!-- Blue Bird - Events & Messaging http://jsfiddle.net/LrFVp/14/ http://jsfiddle.net/LrFVp/20/ -->

![](http://2.bp.blogspot.com/-6ILPSz-pyp0/UVEnzs_iVfI/AAAAAAAAYVE/yXkm3RWutRs/s1600/angry-birds-game-for-windows-1.png)
<!-- ![](http://2.bp.blogspot.com/-6ILPSz-pyp0/UVEnzs_iVfI/AAAAAAAAYVE/yXkm3RWutRs/s320/angry-birds-game-for-windows-1.png) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些培根味儿的敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

> 译注：翻译“bacon flavored foe”时，想起来了《少林足球》里的“做人如果没有梦想，那跟咸鱼有什么区别？”，就翻译成了“咸猪敌人”，[@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 建议翻译为“培根味儿的敌人”，应该更准确和有趣些。

<!-- > Check out the [series introduction post](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html) for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)**，查看所有小鸟以及它们的攻击力。

<!-- ### Previous Attacks -->
### 战报
* [Red Bird - IIFE](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html)

<!-- ###  Blue Bird Attack -->
### 绿鸟的攻击
[![](http://3.bp.blogspot.com/-sJcdgjfGHVc/UU_R2M3GqgI/AAAAAAAAYSU/eb2T2_qHjxY/s200/blue-bird.png)](http://3.bp.blogspot.com/-sJcdgjfGHVc/UU_R2M3GqgI/AAAAAAAAYSU/eb2T2_qHjxY/s1600/blue-bird.png)

<!-- In this post we will take a look at the Blue Bird who triggers events and messages that scatter to infiltrate the pig's castle. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这篇文章中，我们将看看蓝色小鸟，它通过触发事件和消息来分散穿透猪群的城堡。渐渐的，小鸟们将一个接一个地夺回属于它们的东西！

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- The birds used to build their web applications with components having hard dependencies on each-other. They eventually started to learn to reduce tight coupling by introducing events and messages. Unfortunately the pigs, during their invasion, stole the birds' observer secrets. -->
<!-- One of the blue birds has been tasked with taking back what has been stolen and restore loose coupling components. -->
小鸟们过去经常用组件构建 Web 应用，而组件之间却是硬编码依赖关系。最终它们引入了事件和消息，开始学习如何降低耦合度。不幸的是，猪群在入侵中偷走了小鸟们的观察者秘密。一只蓝色小鸟被派去夺回被盗的东西，并恢复松耦合组件。

<!-- ## Sample Application -->
## 应用程序示例
<!-- In order to unpack the need for messages we will look at the following web application to search for movies from Netflix. We will uncover how this application was originally coded and then refactor along the way. -->
为了理解消息的必要性，我们先看看下面的 Web 应用，它从 Netflix 搜索电影。我们将展示这个应用的初始代码，然后重构它。

  <iframe allowfullscreen="allowfullscreen" frameborder="0" height="350" src="http://jsfiddle.net/LrFVp/14/embedded/result" width="100%">
  </iframe>

<!-- ## Tightly Coupled Code -->
## 紧耦合代码
<!-- The first version of the above application was coded using the following JavaScript code. Take a look at the code and let it start to sink in for a little bit. It may be painful, but please bar with me for a moment ;) -->
上面应用的第一个版本使用下面的 JavaScript 代码实现。看看这段代码，试着理解它。这可能很痛苦，但还是先忍一下 ;)

  <script src="https://gist.github.com/elijahmanor/5235011.js?file=tightly-coupled.js">
  </script>

<!-- The above code sample is a typical jQuery example that you can find across the internet. The snippet works, but there is a lot of different things happening all in the same place. You can find event handling, data retrieval, and data manipulation all mixed together. You can imagine that over time this code might continue to grow and grow and become more and more prone for errors. -->
上面的代码示例是一个典型的 jQuery 示例，在互联网上随处可见。这段代码可以工作，但是在一个地方放置了很多不同功能的代码。事件处理、数据检索和数据处理都混在一起。你可以想象一下，这段代码可能会继续增长，从而变得越来越容易出现错误。

<!-- Before we get too far, let's take a side trip and look at what messages are and what types exist. -->
在我们想得太远之前，先顺便看看有些什么事件，以及事件有些什么类型。

<!-- ## Types of Messages -->
## 消息类型
<!-- ### Observer Events -->
### 观察者事件
<!-- An observer event is probably one that you are most used to if you are familiar with front-end web development. In relation to the DOM you can think of this as adding event handlers to an element. The element has a direct reference to the callbacks that will be invoked when the event type occurs. -->
如果你熟悉 Web 前端开发的话，观察者事件很可能是最常用的一种事件。在 DOM 中，你可以为一个元素添加事件处理函数。元素直接引用了回调函数，当事件发生时回调函数被调用。

<!-- #### Example -->
#### 示例
  <script src="https://gist.github.com/elijahmanor/5235011.js?file=observer-events.js">
  </script>

<!-- ### Mediated Events -->
### 中介事件
<!-- A mediated event or message has become more common the last several years in front-end web development. The main idea here is that there is another entity that keeps track of publishing and subscribing of messages. The main difference between this and Observer events is that Mediated events aren't tied directly to the subject that invoked it. -->
在过去几年的 Web 前端开发中，中介事件或消息变得越来越普遍。其主要思想是用另外一个实体跟踪消息的发布和订阅。中介事件与观察者事件的主要区别在于，它不直接引用触发事件的主体。

<!-- #### Example -->
#### 示例
  <script src="https://gist.github.com/elijahmanor/5235011.js?file=mediated-events.js">
  </script>

<!-- #### Implementations -->
#### 实现
<!-- There are several libraries out there that facilitate mediated events. The following is a list of various libraries that you may want to choose from. My recommendation is that you look at Jim's [postal.js] library. -->
有几个库可以简化中介事件。下面是一份可供选择的清单。个人推荐试试 Jim 的 [postal.js] 库。

[postal.js]: https://github.com/postaljs/postal.js

* Ben Alman's ([@cowboy](http://twitter.com/cowboy)) [Tiny jQuery Pub/Sub](https://github.com/cowboy/jquery-tiny-pubsub) library
* Peter Higgin's ([@phiggins](http://twitter.com/phiggins)) [pubsub.js](https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js) library
* **Jim Cowart's ([@ifandelse](http://twitter.com/ifandelse)) [postal.js](https://github.com/postaljs/postal.js) library &#8592; Recommended**
* Dustin Diaz's ([@ded](http://twitter.com/ded)) [reqwest](https://github.com/ded/reqwest) library
* appendTo's ([@appendTo](http://twitter.com/appendTo)) [AmplifyJS Pub/Sub](http://amplify.js/) component

<!-- ### Hybrid Events -->
### 混合事件
<!-- There is another type of event that is sort of a hybrid between observer and mediated. This type looks like a mediated event, but if you look hard enough there you could actually trace the origin of the event back to the original subject. A good example of this is jQuery's delegated event model. Delegated events are great, but it is based on the concept of events bubbling up the DOM and therefore we can trace where it came from.  -->
另外一种事件则混合了观察者事件和中介事件。它看起来像一个中介事件，但如果你仔细看的话，可以从事件的起源追溯到最初的主体。一个很好的例子是 jQuery 的代理事件模型。代理事件很棒，因为它基于事件沿着 DOM 树向上冒泡的概念，所以我们可以跟踪到事件源。

<!-- #### Example -->
#### 示例
  <script src="https://gist.github.com/elijahmanor/5235011.js?file=hybrid-events.js">
  </script>

<!-- By the way, I don't recommend using the `$._data()` method as it is undocumented and therefore not guaranteed that it will be available in future versions of jQuery. It is an internal helper method that jQuery currently uses under the covers. However, I did want to show you that there is a way to poke around and get at information that the subscriber shouldn't have in a real "mediated event", which is why I'm calling it a hybrid event. Don't get me wrong, I love jQuery's delegated events. I just wanted to show how it is a hybrid of the two above concepts. -->
顺便说一句，我不建议使用 `$._data()` 方法，因为它不是公开方法，不能保证在未来的 jQuery 版本中是可用的。它是 jQuery 目前在使用的一个内部方法。我想告诉你的是，订阅者不需要一个真正的中介事件也能方便的获取信息。不要误会我的意思，我很喜欢 jQuery 的代理事件。我只想表达它是上述两种概念混合后的结果。

<!-- ### Which One Should Be Used? -->
### 该用哪个？
<!-- That information is all fine and good, but what type of event/message should you be using and when? That is a great question and one that my friend Jim addressed in a recent post that he wrote. The following is a quote from his article... -->
概念都讲清楚了，但是该使用哪些类型的事件或消息，以及何时使用呢？这是一个好问题，我的朋友 Jim 最近的一篇文章中也提到了这个问题。下面他文章的一段引用...

> "...use observer 'locally', inside a component, mediator 'remotely' between components. No matter what, be ready to use both in tandem.' -- [Jim Cowart](http://freshbrewedcode.com/jimcowart/2013/02/07/client-side-messaging-essentials/)

> 在组件内部使用观察者，在组件之间使用中介者。

<!-- Jim recommends using observer events (jQuery's `.on()` method) when communicating within a module and to use mediated events (postal.js) when communicating between modules. -->
Jim 推荐模块内部的通信使用观察者事件（jQuery 的 `.on()` 方法），组件之间的通信则使用中介事件（postal.js）。

<!-- Another technique that Jim brings up in his article is to promote observer events into mediated events, which gives you the both of both worlds. He has some nice examples showing how that could look. I encourage you to take a look at his article referenced below in bold. -->
Jim 在他的文章中提出的另一项技术是提升观察者事件为中介事件，这样可以两全其美。他展示了一些很棒的例子。我推荐你去看看他的文章，在下面的参考资料中用粗体标记了出来。

<!-- ## Additional Resources -->
## 附加资源
<!-- If you are interesting in more information about the above concepts you may consider looking through some of the following resources about events and messaging.  -->
如果你想了解上述概念的更多信息，读读下面关于事件和消息的资源。

* **Jim Cowart's ([@ifandelse](http://twitter.com/ifandelse)) [Client-side Messaging Essentials](http://freshbrewedcode.com/jimcowart/2013/02/07/client-side-messaging-essentials/) article**
* Addy Osmani's ([@addyosmani](http://twitter.com/addyosmani)) [Understanding the Publish/Subscribe Pattern for Greater JavaScript Scalability](http://msdn.microsoft.com/en-us/magazine/hh201955.aspx) article
* Rebecca Murphey's ([@rmurphey](http://twitter.com/rmurphey)) [Loose Coupling with the pubsub Plugin](http://net.tutsplus.com/tutorials/javascript-ajax/loose-coupling-with-the-pubsub-plugin/) screencast

<!-- ## Loosely Coupled Code -->
## 松耦合代码
<!-- I was tempted to write the following code using Backbone.js or create constructor functions, but in order to keep it simple and convey the idea of messaging I tried to remove all of that. So, this probably isn't what you'd have in your code-base, but hopefully it gets the point across.  -->
我原打算用 Backbone.js 或构造函数来编写下面的代码，但是为了保持简单和表达消息的理念，我把它们都移除了。因此，虽然这可能不是实际代码库的代码，但我还是希望能表达的清楚些。

  <script src="https://gist.github.com/elijahmanor/5235011.js?file=loosely-coupled.js">
  </script>

<!-- ## Attack! -->
## 攻击！

下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Red Bird and you can also use the arrow keys. If it takes you too long to destroy the pigs you might want to consider pressing the `space bar` several times ;) -->
> 按下`空格键`来发射蓝色小鸟，你也可以使用方向键。如果花了很长时间也不能摧毁猪群，那么你可能要考虑多按几次`空格键`了 ;)

<a href="http://jsfiddle.net/Gue8x/show" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank">
  <img border="0" src="http://4.bp.blogspot.com/-PRXEAO-ZYuM/UVPOS_7QrnI/AAAAAAAAYoQ/VntWqZzDWeI/s1600/Screenshot+on+3.27.2013+at+11.56.39+PM.png" />
</a>

<!-- ## Conclusion -->
## 结论
<!-- Using events and messages across your web application can help with communication. Events allow a component to communicate with itself and messages can enable other components to listen in without having a hard dependency. -->
在 Web 应用中可以使用事件和消息实现组件通信。事件允许一个组件同自身通信，消息则允许一个组件以非硬编码的方式监听其他组件。

<!-- There are many other front-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有许多其他的前端架构技术被猪群偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!

> [@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 补充：Dun, dun, daaaaaaaaaa! 应该是在模拟背景音乐，类似于这种 <http://maruku.rubyforge.org/proposal.html>


