---
layout: post
title: "代码质量"
tagline: "Coding Standard, Linting, Analysis"
description: "前端 Web 应用可以很快变得相当复杂。如果开发人员不能达成共识，事情可能马上土崩瓦解，特别是在一个大型项目中。形成统一的代码标准和使用一些工具来避免问题，才能真正有助于项目成功。"
category-substitution: 翻译
tags: [翻译, "Angry Birds of JavaScript", "JavaScript", "Web", "JSHint"]
published: true

short: "代码质量"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: White Bird Linting](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-white-bird.html)

> 私货：[nuysoft/Aristotle](https://github.com/nuysoft/Aristotle)

<!-- ## Introduction -->
## 简介

![](http://4.bp.blogspot.com/-hbs_feLNzNE/UVx7DKXG-cI/AAAAAAAAZug/vDk6cFJ7Jgk/s1600/angry_birds_wall_decal_by_graphicwolf-d4fwzrc.jpg)    
<!-- ![](http://4.bp.blogspot.com/-hbs_feLNzNE/UVx7DKXG-cI/AAAAAAAAZug/vDk6cFJ7Jgk/s400/angry_birds_wall_decal_by_graphicwolf-d4fwzrc.jpg) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript!
小鸟们最终会成功吗？它们会打败那些培根味儿的敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

> 译注：翻译“bacon flavored foe”时，想起来了《少林足球》里的“做人如果没有梦想，那跟咸鱼有什么区别？”，就翻译成了“咸猪敌人”，[@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 建议翻译为“培根味儿的敌人”，应该更准确和有趣些。

<!-- > Check out the [series introduction post] for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章]**，查看所有小鸟以及它们的攻击力。

[series introduction post]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html
[系列介绍文章]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html

<!-- ![](http://3.bp.blogspot.com/-c3JawpCl3ys/UVx7L_dMWxI/AAAAAAAAZuo/YEClyACJaZg/s1600/white-bird.png) -->
![](http://3.bp.blogspot.com/-c3JawpCl3ys/UVx7L_dMWxI/AAAAAAAAZuo/YEClyACJaZg/s1600/white-bird.png)

<!-- ### Previous Attacks -->
### 战报
* [Red Bird - IIFE](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html)
* [Blue Bird - Events](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html)
* [Yellow Bird - RequireJS](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)
* [Black Bird - Backbone](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)

<!-- ### White Bird Attacks -->
### 白鸟的攻击
<!-- In this post we will take a look at the White Bird who appears to be seemingly harmless, but when it pulls out it's strict coding style and bursts of quality checks the hogs are sure to squeal. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这篇文章中，我们将看看白鸟，它看似无害，但当它祭出严格编码风格和质量突击检查时，猪群无疑要开始尖叫了。渐渐的，小鸟们将一个接一个地夺回属于它们的东西。

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- The birds all learned how to program in a slightly different way. Some birds were self-taught and some birds went to college for computer science. Even among those groups there were a wide range of experiences and talent. When the birds got together to build their first large application it was a huge disaster. Each bird thought their coding standard was the "right way" and it started to become an issue. One day a wise White Bird came along and suggested that they come up with a common set of coding practices to follow. In addition, the White Bird introduced a few tools to help them conform to a standard and to help find issues and concerns early before they became a huge issue later. -->
小鸟们学习如何编程的方式略有不同。有些小鸟是自学成才，而有些小鸟则是上大学学习计算机科学。即使这些群体中不乏经验丰富和才华惊艳之才，但是当小鸟们聚在一起构建它们的第一个大型应用时，这变成了一场巨大的灾难。每个小鸟都认为它们的编码标准才是正确的方法，这种想法导致了问题和冲突。有一天出现了一只智慧的白鸟，它建议大家制定一套通用的编码实践并遵循它。此外，这只白鸟还引入了一些工具，来帮助大家确立标准和发现问题，并提前关注可能恶化的问题。

<!-- However, during a recent invasion the pigs stole the birds' coding standards document and their code quality tools! As a result, one of the White Birds has been tasked to reclaim what has been stolen. He will use his overwhelming power of quality to help destroy the pigs in order to take back what is theirs. -->
然而在最近的一次入侵中，猪群偷走了小鸟们的编码标准文档和代码质量工具！现在，一只白鸟被派去夺回被盗的文档和工具。它将用压倒性的质量之力摧毁猪群，夺回属于它们的东西。

<!-- ## JavaScript Coding Standards -->
## JavaScript 编码标准
<!-- There are many coding standards out there to choose from. The most important thing is that you pick one and stick to it. If you are working with a team, they should also agree on some standard. If you can't find a standard you exactly agree on, then find one that is close and make some exceptions. -->
有很多编码标准可供选择。重要的是选择一个并坚持下去。如果是你在一个团队中，其他成员也应该在某些标准上达成一致意见。如果找不到大家都同意的标准，那么选择一个近似的，并允许有一些例外。

<!-- By doing so you'll find that... -->
通过这样做你会发现...
<!-- 
A developer will be able to make sense of other code more quickly
Merges in your code repository won't be as awful
Having a standard will actually reduce defects
The codebase will feel more unified
Disagreements about who is "right" will lessen
... insert your benefit here ... 
-->
<ul>
<li>开发人员将能更块的理解其他人的代码</li>
<li>合并代码库不再是一件可怕的事</li>
<li>建立标准确实可以减少缺陷</li>
<li>代码库更统一</li>
<li>关于谁才是正确的分歧将减少</li>
<li>...写下你发现的好处...</li>
</ul>


<!-- Here are some of the coding standards that I am aware of... -->
这里有一些我知道的编码标准...

<!-- * Douglas Crockford's [Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html)
* **Rich Waldron's ([@rwaldron](http://twitter.com/rwaldron)) [Idiomatic.js - Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js) &#8592; Recommended**
* ** jQuery's [JavaScript Style Guide ](http://contribute.jquery.org/style-guide/js/?rdfrom=http%3A%2F%2Fdocs.jquery.com%2Fmw%2Findex.php%3Ftitle%3DJQuery_Core_Style_Guidelines%26redirect%3Dno) &#8592; Recommended**
* Google's [JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) -->

* Douglas Crockford 的 [JavaScript 编程语言代码约定]
* **Rich Waldron（[@rwaldron]）的 [Idiomatic.js - 通用一致的 JavaScript 编写原则](https://github.com/rwldrn/idiomatic.js) &#8592; 推荐**
* **[jQuery 的 JavaScript 风格指南] &#8592; 推荐**
* [Google 的 JavaScript 风格指南]

[JavaScript 编程语言代码约定]: http://javascript.crockford.com/code.html
[@rwaldron]: http://twitter.com/rwaldron
[Idiomatic.js - 通用一致的 JavaScript 编写原则]: https://github.com/rwldrn/idiomatic.js
[jQuery 的 JavaScript 风格指南]: http://contribute.jquery.org/style-guide/js/?rdfrom=http%3A%2F%2Fdocs.jquery.com%2Fmw%2Findex.php%3Ftitle%3DJQuery_Core_Style_Guidelines%26redirect%3Dno
[Google 的 JavaScript 风格指南]: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml


<!-- Addy Osmani ([@addyosmani](http://twitter.com/addyosmani)) has a nice post entitled [JavaScript Style Guides And Beautifiers](http://addyosmani.com/blog/javascript-style-guides-and-beautifiers/) that covers some of these styles in depth with examples showing how to abide by the standards recommended. -->
Addy Osmani 曾写过一篇很棒的文章 [JavaScript 风格指南和美化工具]，深入地阐述了各种代码风格，并用示例演示了如何遵守推荐的标准。

[JavaScript 风格指南和美化器]: http://addyosmani.com/blog/javascript-style-guides-and-beautifiers/

## JavaScript Linting
<!-- A linter is a tool that helps find errors and possible issues with your code. In many cases it can help enforce whatever coding standard you chose from the above list. -->
Linter 工具可以帮助查找代码中的错误和潜在问题。通常 Linter 还可以帮助你实施编码标准，无论你选择的是上述列表中的哪种编码标准。

<!-- There are actually several JavaScript linters out there, but the one I like the best is [JSHint](http://jshint.com/) created by Anton Kovalyov ([@valueof](http://twitter.com/valueof)). It grew out of a community effort to fork the popular JSLint library written by Douglas Crockford. I've enjoyed watching the project grow and see bugs and new features being added. JSHint has a lot of options that you can choose to opt-in or opt-out of which enables a team to figure out what works best for them. -->
实际上有几种 JavaScript Linter 可供选择，其中我最喜欢的是 Anton Kovalyov 创建的 [JSHint]。JSHint 是社区共同努力的成果，前身是广受欢迎的 JSLint 库，由 Douglas Crockford 编写。关注这个项目的成长过程让我很享受。JSHint 有大量的选项，你可以选择开启或禁用，然后找出最适合团队的配置。

[JSHint]: http://jshint.com/
[@valueof]: http://twitter.com/valueof

<!-- Some of the standard checks that JSHint can verify include... -->
JSHint 可以执行的标准检查包括...

<!-- * The use of `===` instead of `==`
* Using variables that aren't defined
* Declaring variables that are never used
* Declaring functions inside of loops
* And lots more... -->
<ul>
<li>用 <code>===</code> 代替 <code>==</code></li>
<li>使用未定义的变量</li>
<li>声明未使用的变量</li>
<li>在循环中声明函数</li>
<li>还有很多...</li>
</ul>

<!-- For a full list of options see the [JSHint Docs](http://jshint.com/docs/). -->
完整的选项列表请参阅 [JSHint 文档]。

[JSHint 文档]: http://jshint.com/docs/

<!-- Some of the more recent additions that I've really enjoyed include: -->
我很喜欢最近添加的一些选项，包括：

<!-- 
* `maxcomplexity` - Maximum cyclomatic complexity (see following Wikipedia quote)
* `maxstatements` - Maximum number of statements allowed in a function
* `maxparams` - Maximum number of parameter allowed in a function
* `maxdepth` - Maximum depth allowed in a function
* `maxlen` - Maximum length of line in code
 -->
* `maxcomplexity` - 最大循环复杂度（参见后面引用的维基百科）
* `maxstatements` - 函数允许的语句条数最大值
* `maxparams` - 函数允许的参数个数最大值
* `maxdepth` - 函数允许的最大深度
* `maxlen` - 单行代码的最大长度

<!-- > "The cyclomatic complexity of a section of source code is the count of the number of linearly independent paths through the source code." -- [http://en.wikipedia.org/wiki/Cyclomatic_complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity) -->
> “一段代码的循环复杂度是指代码中线性独立路径的个数。” -- [http://en.wikipedia.org/wiki/Cyclomatic_complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity)

  <script src="https://gist.github.com/elijahmanor/5307478.js?file=jshint.js">
  </script>

<!-- The following errors are generated by JSHint after running it against the above code snippet. -->
JSHint 在检查上面的代码片段后生成下面的错误：

![](http://1.bp.blogspot.com/-Jj5KYftluoQ/UVz04mayIXI/AAAAAAAAZvQ/P9diYW0g8UE/s1600/4-3-2013+10-33-12+PM.png)
<!-- ![](http://1.bp.blogspot.com/-Jj5KYftluoQ/UVz04mayIXI/AAAAAAAAZvQ/P9diYW0g8UE/s640/4-3-2013+10-33-12+PM.png) -->

<!-- Thankfully you don't have to run JSHint from the website every time to check your code. There are several ways to integrate it into your code editor of choice: -->
幸运的是， 你不必每次都运行 JSHint 来检查整个网站的代码。有几种方式可以将 JSHint 集成到你的代码编辑器：

* VIM Plugin ([jshint.vim](https://github.com/walm/jshint.vim))
* Sublime Text 2 Extension ([Sublime Linter](https://github.com/Kronuz/SublimeLinter))
* TextMate Bundle ([JSHint TextMate Bundle](http://fgnass.posterous.com/jslint-in-textmate))
* Visual Studio [Web Essentials](http://vswebessentials.com/)
* Eclipse IDE ([JSHint Integration](http://github.eclipsesource.com/jshint-eclipse/))

<!-- > In the Mighty Eagle post we'll talk about another way to use the JSHint from the command line and automatically. -->
> 在无敌神鹰一文中，我们将谈论使用 JSHint 的另一种方式：命令行，以及如何使 JSHint 自动化。

## JavaScript Analysis
<!-- Code linting is great, but sometimes it is nice to get a high level overview of your codebase and then be able to drill down and analyze small portions of your application. -->
代码 Linting 很棒，但有时我们希望能看到代码库的简要概览，并且可以深入分析代码的一小部分。

<!-- Thankfully there is a tool called [Plato](https://github.com/jsoverson/plato) that will analyse your code and provide a visual report where you can view the complexity of your application. The tool runs in Node and you can install it using `npm install plato -g`. -->
幸运的是有一个叫 [Plato] 的工具可以分析你的代码，并提供可视化的报表，你可以通过报表浏览应用的复杂度。这个工具需要 Node 环境，通过 `npm install plato -g` 安装。

> 译注：Plato - 柏拉图（古希腊哲学家）。

[Plato]: https://github.com/jsoverson/plato

<!-- Once installed you can run the tool on the command line by `plato -r -d report myDirectory` , which will recursively analyse the code in the `myDirectory` folder and export the results to the `report` folder. -->
安装 Plato 之后，你可以在命令行中运行 `plato -r -d report myDirectory`，将递归分析 `myDirectory` 目录中的代码，并将结果导出到 `report` 目录。

<!-- If you were to run the report on the jQuery source code it would look much like the following report. As you can see, the average number of lines is decreasing over time, which is good. The maintainability is decent and then a breakdown of the maintainability of each JavaScript file is listed in a bar chart. Further down in the report there are a bar charts for Lines of code broken per file, Estimated errors per file, and also JSLint errors per file. -->
如果你在 jQuery 的源代码上运行 Plato，将生成类似下面的报告。正如你所见，平均代码行数随着时间减少，这是个好现象。可维护性也不错，然后柱状图详细列出了每个 JavaScript 文件的可维护性。再往下的柱状图列出了每个文件的代码行数、每个文件的预计错误数，以及每个文件的 JSLint 错误数。


[![](http://2.bp.blogspot.com/-WfsE5xqGhjc/UV0Fi3Kd9vI/AAAAAAAAZvg/IWnkno7LaK8/s640/jquery-top-level.png)](http://2.bp.blogspot.com/-WfsE5xqGhjc/UV0Fi3Kd9vI/AAAAAAAAZvg/IWnkno7LaK8/s1600/jquery-top-level.png)

<!-- If you drill into one of the particular files from above you'll see a view that looks like the following. The nice part about this report is that it breaks down each function into complexity and lines of code in a way that is easy to grasp. You can quickly jump to various parts of the file to review the concerns the tool is identifying. -->
如果深入到某个文件，你将看到下面的视图。这份报告最棒的地方是用一种容易掌握的方式展示了每个函数的复杂度和代码行数。你可以快速跳到文件的不同部分，审查该工具标识出的关注点。

[![](http://2.bp.blogspot.com/-GHHmjChHTdo/UV0Fn9yzTwI/AAAAAAAAZvo/qMwHcRxb3p8/s640/jquery-drill-complexity.png)](http://2.bp.blogspot.com/-GHHmjChHTdo/UV0Fn9yzTwI/AAAAAAAAZvo/qMwHcRxb3p8/s1600/jquery-drill-complexity.png)


<!-- You can view the above [jQuery Report](http://jsoverson.github.com/plato/examples/jquery/) from Plato's GitHub repository. -->
你可以到 Plato 的 GitHub 库查看上面的 [jQuery 报告]。

[jQuery 报告]: http://jsoverson.github.com/plato/examples/jquery/

<!-- ## Attack! -->
## 进攻！

下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

> Press the `space bar` to launch the White Bird and you can also use the arrow keys.
> 按下`空格键`来发射白鸟，你也可以使用方向键。

[![](http://3.bp.blogspot.com/-eLUAASpDUy0/UV0NIExF6RI/AAAAAAAAZwA/uCKAm54p5W4/s640/Screenshot+on+4.4.2013+at+12.14.59+AM.png)](http://jsfiddle.net/4QG5Q/1/show)

<!-- ## Conclusion -->
## 结论
<!-- Front-end web applications can get complicated quickly. If your developers aren't all on the same page then things can fall apart in a heartbeat, especially on a large project. Having a unified coding standard and implementing some tools to help find issues before they become a problem can really help to make your project a success.  -->
前端 Web 应用可以很快变得相当复杂。如果开发人员不能达成共识，事情可能马上土崩瓦解，特别是在一个大型项目中。形成统一的代码标准和使用一些工具来避免问题，才能真正有助于项目成功。

<!-- There are many other front-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有很多其他前端架构技术被猪偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!

> [@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 补充：Dun, dun, daaaaaaaaaa! 应该是在模拟背景音乐，类似于这种 <http://missingno.ocremix.org/musicpages/game_on.html>

