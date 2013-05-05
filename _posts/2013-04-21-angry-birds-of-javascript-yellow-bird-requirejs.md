---
layout: post
title: "模块化 &amp; 依赖管理 &amp; 性能优化"
tagline: "RequireJS"
description: "Web 前端应用可以快速变得相当复杂。理想的做法是提供某种结构和依赖关系管理，以及用一种简单的方式优化最终结果。"
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript", "Web", "RequireJS"]

short: "模块化 &amp; 依赖管理 &amp; 性能优化"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Yellow Bird RequireJS](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)

<!-- ## Introduction -->
## 简介
![](http://4.bp.blogspot.com/-6p5Xgjlsmhk/UVZlEo_QOKI/AAAAAAAAY9k/BBXhjrfp42U/s1600/Angry-Birds-Logo.png)
<!-- ![](http://4.bp.blogspot.com/-6p5Xgjlsmhk/UVZlEo_QOKI/AAAAAAAAY9k/BBXhjrfp42U/s320/Angry-Birds-Logo.png) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些培根味儿的敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

> 译注：翻译“bacon flavored foe”时，想起来了《少林足球》里的“做人如果没有梦想，那跟咸鱼有什么区别？”，就翻译成了“咸猪敌人”，[@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 建议翻译为“培根味儿的敌人”，应该更准确和有趣些。

<!-- > Check out the **[series introduction post](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)** for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)**，查看所有小鸟以及它们的攻击力。

<!-- ### Previous Attacks -->
### 战报
<ul>
  <li>
    <a href="http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html" target="_blank">Red Bird - IIFE</a>
  </li>
  <li>
    <a href="http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html" target="_blank">Blue Bird - Events</a>
  </li>
</ul>
<br />

<!-- ### Yellow Bird Attacks -->
### 黄色小鸟的攻击
<!-- ![](http://4.bp.blogspot.com/-eBq1DHq7P64/UVZlP7q4zMI/AAAAAAAAY9s/g5Ii1ZrLIbs/s1600/yellow-bird.png) -->
![](http://4.bp.blogspot.com/-eBq1DHq7P64/UVZlP7q4zMI/AAAAAAAAY9s/g5Ii1ZrLIbs/s1600/yellow-bird.png)

<!-- In this post we will take a look at the Yellow Bird who comes with a [RequireJS](http://requirejs.org/) speed booster and dynamically injects scripts against those pesky swine. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这片文章中，我们将看看黄色小鸟，它用速度助推器 [RequireJS] 和动态注入脚本攻击那些讨厌的猪。渐渐地，小鸟们将一个接一个地夺回属于它们的东西！

[RequireJS]: http://requirejs.org/

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- The birds used to manually add script tags to their HTML files. At first this wasn't an issue, but when their application started to grow larger and more complex it started to become difficult for them to organize their code, figure out dependencies, and determine a strategy for optimizing performance. Thankfully they were introduced to the [RequireJS](http://requirejs.org/) library which provided them a way to manage their code into modules, load their scripts asynchronously, manage their dependencies, and provide an easy way to optimize. Unfortunately the pigs, during a recent invasion, stole the RequireJS library from the birds. -->
小鸟们过去经常手动向 HTML 文件中添加 script 标签。起初这不是一个问题，但是当它们的应用开始变得更大更复杂时，组织代码、解决依赖关系和确定性能优化策略变得困难重重。值得庆幸的是，小鸟们引入了 [RequireJS] 库，这个库可以管理代码模块、异步加载脚本、管理依赖关系，并提供了一种简单的优化方式。不幸的是，在最近的一次入侵中，猪群从小鸟们那里偷走了 RequireJS 库。

<!-- One of the yellow birds has been tasked to reclaim what has been stolen. He will use the optimization power of speed to help destroy the pigs in order to take back what is theirs. -->
一只黄色小鸟被派去夺回被盗的 RequireJS 库。它将用加速度的力量摧毁猪群，夺回属于它们的东西。

<!-- ## Broken Application -->
## 崩溃的应用
<!-- Let's first start with a simple little web page that contains just a few scripts. You'll notice that I'm loading 3 popular libraries (jQuery, Underscore, and Postal) and some custom code at the end. -->
我们先从一个简单的小网页开始，其中包含了几个脚本文件。你会看到，我加载了 3 个常用库（jQuery、Underscore、Postal），并且在结尾处加载了一些自定义代码。

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=broken-dependency.html">
  </script>

<!-- The above code looks pretty straightforward, but when I end up running the page I get the following error in the dev tool's console... -->
上面的代码看起来相当简单，但当我运行这个网页时，开发工具的控制台打印了下面的错误...

<!-- ![](http://1.bp.blogspot.com/-ry8ojeQF3OI/UVZosPNPtVI/AAAAAAAAY94/0Catr-PQzbo/s1600/3-29-2013+10-36-11+PM.png) -->
![](http://1.bp.blogspot.com/-ry8ojeQF3OI/UVZosPNPtVI/AAAAAAAAY94/0Catr-PQzbo/s1600/3-29-2013+10-36-11+PM.png)

<!-- Fictitious Internal Dialog: "WHAT!?! I don't see any `each` method anywhere. What's up with that? Ohh man, it looks like the exception occurred in postal.min.js somewhere. FOUND A BUG... see if I use that library again. But, wait!?! Ohh, maybe something else is going on here." -->
内心对白：“什么！？！我没有在任何地方看到 `each` 方法。这到底是怎么回事？哦，天啊，看起来像是在 postal.min.js 的某处发生的异常。发现了一个 BUG... 但是等等！？！哦，这里面可能还有别的东西。”

<!-- So, the real issue isn't a bug in postal.js, the issue is in that postal.js has a dependency on underscore.js. The problem is that underscore should have been loaded before postal.js. Simply rearranging the script tags could easily solve this issue. In the above case the fix was trivial, but imagine how cumbersome this could be once the project starts to get large and requires lots of scripts. -->
好吧，真正的问题并不是 postal.js 的 bug，而是 postal.js 依赖于 underscore.js。而 underscore.js 应该在 postal.js 之前就被加载。通过简单的重新排列 script 标签就能很容易地解决这个问题。在上述情况下的修复显然微不足道，但是想像一下，一旦项目开始变大，并且需要大量的脚本时，修复工作会变得多么繁重。

<!-- ## RequireJS Basics -->
## RequireJS 基础
<!-- Before we go and look at how we could fix the above situation using RequireJS, let's first take a high level overview of what the library is doing for us. RequireJS is an Asynchronous Module Loader and the API it provides allows us to define and require modules. Both functions are really easy to understand so let's take a look at them. -->
在开始看如何用 RequireJS 解决上述情况之前，让我们先来高度概括一下这个库能为我们做些什么。RequireJS 时一个异步模块加载器，提供的 API 允许我们定义和请求模块。这两个功能都很好理解，所以我们看看它们。

<!-- ### define method -->
### 定义方法
<!-- In order to create a module you need a name, a list of dependencies, and a callback function. -->
创建一个模块需要一个名字、一个依赖关系列表和一个回调函数。

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=define.js">
  </script>

<!-- ### require method -->
### 请求方法
<!-- At some point in your application you will need to use the `require` function to kick things off. -->
在应用的某些地方，你需要使用 `require` 函数来开始执行代码。

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=require.js">
  </script>

<!-- ## Fixed Application -->
## 修正后的应用
<!-- Using RequireJS I took the above little application and rearranged some things. You should notice that the following markup removes all the script tags except one, which points to the require.js library. RequireJS knows where to start because we add an HTML5 data-main attribute describing where the main script is located. -->
我用 RequireJS 重新调整了上面的小应用。你应该注意到，下面的代码移除了所有 script 标签，除了指向 require.js 库的标签。RequireJS 知道从哪里开始执行，因为我们添加了一个 HTML5 属性 data-main，它描述了主脚本的位置。

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=requirejs.html">
  </script>

<!-- The main script has a configuration section inside of it where you can assign aliases to existing AMD modules and also shim libraries that were not previously defined. Although jQuery and Postal define themselves as AMD modules we included them in our configuration because they are not located alongside `main.js`. -->
主脚本有一段配置部分，可以在其中为现有的 AMD 模块指定别名，也可以为未预定义的库应用垫片。尽管 jQuery 和 Postal 定义自身为 AMD 模块，我们仍然要在配置中包含它们，因为它们没有被放在 `main.js` 的旁边。

<!-- You don't have to include in your config any custom modules you define in your application. You can refer to those by their file path and name. -->
你不必在配置中包含应用程序中的所有自定义模块。你可以通过文件路径和名称引用它们。

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=main.js">
  </script>

<!-- ## Optimize -->
## 优化
<!-- Our application only has 5 script files in it, but as you know our app will only continue to add additional scripts. So, it would be nice if there was an easy way to combine and minify our scripts for better production performance. The nice thing is that by using RequireJS we have already defined the dependencies of our application. -->
我们的应用只包含了 5 个脚本文件，但你也知道，我们的应用只会持续添加额外的脚本。所以，理想的做法是用一种简单的方式将脚本合并和压缩，从而达到更好的生产性能。通过使用 RequireJS 定义应用的依赖关系可以实现这一目标。

<!-- Thankfully there is a tool called `[r.js](http://requirejs.org/docs/1.0/docs/optimization.html)` that takes this dependency information and uses it to generate a combined and minified script. You can install the tool with the Node Package Manager `npm install requirejs` -->
值得庆幸的是，有一个称为 [r.js](http://requirejs.org/docs/1.0/docs/optimization.html) 的工具可以收集依赖信息，并用这些信息生成一个合并和压缩过的脚本文件。你可以通过 Node 包管理器 `npm install requirejs` 安装这个工具。

[r.js]: http://requirejs.org/docs/1.0/docs/optimization.html

<!-- You could provide all the command line argument to the tool in the console, but I prefer making a build config file like the following to define all of its settings before I run it. You can find a [comprehensive list of settings](https://github.com/jrburke/r.js/blob/master/build/example.build.js) from the official GitHub repository. -->
你可以在控制台中把命令行参数都传给这个工具，但我更喜欢在运行这个工具之前先创建一个构建配置文件，来定义所以的选项，就像下面的示例。你可以在官方 GitHub 库中找到[完整的选项列表]。

[完整的选项列表]: https://github.com/jrburke/r.js/blob/master/build/example.build.js

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=build.js">
  </script>

<!-- Once you've defined your `build.js` file then you let `r.js` know you want to use it. The following command will get you going... `r.js -o build.js`. You can see the output of the tool in the output below. -->
定义 `build.js` 文件之后，你可以把这个文件作为参数传给 `r.js`。运行这条命令 `r.js -o build.js`，你可以在控制台看到这个工具的输出，就像下面这样。

  <script src="https://gist.github.com/elijahmanor/5275285.js?file=optimize.sh">
  </script>

<!-- ## Additional Resources -->
## 其他资源
<!-- I only scratched the surface on all the things you can do with RequireJS and the r.js optimization tool. If you are interesting in learning more about these concepts you may want to look at some of the following resources.  -->
关于 RequireJS 和优化工具 r.js 所能的所有事情，我仅仅触及到了皮毛。如果你有兴趣了解关于这些概念的更多信息，你可能想看看下面这些资源。

<ul>
  <li>
    Jack Franklin's (<a href="http://twitter.com/jack_franklin" target="_blank">@jack_franklin</a>)
    <a href="http://javascriptplayground.com/blog/2012/07/requirejs-amd-tutorial-introduction">Introduction to RequireJS</a> article
  </li>
  <li>
    Jeffrey Way's (<a href="http://twitter.com/jeffrey_way" target="_blank">@jeffrey_way</a>)
    <a href="http://net.tutsplus.com/tutorials/javascript-ajax/a-requirejs-backbone-and-bower-starter-template/" target="_blank">A RequireJS, Backbone, and Bower Starter Template</a> screencast
  </li>
  <li>
    Cary Landholt's (<a href="http://twitter.com/carylandholt" target="_blank">@carylandholt</a>)
    <a href="http://www.youtube.com/watch?v=VGlDR1QiV3A">RequireJS Basics</a> video
  </li>
  <li>
    Jonathan Creamer's (<a href="http://twitter.com/jcreamer898" target="_blank">@jcreamer898</a>)
    <a href="http://tech.pro/tutorial/1156/using-requirejs-in-an-aspnet-mvc-application" target="_blank">Using Require.js in an ASP.NET MVC application</a> article
  </li>
</ul>

<!-- ## Attack! -->
## 攻击！
下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Yellow Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射黄色小鸟，你也可以使用方向键。

[![](http://1.bp.blogspot.com/-BvvbLg5ACrI/UVZoyYxCmSI/AAAAAAAAY-E/G7I6uezUKV0/s1600/3-29-2013+11-19-41+PM.png)](http://jsfiddle.net/Gue8x/show)

<!-- ## Conclusion -->
## 结论
<!-- Front-end web applications can get complicated quickly. It is nice to have a way to provide some structure, dependency management, and an easy way to optimize the final result. Thanks to the power of Yellow the birds have regained their trusty RequireJS tool for use in their next application. -->
Web 前端应用可以快速变得相当复杂。理想的做法是提供某种结构和依赖关系管理，以及用一种简单的方式优化最终结果。由于黄色小鸟的努力，小鸟们已经夺回了值得信赖的 RequireJS 工具，并会在它们的下一个应用程序中使用它。

<!-- There are many other front-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有许多其他的前端架构技术被猪群偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!

> [@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 补充：Dun, dun, daaaaaaaaaa! 应该是在模拟背景音乐，类似于这种 <http://maruku.rubyforge.org/proposal.html>


