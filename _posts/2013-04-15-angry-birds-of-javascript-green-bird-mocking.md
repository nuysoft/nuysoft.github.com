---
layout: post
title: "模拟请求和模拟数据"
tagline: "Mockjax &amp; mockJSON"
description: "前端开发人员可以借助一些技术和库，从而独立于后端的进度进行开发和构建原型。模拟静态数据还可以帮助构建单元测试。"
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript", "jQuery"]
published: true

ready: false
short: "模拟请求和模拟数据"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Green Bird - Mocking](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-green-bird.html)

<!-- ## Introduction -->
## 简介

![](http://4.bp.blogspot.com/-5PVLpWoGRVc/UV4ySyeL9vI/AAAAAAAAZxk/IlyY8pkqXF0/s1600/Angry_birds_wallpaper_3.png)
![](http://4.bp.blogspot.com/-5PVLpWoGRVc/UV4ySyeL9vI/AAAAAAAAZxk/IlyY8pkqXF0/s400/Angry_birds_wallpaper_3.png)

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些咸猪敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

<!-- > Check out the [**series introduction post**](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html) for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章]**，查看所有小鸟以及它们的攻击力。

[系列介绍文章]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html

<!-- ### Previous Attacks -->
### 战报
* [Red Bird - IIFE](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html)
* [Blue Bird - Events](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html)
* [Yellow Bird - RequireJS](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)
* [Black Bird - Backbone](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-black-bird.html)
* [White Bird - Linting](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-white-bird.html)

<!-- ### Green Bird Attacks -->
### 绿鸟的攻击

[![](http://1.bp.blogspot.com/-8IQeI6F5-d8/UV4ybFGUw7I/AAAAAAAAZxs/jnudV9GSHpM/s1600/green-bird.png)](http://1.bp.blogspot.com/-8IQeI6F5-d8/UV4ybFGUw7I/AAAAAAAAZxs/jnudV9GSHpM/s1600/green-bird.png)

<!-- In this post we will take a look at the Green Bird that can penetrate all of those hard to reach places and will mock and spy those stealing swine right where it hurts!. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这篇文章中，我们将看看绿鸟，它可以穿越所有那些难以到达的地方，并且伪装和监视那些猪贼！渐渐的，小鸟们将一个接一个地夺回属于它们的东西！

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- For the most part the birds are all front-end web developers only and don't focus on the back-end much at all. As a result the birds have a symbiotic relationship with the Water Buffalo. The Buffalo write the back-end of the application and the birds develop the front-end. The problem with this arrangement is that while the back-end is being developed the birds are left twiddling their feathers until the Buffalo are finished. However, once the back-end is done the pressure is on the birds to deliver while the Buffalo sit idle by the watering hole in the shade. Thankfully, a while back, a Green Bird proposed the idea of mocking the back-end services so they could make progress on the front-end while they waited for the Buffalo to finish their work! The Green Bird introduced a couple of handy libraries to make mocking a much easier process.  -->
大多数小鸟是纯粹的 Web 前端开发人员，压根儿就不关注后端。然后小鸟们和水牛（Water Buffalo）就形成了一种共生关系。水牛编写应用的后端，小鸟们则开发前端。这种分工导致的问题是，当后端被开发时，小鸟们只能留下来摆弄自己的羽毛，一直到水牛完工。可是一旦后端完工，交付的压力就落在了小鸟们的身上，而水牛则闲坐在水坑边的树荫下无所事事。幸运的是，一段时间后一只绿鸟提出了模拟后端服务的想法，这样在原本需要等待水牛完工的阶段，小鸟们就可以同步进行开发！这只绿鸟还引入了一些便捷库，使得模拟更加容易。

<!-- However, during a recent invasion the pigs stole the birds' mocking libraries! As a result, one of the Green Birds has been tasked to reclaim what has been stolen. He will use his overwhelming power of trickery to help destroy the pigs in order to take back what is theirs. -->
然而在最近的一次入侵中，猪群偷走了小鸟们的模拟库！现在，一只绿鸟被派去找回被盗的模拟库。它将用压到一切诡计的力量摧毁族群，夺回属于它们的东西。

<!-- ## The Twitter Application -->
## Twitter 应用
![](http://1.bp.blogspot.com/-ZbrUacc6Jn8/UV8-TkAbAaI/AAAAAAAAZz4/HiqK67BDc14/s320/373892_3410142_lz.jpg)

<!-- We are going to take a look at a simple Twitter application that gets the tweets from a specific username. Why Twitter? Well, the Angry Birds have a special relationship with Twitter, especially the Blue Bird ;) -->
我们来看一个简单的 Twiter 应用，这个应用将返回一个特定用户的消息。为什么是 Twitter？好吧，因为愤怒的小鸟们和 Twitter 的关系非同寻常，尤其是蓝色的小鸟 ;)

<!-- The following application grabs data from Twitter using JSONP. I thought about using Backbone.js to write the little application, but thought that might be overkill to introduce the mocking concept. You will also notice I am not using a templating engine and that is on purpose. Another Angry Bird will be introducing that concept ;) -->
下面的应用通过 JSONP 从 Twitter 抓取数据。我曾经考虑过用 Backbone.js 来编写这个小应用，但是又考虑到这种做法对于介绍模拟概念会是过渡设计。你也会注意到我并没有使用模板引擎，恩，我是故意这么做的。另一只愤怒的小鸟会介绍模板概念 ;)

  <script src="https://gist.github.com/elijahmanor/5321634.js?file=twitter.js">
  </script>

