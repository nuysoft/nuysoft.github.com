---
layout: post
title: "如何设计伟大的程序"
tag-line: "How to Design Great Programs"
description: ""
category-substitution: 翻译
tags: []
published: false
---
{% include JB/setup %}

> 原文：[How to Design Great Programs](http://blog.ponyfoo.com/2014/01/20/how-to-design-great-programs)，[Markdown](https://github.com/bevacqua/ponyfoo-articles/blob/master/words/2014-01-20_how-to-design-great-programs.md)，[GitHub](https://github.com/bevacqua/ponyfoo-articles)。

# How to Design Great Programs
# 如何设计伟大的程序

![freebeer.jpg][1]

This article is a recollection of common-sense application design practices I usually follow when building things. I felt like grouping them together in a blog post, for future reference. I'll talk not so much about implementation, but more about **program design theory**.

本文是常识性的应用程序设计实践我建立的东西时通常遵循的回忆。我觉得分组在一起在一篇博客文章，以供将来参考。我将讨论与其说是执行，但更多的**程序设计理论。**

Below are the central arguments I'll touch on in the article.
下面是中心论点，我会谈谈在文章中。

1. **Do one thing**, and _do it well_
2. Provide excellent API interfaces
3. `README` Driven Development
4. Open-Source
5. Write Tests

1 ， **做一件事**和_DO它well_
2，提供优良的API接口
3， ` README `驱动开发
4，开源
5 ，书写测试

Let's go over each of these in turn.
让我们在每个这些反过来。

  [1]: http://i.imgur.com/LuHFbbN.jpg "No, seriously. There's no beer. Go away."

# 1. One Goal
＃ 1 。一个目标

Great programs are designed with **a single goal**. Whether we're talking about a CLI, desktop, mobile, web application, or even an API, doesn't matter. The principle remains the same: one goal. A program that's focused on doing a single thing has far better chances of doing it well, being reusable, and being better at it. There are quite a few good examples, such as [through][1], or [ansi-styles][2] in the Node community of packages which do exactly one thing well.

大程序都设计有**一个单一的目标。**无论我们谈论的是一个命令行，桌面，移动， Web应用程序，甚至是一个API ，无所谓。其原理仍然是相同的：一个目标。该公司专注于做一件事的程序有更好的机会做的很好的，是可重复使用的，并且是在它变得更好。有不少很好的例子，如在包里面做正好一件事做好的节点社区[1] ，或[ ANSI -样式] [2] [通过] 。

Programs don't have to be a just a few lines long in order to comply. Both [npm][3] and [connect][4] are great examples of programs which do just one thing well. The goal for `npm` is to provide a package manager which just works. It does double as a development productivity tool, but that's just a side-effect of being a well rounded package manager. On the other hand, `connect`provides a middleware layer for Node's native [`http`][5]. It enables middleware and provides a few basic ones.

程序不必是一个只有几行，以遵守。双方[故宫] [ 3 ]和[连接] [4]是其中只做一件事做好的程序很好的例子。为` `故宫的目标是提供一种只是工作的软件包管理器。它有双重作为发展生产力工具，但是这只是作为一个完满的软件包管理器，一个副作用。在另一方面， ` `连接提供了一个中间件层节点的本地[` HTTP ` ] [5] 。它使中间件，并提供了一些基本的。

![bullseye.jpg][6]

I built [campaign][7], which provides a pluggable email sending layer with a [convention over configuration][8] approach, reducing configuration bloat for a basic email sending service. It doesn't even do any email sending, other modules can already do that, and so [campaign][9] uses those for that purpose. Recently, I started putting together [`λ`][10], a tiny asynchronous flow control meant for the browser, which I'm really proud of. It currently sits at below `3kb` when minified, and it's capable of most of what I find useful in [`async`][11], while staying _10 times smaller_.

我建[活动] [ 7 ] ，它提供了一个可插拔的电子邮件发送层用[约定优于配置] [8]的方法，减少配置膨胀为一个基本的电子邮件发送服务。它甚至没有做任何的电子邮件发送，其他模块已经可以做到这一点，所以[活动] [ 9 ]采用那些用于这一目的。最近，我开始汇集[` λ ` ] [10] ，一个微小的异步流控制意味着浏览器，这我真的很自豪。目前，它坐落在低于` 3KB `精缩的时候，它的能力大部分是我在找到有用[`异步' ] [11] ，而住_10倍smaller_ 。

If your design has a single goal, then it will be that much easier to make it into a reusable component which you can utilize across projects, and maybe even open-source if you feel so inclined. One of the features of developing open-source software is that you force your programs into **focused things**. You or others can benefit from that reusability in other projects. Developing open-source projects also forces you to **document the API**, helping you think about the purpose of each API member.


如果您的设计有一个单一的目标，那么这将是容易得多，使之成为一个可重用的组件，它可以跨项目使用，甚至可能开源，如果你觉得这样的倾向。其中开发开源软件的功能是，你强迫你的程序到**专注的事情。**你或其他人可以受益于可重用性在其他项目中。开发的开源项目也迫使你**文件API的** ，帮助你想想每个API成员的目的。


>At any scale, do _one thing_ and do it well.
>在任何规模的，不要_One thing_并把它做好。

# 2. Excellent API
＃ 2 。优秀的API

Let us define API interfaces as a **consumer-facing interface for a component**, regardless of _transport_. An API might be any of:
让我们定义的API接口，一个**的面向消费者的界面组件** ，无论_transport_的。一个API可能是任何一种：

- The methods exported by a JavaScript package
- Those exposed by a module in that package
- The CLI interface to a command-line program
- REST API endpoints provided by a web application

- 该方法导出的一个JavaScript包
- 那些由该封装模块暴露
- CLI界面的命令行程序
- 通过一个Web应用程序提供的REST API端点

I find that these translate quite nicely to human interaction design as well, and I find that I treat both with the same kind of respect more and more, even if I strive to meet different goals in each case. Design the interface as if consumers didn't have a clue about your code. **They really don't.** Most people won't even look at the code you write, and thus the interface should be intuitive and easy to use. Similarly, it should be documented well enough that people don't have a reason to look at your code. I'll add more thoughts on documentation in the next section.

我发现这些翻译相当不错，以人机交互的设计，以及，我发现我用同一种尊重的对待双方越来越多，即使我努力满足在各种情况下不同的目标。设计界面，如果消费者没有一个关于你的代码的线索。 *他们真的不知道。 **大多数人甚至不会看你写的代码，因此，接口应该是直观和易于使用。同样，它应该记录不够好，人们没有理由去看看你的代码。我要补充的文件在下一节更多的想法。

##### Not So Hot
＃ ＃ ＃ ＃ ＃没有这么热

Consider, as an example, [Gulp, Grunt, Whatever][12], from last week, where we analyzed the trade-offs between the simplicity in Gulp, compared with the _overload-pandemonium_ in Grunt. While Grunt provides lots of functionality, it also provides many different ways to accomplish the same goal. This is not necessarily a good thing. Due to Grunt's **configuration juggernaut model**, consumers aren't able to properly separate task targets, even if they belong to entirely different workflows. Grunt is pretty well documented, but their API could use some love, and that has proved to be very damaging, as witnessed on Stack Overflow where people repeatedly ask basic questions such as how globbing works. Why `files` should be this, or that, etc.

认为，作为一个例子， [咕嘟咕嘟，步兵，无论] [ 12 ] ，从上周开始，我们分析了权衡在咕嘟咕嘟的简单性之间，与_overload - pandemonium_的步兵相比。而步兵提供了大量的功能，还提供了许多不同的方法来达到同样的目的。这未必是一件好事。由于蛮兵**配置剑圣模式** ，消费者无法正确单独的任务目标，即使它们属于完全不同的工作流程。咕噜是相当有据可查的，但他们的API可以使用一些爱，并且已被证明是非常有害的，因为目睹了对堆栈溢出，人们反复询问一些基本问题，例如如何通配符的作品。为什么`文件`应该是这样的，或者说，等等。

Twitter's REST API is a remarkable example of **an API I vigorously despised** when I had to work with it a couple of years ago. I'm not familiar with recent developments, but back then you had the streaming API, the search API, and some other API, and they where abundantly inconsistent. API to API, and sometimes method to method, the response types and request parameter names didn't match. Even the status codes were inconsistent, sometimes returning `200 OK` for errors, sometimes a detailed JSON with the error, and some other times, plain text responses when an error occurred. No one C# library consistently "just worked" seamlessly with these API, and they seemed to be [at least as poorly documented][13] as the Twitter API themselves. Generally a pain to deal with.

Twitter的REST API是一个了不起的例子**的API，我大力鄙视**当我有一个几年前与它合作。我不熟悉，最近的事态发展，但当时你有流API ，搜索API和其他一些API，以及他们丰富的地方不一致。 API来的API ，有时方法方法，响应类型和请求参数名称不匹配。即使是状态码不一致，有时返回` 200 ` OK的错误，有时错误的详细JSON和其他一些时候，纯文本的反应发生错误时。没有一个C ＃库始终“只是工作”无缝地与这些API，并且他们似乎是[至少记录为不良] [ 13 ]作为Twitter的API本身。通常一个痛苦的处理。

These days, [Selenium WebDriver][14] has become my go-to [hated API of choice][15]. Also really confusing, with methods inconsistently named, and implementations which let you write tests using [`wd`] [16] suck, and are _marginally documented_, regardless of what language they're written in.

这些天来， [硒的webdriver ] [ 14 ]已经成为我去到[选择恨空气污染指数] [ 15 ] 。也很混乱，用让你写使用[` WD ` ] [16]吸，并且_marginally documented_ ，无论何种语言，他们正在编写的。测试不一致的命名方法和实现

Middle-tier implementations such as Twitter API clients and Selenium drivers aren't to blame for their poor design or even documentation. Implementation suffers if the API is bad. They suffer just as much if the API is decent but the documentation is lacking or non-existent.

中间层实现，比如Twitter的API客户端和硒驱动程序不责怪他们的设计不佳，甚至文档。实施患有如果API是坏的。他们遭受如果API是体面的一样多，但文档缺乏或不存在的。

##### Consistency, consistency, consistency

＃＃＃＃ ＃一致性，一致性，一致性

There's lots of things you can do to provide a better API than most. Above all, I think the most important factor is naming. The way you name your public API members says a lot about the kind of experience your package is set to deliver. Is it `UserService.getUser`, `Users.get`, `User.find`? Whatever your choice, be consistent about it. API member naming consistency is _crucial_. Think about PHP, how much of it's perceived suck comes from inconsistent API naming and argument overloading?

有很多事情可以做，以提供比大多数更好的API 。首先，我认为最重要的因素就是命名。你的名字你的公共API的成员的方式说了很多关于什么样的经验，你的包被设置为交付。它是` UserService.getUser ` ， ` Users.get `，` User.find ` ？无论你的选择，无论它是一致的。 API的成员命名的一致性_crucial_ 。想想PHP的，它是如何感知的多吸吮来自不一致的API的命名和参数重载？

Only provide **methods which add value.** If you don't have a good reason to provide an API method, then _don't_. It's always easier to add later on, than it is to deprecate, and then remove. On a similar note, you should try to be consistent in the way in which you take parameters. Always take them in the same order, and if you feel like you might add parameters in the future, consider a configuration object. That way, you won't break the API each time you add a new parameter, and all of them become optional!

只提供哪些增值**的方法。 **如果你没有一个很好的理由，以提供一个API的方法，然后_don't_ 。它总是更容易添加以后，比它是贬低，然后取出。在相似的笔记，你应该尽量保持一致在你带参数的方式。总是把它们以相同的顺序，如果你觉得你可能会在将来添加参数，可以考虑配置对象。这样一来，你就不会在每次添加一个新的参数时打破的API ，和所有的人成为可选！

Whenever you're adding a member to your public interface, think. _Ask yourself these questions._

每当你添加一个成员到您的公共接口，想。 _Ask自己这些questions._

- Does this member advance the purpose of my API?
- How does it add value?
- Does it fight for value with another member?
- Is it named consistently with the rest of the API?
- Are the arguments arranged in a consistent manner?
- Are the arguments future-proof?

- 这是否成员推进我的API的目的是什么？
- 它是如何增加价值？
- 它的值与另一个成员打？
- 是它一贯使用API​​的其余部分命名？
- 被安排在一个一致的方式的参数？
- 是参数面向未来的？

> **The interface makes or breaks the user experience**, and this holds true when talking about a GUI, a CLI, or any other API.

> **接口使或打破用户体验** ，当谈到一个GUI ，一个CLI ，或任何其他的API这是成立的。

# 3. [`README` Driven Development][17]
＃ 3 [ ` README `驱动开发] [ 17 ]

Over time, I've developed a habit for writing API documentation which is both extensive and useful, and I've found that my code gets better because of it. Here are some of the most recent packages I've distributed and extensively documented.

随着时间的推移，我已经养成了习惯编写API文档是广泛而有益的，而且我发现我的代码得到的，因为它更好。下面是一些最新的包，我和分布广泛记载的。

- [grunt-ec2](https://github.com/bevacqua/grunt-ec2 "Create, deploy to, and shutdown Amazon EC2 instances")
- [buildfirst][18]
- [campaign](https://github.com/bevacqua/campaign "Compose responsive email templates easily, fill them with models, and send them out")
- [suchjs](https://github.com/bevacqua/suchjs "Provides essential jQuery-like methods for your evergreen browser, in under 200 lines of code")
- [contra](https://github.com/bevacqua/contra "Asynchronous flow control for the browser")

- [咕噜- EC2 ] （ https://github.com/bevacqua/grunt-ec2 “创建，部署和关机亚马逊EC2实例” ）
- [ buildfirst ] [18]
- [活动] （ https://github.com/bevacqua/campaign “撰写响应电子邮件模板容易，配车型填补他们，并送他们去” ）
- [ suchjs ] （ https://github.com/bevacqua/suchjs “提供基本的jQuery样的方法为你的常绿浏览器， 200行代码构成” ）
- [禁忌] （ https://github.com/bevacqua/contra “为浏览器异步流量控制” ）

In all of these cases, typing away at the documentation was a great way to think about the API design and how it could be improved. Or in the case of [buildfirst][19], how the sample code could've made better. Pointing people to your unit tests as a learning resource on how to use your library is _a sign of early onset dementia_. What works for me is briefly describing the goals of a library, and provide a complete list of API methods, arguments they take, and results they produce. Often, it's best to pair API method documentation with usage examples, to make it clear exactly what a method can be used for, and how _you_, the package author, think it should be used. That helps people use the library, and it helps you shape it.

在所有这些情况下，打字走在文档是一个伟大的方式来思考API设计以及它如何可以改善。或者在[ buildfirst ] [19] ，如何示例代码可能已经取得了较好的情况下。人们指着你的单元测试，如何使用你的库中的学习资源是早发dementia_ _a迹象。什么对我的作品进行了简要描述库的目标，并提供API方法，他们采取的论点，以及它们产生的结果的完整列表。通常情况下，这是最好的对API文档的方法与使用范例，要分清楚到底是什么方法可用于，如何_you_ ，包的作者，认为它应该被使用。这有助于人们利用图书馆，它可以帮助你塑造它。


If you think documentation is obsolete as soon as you push, **you're doing it wrong**. That may be true for print documentation, manuals, and such. This day and age, libraries are distributed under source-control, and most of us use [semantic versioning][20] for their libraries. Providing documentation alongside the code is required, but it isn't enough. **You need to actively update that documentation, at least every time you publish a new release**, to reflect the latest API changes in your package. Likewise, providing a [CHANGELOG][21] is awesome at letting people know what's going on in terms of active development around your package.
如果您认为文件已经过时，只要你推， **你就错了。**这可能是真实的打印文档，手册，和这样的。这个时代，图书馆分布在源代码控制，和我们大多数人使用[语义版本] [20]为自己的音乐库。提供的文档沿着码是必需的，但它是不够的。 *您必须积极更新该文件，至少你发布一个新的版本**每一次，以反映你的包的最新API的变化。同样，提供了一个[更新日志] [21]是让人们知道发生了什么在左右你的包主动发展方面的事情真棒。

> Allowing documentation to become stale is, in effect, even worse than not providing any documentation at all. **Misleading documentation is worse than no documentation.**
>允许文档变得陈旧，实际上，比没有提供任何文档更差。 **误导文档比没有文档更糟。 **


There are a couple of things to keep in mind when writing great README documentation. You need to have a plan. Start with an outline, what questions does your README intend to answer? Is there going to be any documentation besides the README? _Tests don't count._ Who are you writing the documentation for? Is it clients? Fellow developers? The open-source community? What do they need to know? I like creating documents that start with the name or logo of my package. Then I'll provide a quote with a sentence or two which briefly state the goal or purpose, and afterwards I may provide a paragraph describing the module in a little more detail. Once that's out of the way I get to installation, where I describe how the module can be installed from each source that's available to consumers, package managers, straight from GitHub, and whatnot.
有几件事情写伟大的README文件时要牢记。你需要有一个计划。开始的大纲，你的自述打算什么问题来回答？是否有将是除自述任何文件？ _Tests不count._你是谁写的文档？它是客户？开发伙伴们？开源社区？他们需要什么了解？我喜欢创建开始与我的包的名称或标志的文件。然后，我将提供一个报价有一两句话的简要说明目标或目的，事后我可以提供描述更详细一点的模块一个段落。一旦这搞的我去安装，在这里我将介绍如何在模块可以从每个源的提供给消费者，包管理器，直接从GitHub上进行安装，和诸如此类的东西的方式。

Lastly, I like going through each API member and documenting their name and method signature, describing the method as well as each argument it takes, and the result it produces. In all cases I love providing self-contained usage examples for each method. I try not to mix examples with multiple parts of an API too much, since people don't necessarily read the whole thing at once, they might just navigate to specific bits and pieces at a time. For those people, going through a piece of code that uses 3+ API methods starts getting hard to understand. You want usage examples to be as simple as possible. They describe how your API is used, and if they look complicated, it probably means your API is complicated, or that your documentation is poor. Your API shouldn't be complicated. **A complicated API is a bad API.** Your documentation should be elegant, poor documentation isn't pretty to look at. That gets people upset. It's also a waste of time to type out poor documentation. _Write good API usage examples!_
最后，我想经历每个API成员，并记录他们的名字和方法签名，描述方法以及每个需要的参数，结果它产生。在任何情况下我喜欢提供的自助式用法示例为每个方法。我尽量不混用的例子有一个API的多个部分太多了，因为人们不一定一次读取整个事情，他们可能只是定位到特定的零零碎碎的时间。对于这些人，经历使用3 + API的方法开始变得难以理解的一段代码。你想用法示例要尽可能简单。他们描述你的API的使用，如果他们看起来很复杂，这可能意味着你的API是复杂的，或者说你的文件很糟糕。您的API不应该复杂。 *一个复杂的API是一个坏的API。 **你的文件应该是优雅的，可怜的文档不是很关注一下。这让人们心烦意乱。这也是一个浪费时间打出来穷文档。 _write良好的API使用实例！ _

##### You might want to consider answering these questions
＃ ＃ ＃ ＃ ＃你可能要考虑回答这些问题


- What is this program?
- How do I get it?
- How do I use it?
- What are the methods I can use?
- Can you provide me with any usage examples?
- What license type do you use?
- How can I contribute?
- 这是什么节目？
- 我怎么得到它呢？
- 我如何使用它？
- 什么是我可以使用的方法？
- 你能为我提供任何用法的例子吗？
- 你用什么许可证类型？
- 我怎么能做出贡献？

# 4. Open Source It
＃ 4 。开源它

Some of the best software I've written is open-source. That's not bragging, it's just that you have to be more careful about it. I already stated that open-source forces you to write documentation, which in turn helps you write better interfaces. But open-source doesn't stop at that. Counter-intuitively, **open-source makes your code more secure**. You can't merely distribute API secrets with an OSS piece of code, you might need to [encrypt it][22], or exclude it from your codebase altogether.
一些我写的最好的软件是开源的。这不是吹牛，它只是你必须要更加小心了。我已经指出，开源强迫你写文档，这反过来又可以帮助你写出更好的接口。但开源并不止于这一点。与直觉相反， **开源使你的代码更安全。**你不能只分配API秘密与OSS一段代码，您可能需要[它加密] [ 22 ] ，或者从您的代码库中排除它完全。

![oss.jpg][23]

Open makes you want to write [decoupled code][24], so that other people can consume it. That also means you'll be able to use it in other projects down the road, which should be incentive enough on its own to warrant thinking open-source. That's a key concept. **"Think open-source".** Even if you don't actually open-source the thing, writing something _as-if_ you were going to open-source it at some point, will help you with all of the above. You'll write code that's safer, better documented, and more focused.

打开让你想写[解耦代码] [24] ，让其他人可以使用它。这也意味着你就可以使用它在其他项目中的道路，这应该是足够的激励自身，值得思考开源。这是一个关键的概念。 ** “想想开源” 。 **即使你实际上并不开源的东西，写东西_AS - if_你要开源它在某个时刻，会帮助你以上所有的。你会写代码更安全，更好地记录，并更加专注。

**Decouple hacks.** If you're writing code for the browser, don't bake hacks that make your code work in **IE < 10** into your package. Rather, build them [into a companion file][25] you can add if necessary. This decoupling will do a couple _(touché)_ things for you. It'll help you keep the code cleaner, as you won't have ugly pieces of code lying around which don't have so much to do with the purpose of your package, but more to do with the limitations of the platform you're going to run the package on. It will keep the code smaller in those cases where you don't need to support legacy platforms. If your hacks are independent enough, you might even be able to reuse them in other projects! _Yayyy, reusable hacks._ `:rolleyes:`

*去耦黑客。 **如果你正在编写代码的浏览器，不烤在** IE浏览器的hack，使你的代码工作< 10 **到您的包裹。相反，他们建[成伴随文件] [25]您可以根据需要添加。这种分离会做一对夫妇_ （德勤） _你的东西。它会帮助你保持代码的清洁剂，因为你不会有难看的代码块周围地势不具备这么多与你的包的目的，但更多的是与你的平台“的局限性重新去上运行该程序包。它会保持较小的代码在这些情况下，您并不需要支持传统平台。如果你的黑客具有充分的独立性，你甚至能够重用他们在其他项目！ _Yayyy ，可重复使用的hacks._ ` ： rolleyes ： `


> Deal in focused components. **Think open-source.**
>在处理集中的组件。 **想想开源的。 **


# 5. Write Tests
＃ 5 ，书写测试


Write a single test. Then another. Then progressively write enough so that you [cover all of your API][26]. Then, [keep your tests up to date][33]. Update the suite as you add new API members, or when modifying existing ones. Then update the documentation. Only when the tests pass and the documentation is updated should you allow yourself to commit again.

编写一个测试。然后另一个。然后逐步编写足够让你[涵盖所有的API ] [ 26 ] 。然后， [保持你的测试是最新的] [33] 。更新套件当你添加新的API成员，或修改现有的时候。然后更新文档。只有当测试通过和文档被更新，你应该让自己再次提交。


[![browserling.png][27]][28]

Set up automated testing. This is becoming increasingly painless. Testing modules on [Travis-CI][29] is a joke, it couldn't be any easier to set up. In a few minutes you can have your repository running tests on every push. If you're into running things on browsers, then [Testling][30] and [Sauce Labs][31] are eager to befriend you. I've been using both while working on [contra][32], and they're both awesome. Testling has been particularly useful, although it took me a while to figure out that tests on **IE < 10** were blowing up solely because I was using `should`, which defines a bunch of getters. After switching to `assert`, though, I didn't have any more problems.

建立自动化测试。这是越来越痛苦。在[特拉维斯 - CI ] [ 29 ]测试模块是一个笑话，但它不能有任何容易设置。在几分钟内，你可以有你的资料库上的每个推送运行测试。如果你到浏览器上运行的东西，然后按[ Testling ] [ 30 ]和[酱实验室] [31]都渴望亲近你。我一直在使用这两种，当工作在[禁忌] [32] ，而且他们俩都是真棒。 Testling一直是特别有用的，虽然我花了一段时间才能弄清楚，在** IE浏览器测试< 10 **被完全炸毁了，因为我是用'应该' ，它定义了一帮干将。切换到` `断言后，虽然，我没有任何更多的问题。


> Whenever you add or change a method, update your test suite. Update your documentation to match. 

>无论何时添加或更改的方法，更新您的测试套件。更新您的文件相匹配。


That's all the advice I have for today!

这是所有的意见，我有今天！



  [1]: https://github.com/dominictarr/through "dominictarr/through on GitHub"
  [2]: https://github.com/sindresorhus/ansi-styles "sindresorhus/ansi-styles on GitHub"
  [3]: https://github.com/npm/npm "npm/npm on GitHub"
  [4]: https://github.com/senchalabs/connect "senchalabs/connect on GitHub"
  [5]: http://nodejs.org/api/http.html "HTTP module documentation for Node"
  [6]: http://i.imgur.com/m4IXGsC.jpg "Have a single, specific purpose"
  [7]: https://github.com/bevacqua/campaign "bevacqua/campaign on GitHub"
  [8]: http://en.wikipedia.org/wiki/Convention_over_configuration "Convention over Configuration on Wikipedia"
  [9]: https://github.com/bevacqua/campaign "bevacqua/campaign on GitHub"
  [10]: https://github.com/bevacqua/contra "bevacqua/contra on GitHub"
  [11]: https://github.com/caolan/async "caolan/async on GitHub"
  [12]: /2014/01/09/gulp-grunt-whatever "Gulp, Grunt, Whatever"
  [13]: http://stackoverflow.com/questions/6587176/tweetsharp-where-did-fluenttwitter-go "Where did FluentTwitter go?"
  [14]: http://docs.seleniumhq.org/projects/webdriver/ "Selenium WebDriver Browser Automation"
  [15]: http://blog.ponyfoo.com/2013/12/20/is-webdriver-as-good-as-it-gets "Is WebDriver as Good as it Gets?"
  [16]: https://github.com/admc/wd "admc/wd on GitHub"
  [17]: http://tom.preston-werner.com/2010/08/23/readme-driven-development.html "Readme Driven Development"
  [18]: https://github.com/bevacqua/buildfirst "JavaScript Application Design Code Samples"
  [19]: https://github.com/bevacqua/buildfirst "JavaScript Application Design Code Samples"
  [20]: http://semver.org/ "Semantic Versioning, or semver"
  [21]: https://github.com/bevacqua/grunt-ec2/blob/master/CHANGELOG.markdown "Sample CHANGELOG, as seen in grunt-ec2"
  [22]: https://github.com/bevacqua/buildfirst/tree/master/ch03/02_rsa-config-encryption "RSA Configuration Encryption"
  [23]: http://i.imgur.com/PhNCOO1.jpg "Open-Source Software"
  [24]: https://github.com/bevacqua/campaign "bevacqua/campaign on GitHub"
  [25]: https://github.com/bevacqua/contra/blob/master/src/contra.shim.js "contra.shim.js in bevacqua/contra on GitHub"
  [26]: https://github.com/bevacqua/contra/blob/master/test/unit.js "Unit tests in Contra.js"
  [27]: http://i.imgur.com/J4WIv2x.png
  [28]: https://browserling.com "Visit the browserling"
  [29]: https://travis-ci.org/ "Travis-CI: Continuous Integration Platform"
  [30]: http://ci.testling.com/ "Testling: Run your browser tests on every push"
  [31]: https://saucelabs.com/ "Sauce Labs: Hassle-free Testing"
  [32]: https://github.com/bevacqua/contra "bevacqua/contra on GitHub"
  [33]: https://github.com/bevacqua/contra/commits/master/test/unit.js "Commit History for unit tests in Contra.js"

[best-practices api open-source program-design]

[最佳实践API开放源码的程序设计]

