---
layout: post
title: "模板 - 分离展现和逻辑"
tagline: "Templating"
description: "在代码中混入标记会导致一些让人讨厌的代码，这样的代码繁琐、单调，并且难以维护。像 Underscore 和 Handlebars 这样的库提供了一种清晰的方式，将展现描述从逻辑中分离出来。你可以自由选择使用什么库，但是我鼓励你多进行一些比较，找到最适合你的库。"
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript", "Web", "Templating"]

short: "模板 - 分离展现和逻辑"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Orange Bird - Templating](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-orange-bird.html)

<!-- ## Introduction -->
## 简介
![](http://1.bp.blogspot.com/-EoYTO-3jfeY/UV-WOmhaF3I/AAAAAAAAZ0g/S1oYMzsOg2w/s1600/angrybirds_620_121112.jpg)
<!-- ![](http://1.bp.blogspot.com/-EoYTO-3jfeY/UV-WOmhaF3I/AAAAAAAAZ0g/S1oYMzsOg2w/s320/angrybirds_620_121112.jpg) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些培根味儿的敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

> 译注：翻译“bacon flavored foe”时，想起来了《少林足球》里的“做人如果没有梦想，那跟咸鱼有什么区别？”，就翻译成了“咸猪敌人”，[@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 建议翻译为“培根味儿的敌人”，应该更准确和有趣些。

<!-- > Check out the **[series introduction post](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)** for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)**，查看所有小鸟以及它们的攻击力。

![](http://4.bp.blogspot.com/-MsnBfq6yXiQ/UV-aF4EH1EI/AAAAAAAAZ0o/bUCCPM5vfUQ/s1600/Orange_bird_space.png)
<!-- ![](http://4.bp.blogspot.com/-MsnBfq6yXiQ/UV-aF4EH1EI/AAAAAAAAZ0o/bUCCPM5vfUQ/s1600/Orange_bird_space.png) -->

<!-- ### Previous Attacks -->
### 战报
<!-- TODO -->
<ul>
  <li>
    <a href="http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html" target="_blank">
      Red Bird - IIFE
    </a>
  </li>
  <li>
    <a href="http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html" target="_blank">
      Blue Bird - Events
    </a>
  </li>
  <li>
    <a href="http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html" target="_blank">
      Yellow Bird - RequireJS
    </a>
  </li>
  <li>
    <a href="http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-black-bird.html" target="_blank">
      Black Bird - Backbone
    </a>
  </li>
  <li>
    <a href="http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-white-bird.html" target="_blank">
      White Bird - Linting
    </a>
  </li>
  <li>
    <a href="http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-green-bird.html" target="_blank">
      Green Bird - Mocking
    </a>
  </li>
</ul>

<!-- ### Orange Bird Attacks -->
### 橙色小鸟的攻击
<!-- In this post we will take a look at the Orange Bird. He first starts out small with a simple template, but then expands itself into a DOM blast that will surely send the message that the birds mean business. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这篇文章中，我们将看看橙色小鸟。他开始时是一个简单的小模板，但随之扩大为一场 DOM 爆炸，这么做明确的传达了一个消息，那就是小鸟们是认真的。渐渐的，小鸟们将一个接一个地夺回属于它们的东西。

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- For the last several years we have seen a trend that more and more work is being done on the front-end of web development. We communicate to the back-end via Ajax or Web Sockets and then display the data somehow in the UI. The birds found themselves mostly using string concatenation to build up the rich user interfaces, which resulted in a lot of code that was boring and also prone for errors. Thankfully an Orange Bird came along and said, "Hey, isn't there something better than this? Can't we separate our view from our data somehow?", and that is how templates became to be in the bird world. The Orange Bird borrowed templating libraries from the humans such as Underscore.js and [Handlebar.js](http://handlebarsjs.com/) to help fit this need among the foul. -->
在过去的几年里，我们已经看到一个趋势：越来越多的 Web 开发工作在前端完成。我们通过 Ajax 或 Web Sockets 与后端通信，然后在以某种方式在 UI 中显示数据。小鸟们发现它们主要使用字符串拼接来构建富用户界面，从而导致大量让人讨厌的代码，并且容易出现错误。庆幸的是，一只橙色小鸟站了出来，它说，“有没有比这更好的方式？我们不能通过某种方式把展示从数据中分离出来吗？”，就这样，模板进入了小鸟的世界。橙色小鸟通过借用人类的模板库，例如 Underscore.js 和 [Handlebar.js](http://handlebarsjs.com/) 来满足这种需求。

<!-- However, during a recent invasion the pigs stole the birds' templating libraries! As a result, one of the Orange Birds has been tasked to reclaim what has been stolen. He will use his exploding power to help destroy the pigs in order to take back what is theirs. -->
然而，在最近的一次入侵中，猪群偷走了小鸟们的模板库！现在，一只橙色小鸟被派去夺回失窃的模板库。它将用爆炸性的力量摧毁猪群，夺回属于它们的东西。

<!-- ## Why Use a Templating Engine? -->
## 为什么要使用模板引擎？
<!-- Before we get into what templating engines I recommend let's first look into why we might need one in the first place. The more I develop I try to find ways to separate the various parts of my application. I start to feel dirty when too much stuff is going on in the same place. Take a look at the following piece of code and tell me how you feel... -->
在开始模板引擎之前，我建议先看看为什么需要模板引擎。我开发的越多，就越想试图找到将应用的各个部分分开的方式。当太多的东西在同一个地方运行中，我开始觉得恶心。看看下面这段代码，然后告诉我你的感受...

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=before.js">
  </script>

<!-- Yeah, I don't like all of the string concatenation either. I prefer not to have a bunch of presentation inside of my code if I can help it. On the plus side, it does work. You can see the output of the code in the following embedded jsFiddle. -->
是的，我不喜欢所有的字符串拼接。如果可能的话，我不希望在我的代码里出现一堆展现。唯一好的一面是它可以工作。你可以在下面的内嵌 jsFiddle 中看到这段代码的输出。

  <iframe allowfullscreen="allowfullscreen" frameborder="0" height="200" src="http://jsfiddle.net/B4fJB/embedded/result,js,html" width="100%">
  </iframe>

<!-- So, what can we do instead? This is where some type of templating engine can help us simplify our code and separate our markup from our code. -->
那么，我们能做些什么呢？某些类型的模板引擎对此能有所帮助，它们可以帮助我们简化代码，并从代码中分离标记。

## Underscore.js
<!-- ![](http://1.bp.blogspot.com/-t24RSU2yVNo/UWBpxcuBmUI/AAAAAAAAZ1I/1GQ-k_JuODA/s1600/underscore.png) -->
![](http://1.bp.blogspot.com/-t24RSU2yVNo/UWBpxcuBmUI/AAAAAAAAZ1I/1GQ-k_JuODA/s320/underscore.png)

<!-- We will first look at the template method in the Underscore.js library. I tend to use Underscore in all of my projects these days so I already have the power of its templating engine loaded. If what I am doing is pretty simple, then I mostly default to use Underscore for templating. However, as you'll see there are some limitations which make the next library we will look at much more appealing. -->
我们首先看看 Underscore.js 中的模板方法。目前我倾向于我的所有项目中使用 Underscore，所以我已经掌握了它的模板引擎。如果我正在做的事情很简单，那么通常我会默认使用 Underscore 的模板引擎。然而，你会看到它有一些局限性，使得我们看的下一个库更吸引人。

<!-- ### Take 1 -->
### 示例1
<!-- The following is the above code rewritten using Underscore's template. You'll notice that the code piece has been greatly simplified! Whoo hooo!-->
下面是将上面的代码用 Underscore 的模板重写后的代码。你会注意到代码块已经大大简化。Whoo hooo！

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=underscore-before.js">
  </script>

<!-- ![](http://3.bp.blogspot.com/-3Kf0njai3FE/UWQqiAbjkII/AAAAAAAAZ5I/uqisM5XsOCQ/s1600/Inflated_orange_bird_sprite.png) -->
![](http://3.bp.blogspot.com/-3Kf0njai3FE/UWQqiAbjkII/AAAAAAAAZ5I/uqisM5XsOCQ/s200/Inflated_orange_bird_sprite.png)

<!-- The bulk of the work is being done by the template to explode it into a bunch of markup! As you can see to the left our orange bird looks quite different now lolz ;) -->
大部分工作由模板完成，模板则爆裂成一堆标记！正如你在左侧看到的，我们的橙色小鸟现在看起来完全不同了 ;)

<!-- We moved the layout into a `script` tag in our markup and gave it an identifier. The template has special markers `&lt;%= expression %&gt;` to denote where it should evaluate data passed to it. You can also use the `&lt;% statements %&gt;` symbols to put whatever JavaScript you want in there (think loops, branching, etc...)! -->
我们将布局移动到标记中的一个 `script` 标签中，并赋予它一个唯一标识。模板中的特殊标记 `<%= expression >` 表示传入数据的展现位置。你也可以用 `<% statements >` 语法放置任意 JavaScript（例如循环、分支等）！

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=underscore-before.html">
  </script>

<!-- ![](http://3.bp.blogspot.com/-g0AGryuJAFE/UWB-rxhthnI/AAAAAAAAZ1g/o57Bn_sUSx8/s1600/with_great_power_comes_great_responsibility_by_itomibhaa-d4lajvl.png) -->
![](http://3.bp.blogspot.com/-g0AGryuJAFE/UWB-rxhthnI/AAAAAAAAZ1g/o57Bn_sUSx8/s320/with_great_power_comes_great_responsibility_by_itomibhaa-d4lajvl.png)

<!-- You can play around with the above code snippets in [jsFiddle](http://jsfiddle.net/wkH3k/). -->
你可以在 [jsFiddle](http://jsfiddle.net/wkH3k/) 中试验上面的代码片段。

<!-- As Uncle Ben said, "With great power, comes great responsibility." -->
正如 Uncle Ben 所说，“能力越大，责任就越大。”

<!-- Being able to put whatever code you want in your template isn't the best idea in the world. By putting the date manipulation logic in the template it makes it really tough to Unit Test that piece of code. Just imagine if we started cluttering our template with more and more code blocks that like. If you go this route, then you aren't really solving the original problem at hand which was combining presentation and logic.  -->
允许在模板中放置任意代码终究不是最好的注意。在模板中放置数据操作逻辑会导致单元测试非常难以进行。试想一下，如果我们开始用越来越多的代码块把模板搞的凌乱不堪，情况会怎么样。如果你选择了这条路，那么你并没有真正解决最初的手头问题，即展示和逻辑混在一些。

<!-- ### Take 2 -->
### 示例2
<!-- The following is another take at using Underscore, but this time doing the data manipulation before. The downside is that I'm using the `_.map()` method and converting each date property to the relative version. There is some overhead in me having to loop over the data before handing it off to the templating engine. -->
下面是使用 Underscore 的另一个示例，但是这次是先做数据操作。在下面代码中，我用 `_.map()` 方法把每个 date 属性转换为合适的版本。在把数据传给模板之前遍历数据会导致一些性能开销。

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=underscore-after.js">
  </script>

<!-- We were able to remove the date logic in the following template since we did that work above in the JavaScript before calling the template to do its work. The result is better than what we started with, but it could be better.  -->
我们可以移除下面模板中的数据逻辑，因为在调用模板之前，我们已经的在上面的 JavaScript 中完成了这项工作。结果比最初的版本要好，但还可以更好。

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=underscore-after.html">
  </script>

<!-- You can play around with the above code snippets in [jsFiddle](http://jsfiddle.net/auBUX/). -->
你可以在 [jsFiddle](http://jsfiddle.net/wkH3k/) 中试验上面的代码片段。

<!-- ### Why use Underscore.js? -->
### 为什么使用 Underscore.js？
<!-- #### Pros -->
#### 赞成
<!-- 
You can stick arbitrary JavaScript in the template
It is very small
If you are already using Backbone.js then you have it
If you are already using Underscore.js then you have it
You can Compile the Templates
Can Run on the Client and the Server
Can you think of others? 
-->
<ul>
<li>你可以在模板中使用任意 JavaScript</li>
<li>非常小</li>
<li>如果你已经在使用 Backbone.js，那么可以直接使用它。</li>
<li>如果你已经在使用 Underscore.js，那么可以直接使用它。</li>
<li>你可以预编译</li>
<li>可以同时运行在客户端和服务端</li>
<li>你能想到其他的吗？</li>
</ul>
<!-- #### Cons -->
#### 反对
<!-- 
You can stick arbitrary JavaScript in the template
Doesn't have the concept of `this` in templates
Can you think of others?
-->
<ul>
<li>你可以在模板中使用任意 JavaScript</li>
<li>模板中没有 `this` 的概念</li>
<li>你能想到其他的吗？</li>
</ul>

## Handlebars.js
<!-- ![](http://1.bp.blogspot.com/-ads8NbsvuFk/UWBqEezk1kI/AAAAAAAAZ1Q/N-LZmHnRDzM/s1600/handlebars_logo.png) -->
![](http://1.bp.blogspot.com/-ads8NbsvuFk/UWBqEezk1kI/AAAAAAAAZ1Q/N-LZmHnRDzM/s320/handlebars_logo.png)

<!-- Overall I tend to prefer the Handlebar.js over Underscore's template engine. Handlebars encourages you to separate your presenting from your logic, it is faster, and it provides a mechanism to precompile your templates that we will look at here in a bit. -->
总体而言，我倾向于选择 Handlebar.js 而不是 Underscore 的模板引擎。Handlebars 鼓励你分离展现和逻辑，并且速度更快，并且提供了一种预编译模板的机制，我们将对此做稍微深入的研究。

<!-- First let's take another look at the problem we have been addressing throughout this post. The following code uses Handlebars to template the solution. The code is still pretty clean as was the previous version. You'll notice that I am defining a custom helper called `fromNow` that can be used in the template. -->
首先，让我们换个角度看看这篇文章想解决的问题。下面的代码用 Handlebars 来模版化解决方案。这段和之前的版本一样干净。你会注意到，我自定义了一个称为 `fromNow` 的 helper，可以用在模板中。

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=handlebars.js">
  </script>

<!-- And now for the templating syntax below. The syntax feels much more terse to me compared to Underscore, which I like. Inside the template we are using the `fromNow` template helper to convert the time. This is nice so we don't have to map over our array beforehand like we did with Underscore or put the logic in the template itself. -->
现在看看下面的模板化语法。这种语法与 Underscore 相比更加简洁，这正是我喜欢的。在模板内部，我们使用模板 helper `fromNow` 转换时间。这么做非常好，因为这样我们就不需要事先遍历数组了，就像我们在使用 Underscore 或把逻辑放入模板时做的。

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=handlebars.html">
  </script>

<!-- You can play around with the above code snippets in [jsFiddle](http://jsfiddle.net/UeWHb/). -->
你可以在 [jsFiddle](http://jsfiddle.net/UeWHb/) 中试验上面的代码。

<!-- ### Precompiling Your Templates -->
### 预编译模板

<!-- ![](http://2.bp.blogspot.com/-0c96euSzkrg/UWB2qOZsEHI/AAAAAAAAZ1Y/__iqDNw7IwE/s1600/batman-unicorn-dolphins.jpg) -->
![](http://2.bp.blogspot.com/-0c96euSzkrg/UWB2qOZsEHI/AAAAAAAAZ1Y/__iqDNw7IwE/s320/batman-unicorn-dolphins.jpg)

<!-- I briefly mentioned above that one of the things I liked was that you can precompile your templates. What does that even mean!?! Well, with both Underscore and Handlebars you need to compile your template before you use it (technically you can do it in one step with Underscore, but it still has to be done under the covers). Compiling a template is good to do if you plan on using it more than once or if you just want it done before you need it.  -->
我在前面简要的提到过，我喜欢 Handlebars 的原因之一是，它可以预编译模板。这是什么意思！？！ Underscore 和 Handlebars 都需要你使用模板之前先编译模板（使用 Underscore 时你可以用一个步骤完成，但是在内部仍然需要先编译）。如果你打算多次重用模板，或者你只是希望模板在需要之前已经就绪，那么编译模板是很好的做法。

<!-- However, with Handlebars you can go one step further and compile the template on the server and include that on the front-end. This means that you can reduce that amount of work needed on the front-end AND there is a trimmed down version of the handlebars runtime that you can use that has only the parts necessary needed to execute a template (not compile it)! -->
然而，对 Handlebars 的使用可以走得更远，你可以在服务端编译模板，然后在前端应用它。这意味着可以减少大量的前端工作量，并且你可以使用 Handlebars 的运行时精简版本，其中只包含了执行模板（不是编译模板）所必需的部分。

How cool is that? If your answer was "It's just about as cool as Batman riding on a Rainbow Unicorn alongside dolphins!", then you were right! Congratulations ;)
这太酷了，不是吗？如果你的答案是“这就像蝙蝠侠骑着彩虹独角兽和海豚在一起一样！”，那么你是对的，恭喜 ;)

So how does that work exactly? Well, first you install Handlebars on your server using Node...
那么，它到底是如何工作的？好吧，首先你在服务器上用 Node 安装 Handlebars...

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=install-handlebars.sh">
  </script>

<!-- Then you take your template contents (what is between the `script` tags) and save it to a file. In our case let's save it as `tweets.tmpl`. How run the `handlebars` precompiler against your template file. -->
然后提取模板内容（`script` 标签之间）并保存到一个文件中。在这里我们把它保存为 `tweets.tmpl`。现在运行 `handlebars` 预编译模板文件。

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=precompile-handlebars.sh">
  </script>

<!-- Once all of that is done you have a precompiled version of your template that you can now include on your front-end application like the following... -->
所有动作完成后，你得到了模板的一个预编译版本，现在你可以在前端应用中应用它，就像下面这样...

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=handlebars-precompile-include.html">
  </script>

Now that your template is available on the page you can access it by asking `Handlebars` for the precompiled version and you are all set to start using it!
现在，你的模板在页面上可访问的，你可以通过请求 `Handlebars` 得到预编译版本，现在你完全可以开始使用它了。

  <script src="https://gist.github.com/elijahmanor/5324961.js?file=handlebars-precompile-include.js">
  </script>

<!-- ### Why use Handlebars.js? -->
### 为什么使用 Handlebars.js？
<!-- #### Pros -->
#### 赞成
<!-- 
Its a Logic-less Template Engine
You can Precompile Templates on the Server
Supports Helper methods
Can Run on the Client and the Server
Supports the concept of `this` in templates
It iss a superset of Mustache.js
Can you think of others?
-->
<ul>
<li>它是一个弱逻辑模板引擎</li>
<li>你可以在服务端预编译模板</li>
<li>支持 Helper 方法</li>
<li>可以运行在客户端和服务端</li>
<li>在模板中支持 `this` 的概念</li>
<li>它是 Mustache.js 的超集</li>
<li>你能想到其他的吗？</li>
</ul>

<!-- #### Cons -->
#### 反对
<!-- Can you think of any? -->
<ul>
<li>你能想到任何理由吗？</li>
</ul>

<!-- ## What About Other Templating Engines? -->
## 其他模板引擎怎么样？
<!-- That is a great question. Maybe your needs are different than mine or maybe you just don't like one of the engines that I've mentioned. If that is the case then you should check out a great tool created by Garann Means ([@garannm](http://twitter.com/garannm)) called the [Template Chooser](http://garann.github.io/template-chooser/). The chooser will ask you a set of questions that will help determine which templating engine is right for your needs. The following is an example of what the chooser looks like... -->
这个是一个好问题。也许你的需求和我的不同，或者你只是不喜欢某个我提到的模板引擎。如果是这样的话，那么你应该看看 Garann Means ([@garannm](http://twitter.com/garannm)) 创建的[模板选择器](http://garann.github.io/template-chooser/)，这是一个伟大的工具。选择器将询问你一组问题，来辅助判断哪个模板引擎适合你的需求。选择器看起就像下面的例子...

<!-- ![](http://2.bp.blogspot.com/-n_FEUjxHn_s/UWBZDHPelKI/AAAAAAAAZ04/67e-eXyZ3K4/s1600/template-chooser.png) -->
![](http://2.bp.blogspot.com/-n_FEUjxHn_s/UWBZDHPelKI/AAAAAAAAZ04/67e-eXyZ3K4/s640/template-chooser.png)

<!-- ## Additional Resources -->
## 其他资源
<ul>
  <li>
    <a href="http://net.tutsplus.com/tutorials/javascript-ajax/introduction-to-handlebars/" target="_blank">
      An Introduction to Handlebars
    </a>
    by Gabriel Manricks (<a href="http://twitter.com/GabrielManricks" target="_blank">@GabrielManricks</a>)
  </li>
  <li>
    <a href="http://net.tutsplus.com/tutorials/javascript-ajax/best-practices-when-working-with-javascript-templates/" target="_blank">Best Practices When Working With JavaScript Templates</a>
    by Andrew Burgess (<a href="http://twitter.com/andrew8088" target="_blank">@andrew8088</a>)
  </li>
  <li>
    <a href="http://css.dzone.com/articles/demo-handlebars-and-why-you" target="_blank">Demo of Handlebars, and Why You Should Consider a Templating Engine</a>
    Raymond Camden (<a href="http://twitter.com/cfjedimaster" target="_blank">@cfjedimaster</a>)
  </li>
  <li>
    <a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/" target="_blank">
      HTML's New Template Tag: Standardizing Client-Side Templating 
    </a>
    by Eric Bidelman (<a href="http://twitter.com/ebidel" target="_blank">@ebidel</a>)
  </li>
</ul>

<!-- ## Attack! -->
## 攻击！
下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the <code>space bar</code> to launch the Orange Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射橙色小鸟，你也可以使用方向键。

[![](http://1.bp.blogspot.com/-PMJoeP3U0iU/UWCIzvwEXlI/AAAAAAAAZ1w/kJjp8Fd0ouQ/s1600/4-6-2013+3-41-27+PM.png)](http://jsfiddle.net/U3qVB/show)

<!-- ## Conclusion -->
## 结论
<!-- Mixing markup in code can lead to some nasty looking code that is cumbersome, monotonous, and difficult to maintain. Being able to split these apart is a great benefit for developers to simplify their code and help keep each concern in its place. Thankfully libraries like Underscore and Handlebars help us out by providing a clean way to describe presentation apart from logic. THere is a lot of freedom depending on what library you use, but I'd encourage you to look around and find one that works for you. The answer to that may be not to use one and that is fine.  -->
在代码中混入标记会导致一些让人讨厌的代码，这样的代码繁琐、单调，并且难以维护。能够分离各个部分的能力，给开发人员简化代码并保证各部分各司其职带来了极大的好处。值得庆幸的是，像 Underscore 和 Handlebars 这样的库提供了一种清晰的方式，将展现描述从逻辑中分离出来。你可以自由选择使用什么库，但是我鼓励你多进行一些比较，找到最适合你的库。因此这个问题的答案可能是不仅仅使用一个库，这才是一个不错的选择。

<!-- There are many other front-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有许多其他的前端架构技术被猪群偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!

> [@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 补充：Dun, dun, daaaaaaaaaa! 应该是在模拟背景音乐，类似于这种 <http://missingno.ocremix.org/musicpages/game_on.html>