<!-- The above code snippet is running in the below embedded jsFiddle. Feel free to run the code and launch the editor to play around with it. -->
上面的代码运行在下面的内嵌 jsFiddle 中。请随意的运行这些代码，然后打开编辑器玩一下。

<!-- ## Twitter Application using api.twitter.com -->
## 使用 api.twitter.com

  <iframe allowfullscreen="allowfullscreen" frameborder="0" height="300" src="http://jsfiddle.net/KXr8U/1/embedded/result,html" width="100%">
  </iframe>

<!-- The data that comes back from Twitter looks something like the following screenshot... -->
从 Twitter 返回的数据看起来就像下面的截图...

![](http://2.bp.blogspot.com/-7pLXYbHr5Lc/UV9FEJXJVPI/AAAAAAAAZ0A/81W9-kKIt94/s1600/twitter-raw.png)

<!-- ## Mocking Static Data -->
## 模拟静态数据

<!-- What if Twitter goes down, is unstable, or you just want to test your application without having internet access? This is where being able to mock the back-end service can be really helpful. Thankfully we can use a jQuery library called Mockjax. All you need to do is call <code>$.mockjax</code> and provide a URL that you want to listen for and a response that you want to be returned. The following is an example of mocking the call to api.twitter.com and passing back some static data. -->
假使 Twitter 宕机或者不稳定，或者你只是想在没有互联网接入的情况下测试你的应用，会怎么样？这正是适合模拟后端服务大战拳脚的场景。而且庆幸的是我们可以使用一个称为 Mockjax 的 jQuery 库。你要做的所有事情是调用 `$.mockjax`，提供一个要监听的 url 和一个期望的响应。下面是一个模拟请求 api.twitter.com 的示例，将返回一些静态数据。

  <script src="https://gist.github.com/elijahmanor/5321634.js?file=requests-mocked-static.js">
  </script>

  <style type="text/css">
    .gist .gist-file .gist-data .line-numbers {
        line-height: 20px;
    }
  </style>

<!-- Not only is this pretty cool and can be helpful for developing the front-end independent from the back-end, but it also very handy when writing Unit Tests that use Ajax. -->
这不仅很酷，还可以帮助前端开发从后端独立出来，而且编写 Ajax 单元测试也非常方便。

<!-- The above code snippet is running in the below embedded jsFiddle. Feel free to run the code and launch the editor to play around with it. -->
上面的代码运行在下面的内嵌 jsFiddle 中。请随意的运行这些代码，然后打开编辑器玩一下。

<!-- ### Twitter Application using Mockjax -->
### 使用 Mockjax

  <iframe allowfullscreen="allowfullscreen" frameborder="0" height="300" src="http://jsfiddle.net/ufqPC/1/embedded/result,html" width="100%">
  </iframe>

<!-- The data that comes back from Mockjax looks something like the following screenshot... -->
Mockjax 返回的数据看起来就像下面的截图...

![](http://4.bp.blogspot.com/-rgQyF9j9VbA/UV9FPdMawYI/AAAAAAAAZ0I/-ESPFAkZwoY/s1600/twitter-mock-static.png)

<!-- ## Mocking Dynamic Semi-Random Data -->
## 动态模拟半随机数据
<!-- One of the downsides of this technique is that generally I am pretty unimaginative and lazy when making static data examples. I typically end up have the same object and just increment some of the values by 1 or something. That is fine and all, but it is a nuisance, it takes time, and it doesn't really give you an idea of what the UI could look like. Thankfully there is another nice library for that called mockJSON. You provide a template of what you want your data to look like and then you give it some metadata about what types of fields you want, how many, etc... The following is how I rewrote the previous example, but will randomly generate anywhere from 5 to 10 twitter objects to be displayed. -->
这项技术的缺点之一在于，制造静态数据很是乏味无趣。通常我会先构造一些同样的对象，然后仅仅是把某些值加 1 或加一些其他的东西。这么做不错，但是很讨厌很花时间，而且不能让你了解真正的 UI 是什么样子。幸运的是还有一个非常棒的、称为 mockJSON 的库。你需要提供一个表示真实数据的模板，指定某些字段的期望类型，等等，还有很多... 下面演示的是我如何重写之前的例子，而且会随机生成 5 到 10 个要显示的消息对象。

  <script src="https://gist.github.com/elijahmanor/5321634.js?file=requests-mocked-dynamic.js">
  </script>

<!-- The above code snippet is running in the below embedded jsFiddle. Feel free to run the code and launch the editor to play around with it. -->
上面的代码运行在下面的内嵌 jsFiddle 中。请随意的运行这些代码，然后打开编辑器玩一下。

<!-- Twitter Application using Mockjax & mockJSON -->
### 使用 Mockjax 和 mockJSON
  <iframe allowfullscreen="allowfullscreen" frameborder="0" height="300" src="http://jsfiddle.net/cHS9q/1/embedded/result,html" width="100%">
  </iframe>

<!-- The data that comes back from Mockjax with mockJSON looks something like the following screenshot... -->
Mockjax 和 mockJSON 返回的数据看起来就像下面的截图...

![](http://4.bp.blogspot.com/-mvenxQzawwU/UV9FW2MqpUI/AAAAAAAAZ0Q/6TA0UmXP-9w/s1600/twitter-mock-dynamic.png)

<!-- ## Attack! -->
## 攻击！
下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Green Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射绿鸟，你也可以使用方向键。

[![](http://3.bp.blogspot.com/-eLUAASpDUy0/UV0NIExF6RI/AAAAAAAAZwA/uCKAm54p5W4/s640/Screenshot+on+4.4.2013+at+12.14.59+AM.png)](http://jsfiddle.net/4QG5Q/27/show)

<!-- ## Conclusion -->
## 结论
<!-- It can be difficult to develop both the front-end and back-end independently. Thankfully there are some techniques and libraries today that can enable the front-end to develop and prototype separate from the back-end progress. The mocking techniqiue with static data can also be helpful when Unit Testing your code as well. -->
独立开发前端和后端可能有些困难。然而庆幸的是，现在前端开发人员可以借助一些技术和库，从而独立于后端的进度进行开发和构建原型。模拟静态数据这一技术还可以帮助构建单元测试。

<!-- There are many other front-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有很多其他的前端架构技术被猪偷走了。在下篇文章中，另一只愤怒的小鸟继续报复偷走鸟蛋的肥猪们。Dun, dun, daaaaaaa!



