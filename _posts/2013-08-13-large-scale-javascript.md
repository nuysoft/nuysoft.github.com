---
layout: post
title: "大型 JavaScript 应用架构中的模式"
tagline: "Patterns For Large-Scale JavaScript Application Architecture"
description: "解耦应用。架构/模块，外观和中介者模式。模块生产消息，中介者发布/订阅消息，外观处理安全问题。"
category-substitution: 翻译
tags: [翻译, JavaScript, Architecture, Web]
---
{% include JB/setup %}

> 原文：[Patterns For Large-Scale JavaScript Application Architecture](http://addyosmani.com/largescalejavascript/) by [@Addy Osmani](https://twitter.com/addyosmani)

<!-- **Today we're going to discuss an effective set of patterns for large-scale JavaScript application architecture. The material is based on my talk of the same name, last presented at LondonJS and inspired by [previous work](http://yuilibrary.com/theater/nicholas-zakas/zakas-architecture/) by Nicholas Zakas.** -->
**今天我们要讨论大型 JavaScript 应用架构中的有效模式。这篇文章基于我最近在 LondonJS 的同名演讲，灵感则来自 Nicholas Zakas [之前的成果](http://yuilibrary.com/theater/nicholas-zakas/zakas-architecture/)。**

> 译注：[Nicholas Zakas: Scalable JavaScript Application Architecture](http://www.youtube.com/watch?v=vXjVFPosQHw)

<!-- ### Who am I and why am I writing about this topic? -->
### 我是谁，以及我为什么写这个主题？
<!-- I'm currently a JavaScript and UI developer at AOL helping to plan and write the front-end architecture to our next generation of client-facing applications. As these applications are both complex and often require an architecture that is scalable and highly-reusable, it's one of my responsibilities to ensure the patterns used to implement such applications are as sustainable as possible. -->
我目前是 AOL 的一名 JavaScript 和 UI 开发人员，负责为我们下一代面向客户的应用程序计划和编写前端架构。
由于这些应用程序不仅复杂，而且需要可扩展和高度可重用的架构，因此我的职责之一就是确保用于实现应用程序的模式尽可能是可持续的。

<!-- I also consider myself something of a design pattern enthusiast (although there are far more knowledgeable experts on this topic than I). I've previously written the creative-commons book '[Essential JavaScript Design Patterns]' and am in the middle of writing the more detailed follow up to this book at the moment. -->
我自认为是一名设计模式爱好者（虽然关于这个主题有很多专家比我更专业）。我之前基于创作共用许可证写了 [Essential JavaScript Design Patterns] 一书，现在我想写得更详尽一些，作为这本书的后续部分。

[Essential JavaScript Design Patterns]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/

<!-- ### Can you summarize this article in 140 characters? -->
### 可以用 140 个字概述这篇文章吗？
<!-- In the event of you being short for time, here's the tweet-sized summary of this article: -->
如果你时间不够，下面是这篇文章的摘要，只有一条 tweet 的长度：

<!-- > Decouple app. architecture w/module,facade & mediator patterns. Mods publish msgs, mediator acts as pub/sub mgr & facade handles security -->
> 解耦应用。架构/模块，外观和中介者模式。模块生产消息，中介者发布/订阅消息，外观处理安全问题。

<!-- ### What exactly is a 'large' JavaScript application? -->
### 究竟什么是“大型” JavaScript 应用程序？
<!-- Before we begin, let us attempt to define what we mean when we refer to a JavaScript application as being significantly 'large'. This is a question I've found still challenges developers with many years of experience in the field and the answer to this can be quite subjective. -->
在开始之前，让我们尝试弄清一点，当我们提到某个 JavaScript 应用程序是“大型”时，究竟是什么意思。这个问题对于有多年经验的开发人员仍然是一项挑战，而且答案也相当主观。

<!-- As an experiment, I asked a few intermediate developers to try providing their definition of it informally. One developer suggested 'a JavaScript application with over 100,000 LOC' whilst another suggested 'apps with over 1MB of JavaScript code written in-house'. Whilst valiant (if not scary) suggestions, both of these are incorrect as the size of a codebase does not always correlate to application complexity - those 100,000 LOC could easily represent quite trivial code. -->
我作了一个试验，咨询了几位中级开发人员，让他们试着做出非正式的定义。一个开发人员建议“JavaScript 应用程序的代码行数超过 100,000 行”，而另一位建议“应用程序中 JavaScript 代码超过 1MB”。虽然是勇敢的建议（如果不是故意吓人），但是这些都不正确，因为代码库的大小并不总是与应用程序的复杂度相关 - 100,000 行代码很可能是相当琐碎的代码。

> 译注：LOC，Lines of Code，代码行数

<!-- My own definition may or may not be universally accepted, but I believe that it's closer to what a large application actually represents. -->
我自己的定义可能会也可能不会被普遍接受，但是我相信它更接近大型应用程序的真实含义。

<!-- > In my view, large-scale JavaScript apps are **non-trivial** applications requiring **significant** developer effort to maintain, where most heavy lifting of data manipulation and display falls to the **browser**. -->
> 在我看来，大型 JavaScript 应用程序是**成体系的**，需要开发人员的**努力**维护，而最繁重的数据处理和显示则是在**浏览器**中。

<!-- The last part of this definition is possibly the most significant. -->
这个定义的最后一部分可能是最重要的。

<!-- ### Let's review your current architecture. -->
### 让我们回顾一下当前的架构

<!-- > If working on a significantly large JavaScript application, remember to dedicate **sufficient time** to planning the underlying architecture that makes the most sense. It's often more complex than you may initially imagine. -->
> 如果开发一个大型 JavaScript 应用程序，记得要投入**足够的时间**来规划基础架构，这是最有意义的事情。它往往比你最初想象的要更复杂。

<!-- I can't stress the importance of this enough - some developers I've seen approach larger applications have stepped back and said 'Okay. Well, there are a set of ideas and patterns that worked well for me on my last medium-scale project. Surely they should mostly apply to something a little larger, right?'. Whilst this may be true to an extent, please don't take it for granted - **larger apps generally have greater concerns that need to be factored in**. I'm going to discuss shortly why spending a little more time planning out the structure to your application is worth it in the long run. -->
我无法再强调基础架构的重要性——我见过一些开发人员在遇到大型应用程序时，先退后几步，然后说：“好吧。恩，在我最近的中型项目中已经有一套思路和模式工作的不错。当然，它们也应该大致适用于稍大一点的项目，对吧？”。虽然在某种程度上这么说可能是正确的，但是请不要想当然 - **大型应用程序通常需要考虑更大的问题**。我稍后要讨论为什么多花点时间来为你的应用程序规划结构在长远来看是值得的。

<!-- Most JavaScript developers likely use a mixed combination of the following for their current architecture: -->
大部分 JavaScript 开发人员可能在他们的当前架构中混合使用下面的概念：

<!-- * custom widgets
* models
* views
* controllers
* templates
* libraries/toolkits
* an application core. -->
* 自定义控件 custom widgets
* 模型 models
* 视图 views
* 控制器 controllers
* 模板 templates
* 库/工具集 libraries/toolkits
* 应用程序的核心 an application core

<!-- **Related Reading** -->
**相关阅读**

* [Rebecca Murphey - Structuring JavaScript Applications](http://blog.rebeccamurphey.com/code-org-take-2-structuring-javascript-applic)
* [Peter Michaux - MVC Architecture For JavaScript Applications](http://michaux.ca/articles/mvc-architecture-for-javascript-applications)
* [StackOverflow - A discussion on modern MVC frameworks](http://stackoverflow.com/questions/5112899/knockout-js-vs-backbone-js-vs)
* [Doug Neiner - Stateful Plugins and the Widget Factory](http://msdn.microsoft.com/en-us/scriptjunkie/ff706600)

<!-- You probably also break down your application's functionality into blocks of modules or apply other patterns for this. This is great, but there are a number of potential problems you can run into if this represents all of your application's structure. -->
你也可能把应用程序分解为一个个的模块，或者应用其他模式来实现。这么做不错，但如果这就是你的应用程序的全部架构，那么你仍然可能栽到一些潜在的问题中。

<!-- ##### 1. How much of this architecture is instantly re-usable? -->
##### 1. 这种架构有多少是可立即复用的？

<!-- Can single modules exist on their own independently? Are they self-contained? Right now if I were to look at the codebase for a large application you or your team were working on and selected a random module, would it be possible for me to easily just drop it into a new page and start using it on its own?. You may question the rationale behind wanting to do this, however I encourage you to think about the future. What if your company were to begin building more and more non-trivial applications which shared some cross-over in functionality?. If someone said, 'Our users love using the chat module in our mail client. Let's drop that into our new collaborative editing suite', would this be possible without significantly altering the code?. -->
单个模块可以独立存在吗？它们是自包含的吗？如果我现在要看看你或你的团队所工作的大型应用程序的代码库，并且随机选择一个模块，我可以简单地把它放入一个新页面，然后开始使用它吗？你可能会质疑这么做背后的理由，但是我鼓励你多想想未来。假使你的公司开始构建越来越多的非凡应用，而它们之间在功能上共享某些交叉点，情形将会怎么样呢？如果有人说，“我们的用户喜欢在我们的邮件客户端中使用聊天模块。让我们把它放到协同编辑套件”，不显著修改代码可以做到这点吗？

<!-- ##### 2. How much do modules depend on other modules in the system? -->
##### 2. 在这个系统中，模块之间的依赖有多少？

<!-- Are they tightly coupled? Before I dig into why this is a concern, I should note that I understand it's not always possible to have modules with absolutely no other dependencies in a system. At a granular level you may well have modules that extend the base functionality of others, but this question is more-so related to groups of modules with distinct functionality. It should be possible for all of these distinct sets of modules to work in your application without depending on too many other modules being present or loaded in order to function. -->
它们是紧耦合的吗？在深入挖掘这为什么会是一个问题之前，我要指出的是，一个系统中的模块绝对无依赖并不总是可行的。在某个粒度级别，你有充分的理由让模块从其他模块扩展基本功能，但问题在于具有不同功能的模块组之间的关联度。而在你的应用程序中，所有这些不同的模块组在正常运行时，不依赖太多其他模块的存在和加载，应该是有可能的。

<!-- ##### 3. If specific parts of your application fail, can it still function? -->
##### 3. 如果应用程序的特定部分崩溃了，应用程序仍然可以运行吗？
<!-- If you're building a GMail-like application and your webmail module (or modules) fail, this shouldn't block the rest of the UI or prevent users from being able to use other parts of the page such as chat. At the same time, as per before, modules should ideally be able to exist on their own outside of your current application architecture. In my talks I mention dynamic dependency (or module) loading based on expressed user-intent as something related. For example, in GMail's case they might have the chat module collapsed by default without the core module code loaded on page initialization. If a user expressed an intent to use the chat feature, only then would it be dynamically loaded. Ideally, you want this to be possible without it negatively affecting the rest of your application. -->
如果你正在构建一个类似 GMail 的应用程序，并且你的 webmail 模块崩溃了，此时不应该阻塞 UI 的其余部分，或者阻止用户使用页面上的其他部分，例如聊天模块。同时，按照之前说的，模块最好可以在当前应用程序的架构之外独立存在。在我的演讲中，我提到了基于用户意图的动态依赖（或模块）加载，用户意图以相关的事件来表达。例如，在 GMail 中，聊天模块默认是收起的，在页面初始化时不需要核心模块代码已经加载完毕。如果用户表示出使用聊天特性的意图，只需要动态加载即可。理想情况下，你期望不受应用程序其余部分的负面影响是可能的。

<!-- ##### 4. How easily can you test individual modules? -->
##### 4. 可以轻松地测试各个模块吗？
<!-- When working on systems of significant scale where there's a potential for millions of users to use (or mis-use) the different parts it, it's essential that modules which may end up being re-used across a number of different applications be sufficiently tested. Testing needs to be possible for when the module both inside and outside of the architecture for which it was initially built. In my view, this provides the most assurance that it shouldn't break if dropped into another system. -->
当在一个有着显著规模的系统上工作，而且这个系统有数以百万计的潜在用户使用或误用系统的不同部分时，模块必然会被多个经过充分测试的应用程序所复用。既需要对模块在（负责初始化它的）架构内部的情况进行测试，也需要对模块在架构之外的情况进行测试。在我看来，当模块应用在另一个系统时，测试为模块不会崩溃提供了最大限度的保证。

<!-- ### Think Long Term -->
### 想得长远一些
<!-- When devising the architecture for your large application, it's important to think ahead. Not just a month or a year from now, but beyond that. What might change? It's of course impossible to guess exactly how your application may grow, but there's certainly room to consider what is likely. Here, there is at least one specific aspect of your application that comes to mind. -->
当为你的大型项目设计架构时，最重要的是超前思考。不仅仅是从现在开始的一个月或一年，比这要久的多。会改变什么吗？猜测你的应用程序会如何成长当然是不可能的，但是肯定有空间来考虑什么是可能的。在这节内容中，至少会思考应用程序的某个特定方面。

<!-- Developers often couple their DOM manipulation code quite tightly with the rest of their application - even when they've gone to the trouble of separating their core logic down into modules. Think about it..why is this not a good idea if we're thinking long-term? -->
开发人员经常把 DOM 操作代码与应用程序的其他部分耦合地相当紧密——甚至在他们已经把核心业务分离为模块时。想想为什么这么做不是一个好主意，如果我们正在做长期规划的话。

<!-- One member of my audience suggested that it was because a rigid architecture defined in the present may not be suitable for the future. Whilst certainly true, there's another concern that may cost even more if not factored in. -->
我的观众之一认为原因是，现在定义的这种僵硬架构在未来可能不再合适。这种观点千真万确，而且还有另一层担忧，就是如果现在不考虑进来的话，将来花费的成本甚至可能会更多。

<!-- > You may well decide to switch from using Dojo, jQuery, Zepto or YUI to something entirely different for reasons of performance, security or design in the future. This can become a problem because libraries are not easily interchangeable and have high switching costs if tightly coupled to your app. -->
你可能在未来因为性能、安全或设计的原因，决定把正在使用的 Dojo、jQuery、Zepto 或 YUI 切换为某个完全不同的东西。如果库与你的应用程序紧密耦合的话，这种决定就会演变为一个问题，因为互换库并不容易，而且切换的成本高昂。

<!-- If you're a Dojo developer (like some of the audience at my talk), you may not have something better to switch to in the present, but who is to say that in 2-3 years something better doesn't come out that you'll want to switch to?. -->
如果你是一个 Dojo 开发人员（例如我演讲会上的一些观众），目前你可能没有值得切换的、更好的库，但是谁敢说在 2-3 年内不会出现更好的、你想要切换的库？

<!-- This is a relatively trivial decision in smaller codebases but for larger applications, having an architecture which is flexible enough to support **not** caring about the libraries being used in your modules can be of great benefit, both financially and from a time-saving perspective. -->
在较小的代码库中，这是一个比较琐碎（容易）的决定，但是对于大型应用程序，拥有一个灵活到可以不关心模块所用库的架构，从财政和节省时间的角度来看，都可以带来很大的好处。

<!-- To summarize, if you reviewed your architecture right now, could a decision to switch libraries be made without rewriting your entire application?. If not, consider reading on because I think the architecture being outlined today may be of interest. -->
总之，如果你现在回顾你的架构，能够做出无需重写整个应用程序就可以切换库的决定吗？如果不能，请继续读下去，因为我觉得今天介绍的架构可能正是你所感兴趣的。

<!-- There are a number of influential JavaScript developers who have previously outlined some of the concerns I've touched upon so far. Three key quotes I would like to share from them are the following: -->
到目前为止，对于我所关注的问题，一些有影响力的 JavaScript 开发人员已经有所涉猎。我想要分享他们的三个关键观点，引文如下所示：

<!-- > "The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application" - **Justin Meyer, author JavaScriptMVC** -->
> “构建大型应用程序的秘诀是永不构建大型应用程序。把你的应用程序分解为小块。然后把这些可测试、粒度合适的小块组装到你的大型应用程序中” - **Justin Meyer，JavaScriptMVC 的作者**

<!-- > "The key is to acknowledge from the start that you have no idea how this will grow. When you accept that you don't know everything, you begin to design the system defensively. You identify the key areas that may change, which often is very easy when you put a little bit of time into it. For instance, you should expect that any part of the app that communicates with another system will likely change, so you need to abstract that away." - **Nicholas Zakas, author 'High-performance JavaScript websites'** -->
> “关键是从一开始就承认你不知道该如何成长。当你接受了你是一无所知的之后，你会开始保守地设计系统。你确定可能会改变的关键领域，当你花一点时间在这上面的话，要做到这点往往很容易。举个例子，你应该想到与应用程序中其他系统进行通信的部分将可能会改变，因此你需要把它抽象出来。” - **Nicholas Zakas，《High-performance JavaScript websites》的作者**

<!-- and last but not least: -->
最后但并非最不重要的：

<!-- "The more tied components are to each other, the less reusable they will be, and the more difficult it becomes to make changes to one without accidentally affecting another" - **Rebecca Murphey, author of jQuery Fundamentals.** -->
“彼此紧密绑定的组件，较少复用的组件，以及因为会影响到其他组件而变得更难改变的组件” - **Rebecca Murphey, 《jQuery Fundamentals》的**

<!-- These principles are essential to building an architecture that can stand the test of time and should always be kept in mind. -->
这些原则是构建架构的关键，能够经得起时间的考验，应该始终牢记。

<!-- ### Brainstorming -->
### 头脑风暴
<!-- Let's think about what we're trying to achieve for a moment. -->
思考一下我们要达到什么目的。

<!-- > We want a loosely coupled architecture with functionality broken down into **independent modules** with ideally no inter-module dependencies. Modules **speak** to the rest of the application when something interesting happens and an **intermediate layer** interprets and reacts to these messages. -->
> 我们希望有一个松耦合的架构，功能可以分解为**独立的模块**，最好模块间没有依赖。当有趣的事情发生时，模块**通知**应用程序的其他部分，一个**中间层**解释并响应这些消息。

<!-- For example, if we had a JavaScript application responsible for an online bakery, one such 'interesting' message from a module might be 'batch 42 of bread rolls is ready for dispatch'. -->
例如，如果我们有一个负责在线面包店的 JavaScript 应用程序，从一个模块发来的“有趣”消息可能是“准备配送第 42 批次的面包卷”。

<!-- We use a different layer to interpret messages from modules so that a) modules don't directly access the core and b) modules don't need to directly call or interact with other modules. This helps prevent applications from falling over due to errors with specific modules and provides us a way to kick-start modules which have fallen over. -->
我们使用一个不同的分层来解释模块的消息，以便于：a) 模块不直接访问核心，b) 模块不需要直接调用其他模块或或与之交互。这有助于防止应用程序因为特定模块的错误而崩溃，并且提供了一种方式来重启崩溃的模块。

<!-- Another concern is security. The reality is that most of us don't consider internal application security as that much of a concern. We tell ourselves that as we're structuring the application, we're intelligent enough to figure out what should be publicly or privately accessible. -->
另一个令人关注的问题是安全性。然而真实情况是，我们中的大多数人不会考虑应用程序内部的安全性。我们告诉自己，因为是我们构建了应用程序，有足够的聪明来弄清楚哪些应该是公开或试下访问。

<!-- However, wouldn't it help if you had a way to determine what a module was permitted to do in the system? eg. if I know I've limited the permissions in my system to not allow a public chat widget to interface with an admin module or a module with DB-write permissions, I can limit the chances of someone exploiting vulnerabilities I have yet to find in the widget to pass some XSS in there. Modules shouldn’t be able to access everything. They probably can in most current architectures, but do they really need to be able to? -->
然而，如果你有办法判断系统中一个模块允许做什么，就不会有帮助了吗？例如，如果我已经在系统中限制了权限，不允许一个公开的聊天部件与权限管理模块，或者与一个用于数据库写权限模块交互，就可以防范有人利用聊天部件的已知漏洞来发起 XSS 攻击。模型不应该有能力访问所有的事务。目前的大多数架构可能可以做到这一点，但是真的需要这么做吗？

<!-- Having an intermediate layer handle permissions for which modules can access which parts of your framework gives you added security. This means a module is only able to do at most what we’ve permitted it do. -->
用一个中间层来处理权限问题，来决定哪些模块可以访问框架的哪部分，可以天然的增强安全性。这意味一个模块唯一能做的就是我们允许它做的。

<!-- ## The Proposed Architecture -->
## 架构提议
<!-- The solution to the architecture we seek to define is a combination of three well-known design patterns: the **module**, **facade** and **mediator**. -->
我们所寻求的架构解决方案是三个著名设计模式的组合体：**模块化**，**外观模式**和**中介者模式**。

<!-- Rather than the traditional model of modules directly communicating with each other, in this decoupled architecture, they'll instead only publish events of interest (ideally, without a knowledge of other modules in the system). The mediator pattern will be used to both subscribe to messages from these modules and handle what the appropriate response to notifications should be. The facade pattern will be used to enforce module permissions. -->
在传统的模式中，模块彼此之间直接进行通信，而在解耦架构中，模块只发布感兴趣的事件（在理想情况下，不需要知道系统中的其他模块）。中介者模式将订阅从模块来的消息，并在收到通知时给与适当的响应。中介者模式将用于模块鉴权。

<!-- I will be going into more detail on each of these patterns below: -->
我将在后面阐述这些模式的更多细节：

<!-- * Design patterns
    * Module Theory
        * [High-level Summary](#modtheory)
        * [Module pattern](#modpattern)
        * [Object literal notation](#objliteral)
        * [CommonJS modules](#commonjsmods)
    * [Facade Pattern](#facadepattern)
    * [Mediator Pattern](#mediatorpattern)
Applying To Your Architecture
    * [The Facade - Abstraction Of The Core](#applyingfacade)
    * [The Mediator - The Application Core](#applyingmediator)
    * [Tying It All Together](#tyingittogether) -->

* 设计模式
    * 模块化理论
        * 摘要
        * 模块模式
        * 对象字面量
        * CommonJS 模块
    * 外观模式
    * 中介者模式
* 在架构中应用
    * 外观 - 抽象的核心
    * 中介者 - 应用程序的核心
    * 集成

<!-- ### Module Theory -->
### 模块化理论
<!-- You probably already use some variation of modules in your existing architecture. If however, you don't, this section will present a short primer on them. -->
你可能在现有架构中已经使用了一些模块。但如果没有的话，本节将简要介绍关于模块的一些引文。

<!-- > Modules are an **integral** piece of any robust application's architecture and are typically single-purpose parts of a larger system that are interchangeable. -->
> 在任何健壮的应用程序的架构中，模块是一个**完整**部件，并且在可互换的较大系统中，模块通常是单一用途的。

<!-- Depending on how you implement modules, it's possible to define dependencies for them which can be automatically loaded to bring together all of the other parts instantly. This is considered more scalable than having to track the various dependencies for them and manually load modules or inject script tags. -->
按照实现模块的方式，你可以定义模块的依赖，并瞬间自动把其他部分加载进来。相较于无奈地跟踪它们的各种依赖关系，然后手动加载模块或插入 script 标签，这种方式被认为更具有扩展性。

<!-- Any significantly non-trivial application should be built from modular components. Going back to GMail, you could consider modules independent units of functionality that can exist on their own, so the chat feature for example. It's probably backed by a chat module, however, depending on how complex that unit of functionality is, it may well have more granular sub-modules that it depends on. For example, one could have a module simply to handle the use of emoticons which can be shared across both chat and mail composition parts of the system. -->
任何成体系的应用程序都应该基于模块化组件构建。回到 GMail，你可以把模块理解为可以独立存在的功能单元，就像聊天模块。然而这取决于功能单元的复杂度，它很可能还依赖于更精细的子模块。例如，有一个子模块负责简单地处理表情符号，而该系统的聊天部件和邮件部件则共享使用这些表情符号。

<!-- > In the architecture being discussed, modules have a very limited knowledge of what's going on in the rest of the system. Instead, we delegate this responsibility to a mediator via a facade. -->
> 在正讨论的架构中，模块对系统其他部分的情况所知甚少。而且，我通过一个外观把职责代理到一个中介者上。

<!-- This is by design because if a module only cares about letting the system know when something of interest happens without worrying if other modules are running, a system is capable of supporting adding, removing or replacing modules without the rest of the modules in the system falling over due to tight coupling. -->
这个刻意设计的，因为如果一个模块只负责通知系统所感兴趣的事情发生了，而不用担心其他模块是否正在运行，那么系统就能够支持添加、移除或更换模块，而系统中的其他模块不会因为紧密耦合而崩溃。

<!-- Loose coupling is thus essential to this idea being possible. It facilitates easier maintainability of modules by removing code dependencies where possible. In our case, modules should not rely on other modules in order to function correctly. When loose coupling is implemented effectively, its straight-forward to see how changes to one part of a system may affect another. -->
这种思路行得通的关键是松耦合。松耦合通过在必要时移除代码依赖关系，简化了模块的维护。在我们的例子中，模块不应该依赖于其他模块才能正常运行。当松耦合被有效地贯彻时，看看系统某个部分的变化是如何影响其他部分的。

<!-- In JavaScript, there are several options for implementing modules including the well-known module pattern and object literals. Experienced developers will already be familiar with these and if so, please skip ahead to the section on CommonJS modules. -->
在 JavaScript 中，有几种可选的模块化实现方式，包括广为人知的模块模式和对象字面量。有经验的开发人员应该已经熟知这些知识，如果是这样的话，请跳到介绍 CommonJS 模块的部分。

<!-- ##### The Module Pattern -->
##### 模块模式
<!-- The module pattern is a popular design that pattern that encapsulates 'privacy', state and organization using closures. It provides a way of wrapping a mix of public and private methods and variables, protecting pieces from leaking into the global scope and accidentally colliding with another developer's interface. With this pattern, only a public API is returned, keeping everything else within the closure private. -->
模块模式是一种流行的设计模式，通过使用闭包来封装“隐私”、状态和结构。它可以包裹公开和私有的方法和变量，避免它们污染全局作用域，以及避免与其他开发人员的接口冲突。这种模式只会返回公开的 API，此外的一切则是封闭和私有的。

<!-- This provides a clean solution for shielding logic doing the heavy lifting whilst only exposing an interface you wish other parts of your application to use. The pattern is quite similar to an immediately-invoked functional expression (IIFE) except that an object is returned rather than a function. -->
模块模式提供了一种清爽的解决方案，屏蔽了承担繁重任务的逻辑，只向应用程序的其他部分暴露希望它们使用的接口。这种模式与立即调用的函数表达式（IIFE）非常相似，只不过前者返回的是一个对象，而后者返回的是一个函数。。

<!-- It should be noted that there isn't really a true sense of 'privacy' inside JavaScript because unlike some traditional languages, it doesn't have access modifiers. Variables can't technically be declared as being public nor private and so we use function scope to simulate this concept. Within the module pattern, variables or methods declared are only available inside the module itself thanks to closure. Variables or methods defined within the returning object however are available to everyone. -->
应该指出的是，在 JavaScript 中并不存在真正意义上的“隐私”，因为它不像一些传统语言一样具有访问修饰符。从技术的角度，变量不能被声明为公开或私有，所以我们用函数作用域来模拟这个概念。在模块模式中，仰赖于闭包机制，声明的变量或方法只在模块自身内部有效。而返回的对象中的变量或方法对所有人都是可用的。

<!-- Below you can see an example of a shopping basket implemented using the pattern. The module itself is completely self-contained in a global object called `basketModule`. The `basket` array in the module is kept private and so other parts of your application are unable to directly read it. It only exists with the module's closure and so the only methods able to access it are those with access to its scope (ie. `addItem()`, `getItem()` etc). -->
你可以在下面看到一个购物车示例，其中使用了模块模式。该模块自身被包含在一个称为`basketModule` 的全局对象中，完全自给自足。模块中的数组 `basket` 是私有的，应用程序的其他部分无法直接读取它。它只存在于这个模块的闭包中，因此，只有可以访问它所属作用域的方法（即 `addItem()`、`getItem()` 等），才可以访问它。
    
    var basketModule = (function() {
        var basket = []; //private
        return { //exposed to public
            addItem: function(values) {
                basket.push(values);
            },
            getItemCount: function() {
                return basket.length;
            },
            getTotal: function(){
               var q = this.getItemCount(),p=0;
                while(q--){
                    p+= basket[q].price; 
                }
                return p;
            }
        }
    }());

<!-- Inside the module, you'll notice we return an object. This gets automatically assigned to basketModule so that you can interact with it as follows: -->
在模块内部，你会发现它返回了一个对象。这种做法使得返回值被自动赋值给 basketModule，因此你像下面这样与它交互：

     
    //basketModule is an object with properties which can also be methods
    basketModule.addItem({item:'bread',price:0.5});
    basketModule.addItem({item:'butter',price:0.3});
     
    console.log(basketModule.getItemCount());
    console.log(basketModule.getTotal());
     
    //however, the following will not work:
    console.log(basketModule.basket);// (undefined as not inside the returned object)
    console.log(basket); //(only exists within the scope of the closure)

<!-- The methods above are effectively namespaced inside basketModule. -->
上面的方法被有效的限制在命名空间 basketModule 中。

<!-- From a historical perspective, the module pattern was originally developed by a number of people including Richard Cornford in 2003. It was later popularized by Douglas Crockford in his lectures and re-introduced by Eric Miraglia on the YUI blog. -->
从历史的角度看，模块模式最初是由一些人发现的，包括 Richard Cornford（2013年）。后来被 Douglas Crockford 在他的演讲中推广，并被 Eric Miraglia 在 YUI 的博客中再次介绍。

<!-- How about the module pattern in specific toolkits or frameworks? -->
在具体的工具库或框架中，模块模式是什么样的情况呢？

**Dojo**

<!-- Dojo attempts to provide 'class'-like functionality through `dojo.declare`, which can be used for amongst other things, creating implementations of the module pattern. For example, if we wanted to declare `basket` as a module of the `store` namespace, this could be achieved as follows: -->
Dojo 尝试通过 `dojo.declare` 来实现模块模式，提供与“class”类似的功能。例如，如果我们想把 `basket` 声明为命名空间 `store` 下的一个模块，可以做如下实现：

    //traditional way
    var store = window.store || {};
    store.basket = store.basket || {};
     
    //using dojo.setObject
    dojo.setObject("store.basket.object", (function() {
        var basket = [];
        function privateMethod() {
            console.log(basket);
        }
        return {
            publicMethod: function(){
                    privateMethod();
            }
        };
    }()));

<!-- which can become quite powerful when used with `dojo.provide` and mixins. -->
如果 `dojo.declare` 与 `dojo.provide` 和 mixins 结合使用，可以变得非常强大。

**YUI**

<!-- The following example is heavily based on the original YUI module pattern implementation by Eric Miraglia, but is relatively self-explanatory. -->
下面的例子基于 Eric Miraglia 实现的原始 YUI 模块模式，虽然有些厚重，但尚能自圆其说。

    YAHOO.store.basket = function () {
     
        //"private" variables:
        var myPrivateVar = "I can be accessed only within YAHOO.store.basket .";
     
        //"private" method:
        var myPrivateMethod = function () {
                YAHOO.log("I can be accessed only from within YAHOO.store.basket");
            }
     
        return {
            myPublicProperty: "I'm a public property.",
            myPublicMethod: function () {
                YAHOO.log("I'm a public method.");
     
                //Within basket, I can access "private" vars and methods:
                YAHOO.log(myPrivateVar);
                YAHOO.log(myPrivateMethod());
     
                //The native scope of myPublicMethod is store so we can
                //access public members using "this":
                YAHOO.log(this.myPublicProperty);
            }
        };
     
    }();

**jQuery**

<!-- There are a number of ways in which jQuery code unspecific to plugins can be wrapped inside the module pattern. Ben Cherry previously suggested an implementation where a function wrapper is used around module definitions in the event of there being a number of commonalities between modules. -->
把 jQuery 代码（不局限于插件）封装为模块模式有很多种方式。Ben Cherry 曾经建议过一种实现：用一个函数把模块定义包裹起来，模块定义则含有一些共性事件。

<!-- In the following example, a `library` function is defined which declares a new library and automatically binds up the `init` function to `document.ready` when new libraries (ie. modules) are created. -->
在下面的示例中，定义了一个函数 `library`，该函数用于声明一个新库，当新库（即模块）被创建时，会并自动把函数 `init` 绑定到 `document.ready`。

    function library(module) {
      $(function() {
        if (module.init) {
          module.init();
        }
      });
      return module;
    }
     
    var myLibrary = library(function() {
       return {
         init: function() {
           /*implementation*/
         }
       };
    }());

<!-- **Related Reading** -->
**相关阅读**

* [Ben Cherry - The Module Pattern In-Depth](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)
* [John Hann - The Future Is Modules, Not Frameworks](http://lanyrd.com/2011/jsconf/sfgdk/)
* [Nathan Smith - A Module pattern aliased window and document gist](https://gist.github.com/274388)
* [David Litmark - An Introduction To The Revealing Module Pattern](http://blog.davidlitmark.com/post/6009004931/an-introduction-to-the-revealing-module-pattern)

<!-- #### Object Literal Notation -->
#### 对象字面量

<!-- In object literal notation, an object is described as a set of comma-separated name/value pairs enclosured in curly braces (`{}`). Names inside the object may be either strings or identifiers that are followed by a colon. There should be no comma used after the final name/value pair in the object as this may result in errors. -->
在对象字面量中，一个对象被描述为一组用逗号分隔的名称/值对，并用大括号（`{}`）包裹起来。对象中的名称可以是字符串或唯一标识，后跟一个冒号。不应该在对象中最后一对名称/值的后面使用逗号，因为这可能导致错误。

<!-- Object literals don't require instantiation using the `new` operator but shouldn't be used at the start of a statement as the opening `{` may be interpreted as the beginning of a block. Below you can see an example of a module defined using object literal syntax. New members may be added to the object using assignment as follows `myModule.property = 'someValue';` -->
对象字面量不需要使用操作符 `new` 来实例化，但是不应该使用在语句的起始处，因为 `{` 可能会被解释为代码块的开始。你可以在下面看到一个使用对象字面量来定义模块的示例。新成员可能被通过赋值添加到对象上，就像下面的 `myModule.property = 'someValue';`。

<!-- > Whilst the module pattern is useful for many things, if you find yourself not requiring specific properties or methods to be private, the object literal is a more than suitable alternative. -->
> 虽然模块模式适用于很多场景，但如果你发现并不需要特定的私有属性或方法，那么对象字面量无疑是更合适的替代品。

    var myModule = {
        myProperty : 'someValue',
        //object literals can contain properties and methods.
        //here, another object is defined for configuration
        //purposes:
        myConfig:{
            useCaching:true,
            language: 'en'   
        },
        //a very basic method
        myMethod: function(){
            console.log('I can haz functionality?');
        },
        //output a value based on current configuration
        myMethod2: function(){
            console.log('Caching is:' + (this.myConfig.useCaching)?'enabled':'disabled');
        },
        //override the current configuration
        myMethod3: function(newConfig){
            if(typeof newConfig == 'object'){
               this.myConfig = newConfig;
               console.log(this.myConfig.language); 
            }
        }
    };
 
    myModule.myMethod(); //I can haz functionality
    myModule.myMethod2(); //outputs enabled
    myModule.myMethod3({language:'fr',useCaching:false}); //fr

<!-- **Related Reading** -->
**相关阅读**

* [Rebecca Murphey - Using Objects To Organize Your Code](http://blog.rebeccamurphey.com/2009/10/15/using-objects-to-organize-your-code)
* [Stoyan Stefanov - 3 Ways To Define A JavaScript Class](http://www.phpied.com/3-ways-to-define-a-javascript-class/)
* [Ben Alman - Clarifications On Object Literals (There's no such thing as a JSON Object)](http://benalman.com/news/2010/03/theres-no-such-thing-as-a-json/)
* [John Resig - Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/)

<!-- ### CommonJS Modules -->
### CommonJS 模块

<!-- Over the last year or two, you may have heard about [CommonJS] - a volunteer working group which designs, prototypes and standardizes JavaScript APIs. To date they've ratified standards for modules and packages.The CommonJS AMD proposal specifies a simple API for declaring modules which can be used with both synchronous and asynchronous script tag loading in the browser. Their module pattern is relatively clean and I consider it a reliable stepping stone to the module system proposed for ES Harmony (the next release of the JavaScript language). -->
在过去一两年中，你可能已经听说过 [CommonJS] - 一个致力于设计、原型化和标准化 JavaScript API 的志愿者工作组。迄今为止，他们已经批准了针对模块和包的标准。CommonJS AMD 建议规范一个简单的 API 来声明模块，并且可以在浏览器中通过同步和异步 script 标签来加载声明的模块。他们的模块模式相对比较清爽，并且我认为它是 ES Harmony（JavaScript 语言的下一个版本）所建议的模块系统的可靠基石。

[CommonJS]: http://commonjs.org/

<!-- From a structure perspective, a CommonJS module is a reusable piece of JavaScript which exports specific objects made available to any dependent code. This module format is becoming quite ubiquitous as a standard module format for JS. There are plenty of great tutorials on implementing CommonJS modules, but at a high-level they basically contain two primary parts: an `exports` object that contains the objects a module wishes to make available to other modules and a `require` function that modules can use to import the exports of other modules. -->
从结构的角度来看，一个 CommonJS 模块是一段可重用的 JavaScript，它输出特定的对象以供任何依赖它的代码使用。这种模块格式正在变得相当普及，成为事实上的 JS 标准模块格式。有许多关于实施 CommonJS 模块的伟大教程，但是从高层次角度看的话，它们基本上包含两个主要部分：一个 `exports` 对象包含了希望对其他模块可用的模块，一个 `require` 函数用来让模块导入其他模块的输出。

    /*
    Example of achieving compatibility with AMD and standard CommonJS by putting boilerplate around the standard CommonJS module format:
    */
 
    (function(define){
    define(function(require,exports){
    // module contents
     var dep1 = require("dep1");
     exports.someExportedFunction = function(){...};
     //...
    });
    })(typeof define=="function"?define:function(factory){factory(require,exports)});

<!-- There are a number of great JavaScript libraries for handling module loading in the CommonJS module format, but my personal preference is RequireJS. A complete tutorial on RequireJS is outside the scope of this tutorial, but I can recommend reading James Burke's ScriptJunkie post on it [here](http://msdn.microsoft.com/en-us/scriptjunkie/ff943568). I know a number of people that also like `Yabble`. -->
有许多伟大的 JavaScript 库可以按照 CommonJS 模块规范来处理模块加载，但我个人偏好于 RequireJS。完整的 RequireJS 教程超出了本文的范畴，不过我推荐读一读 James Burke 的博文 [ScriptJunkie]。我知道有些人也喜欢 `Yabble`。

[ScriptJunkie]: http://msdn.microsoft.com/en-us/scriptjunkie/ff943568

<!-- Out of the box, RequireJS provides methods for easing how we create static modules with wrappers and it's extremely easy to craft modules with support for asynchronous loading. It can easily load modules and their dependencies this way and execute the body of the module once available. -->
从使用的角度看，RequireJS 提供了一些包装方法，来简化静态模块的创建过程和异步加载。它可以很容易的加载模块以及模块的依赖，然后在模块就绪时执行模块的内容。

<!-- There are some developers that however claim CommonJS modules aren't suitable enough for the browser. The reason cited is that they can't be loaded via a script tag without some level of server-side assistance. We can imagine having a library for encoding images as ASCII art which might export a `encodeToASCII` function. A module from this could resemble: -->
有些开发人员声称 CommonJS 模块不太适用在浏览器中。原因是 CommonJS 模块无法通过 script 标签加载，除非有服务端协助。我们假设有一个把图片编码为 ASCII 的库，它暴露出一个 `encodeToASCII` 函数。它的模块类似于：

    var encodeToASCII = require("encoder").encodeToASCII;
    exports.encodeSomeSource = function(){
        //process then call encodeToASCII
    }

<!-- This type of scenario wouldn't work with a script tag because the scope isn't wrapped, meaning our `encodeToASCII` method would be attached to the `window`, `require` wouldn't be as such defined and exports would need to be created for each module separately. A client-side library together with server-side assistance or a library loading the script with an XHR request using `eval()` could however handle this easily. -->
在这类情况下，script 标签将无法正常工作，因为作用域不匹配，这就意味着方法 `encodeToASCII` 将被绑定到 `window` 对象、`require` 未定义，并且需要为每个模块单独创建 exports。但是，客户端库在服务端的协助下，或者库通过 XHR 请求加载脚本并使用了 `eval()`，都可以很容易地处理这种情况，

<!-- Using RequireJS, the module from earlier could be rewritten as follows: -->
使用 RequireJS，该模块的早期版本可以重写为下面这样：

    define(function(require, exports, module) {
        var encodeToASCII = require("encoder").encodeToASCII;
        exports.encodeSomeSource = function(){
                //process then call encodeToASCII
        }
    });

<!-- For developers who may not rely on just using static JavaScript for their projects, CommonJS modules are an excellent path to go down, but do spend some time reading up on it. I've really only covered the tip of the ice berg but both the CommonJS wiki and Sitepen have a number of resources if you wish to read further. -->
对于不只依赖于静态 JavaScript 的项目来说，CommonJS 模块是很好的选择，不过一定要花一些时间来阅读相关的内容。我仅仅涉及到了冰山一角，如果你想进一步阅读的话，CommonJS 的 wikie 和 Sitepen 有着大量资源。

<!-- **Related Reading** -->
**相关阅读**

* [The CommonJS Module Specifications](http://wiki.commonjs.org/wiki/Modules)
* [Alex Young - Demystifying CommonJS Modules](http://dailyjs.com/2010/10/18/modules/)
* [Notes on CommonJS modules with RequireJS](http://requirejs.org/docs/commonjs.html#packages)

<!-- ### The Facade Pattern -->
### 外观模式

<!-- Next, we're going to look at the facade pattern, a design pattern which plays a critical role in the architecture being defined today. -->
接下来，我们要看看外观模式，这个设计模式在今天定义的架构中扮演着关键角色。

<!-- When you put up a facade, you're usually creating an outward appearance which conceals a different reality. The facade pattern provides a convenient **higher-level interface** to a larger body of code, hiding its true underlying complexity. Think of it as simplifying the API being presented to other developers. -->
当构造一个外观时，通常是创建一个掩盖了不同现实的外在表现。外观模式为更大的代码块提供了一个方便的**高层接口**，通过隐藏其真正复杂的底层。把它看成是提交给其他开发人员的简化版 API。

<!-- Facades are a **structural pattern** which can often be seen in JavaScript libraries and frameworks where, although an implementation may support methods with a wide range of behaviors, only a 'facade' or limited abstract of these methods is presented to the client for use. -->
外观是**结构模式**的一种，经常可以在 JavaScript 库和框架中看到它，它的内部实现虽然可以提供各种行为的方法，但是只有一个“外观”或这些方法的有限抽象被提交给客户使用。

<!-- This allows us to interact with the facade rather than the subsystem behind the scenes. -->
这样一来，我们是与外观交互，而不是与幕后的子系统交互。

<!-- The reason the facade is of interest is because of its ability to hide implementation-specific details about a body of functionality contained in individual modules. The implementation of a module can change without the clients really even knowing about it. -->
外观之所以好用的原因在于，它能够隐藏各个模块中功能的具体实现细节。模块实现的改变甚至可以在客户不知情的情况下进行。

<!-- By maintaining a consistent facade (simplified API), the worry about whether a module extensively uses dojo, jQuery, YUI, zepto or something else becomes significantly less important. As long as the interaction layer doesn't change, you retain the ability to switch out libraries (eg. jQuery for Dojo) at a later point without affecting the rest of the system. -->
通过维护一个统一的外观（简化后的 API），对模块是否使用 dojo、jQuery、YUI、zepto 或者别的东西的担心就显得不太重要。只要交互层不改变，就保留了在将来切换库（例如用 jQuery 替换 Dojo）的能力，而不会影响系统的其他部分。

<!-- Below is a very basic example of a facade in action. As you can see, our module contains a number of methods which have been privately defined. A facade is then used to supply a much simpler API to accessing these methods: -->
下面是一个非常简单的外观行为示例。正如你可以看到的，我们的模块包含了一些定位为私有的方法。然后用外观提供的更简单的 API 来访问这些方法。

    var module = (function() {
        var _private = {
            i:5,
            get : function() {
                console.log('current value:' + this.i);
            },
            set : function( val ) {
                this.i = val;
            },
            run : function() {
                console.log('running');
            },
            jump: function(){
                console.log('jumping');
            }
        };
        return {
            facade : function( args ) {
                _private.set(args.val);
                _private.get();
                if ( args.run ) {
                    _private.run();
                }
            }
        }
    }());
     
     
    module.facade({run: true, val:10});
    //outputs current value: 10, running
 
<!-- and that's really it for the facade before we apply it to our architecture. Next, we'll be diving into the exciting mediator pattern. The core difference between the facade pattern and the mediator is that the facade (a structural pattern) only exposes existing functionality whilst the mediator (a behavioral pattern) can add functionality. -->
在把外观应用到我们的架构中之前，关于外观就介绍这么多。接下来，我们将深入激动人心的中介者模式。外观模式和中介者模式之间的核心区别在于，外观模式（一种结构模式）只公开已有的功能，而中介者模式（一种行为模式）可以添加功能。

<!-- **Related Reading** -->
**相关阅读**

* [Dustin Diaz, Ross Harmes - Pro JavaScript Design Patterns (Chapter 10, available to read on Google Books)](http://books.google.co.uk/books?id=za3vlnlWxb0C&lpg=PA141&ots=MD5BLTsSzH&dq=javascript%20facade%20pattern&pg=PA141#v=onepage&q=javascript facade pattern&f=false)

<!-- ### The Mediator Pattern -->
### 中介者模式

<!-- The mediator pattern is best introduced with a simple analogy - think of your typical airport traffic control. The tower handles what planes can take off and land because all communications are done from the planes to the control tower, rather than from plane-to-plane. A centralized controller is key to the success of this system and that's really what a mediator is. -->
介绍中介者模式的最佳方式是用一个简单的比喻——想象一下机场交通管制。塔台处理哪些飞机可以起飞或降落，因为所有的通信都由飞机和控制塔完成，而不是由飞机之间。集中控制是这个系统成功的关键，而这就是一个中介者。

<!-- > Mediators are used when the communication between modules may be complex, but is still **well defined**. If it appears a system may have too many relationships between modules in your code, it may be time to have a central point of control, which is where the pattern fits in. -->
> 当模块之间的通信有可能是复杂的，请使用中介者，但是这一点**不易鉴定**。如果有这样一个系统，代码中的模块之间有大多的关系，那么就该有一个中央控制点了，这就是这个模式的用武之地。

<!-- In real-world terms, a mediator **encapsulates** how disparate modules **interact** with each other by acting as an intermediary. The pattern also promotes loose coupling by preventing objects from referring to each other explicitly - in our system, this helps to solve our module inter-dependency issues. -->
一个中介者**封装**了不同模块之间的**交互**行为，就像现实世界中的中间人。该模式阻止了对象彼此之间直接引用，从而促进了松耦合——这有助于我们解决系统中模块互相依赖的问题。

<!-- What other advantages does it have to offer? Well, mediators allow for actions of each module to vary independently, so it’s extremely flexible. If you've previously used the Observer (Pub/Sub) pattern to implement an event broadcast system between the modules in your system, you'll find mediators relatively easy to understand. -->
它还必须提供什么其他的优势呢？恩，中介者允许每个模块的行为可以独立变化，所以它非常灵活。如果你曾经在你的系统使用过观察者（发布/订阅）模式来实现模块之间的事件广播系统，你将会发现中介者相对而言比较容易理解。

<!-- Let's take a look at a high level view of how modules might interact with a mediator: -->
让我们以高层次的视角来看看模块是如何与中介者交互的：

![](http://addyosmani.com/largescalejavascript/assets/img/chart4a.jpg)

<!-- Consider modules as publishers and the mediator as both a publisher and subscriber. Module 1 broadcasts an event notifying the mediator something needs to done. The mediator captures this message and 'starts' the modules needed to complete this task Module 2 performs the task that Module 1 requires and broadcasts a completion event back to the mediator. In the mean time, Module 3 has also been started by the mediator and is logging results of any notifications passed back from the mediator. -->
模块是发布者，中介者则既是发布者又是订阅者。模块 1 广播一个事件了通知中介者有事要做。中介者捕获这个消息，继而启动需要完成这项任务的模块 2，模块 2 执行模块 1 要求的任务，并向中介者广播一个完成事件。与此同时，模块 3 也会被中介者启动，记录从中介者传来的任何通知。

<!-- Notice how at no point do any of the modules **directly communicate** with one another. If Module 3 in the chain were to simply fail or stop functioning, the mediator could hypothetically 'pause' the tasks on the other modules, stop and restart Module 3 and then continue working with little to no impact on the system. This level of decoupling is one of the main strengths the pattern has to offer. -->
任何模块没有机会与其他模块**直接通信**，请注意是如何做到这点的。如果调用链中的模块 3 失败或停止运行，中介者可以假装“暂停”其他模块的任务，停止模块 3 并重启它，然后继续工作，这对系统而言几乎没有影响。这种程度的解耦是中介者模块提供的主要优势之一。

<!-- To review, the advantages of the mediator are that: -->
回复一下，中介者的优势如下：

<!-- It decouples modules by introducing an intermediary as a central point of control.It allows modules to broadcast or listen for messages without being concerned with the rest of the system. Messages can be handled by any number of modules at once. -->
它通过引入一个中间人作为中央控制点来解耦模块。它允许模块广播或监听消息，而不必关注系统的其他的部分。消息可以同时被任意数量的模块所处理。

<!-- It is typically significantly more easy to add or remove features to systems which are loosely coupled like this. -->
显然，向松耦合的系统添加或移除功能变得更容易。

<!-- And its disadvantages: -->
但它的缺点是：

<!-- By adding a mediator between modules, they must always communicate indirectly. This can cause a very minor performance drop - because of the nature of loose coupling, its difficult to establish how a system might react by only looking at the broadcasts. At the end of the day, tight coupling causes all kinds of headaches and this is one solution. -->
通过在模块之间增加中介者，模块必须总是间接地通信。这可能会导致轻微的性能下降——因为松耦合的性质所然，而且很难预期一个关注广播的系统会如何响应。紧耦合令人各种头疼，而中介者正是一条解决之道。

<!-- **Example:** This is a possible implementation of the mediator pattern based on previous work by [@rpflorence] -->
**示例：**这是中介者模式在 [@rpflorence] 早先工作基础上的一种可能实现。

[@rpflorence]: https://github.com/rpflorence

    var mediator = (function(){
        var subscribe = function(channel, fn){
            if (!mediator.channels[channel]) mediator.channels[channel] = [];
            mediator.channels[channel].push({ context: this, callback: fn });
            return this;
        },
     
        publish = function(channel){
            if (!mediator.channels[channel]) return false;
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
                var subscription = mediator.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }
            return this;
        };
     
        return {
            channels: {},
            publish: publish,
            subscribe: subscribe,
            installTo: function(obj){
                obj.subscribe = subscribe;
                obj.publish = publish;
            }
        };
     
    }());

<!-- **Example:** Here are two sample uses of the implementation from above. It's effectively managed publish/subscribe: -->
**示例：**这是前面实现的两个使用示例。发布/订阅被有效的管理起来。

    //Pub/sub on a centralized mediator
     
    mediator.name = "tim";
    mediator.subscribe('nameChange', function(arg){
            console.log(this.name);
            this.name = arg;
            console.log(this.name);
    });
     
    mediator.publish('nameChange', 'david'); //tim, david
     
     
    //Pub/sub via third party mediator
     
    var obj = { name: 'sam' };
    mediator.installTo(obj);
    obj.subscribe('nameChange', function(arg){
            console.log(this.name);
            this.name = arg;
            console.log(this.name);
    });
     
    obj.publish('nameChange', 'john'); //sam, john

<!-- **Related Reading** -->
**相关阅读**

* Stoyan Stefanov - Page 168, JavaScript Patterns
* [HB Stone - JavaScript Design Patterns: Mediator](http://arguments.callee.info/2009/05/18/javascript-design-patterns--mediator/)
* [Vince Huston - The Mediator Pattern (not specific to JavaScript, but a concise)](http://www.vincehuston.org/dp/mediator.html)
 

<!-- ### Applying The Facade: Abstraction Of The Core -->
### 应用外观：核心的抽象

<!-- In the architecture suggested: -->
架构建议：

<!-- A facade serves as an **abstraction** of the application core which sits between the mediator and our modules - it should ideally be the only other part of the system modules are aware of. -->
一个外观作为应用程序核心的**抽象**，位于中介者和模块之间——理想情况下，它应该是系统中唯一可以感知其他模式的模块。

<!-- The responsibilities of the abstraction include ensuring a **consistent interface** to these modules is available at all times. This closely resembles the role of the **sandbox controller** in the excellent architecture first suggested by Nicholas Zakas. -->
这个抽象的职责包括了为这些模块提供**统一的接口**，以及确保在任何时候都是可用的。这一点非常类似于杰出架构中**沙箱控制器**的角色，它由 Nicholas Zakas 首次提出。

<!-- Components are going to communicate with the mediator through the facade so it needs to be **dependable**. When I say 'communicate', I should clarify that as the facade is an abstraction of the mediator which will be listening out for broadcasts from modules that will be relayed back to the mediator. -->
组件将通过外观与中介者通信，所以外观必须是可靠的。应该澄清的是，当我说“通信”时实际上是指与外观进行通信，外观是中介者的抽象，将监听模块的广播，再把广播回传给中介者。

<!-- In addition to providing an interface to modules, the facade also acts as a security guard, determining which parts of the application a module may access. Components only call their own methods and shouldn't be able to interface with anything they don't have permission to. For example, a module may broadcast `dataValidationCompletedWriteToDB`. The idea of a security check here is to ensure that the module has permissions to request database-write access. What we ideally want to avoid are issues with modules accidentally trying to do something they shouldn't be. -->
除了为模块提供接口，中介者还扮演者安保的角色，确定一个模块可以访问应用程序的哪些部分。组件只能访问它们自己的方法，对于它没有权限的任何东西，则不能与之行交互。假设一个模块可以广播 `dataValidationCompletedWriteToDB`。此时，安全检查的概念是指确保有权限的模块才能请求数据写操作。我们最好避免让模块意外地试图做一些它们本不该做的事情。

<!-- To review in short, the mediator remains a type of pub/sub manager but is only passed interesting messages once they've cleared permission checks by the facade. -->
总之，中介者是发布/订阅的管理者，不过，只有通过外观权限检查的感兴趣事件才会被传给中介者。

<!-- ### Applying the Mediator: The Application Core -->
### 应用中介者：应用程序的核心

<!-- The mediator plays the role of the application core. We've briefly touched on some of its responsibilities but lets clarify what they are in full. -->
中介者扮演的角色是应用程序的核心。我们已经简要介绍了一些它的职责，不过还是要澄清下它的所有职责。

<!-- The core's primary job is to manage the module **lifecycle**. When the core detects an **interesting message** it needs to decide how the application should react - this effectively means deciding whether a module or set of modules needs to be **started** or **stopped**. -->
核心的主要任务是管理模块的**生命周期**。当核心侦测到一个**感兴趣的事件**时，它需要决定应用程序该如何响应——这实际上意味着决定是否需要**启动**或**停止**一个或一组模块。

<!-- Once a module has been started, it should ideally execute **automatically**. It's not the core's task to decide whether this should be when the DOM is ready and there's enough scope in the architecture for modules to make such decisions on their own. -->
理想情况下，一旦某个模块被启动，它应该**自动**执行。模块是否在 DOM 就绪时运行，以及运行条件是否全部满足，决定这些并不是核心的任务，而是由架构中的模块指定决定。

<!-- You may be wondering in what circumstance a module might need to be 'stopped' - if the application detects that a particular module has failed or is experiencing significant errors, a decision can be made to prevent methods in that module from executing further so that it may be restarted. The goal here is to assist in reducing disruption to the user experience. -->
你可能想知道一个模块在什么情况下可能需要“停止”——如果应用程序侦测到某个特定模块出现故障或正处于严重的错误中，可以决定让这个模块中的方法停止继续执行，并且可能会重新启动它。这么做的目的是帮助降低对用户体验的破坏。

<!-- In addition, the core should enable **adding or removing** modules without breaking anything. A typical example of where this may be the case is functionality which may not be available on initial page load, but is dynamically loaded based on expressed user-intent eg. going back to our GMail example, Google could keep the chat widget collapsed by default and only dynamically load in the chat module(s) when a user expresses an interest in using that part of the application. From a performance optimization perspective, this may make sense. -->
此外，核心应该可以**添加或移除**模块而不破坏任何东西。一个典型的应用场景是，功能在页面初始化时尚不可用，而是基于用户的意图动态加载，例如，回到 GMail 的例子，Google 可以让聊天部件默认收起，只有在用户表现出使用它的兴趣时才会动态加载。从性能优化的角度看，这么做是有意义的。

<!-- Error management will also be handled by the application core. In addition to modules broadcasting messages of interest they will also broadcast any errors experienced which the core can then react to accordingly (eg. stopping modules, restarting them etc).It's important that as part of a decoupled architecture there to be enough scope for the introduction of new or better ways of handling or displaying errors to the end user without manually having to change each module. Using publish/subscribe through a mediator allows us to achieve this. -->
错误管理应该由应用程序的核心处理。模块除了广播感兴趣的事件外，也会广播发生的任何错误，然后核心可以做出相应的反馈（例如停止模块、重启模块等）。提供足够的上下文，以便用更新或更好的方式来处理或者向终端用户显示错误，而不必手动改变每个模块，是解耦架构中重要的一环。通过中介者使用发布/订阅机制，可以做到这一点。

<!-- ### Tying It All Together -->
### 整合

<!-- **Modules** contain specific pieces of functionality for your application. They publish notifications informing the application whenever something interesting happens - this is their primary concern. As I'll cover in the FAQs, modules can depend on DOM utility methods, but ideally shouldn't depend on any other modules in the system. They should not be concerned with: -->
**模块** 为应用程序提供特定的功能。每当发生了感兴趣的事情，模块发布消息通知应用程序——这是它们的主要关注点。正如我在 FAQ（常见问题）中介绍的，模块可以依赖 DOM 工具方法，但是理想情况下不应该依赖系统的任何其他模块。它们不应该关注：

<!-- * what objects or modules are subscribing to the messages they publish
* where these objects are based (whether this is on the client or server)
* how many objects subscribe to notifications -->

* 什么对象或模块将订阅它们发布的消息
* 这些对象在哪里（是否在客户端或服务端）
* 有多少对象订阅了消息

![](http://addyosmani.com/largescalejavascript/assets/img/chart1a.gif)

<!-- **The Facade** abstracts the core to avoid modules touching it directly. It subscribes to interesting events (from modules) and says 'Great! What happened? Give me the details!'. It also handles module security by checking to ensure the module broadcasting an event has the necessary permissions to pass such events that can be accepted. -->
**外观** 抽象核心，用于避免模块直接接触核心。它订阅（从模块来的）感兴趣的事情，并且说“干得好！发生了什么事？把详细资料给我！”。它还负责检查模块的安全性，以确保发布消息的模块具备必要的权限来传递可接受的事件。

![](http://addyosmani.com/largescalejavascript/assets/img/chart2a.gif)

<!-- **The Mediator (Application Core)** acts as a 'Pub/Sub' manager using the mediator pattern. It's responsible for module management and starts/stops modules as needed. This is of particular use for dynamic dependency loading and ensuring modules which fail can be centrally restarted as needed. -->
**中介者（应用程序的核心）** 扮演“发布/订阅”管理者的角色。负责管理模块，在需要时启动或停止模块。特别适用于动态依赖加载，并确保失败的模块可以在需要时集中重启。

![](http://addyosmani.com/largescalejavascript/assets/img/chart3a.gif)

<!-- The result of this architecture is that modules (in most cases) are theoretically no longer dependent on other modules. They can be easily tested and maintained on their own and because of the level of decoupling applied, modules can be picked up and dropped into a new page for use in another project without significant additional effort. They can also be dynamically added or removed without the application falling over. -->
如此架构的结果是模块（大多数情况下）在理论上不再依赖于其他模块。它们可以很容易地独立测试和维护，正因为这种程度的解耦，可以把模块放入一个新页面中供其他系统使用，而不需要做太多额外的工作。模块可以被动态地添加或移除，而不会导致应用程序崩溃。

<!-- ### Beyond Pub/Sub: Automatic Event Registration -->
### 超越发布/订阅：自动注册事件

<!-- As previously mentioned by Michael Mahemoff, when thinking about large-scale JavaScript, it can be of benefit to exploit some of the more dynamic features of the language. You can read more about some of the concerns highlighted on Michael's [G+](https://plus.google.com/106413090159067280619/posts/hDZkVrDXZR6) page, but I would like to focus on one specifically - automatic event registration (AER). -->
正如 Michael Mahemoff 在前面提到的，当考虑大型 JavaScript 时，适当利用这门语言的动态特性是有益的。关于详细内容请阅读 Michael 的 [G+](https://plus.google.com/106413090159067280619/posts/hDZkVrDXZR6) 页面，我特别关注其中一个概念——自动注册事件（AER Automatic Event Registration）。

<!-- TODO: 译注：前面是哪里？演讲吗？-->

<!-- TODO: concerns highlighted 高亮？强调？-->

<!-- AER solves the problem of wiring up subscribers to publishers by introducing a pattern which auto-wires based on naming conventions. For example, if a module publishes an event called `messageUpdate`, anything with a `messageUpdate` method would be automatically called. -->
AER 通过引入基于命名约定的自动连接模式，解决了订阅者到发布者的连接问题。例如，如果某个模块发布一个称为 `messageUpdate` 的事件，所有相关的 `messageUpdate` 方法将被自动调用。

> 译注：有点类似于 jQuery 事件系统的手动触发方法 .trigger()，即可以触发通过 jQuery 事件方法（.on()）绑定的事件，也可以触发行内事件（elem.click()）。

<!-- The setup for this pattern involves registering all components which might subscribe to events, registering all events that may be subscribed to and finally for each subscription method in your component-set, binding the event to it. It's a very interesting approach which is related to the architecture presented in this post, but does come with some interesting challenges. -->
这种模式的结构涉及到：注册所有可能订阅事件的模块，注册所有可能被订阅的事件，最后为组件库中的每个订阅者注册方法。对于这篇文章所讨论的架构来说，这是一个非常有趣的方法，但也确实带来一些有趣的挑战。

<!-- For example, when working dynamically, objects may be required to register themselves upon creation. Please feel free to check out Michael's [post](http://softwareas.com/automagic-event-registration) on AER as he discusses how to handle such issues in more depth. -->
例如，当动态地执行时，对象可以被要求在创建时注册自身。请阅读 Michael 关于 AER 的[文章](http://softwareas.com/automagic-event-registration)，他更深入地讨论了如何处理这类问题。

<!-- ### Frequently Asked Questions -->
### 常问问题

<!-- #### Q: Is it possible to avoid implementing a sandbox or facade altogether? -->
#### 问：是否有可能避免必须实现一个沙箱或外观？

<!-- A: Although the architecture outlined uses a facade to implement security features, it's entirely possible to get by using a mediator and pub/sub to communicate events of interest throughout the application without it. This lighter version would offer a similar level of decoupling, but ensure you're comfortable with modules directly touching the application core (mediator) if opting for this variation. -->
答：虽然前面介绍的架构使用了一个外观来来实现安全功能，但是如果不用外观，而是用一个中介者和发布/订阅机制来通信系统中感情兴趣的事件是也完全可行的。这个轻量级版本（后者）可以提供类似程度的解耦，但如果选择这么做，模块就可以随意地直接接触应用程序的核心（中介者）。

<!-- #### Q: You've mentioned modules not having any dependencies. Does this include dependencies such as third party libraries (eg. jQuery?) -->
#### 问：你提到了模块没有任何依赖。是否包括对第三方库的依赖（例如 jQuery）？

<!-- A: I'm specifically referring to dependencies on other modules here. What some developers opting for an architecture such as this opt for is actually abstracting utilities common to DOM libraries -eg. one could have a DOM utility class for query selectors which when used returns the result of querying the DOM using jQuery (or, if you switched it out at a later point, Dojo). This way, although modules still query the DOM, they aren't directly using hardcoded functions from any particular library or toolkit. There's quite a lot of variation in how this might be achieved, but the takeaway is that ideally core modules shouldn't depend on other modules if opting for this architecture. -->
答：我特别指对其他模块的依赖。一些开发人员为架构做出的选择实际上等同于 DOM 库的的公用抽象——例如，可以一个构建 DOM 公用类，使用 jQuery 来查询选择起表达式并返回查找到的 DOM（或者 Dojo，如果将来切换了的话）。通过这种方式，尽管模块依然会查询 DOM，但不会以硬编码的方式直接使用任何特定的库或工具。有相当多的方式可以实现这一点，但要选择的话，它们的共同点是核心模块（理想情况下）不应该依赖其他模块。

<!-- TODO the takeaway is 共同点？-->

<!-- You'll find that when this is the case it can sometimes be more easy to get a complete module from one project working in another with little extra effort. I should make it clear that I fully agree that it can sometimes be significantly more sensible for modules to extend or use other modules for part of their functionality, however bear in mind that this can in some cases increase the effort required to make such modules 'liftable' for other projects. -->
在这种情况下，你会发现，有时只需要一点额外的工作量，就可以让一个项目的完整模块运行在另一个项目中。我应该说清楚的是，我完全同意对模块进行扩展或者只使用模块的部分功能，而且有时可能是更明智的选择，但是记住，在某些情况下，想要把这样的模块应用到其他项目会增加工作量。

<!-- #### Q: I'd like to start using this architecture today. Is there any boilerplate code around I can work from? -->
#### 问：我想开始使用这种架构。是否有可供参考的样板代码？
<!-- A: I plan on releasing a free boilerplate pack for this post when time permits, but at the moment, your best bet is probably the '[Writing Modular JavaScript](http://bit.ly/orGVOL)' premium tutorial by Andrew Burgees (for complete disclosure, this is a referral link as any credits received are re-invested into reviewing material before I recommend it to others). Andrew's pack includes a screencast and code and covers most of the main concepts outlined in this post but opts for calling the facade a 'sandbox', as per Zakas. There's some discussion regarding just how DOM library abstraction should be ideally implemented in such an architecture - similar to my answer for the second question, Andrew opts for some interesting patterns on generalizing query selectors so that at most, switching libraries is a change that can be made in a few short lines. I'm not saying this is the right or best way to go about this, but it's an approach I personally also use. -->
答：如果时间允许的话，我打算为这篇文章发布一个样板包，但目前你最好的选择是 Andrew Burgees 的超值教程 [Writing Modular JavaScript](http://bit.ly/orGVOL)（在推荐之前需要完全披露的是，这仅仅是一个推荐链接，收到的任何反馈都将有助于完善内容）。Andrew 的样板包包含一张屏幕截屏以及代码，覆盖了这篇文章的的大部分主要观点，但选择把外观称作“沙箱”，就像 Zakas。还有一些讨论是关于如何理想地在这样一个架构中实现 DOM 抽象库———类似于我对第二个问题的回答，Andrew 在实现选择器表达式查询时采用了一些有趣的模式，使得在大多数情况下，用短短几行代码就可以做到切换库。我并不是说它是正确的或最好的实现方式，但是它是一种可能，而且我个人也在使用它。

<!-- reviewing material 材料审核？bit.ly ？-->

<!-- #### Q: If the modules need to directly communicate with the core, is this possible? -->
#### 问：如果模块需要直接与核心通信，这么做可能吗？

<!-- A: As Zakas has previously hinted, there's technically no reason why modules shouldn't be able to access the core but this is more of a best practice than anything. If you want to strictly stick to this architecture you'll need to follow the rules defined or opt for a looser architecture as per the answer to the first question. -->
答：正如 Zakas 之前暗示的，为什么模块不应该访问核心在技术上没有理由，但这是最佳实现，比其他任何事情都重要。如果你想严格地坚持这种架构，你需要遵循定义的这些规则，或者选择一个更松散的结构，就像第一个问题的答案。
 
<!--### Credits
Thanks to Nicholas Zakas for his original work in bringing together many of the concepts presented today; Andrée Hansson for his kind offer to do a technical review of the post (as well as his feedback that helped improve it); Rebecca Murphey, Justin Meyer, John Hann, Peter Michaux, Paul Irish and Alex Sexton, all of whom have written material related to the topics discussed in the past and are a constant source of inspiration for both myself and others.-->

<hr>

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