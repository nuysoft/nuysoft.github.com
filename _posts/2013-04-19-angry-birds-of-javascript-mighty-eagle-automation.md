---
layout: post
title: "自动化"
tagline: "Automation"
description: "拥抱 Grunt、Bower 和 Yeoman 可以帮助自动化开发、测试、部署过程中的各个环节。"
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript"]

short: "自动化"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Mighty Eagle - Automation](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-mighty-eagle.html)

<!-- ## Introduction -->
## 简介
![](http://2.bp.blogspot.com/-N7kG4eOFXzA/UWED8Hv6eiI/AAAAAAAAZ2g/bzakzkoKQgc/s1600/Angry-Birds-for-iOS-Mighty-Eagle-screenshot.png)
<!-- ![](http://2.bp.blogspot.com/-N7kG4eOFXzA/UWED8Hv6eiI/AAAAAAAAZ2g/bzakzkoKQgc/s400/Angry-Birds-for-iOS-Mighty-Eagle-screenshot.png) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- Will the birds be successful in the end? Will they defeat their bacon flavored foe? Let's find out together in another nail biting episode of Angry Birds of JavaScript! -->
小鸟们最终会成功吗？它们会打败那些咸猪敌人吗？让我们一起揭示 JavaScript 之愤怒的小鸟系列的另一个扣人心弦的章节！

<!-- > Check out the **[series introduction post]** for a list of all the birds and their attack powers. -->
> 阅读**[系列介绍文章](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html)**，查看所有小鸟以及它们的攻击力。

[系列介绍文章]: http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-series.html

![](http://4.bp.blogspot.com/-9CHfr07ovWs/UWEETqEvgSI/AAAAAAAAZ2w/baqRjP09l1c/s1600/angrybirds-eagle.png)
![](http://4.bp.blogspot.com/-9CHfr07ovWs/UWEETqEvgSI/AAAAAAAAZ2w/baqRjP09l1c/s320/angrybirds-eagle.png)

<!-- ### Previous Attacks -->
### 战报
* [Red Bird - IIFE](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html)
* [Blue Bird - Events](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-blue-bird.html)
* [Yellow Bird - RequireJS](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-yellow-bird.html)
* [Black Bird - Backbone](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-black-bird.html)
* [White Bird - Linting](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-white-bird.html)
* [Green Bird - Mocking](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-green-bird.html)
* [Orange Bird - Templating](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-orange-bird.html)
* [Big Brother Bird - Patterns](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-big-brother.html)

<!-- ### Mighty Eagle Bird Attacks -->
### 神鹰的攻击
<!-- In this post we will take a look at the Mightly Eagle who uses the most superior weapon of them all, a suite of tools that can organize and deploy all the other birds into battle against their soon to be vanquished foe. Slowly, one by one, the birds will take back what it theirs to keep! -->
在这篇文章中，我们将看看使用超级武器的神鹰，它用一套工具快速组织和部署其他小鸟到征服猪群的战斗中。渐渐的，小鸟们将一个接一个的夺回属于它们的东西！

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？
<!-- Over time the birds picked up RequireJS (Yellow Bird), JSHint (White Bird), Plato, Mustache (Orange Bird), and a bunch of other great tools, but all of them required a command line task to complete. It was getting quite annoying having to remember what was required to run each of these tools. In addition, it was easy to forget to run the tools to update their web application when necessary. Thankfully one day the Mighty Eagle introduced some tools to make things a little bit easier. The Eagle brought Grunt and Bowser to automate common tasks and to help easily bring in commonly used libraries that were necessary to e their applications.   -->
随着时间的推移，小鸟们拿出了 RequireJS（黄鸟）、JSHint（白鸟）、Mustache（橙鸟）以及一堆其他伟大的工具，然后所有任务都需要一个命令行任务来完成。这很烦人，因为你不得不记住运行每个工具所需的事情。此外，很容易在关键时刻时忘记运行这些工具来更新 Web 应用。值得庆幸的是，有一天神鹰引入了一些工具让事情变得稍微容易一些。神鹰用 Grunt 和 Bowser 自动执行常见任务，并让项目可以很容易的引入必需的常用库。

However, during a recent invasion the pigs stole the birds' Gang of Foul book! As a result, one of the Big Brother Birds has been tasked to reclaim what has been stolen. He will use his overwhelming power of trickery to help destroy the pigs in order to take back what is theirs.

> 译注：这段原文应该有错误，本文介绍的是神鹰的自动化工具，不是大鸟哥的设计模式和有限自动机，因此暂不翻译。

![](http://3.bp.blogspot.com/-CXGuzyWVyk8/UWELb7hUEQI/AAAAAAAAZ3g/joO4tCJ_eyc/s1600/toolset+2.png)
![](http://3.bp.blogspot.com/-CXGuzyWVyk8/UWELb7hUEQI/AAAAAAAAZ3g/joO4tCJ_eyc/s200/toolset+2.png)

## Grunt
<!-- Grunt is a task-based command line tool that is written in JavaScript and helps automate the build of your front-end application. The community has really grabbed on to this tool and as a result there are tons of plugins that you can choose from to automate things like CoffeeScript, handlebars precompilation, less support, JSHint checking, etc... -->
Grunt 是一个基于任务的命令行工具，用 JavaScript 语言编写，用于自动执行前端应用的构建过程。社区被这个工具深深吸引，并产出了大量插件可供选择，例如自动化 CoffeeScript 编译、Handlebars 预编译、Less 支持、JSHint 检查等等...

<!-- Several really large projects already use Grunt to assist their builds and other automation tasks such as Twitter, jQuery, Modernizr, Sauce Labs, and others. -->
事实上已经有几个大型项目在使用 Grunt 辅助自动执行构建过程以及其他任务，例如 Twitter、jQuery、Modernizr、Sauce Labs 等。

<!-- ### Getting Started -->
### 入门指南
<!-- In order to get started you just need to install grunt from node with the following command... -->
首选，你需要在 node 中用下面的命令安装 Grunt...

  <script src="https://gist.github.com/elijahmanor/5331806.js?file=grunt-install.sh">
  </script>

<!-- Once you've installed grunt you'll need 2 main things for each of your projects -->
安装 Grun 之后，每个项目需要两个主要的文件：

* Gruntfile.js
* package.json

#### Gruntfile.js
<!-- You can create your own `Gruntfile.js` from scratch, you can copy a starter Gruntfile.js from the documentation, or there is a use a `grunt-init gruntfile` project scaffold. To install the scaffold follow the instructions from Grunt's [Project Scaffolding](http://gruntjs.com/project-scaffolding) page. The following Gruntfile.js is an example from Grunt's [Get Started](http://gruntjs.com/getting-started) page... -->
你可以从头创建自己的 `Gruntfile.js`，也可以从文件中拷贝一份初始 Gruntfile.js，或者使用项目脚手架 `grunt-init gruntfile`。如何安装脚手架请参阅 Grunt 的[项目脚手架](http://gruntjs.com/project-scaffolding)页面的介绍。下面的 Gruntfile.js 示例来自 Grunt 的[入门指南](http://gruntjs.com/getting-started)页面...

[项目脚手架]: http://gruntjs.com/project-scaffolding
[入门指南]: http://gruntjs.com/getting-started

  <script src="https://gist.github.com/elijahmanor/5331806.js?file=Gruntfile.js">
  </script>

#### package.json
<!-- The `package.json` describes your project's name, version, and any dependencies it might have such as grunt and any grunt plugins. You can copy an example package.json from the Grunt's [Get Started](http://gruntjs.com/getting-started) page... (see below) -->
`package.json` 描述了项目名称、版本，以及可能有的依赖，例如 Grunt 和 Grunt 插件。你可以从 Grunt 的[入门指南]页面拷贝一份 package.json 示例...（如下所示）

  <script src="https://gist.github.com/elijahmanor/5331806.js?file=package.json">
  </script>

<!-- #### Grunt Plugins -->
#### Grunt 插件
<!-- Now that hopefully everything is setup, you can start using a whole suite of plugins to automate tasks. Here are a few interesting ones that you might enjoy... -->
现在一切就绪，你可以使用一整套插件开始自动执行任务。这里有几个有趣的插件，你可以会喜欢...

* grunt-contrib-coffee - 把 CoffeeScript 编译为 JavaScript
<!-- Compile CoffeeScript files into JavaScript -->
* grunt-contrib-compass - 把 Compass 编译为 CSS
<!-- Compile Compass into CSS -->
* grunt-contrib-concat - 合并文件
<!-- Concatenates files -->
* grunt-contrib-connect - 启动一个 Web 服务
<!-- Starts a connect web server -->
* grunt-contrib-csslint - 检查 CSS 文件
<!-- Lints your CSS files -->
* grunt-contrib-handlebars - 预编译 Handlebar 模板
<!-- Precompiles your Handlebar tempaltes -->
* grunt-contrib-htmlmin - 压缩 HTML 代码
<!-- Minify your HTML markup -->
* grunt-contrib-imagemin - 演说 PNG 和 JPEG 图片
<!-- Minify PNG and JPEG images -->
* grunt-contrib-jshint - 用 JSHint 检查文件
<!-- Validate files with JSHint -->
* grunt-contrib-less - 把 LESS 编译为 CSS
<!-- Compile LESS to CSS -->
* grunt-contrib-nodeunit - 运行 Nodeunit 单元测试
<!-- Run Nodeunit unit test -->
* grunt-contrib-watch - 当文件发生变化时运行与定义任务
<!-- Run predefined tasks when files change -->
* grunt-contrib-requirejs - 使用 r.js 优化 RequireJS 项目
<!-- Optimize RequireJS projects using r.js -->
* grunt-contrib-uglify - 用 UglifyJS 压缩文件
<!-- Minify files with UglifyJS -->
* grunt-contrib-yuidoc - 编译 YUIDocs 文档
<!-- Compile YUIDocs Documentation -->
* ... more ...

<!-- #### jQuery's Gruntfile -->
#### jQuery 的 Gruntfile
<!-- I pulled down jQuery from their GitHub repository to see how they use Grunt and the following is the output when get when executing the tool.  -->
我从 GitHub 上拉去了一份 jQuery，用来查看 jQuery 是如何使用 Grunt 的，下面是执行 Grunt 时得到的输出。

![](http://2.bp.blogspot.com/-qdV01Mu1uO4/UWJLrncu2WI/AAAAAAAAZ4A/bges3xKOJ_o/s1600/grunt-jquery.png)
![](http://2.bp.blogspot.com/-qdV01Mu1uO4/UWJLrncu2WI/AAAAAAAAZ4A/bges3xKOJ_o/s640/grunt-jquery.png)

If you look closely you'll notice they update their git submodules, build a version of jQuery from it's modules, run JSHint against the built jquery.js and tests files, creates sourcemaps, and runs a special compare file size task. If you dig deep into their Gruntfile you'll find they've also setup a custom way to run their unit tests against Browserstack, which is pretty cool if you ask me ;)
如果你仔细上面的图看会发现执行了以下任务：更新 Git 子模块（Sizzle、QUnit），构建 jQuery 的一个版本，对构建的 jquery.js 执行 JSHint 检查，创建 Source Maps，并运行一个比较指定的文件大小的任务。如果你深挖 Gruntfile.js 的话，你还会发现它自定义了一种不同于 Browserstack 的方式来运行单元测试。

> 译注：[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html), [Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.1ce2c87bpj24), [Introduction to JavaScript Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/), [BrowserStack](http://www.browserstack.com/)

<!-- #### Modernizr's Gruntfile -->
#### Modernizr 的 Gruntfile
<!-- In the same way I pulled down the Modernizr repository and typed `grunt qunit` to watch their 746 unit tests execute and pass in 369ms using the PhantomJS headless browser! -->
我用同样的方式拉取了 Modernizr 库，然后输入 `grunt qunit` 观察它的 746 项单元测试的测试过程，并在 369ms 内测试通过，测试使用了无界面的浏览器引擎 PhantomJS。

> 译注：[PhantomJS](http://phantomjs.org/), [PhantomJS 中文主页](http://www.cnblogs.com/ziyunfei/archive/2012/09/28/2706061.html)

![](http://1.bp.blogspot.com/-XvfSNrxCTMQ/UWJLxIfNMPI/AAAAAAAAZ4M/AXAjvelHjZQ/s1600/grunt-modernizr.png)
![](http://1.bp.blogspot.com/-XvfSNrxCTMQ/UWJLxIfNMPI/AAAAAAAAZ4M/AXAjvelHjZQ/s640/grunt-modernizr.png)

<!-- ### Grunt Resources -->
### Grunt 资源
<!-- The intent of this post wasn't to teach you all there is to know about Grunt, but to make you aware of it if you didn't know already. It is a very nice tool to help you automatic ALL THE front-end THINGS. Check out the following resources to help you unpack how to get started... -->
这篇文章的目的不是教你了解 Grunt，而是为了让你意识到它的存在，如果你还不知道的话。这个一个非常棒的工具，用来帮助你自动化所有前端事务。参阅下面的资源，可以帮助你理解如何开始...

> 译注：知其意而不能言其意，汗颜呐。

* [The Grunt Basics](http://www.youtube.com/watch?v=q3Sqljpr-Vc) by Cary Landholt ([@carylandholt](http://twitter.com/carylandholt))
* [Grunt.js Workflow](http://merrickchristensen.com/articles/gruntjs-workflow.html) by Merrick Christensen ([@iammerrick](http://twitter.com/iammerrick))
* [Meet Grunt: The Build Tool for JavavScript](http://net.tutsplus.com/tutorials/javascript-ajax/meeting-grunt-the-build-tool-for-javascript/) by Andrew Burgess ([@andrew8088](http://twitter.com/andrew8088))

[![](http://1.bp.blogspot.com/-L7pXsxuBnVA/UWELyS9lG0I/AAAAAAAAZ3w/ptGkkE9j1ms/s200/toolset+3.png)](http://1.bp.blogspot.com/-L7pXsxuBnVA/UWELyS9lG0I/AAAAAAAAZ3w/ptGkkE9j1ms/s1600/toolset+3.png)

## Twitter Bower

> 译注：bower - 凉亭，树阴处

<!-- For those of you that have used Node or Ruby you'll be familiar with npm or gems, however, there hasn't been anything like that for front-end browser scripts and styles... at least until now!  -->
使用 Node 或 Ruby 的开发人员可能已经熟悉了 npm 或 gems，但是对于浏览器脚本和样式没有类似的工具...至少到目前为止！

<!-- The Twitter Bower project seeks to solve that problem by providing a package manager for the web (HTML, CSS, and JavaScript).  -->
Twitter Bower 项目旨在通过 Web（HTML、CSS 和 JavaScript）提供一套包管理器来解决这个问题。

  <script src="https://gist.github.com/elijahmanor/5331806.js?file=bower-install.sh">
  </script>

<!-- Once you've installed bowser, then you can start downloading libraries! For example, if we wanted to pull down the latest version of jQuery we could just `bower install jquery` and you'll see the following... -->
安装 Bower 之后你就可以开始下载库！，例如，我们想拉去最新版本的 jQuery，只需要运行 `bower install jquery`，然后你会看到下面的输出...

[![](http://3.bp.blogspot.com/-s8ERF-X_x70/UWLBuSeWcpI/AAAAAAAAZ4Y/uWUIb5eWuLg/s640/bower-install-jquery.png)](http://3.bp.blogspot.com/-s8ERF-X_x70/UWLBuSeWcpI/AAAAAAAAZ4Y/uWUIb5eWuLg/s1600/bower-install-jquery.png)

[![](http://3.bp.blogspot.com/-Rp0_He-oQgI/UWELh24_5kI/AAAAAAAAZ3o/J8F2Jj_LV4w/s200/toolset+1.png)](http://3.bp.blogspot.com/-Rp0_He-oQgI/UWELh24_5kI/AAAAAAAAZ3o/J8F2Jj_LV4w/s1600/toolset+1.png)

<!-- ### Bower Resources -->
### Bower 资源

<!-- If you want to find out more about bower then I encourage you to check out some of the nice resources below. -->
如果想更多的了解 Bower，建议去看看下面的这些好资源。

* [Meet Bower: A Package Manager For The Web](http://net.tutsplus.com/tutorials/tools-and-tips/meet-bower-a-package-manager-for-the-web/) by Andrew Burgess ([@andrew8088](http://twitter.com/andrew8088))
* [A RequireJS, Backbone, and Bower Starter Template](http://net.tutsplus.com/tutorials/javascript-ajax/a-requirejs-backbone-and-bower-starter-template/) by Jeffrey Way ([@jeffrey_way](http://twitter.com/jeffrey_way))

## Yeoman

> 译注：yeoman -  自耕农，自由民，仆人

<!-- The yeoman project is a scaffolding engine that works along with Grunt and Bower. You can think of yeoman as the scaffolding piece that can get your applications going quickly. In order to get started you need to install yeoman by using the following syntax... -->
Yeoman 项目是一款与 Grunt 和 Bower 协同工作的脚手架引擎。可以让你的应用快速运行起来。要使用 Yeoman，你需要先用下面的语法安装它...

  <script src="https://gist.github.com/elijahmanor/5331806.js?file=yo-install.sh">
  </script>

<!-- Once yeoman is installed then you can generate a variety of different types of projects. In the following screenshot I asked yeoman to create a new webapp. It will ask me several questions along the way to tailor the application to my needs. -->
Yeoman 安装之后，你可以生成各种不同类型的项目。在下面的的截图中，我用 Yeoman 创建了一个 Web 应用。在按我的需求订制应用的过程中，它会问几个问题。

[![](http://1.bp.blogspot.com/-hgpccVDN7Gg/UWLB_oM2gWI/AAAAAAAAZ4g/_XFTx_MJsTw/s640/yo-webapp.png)](http://1.bp.blogspot.com/-hgpccVDN7Gg/UWLB_oM2gWI/AAAAAAAAZ4g/_XFTx_MJsTw/s1600/yo-webapp.png)

<!-- There are other scaffolds such as [Backbone](https://github.com/yeoman/generator-backbone), [AngularJS](https://github.com/yeoman/generator-angular), etc... that you can install and get your project underway. You can view a list of [more generators](https://github.com/yeoman) from the Yeoman GitHub page. -->
还有其他的脚手架，例如 [Backbone]、[AngularJS] 等，你可以安装它们，然后开始你的项目。可以在 Yeoman 的 GitHub 页面看到[更多的生成器](https://github.com/yeoman)列表。

[Backbone]: https://github.com/yeoman/generator-backbone
[AngularJS]: https://github.com/yeoman/generator-angular

<!-- For example in the following screenshots I first create a new Backbone app and then immediately create a new `bird` model. -->
例如在下面的截图中，我先创建了一个新的 Backbone 应用，然后立即创建了一个新的 `bird` 模型。

[![](http://2.bp.blogspot.com/-WADbKLpIFUA/UWLSpw7ya6I/AAAAAAAAZ4w/QrqLbXZ8AD8/s640/yo-backbone-app.png)](http://2.bp.blogspot.com/-WADbKLpIFUA/UWLSpw7ya6I/AAAAAAAAZ4w/QrqLbXZ8AD8/s1600/yo-backbone-app.png)
[![](http://1.bp.blogspot.com/-RO_QnEkhVnw/UWLS_Y-HNBI/AAAAAAAAZ44/I7jZC_SJGZA/s640/yo-backbone-model.png)](http://1.bp.blogspot.com/-RO_QnEkhVnw/UWLS_Y-HNBI/AAAAAAAAZ44/I7jZC_SJGZA/s1600/yo-backbone-model.png)

<!-- > Yeoman is currently 1.0 beta and the website says there are some issues with Windows. I've been able to use it to some extend, but I'm sure there are some features that aren't yet supported, but the plan is to have it fully supported. -->
> Yeoman 目前是 1.0 测试版，网站上说在 Windows 下有一些问题。虽然我已经能用它做一些扩展，但是我敢肯定有一些计划完全支持的功能尚不支持。

<!-- ## Attack! -->
## 攻击！
下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Mighty Eagle Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射神鹰，你也可以使用方向键。

[![](http://3.bp.blogspot.com/-KQKPPj6GV_I/UWEKCNFskjI/AAAAAAAAZ3A/eufuyrkvR2I/s1600/eagle-game.png)](http://jsfiddle.net/GWDDv/show)

<!-- ## Conclusion -->
## 结论
<!-- Embracing Grunt, Bower, and Yeoman can help automate various parts of your development, testing, and deployment process. The community for these tools are very active and you can find plugins to help cater these to your application's needs.  -->
拥抱 Grunt、Bower 和 Yeoman 可以帮助自动化开发、测试、部署过程中的各个环节。这些工具的社区非常活跃，你可以在上面找到满足你应用需求的插件。

<!-- There is one more front-end architecture technique that has been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有更多的前端架构技术被猪群偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!






