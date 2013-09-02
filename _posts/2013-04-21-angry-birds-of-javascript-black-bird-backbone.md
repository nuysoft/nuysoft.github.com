---
layout: post
title: "应用分层 &amp; 解耦合"
tagline: "Model &amp; Collection &amp; View"
description: "Web 前端应用可以快速变得相当复杂。在你知道这点之前，如果你不小心就会导致关系混乱。值得庆幸的是，Backbone.js 提供了组件来帮助你把应用分割为可用的小模块，并且每个小模块各司其职。"
category-substitution: 翻译
tags: [翻译, "Angry Birds of JavaScript", "JavaScript", "Web", "Backbone"]

short: "应用分层 &amp; 解耦合"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Black Bird - Backbone](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-black-bird.html)

<!-- ## Introduction -->
## 简介

![](http://2.bp.blogspot.com/-efyDWffod9w/UVpR-LEJYyI/AAAAAAAAZgE/w6UXvXY3u9w/s1600/000001611.jpg)
<!-- ![](http://2.bp.blogspot.com/-efyDWffod9w/UVpR-LEJYyI/AAAAAAAAZgE/w6UXvXY3u9w/s200/000001611.jpg) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些培根味儿的敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

> 译注：翻译“bacon flavored foe”时，想起来了《少林足球》里的“做人如果没有梦想，那跟咸鱼有什么区别？”，就翻译成了“咸猪敌人”，[@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 建议翻译为“培根味儿的敌人”，应该更准确和有趣些。

<!-- > Check out the **[series introduction post](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)** for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)**，查看所有小鸟以及它们的攻击力。

<span href="" imageanchor="1" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;"><img border="0" src="http://4.bp.blogspot.com/-wjhQKJKNuks/UVdeWffTYoI/AAAAAAAAZNY/XpHY_8R3tQs/s1600/black-bird.png" /></span>

<!-- ### Previous Attacks -->
### 战报
<ul>
    <li>
      <a href="http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html" target="_blank">Red Bird - IIFE</a>
    </li>
    <li>
      <a href="http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html" target="_blank">Blue Bird - Events</a>
    </li>
    <li>
      <a href="http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html" target="_blank">Yellow Bird - RequireJS</a>
    </li>
</ul>

<!-- ### Black Bird Attacks -->
### 黑鸟的攻击
<!-- In this post we will take a look at the Black Bird who will use the organized approach of the <a href="http://draft.blogger.com/backbonejs.org" target="_blank">Backbone.js</a> bomb to fight these porkers. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这边文章中，我们将看看黑色小鸟，它用有组织条理的 Backbone.js 炸弹对付这些小肥猪。渐渐的，小鸟们将一个接一个地夺回属于它们的东西！

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- The birds used to write their jQuery code like it was a tangled smorgasbord of worms. They would mix up their views, models, and presenter logic all together in a big interconnected pile of grubs. After a while one of their ancestors, a Black Bird, introduced the Backbone.js library and showed them a different way to think about developing front-end web applications. However, during a recent invasion the pigs stole Backbone.js from the birds and carried it back to their filthy sty. -->
小鸟们过去经常把 jQuery 代码写得像是一个令人纠结的蠕虫大杂烩。它们把视图、模型、展现逻辑混淆在了一起。过了一段时间之后，一只黑色小鸟，它们的祖先之一，引入了 Backbone.js 库，并向小鸟们展示了一种思考 Web 前端应用开发的不同方式。然而，在最近的入侵中，猪群从小鸟哪里偷走了 Backbone.js，并把它抬回了它们那肮脏的猪圈。

<!-- One of the black birds has been tasked to reclaim what has been stolen. He will use his explosive power of organization to help destroy the pigs in order to take back what is theirs. -->
一只黑色小鸟被派去夺回被盗的 Backbone.js。它将用爆炸性的组织之力（power of organization）摧毁猪群，夺回属于它们的东西。

<!-- ## Tangled Smorgasbord of Worms -->
## 纠结的蠕虫大杂烩
<!-- Let's take a look again at the following application that the <a href="http://draft.blogger.com/blogger.g?blogID=30404818"> Blue Bird </a> dealt with in a previous attack. Instead of adding messages to untangle the mess we are going to introduce how using Backbone.js can help us out. Here is the running application below... -->
让我们再看看下面的应用，[Blue Bird](http://draft.blogger.com/blogger.g?blogID=30404818) 在之前的攻击中已经处理过。通过增加消息可以理清混乱，但这里要介绍的是如何使用 Backbone.js 达到同样的目的。下面是正在运行的程序...

<!-- > It appears <a href="http://plnkr.co/">Plunker</a> is not embedding correctly at the moment. The application is a simple Netflix search interface that will show the results from Netflix. If Plunker doesn't start working soon I will move the demo somewhere else. Sorry for the inconvenience. -->
> 有时 [Plunker](http://plnkr.co/) 不能正确的嵌入。这个应用是一个简单的 Netflix 搜索接口，会展示 Netflix 返回的结果。如果 Plunker 不能开始工作，我会把这个演示很快转移到别处。很抱歉给你带来不便。

  <iframe allowfullscreen="allowfullscreen" frameborder="0" src="http://embed.plnkr.co/td1ZTtptDT0RIxc7VIgM" style="height: 300px; width: 100%;">
  </iframe>

<!-- And to refresh your memory, here is the supporting code used for the above web application. You should notice that a lot of concerns are all being mixed together (DOM events, Modifying the View, AJAX Communication, etc...) -->
再次提醒你，这是上面的 Web 应用的实现代码。你应该注意的是，很多关注点被混合在了一起（DOM 事件、修改视图、Ajax 通信等）

  <script src="https://gist.github.com/elijahmanor/5283260.js?file=jquery-worms.js">
  </script>

<!-- Do you see the problem? It is so tempting to write code like the above, but I hope you see that it can be a bear to work with and maintain. Don't worry, we have all written code just like the above. The good news is that we don't have to continue to write it that way. Let's take a look at what Backbone.js is and how it can help us out in this situation.  -->
你发现了问题了吗？编写类似上面的代码非常诱人，但我希望你能看到，协同和维护这样的代码将是一种负担。不过不要担心，我们都写过类似上面的代码。好消息是我们不必再用那种方式写代码。让我们来看看 Backbone.js 是什么，以及在这种情况下它如何帮助我们。

<!-- > There are many other MV* front-end frameworks (Knockout, or AngularJS, EmberJS, & others) that could also bring structure to the above code. I would encourage you to pick a tool that you can be productive with and get comfortable with it. -->
> 还有很多其他的前端 MV* 框架（Knockout、AngularJS、EmberJS 及其他）可以结构化上面的代码。我鼓励你选择一个工具，使用并适应它。

<!-- ## Backbone.js Basics -->
## Backbone.js 基础
Backbone.js has several pieces that can all work together to make a web application. You don't have to use all of these components, but they are available if you choose to use them.
Backbone.js 含有几个组件，它们可以协同合作构建一个 Web 应用。我不必使用所有这些组件，但是你如果选择使用它们，它们就是有用的。

<ul>
  <li>模型 Model - 表示数据，以及数据相关的逻辑</li>
  <!-- Model - Represents data and logic surrounding it -->
  <li>集合 Collection - 模型的有序集合</li>
  <!-- Collection - Ordered sets of Models -->
  <li>视图 View - 一个模块，带有渲染方法、依赖一个模型</li>
  <!-- View - A module backed by a Model with a render method -->
  <li>路由 Router - 提供可链接和可分享 URL 的机制</li>
  <!-- Router - Mechanism to provide linkable, sharable URLs -->
  <li>事件 Event - 观察者事件模型</li>
  <!-- Event - Observer Eventing module -->
  <li>路由器 History - 提供操作历史的能力（支持后退按钮）</li>
  <!-- History - Provides the ability to maintain history (back button support) -->
  <li>同步 - 可扩展组件，提供与服务端的 RESTful 通信</li>
  <!-- Sync - Extendable component providing RESTful communication to the server -->
</ul>

<!-- ## Refactoring the Tightly Coupled Code -->
## 重构紧耦合代码
<!-- Let's take a stab at refactoring the above jQuery mess and use Backbone.js to split out some of the various concerns.  -->
让我们试着重构上面的 jQuery 代码，并且使用 Backbone.js 分离各种关注点。

<!-- I'm not going to dive into all of the above pieces in this post, but will focus on 3 of the main pieces (Models, Collections, and Views). I'll touch on some of the Sync concerns, but as part of the other topics. I'll have resources listed at the end if you want to dig deeper into any of these topics. -->
在这篇文章中，我不打算涉及所有上述组件，只会专注于 3 个主要组件（模型、集合、视图）。我会涉及到一些 Sync 组件，但它是作为其他主题的一部分出现。如果你想深入钻研这些主题，我在末尾列出了一些资源。

### RequireJS
<!-- Before we get into the Models, Collections, and Views I want to show you how we took out all the scripts from the index.html page and used RequireJS to help us out. -->
在我们开始模型、集合和视图之前，我想先展示如何使用 RequireJS ，来帮助我们从 index.html 页面中提取出所有脚本。

<!-- > If you've never seen RequireJS before then you might want to check out the previous **[Yellow Angry Bird Post](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)** about RequireJS. -->
> 如果你之前从没见过 RequireJS，你可能需要阅读之前关于 RequireJS 的**[愤怒的黄色小鸟](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)**一文。

#### main.js
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=main.js">
  </script>

<!-- The above code is defining the paths for jQuery, Underscore, Backbone, Postal, and Bootstrap. We needed to shim Underscore, Backbone, and Bootstrap since they are not defined as AMD modules.  -->
上面的代码定义了 jQuery、Underscore、Backbone、Postal 和 Bootstrap 的路径。我们需要为 Underscore、Backbone、Bootstrap 使用垫片，因为它们没有被定义为 AMD 模块。

<!-- Then the `require` function is called to request a set of dependencies before the callback is invoked. At that point, jQuery and all the other views and models will be ready for usage! -->
然后，函数 `require` 被调用，用来在回调函数被调用之前请求一组依赖库。到那时，jQuery 和所有其他视图和模型将准备就绪。

<!-- ### Models -->
### 模型
<!-- We are going to make 2 models (Search and Movie) to represent the above application.  -->
我们将创建 2 个模型（Seach 和 Movie）来表示上面的应用。

<!-- The following Search Model is really simple and its main job is to respond when the `term` property has changed. We are using Backbone's events (Observer Events) to listen to changes on the model and then propagating the message to Postal.js (Mediated Events). For more information about those terms and how they are different you can reference the [Blue Angry Bird Post](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html) about events. -->
下面的 Search 模型相当简单，它的主要任务是响应 `term` 属性的变化。我们使用 Backbone 的事件（观察者事件）来监听模型的变化，然后传播消息到 Postal.js（中介事件）。关于这些术语的更多信息以及它们的不同之处，可以参考关于事件的[愤怒的蓝色小鸟](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html)一文。

#### search.js
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=search.js">
  </script>

<!-- The following Movie Model doesn't have a lot going on as well. It's main purpose is to parse the data returned from the server and map the results to something a little more manageable. In this case we are only concerned with the `releaseYear`, `rating`, and `name` properties.  -->
下面的 Movie 模型也没有很多事情要做。它的主要目的是解析服务端返回的数据，并把结果映射为更易于管理的结构。这样我们只需要关心 `releaseYear`, `rating`, 和 `name` 属性。

#### movie.js
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=movie.js">
  </script>

<!-- ### Collections -->
### 集合
<!-- As we described above, collections are just a set of models. The following code is just a set of Movie models. The collection is where you define where to get the list of models from the server. The back-end for this application is Netflix and their endpoint is a little complex so we are using a function to dynamically build that URL. We also defined a `parse` method to get directly to the array of contents that will be mapped to `Movie` models. Since this AJAX call will be using JSONP we also needed to override the `sync` method and provide some additional options. -->
正如我们在上面描述的，集合只是一组模型。下面的代码也只是一组 Movie 模型。集合定义了从服务器的哪个位置获取模型列表。这个应用的后端是 Netflix，并且稍微有点复杂，因为我们需要用一个函数来动态建立 URL。我们还定义了一个 `parse` 方法，用来直接获取内容数组，内容将被映射到 `Movie` 模型。因为这个 Ajax 使用的是 JSONP，我们还需要覆盖 `sync` 方法提供一些额外选项。

#### movies.js
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=movies.js">
  </script>

<!-- ### Views -->
### 视图
I see the View as more of a Presenter than the typical MVC View you might normally think of. Anyway, We have 2 views in this application that we will briefly look at.
我认为视图更像一个 Presenter，与通常认为的传统 MVC 视图相比。这个应用有 2 个视图，我们简要地看看。

<!-- The following `SearchView` handles the interactions with the DOM and the Model. The `events` property primarily is used to listen to DOM events and in this case is watching for clicks on the button or previous search links. Changes to these elements will be stored in the model as `term`. The `initialize` method sets up some events listening for changes in the `term` property. If `term` changes, then portions of the UI will change accordingly. -->
下面的 `SearchView` 处理与 DOM 和模型的交互。属性 `events` 主要用于监听 DOM 事件，在这里是等待点击按钮或点击搜索记录链接。这些元素的改变将存在在模型中，属性名为 `term`。方法 `initialize` 设置了一些事件来监听属性 `term` 的变化。如果 `term` 发生变化，部分 UI 会相应的发生变化。

#### search-view.js
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=search-view.js">
  </script>

<!-- The `MovieView` below is a little different than the above view. The first thing to point out is the weird `text!movie-template.html`. I am using the `text.js` plugin for RequireJS that let's us pull text resources as part of the dependency chain. This is really helpful for markup files used when using a templating engine or possibly a CSS file that is associated with a particular widget. Inside of the `initialize` method we are subscribing to a change in the term and then asking the collection to `fetch` the information from the server. The `render` method gets called after the data is retrieved from the server and we use Underscore to template the results to the DOM. -->
下面的 `MovieView` 与上面的视图略有不同。首先要指出的是怪异的 `text!movie-template.html`。我使用了 RequireJS 的 `text.js` 插件，允许将文本资源作为依赖练的一部分。这对于使用标记文件的场景很有用，可能是使用模板引擎时，也可能是使用与某个特定组件有关的 CSS 文件时。在方法 `initialize` 内部，我们订阅了 term 的变化消息，然后要求集合从服务器获取（`fetch`）信息。从服务器检索到数据之后，方法 `render` 被调用，并且使用 Underscore 将结果模板化为 DOM。

#### movie-view.js
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=movie-view.js">
  </script>

<!-- The following is the template file in case you were wondering. I'm using Underscore's templating engine which is similar to John Resig's micro-templating implementation that he wrote years ago. There are other templating libraries available, but I used this one because it comes with Underscore which is a prerequisite for Backbone. If I needed something more featured I would have used Handlebars instead, but that is a story for another Angry Bird ;) -->
下面是模板文件，假如你正疑惑的话。我使用了 Underscore 的模板引擎，类似于 John Resig 在数年前写的的 Micro-Templating 实现。还有其他可用的模板库，我选择这个是因为它所在的 Underscore 是 Backbone 的先决条件。如果我需要更多功能，我会选择 Handlebars，不过，那是另一只愤怒的小鸟的故事了 ;)

#### movie-template.html
  <script src="https://gist.github.com/elijahmanor/5283260.js?file=movie-template.html">
  </script>

<!-- ## Additional Resources -->
## 附加资源
<!-- I only scratched the surface on all the things you can do with Backbone.js. If you are interesting in learning more about these concepts you may want to look at some of the following resources.  -->
关于 Backbone.js 可以做的事情，我只涉及到一些皮毛。如果有兴趣了解关于这些概念的更多信息，看看下面的资源。

<!-- > The following resources were taken from the **[Beginner HTML5, JavaScript, jQuery, Backbone, and CSS3 Resources](http://www.elijahmanor.com/2013/01/beginner-html5-javascript-jquery.html)** blog post. -->
> 下面的资源从博客文章 **[Beginner HTML5, JavaScript, jQuery, Backbone, and CSS3 Resources](http://www.elijahmanor.com/2013/01/beginner-html5-javascript-jquery.html)** 获得。

<ul>
    <li>
      <a href="http://backbonejs.org/">
        Backbone.js API
      </a>
    </li>
    <li>
      <a href="http://backbonejs.org/docs/backbone.html">
        Annotated Backbone.js Code
      </a>
    </li>
    <li>
      <a href="https://github.com/documentcloud/backbone/wiki/Extensions,-Plugins,-Resources">
        Backbone Extensions, Plugins, &amp; Resources
      </a>
    </li>
    <li>
      <a href="https://github.com/tbranyen/backbone-boilerplate">
        Backbone Boilerplate
      </a>
    </li>
    <li>
      <a href="https://github.com/addyosmani/backbone-fundamentals">
        Backbone Fundamentals eBook
      </a>
      by Addy Osmani(<a href="http://twitter.com/addyosmani">@addyosmani</a>)
    </li>
    <li>
      <a href="https://peepcode.com/products/backbone-js">
        Peep Code: Backbone.js Video Series
      </a>
      by Geoffery Grosenbach(<a href="http://twitter.com/topfunky">@topfunky</a>) and David Goodlad(<a href="http://twitter.com/dgoodlad">@dgoodlad</a>)
    </li>
    <li>
      <a href="http://pragprog.com/screencasts/v-dback/hands-on-backbone-js">
        The Pragmatic Bookshelf: Hands-on Backbone.js
      </a>
      by Derick Bailey(<a href="http://twitter.com/derickbailey">@derickbailey</a>)
    </li>
    <li>
      <a href="http://backbonescreencasts.com/">
        Backbone.js Screencasts
      </a>
      by Joey Beninghove
    </li>
    <li>
      <a href="http://www.pluralsight.com/training/Courses/TableOfContents/backbone-fundamentals">
        Pluralsight: Backbone.js Fundamentals
      </a>
      by Liam McLennan(<a href="http://twitter.com/liammclennan">@liammclennan</a>)
    </li>
    <li>
      <a href="http://codular.com/starting-with-backbone">
        The Skinny on BackboneJS
      </a>
      by Ben Howdle(<a href="http://twitter.com/benhowdle">@benhowdle</a>)
    </li>
    <li>
      <a href="http://backbonetutorials.com/">
        Backbone Tutorials
      </a>
    </li>
    <li>
      <a href="http://net.tutsplus.com/tag/backbone/">
        Backbone.js Tutorials
      </a>
      via Nettuts
    </li>
    <li>
      <a href="http://javascriptplayground.com/blog/category/backbonejs">
        Exploring Backbone.js Series
      </a>
      by Jack Franklin(<a href="http://twitter.com/jack_franklin">@jack_franklin</a>)
    </li>
</ul>

<!-- ## Attack! -->
## 攻击！

下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Black Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射黑色小鸟，你也可以使用方向键。

<a href="http://4.bp.blogspot.com/-QBX6E-gJmzE/UVuGtHDEmMI/AAAAAAAAZuM/xXbC6KMc3OU/s1600/black-brid-game.png">
    <img border="0" src="http://4.bp.blogspot.com/-QBX6E-gJmzE/UVuGtHDEmMI/AAAAAAAAZuM/xXbC6KMc3OU/s1600/black-brid-game.png" />
</a>

<!-- ## Conclusion -->
## 结论
<!-- Front-end web applications can get complicated quickly. Before you know it you have a pile of interconnected mess if you are not careful. Thankfully Backbone.js provides components to help you split out your application into consumable pieces that each have their own purpose. Thank you Black Bird for returning Backbone back to the birds. They will be able to rest easier knowing things are organized and in their proper place. -->
Web 前端应用可以快速变得相当复杂。在你知道这点之前，如果你不小心就会导致关系混乱。值得庆幸的是，Backbone.js 提供了组件来帮助你把应用分割为可用的小模块，并且每个小模块各司其职。感谢黑色小鸟为小鸟们夺回了 Backbone。事情被有条理地组织起来，并安排在合适的位置上，现在，小鸟们可以安心休息了。

<!-- There are many other front-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有许多其他的前端架构技术被猪群偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!

> [@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 补充：Dun, dun, daaaaaaaaaa! 应该是在模拟背景音乐，类似于这种 <http://missingno.ocremix.org/musicpages/game_on.html>


