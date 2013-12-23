---
layout: post
title: "如何设计出色的 JavaScript API"
tagline: "Secrets of Awesome JavaScript API Design"
description: "介绍艺术领域中常用的的 4 项设计原则：一致 & 协调、平衡、相衬、重点突出，并把它们应用到 API 设计中。"
category-substitution: 翻译
tags: [翻译, api, javascript]
---
{% include JB/setup %}

> 原文：[Secrets of Awesome JavaScript API Design](http://webstandardssherpa.com/reviews/secrets-of-awesome-javascript-api-design), [YouTube](http://www.youtube.com/watch?v=QlQm786MClE), [PDF](http://riagora.com/appliness/Appliness-April-2013.pdf)，[其他翻译版本](http://www.oschina.net/translate/secrets-of-awesome-javascript-api-design)

<!-- , [Designing Better JavaScript APIs](http://coding.smashingmagazine.com/2012/10/09/designing-javascript-apis-usability/) -->

<!-- http://www.oschina.net/translate/secrets-of-awesome-javascript-api-design?cmp -->

<img class="jail" src="http://webstandardssherpa.com/r/21-1.png" style="display: inline;">

<!-- Design is a universal concept. As the act of “form[ing] a plan or scheme of [some thing]… for later execution,” ([Oxford English Dictionary](http://oxforddictionaries.com/definition/american_english/design)) design is the common thread that weaves together art, architecture, hardware and more. Software design, specifically the subcategory of API design, is no different. Yet API design is often given little attention in the world of software development, because the exercise of writing code for other developers often seems far less important than the design of application UI and end-user experiences. -->
设计是一个具有普遍性的概念。正如[牛津英语字典](http://oxforddictionaries.com/definition/american_english/design)中所定义的“拟定执行计划或执行方案”，设计是将艺术、体系结构、硬件等结合到一起的一条主线。软件设计，特别是 API 设计，也是如此。然而在软件开发中，往往很少有人会注意到 API 设计，这是因为相比于设计应用程序的 UI 或设计终端用户体验，为其他开发人员编写代码似乎没那么重要。

<!-- But API design—the public interfaces we provide in the libraries we create, with the express intent of exposing features and functionality to developers who call our code—is just as important as UI design. In fact, both are the primary mode of creating user experiences for a segment of an application’s audience. Where application UI is a large part of end-user UX, an application’s API is developer UX. As such, it should be designed with the same level of care and attention to detail that we provide to user interfaces. Just as we pay attention to the utility, simplicity and elegance of a UI, we should similarly evaluate the utility, simplicity and elegance of an API. -->
但是 API 设计——库所提供的公共接口，向开发人员暴漏功能和特性——与 UI 设计一样重要。事实上，两者都是改善应用程序的用户体验的主要方式。应用程序的 UI 关注的是终端用户的体验，应用程序的 API 关注的则是开发人员的体验。因此，应该对 API 设计和 UI 设计给予同等程度的照顾和关注。就像我们重视 UI 的实用、简洁和优雅，我们也应该追求 API 的实用、简洁和优雅。

<!-- API design, and in the context of this article JavaScript API design, presents a unique challenge for all developers, whether you’re building a public library or an internal one. The dynamic nature of JavaScript, the anonymity of library consumers and ambiguity in requirements presents a daunting set of challenges for the API designer. While there are no quick shortcuts to good API design, it is possible to distill a handful of design principles that hold up when applied to some of the popular JavaScript libraries of today. -->
API 设计，以及本文所述的 JavaScript API 设计，向所有开发人员提出了一个独特的挑战，无论是构建公开库还是内部库。JavaScript 的动态特性，库使用者的匿名制，以及不明确的需求，对于 API 设计者来说都是艰巨的挑战。虽然好用的 API 设计没有捷径可走，但是我们可以从当下流行的 JavaScript 库中提取一些设计原则。

<!-- ## API Design: A Struggle of Good vs. Evil -->
## API 设计：善恶之争

<!-- Poor design in JavaScript APIs is costly, both to the developers consuming your API and to you. In both cases, a poor design generates waste: wasted time for developers as they struggle to make sense of an interface, and wasted time for the API author as she deals with the increased load of support and rework brought about by developer confusion. Considering that nearly all APIs are created with the goal of abstracting common functionality for easy consumption and thus, saving time, a poor API leaves both you and your users wondering if this little library of yours was such a good idea after all. -->
对于使用 API 的开发人员和你自己，差劲的 JavaScript API 设计的代价是昂贵的。差劲的设计会导致浪费：浪费开发人员的时间，因为他们很难弄懂一个接口；浪费 API 作者的时间，因为她需要处理开发混乱带来的额外支持和返工。几乎所有的 API 在设计之初都是为了抽象通用功能以简化使用，从而节省时间，而一个差劲的 API 则会使你自己和你的用户怀疑这个库究竟是否是一个好主意。

<!-- Good API design, on the other hand, accomplishes the goal of [abstraction](http://en.wikipedia.org/wiki/Abstraction_(computer_science), while being [self-describing](http://en.wikipedia.org/wiki/Self-documenting). When an API is well-designed, users can leverage your work quickly and intuitively, without the constant reference of a manual, documentation or frequent visits to support and Q&A sites. You’ve also saved another developer time by packaging up some feature that would have taken much longer to create on their own. And not only does good design save developers time, it makes them look smart and responsible. Helping your users look smart and capable makes them feel awesome, which makes you look pretty awesome, too. -->
另一方面，良好的 API 设计可以实现[抽象](http://en.wikipedia.org/wiki/Abstraction_(computer_science)这一目标，同时也应该是[自描述](http://en.wikipedia.org/wiki/Self-documenting)的。如果一个 API 被良好地设计，用户可以快速直观地利用你的工作成果，而且不需要经常参考手册和文档，不需要频繁访问技术支持和问答网站。对于需要开发人员花费大量时间来开发的特性，你也可以把它们封装起来以节省开发人员的时间。良好的设计不仅可以节省开发人员的时间，也让他们看起来更加聪明和可靠。通过让你的用户看起来聪明能干、感觉良好，也让你看起来更加牛逼。

<!-- ## In JavaScript, API Design is Especially Important -->
## 在 JavaScript 中，API 设计尤为重要

<!-- While API design is important regardless of programming language or framework, the stakes of API design are much higher for JavaScript than for many other languages. To begin with, as a dynamic, late-bound programing language, JavaScript has no compiler to serve as a safety net or first unit test to point out mistakes in your code. [Linting](http://en.wikipedia.org/wiki/Lint_%28software%29) or verification frameworks like [JSLint](http://jslint.com/) and [JSHint](http://jshint.com/) help somewhat. These utilities are useful in pointing out common mistakes in JavaScript code, but they do nothing to catch the errors a developer might make when using your API. -->
不管是什么编程语言或框架，API 设计都非常重要，而且对于 JavaScript，API 设计的风险要比许多其他语言更高。首先，JavaScript 作为一门动态的、延迟绑定的编程语言，没有编译器来充当安全网的角色，也没有基本的单元测试来发现代码中的错误。这时，[Linting](http://en.wikipedia.org/wiki/Lint_%28software%29) 或验证框架（例如 [JSLint](http://jslint.com/) 和 [JSHint](http://jshint.com/)）可以帮助我们。这些工具可以帮助发现 JavaScript 代码中的常见错误，但是当开发人员使用 API 时，这些工具无法捕获可能出现的错误。

<!-- It’s up to you, then, to build an API with a design that helps users of your library fall into the proverbial “pit of success.” This means that your library feels comfortable and familiar to the developer, while also providing positive reinforcement and building the developer’s confidence as she interacts with your code. -->
如何构建一个有设计感的 API，帮助库用户掉进俗话所说的“pit of success”，这一切都取决于你。这意味着你的库对于开发人员是舒适和友好的，当开发人员与你的代码交互时，还需要提供积极的支持并建立信任。

<!-- One of the best examples of “falling into the pit of success” is [jQuery’s](http://jquery.com/) use of CSS [selector syntax](http://api.jquery.com/category/selectors/) for fetching DOM elements. For example, if I want to select all `article` elements with the class `blogPost`, I can do the following in jQuery: -->
“falling into the pit of success” 最好的例子之一是 jQuery 用 CSS 选择器语法来获取 DOM 元素。例如，如果我想要获取所有包含了类样式 `blogPost` 的 `article` 元素，我可以在 jQuery 中这么做：

    $("article.blogPost").fadeIn();

<!-- It’s no coincidence that the selector `article.blogPost` uses the exact same syntax as the following: -->
CSS 选择器 `article.blogPost` 使用了完全相同的语法，如下所示，这并非巧合：

    article.blogPost {
      border-radius: 10px;
      background-color: salmon;
      box-shadow: 0px 0px 10px 2px #ccc;
    }

<!-- jQuery’s selector engine was designed to enable me, the developer, to map my existing understanding of CSS selectors onto basic interactions with its engine. As a result, I’m instantly and measurably more productive than if jQuery required me to use a new, purpose-built syntax. -->
jQuery 选择器引擎的设计，使像我这样的开发人员可以把对 CSS 选择器的既有理解映射到与引擎的基本交互。因此，我可以立即明显地提高生产力，反之如果 jQuery 要求我使用一种全新的、特定用途的语法，显然不会有这种效果。

<!-- It’s possible to take inspiration from libraries like jQuery and others, and to apply these our own designs. However, inspiration by itself is a degree removed from copying, and anyone who’s ever designed an API based solely on the inspiration of another knows that he will inherit both good and bad. Instead, if we map examples of good JavaScript API design to proven principles found in other fields, we can build a framework of good API design that can be applied in any context. -->
我们可以从像 jQuery 这样的库获得灵感，并应用到我们自己的设计中。然而，灵感不等于全盘复制，如果仅仅基于他人的某个灵感来设计 API 的话，将不分好坏全盘继承。反之，如果我们能用好的 JavaScript API 设计作为例子，来证明那些其他领域中发现的原则，我们就可以建立一套适用于任何场景的 API 设计框架。

<!-- ## Secrets of Awesome JavaScript APIs -->
## 出色 JavaScript API 的秘诀

<!-- While it’s true that software doesn’t have the same visual qualities as a painting or a building, we tend to use the same adjectives to describe software as we do for physical media. It’s not uncommon to hear someone refer to an API as “elegant” or “beautiful.” If it’s valid to describe APIs in terms we use for visual media, it’s equally valid to use the principles of those media to inform our software designs. -->
虽然软件不能像绘画或建筑那样从视觉的角度来评估质量，但我们仍倾向于使用与物理介质一样的形容词来描述软件。例如我们经常听到有人用“优雅”或“漂亮”来称赞某个 API。既然原本用于描述视觉媒体的术语可以用于描述 API，那么视觉媒体的原则也可以应用于软件设计。

<!-- In this section, I’m going to introduce four popular design principles from the art world and apply these to API design: -->
在本节中，我将介绍艺术领域中常用的的 4 项设计原则，并把它们应用到 API 设计中：

<!-- * Unity and Harmony
* Balance
* Proportionality
* Emphasis -->

* 一致 & 协调
* 平衡
* 相衬
* 重点突出

> [相衬：犹相称。配合得当；相配合适。](http://baike.baidu.com/view/1603468.htm)

<!-- For each of these, I’ll point to one or more examples of the principle as leveraged in the API of a popular JavaScript library. -->
对于每个设计原则，我将列出一个或多个示例来说明，示例均来自于流行的 JavaScript 库的 API。

<!-- ## Principle 1: Unity & Harmony -->
## 原则1：一致 & 协调

<!-- In art, unity is the concept behind a work, or how the composer brings everything together into a coherent whole. Harmony, on the other hand, is the placement of similar elements throughout a work, which yields an uncomplicated and simple feel when considered in its entirety. -->
在艺术上，一致性是一件作品背后不可或缺的概念，使得设计者可以把各种事物汇集成一个连贯的整体。另一方面，协调性则是指作品中相似元素的布局，使得作品从整体上产生一种简洁的感觉。

<!-- For the API designer, these principles can be applied through the use of similar and/or unifying elements in a library. Take, for instance, [Kendo UI](http://www.kendoui.com/), a JavaScript framework for building rich web applications. One of Kendo UI’s offerings is a set of UI controls and widgets, all of which can be initialized using a similar syntax. For example, if I wanted to create a TreeView control from an unordered list, I need only call the following: -->
对于 API 设计师来说，这些原则可以应用在库中相似或一致的元素上。以 [Kendo UI](http://www.kendoui.com/) 为例，一个用于创建富 WEB 应用的 JavaScript 框架。Kendo UI 提供了一系列 UI 组件，它们都可以使用相似的语法来初始化。例如，如果我想从一个无序列表创建一个 [TreeView](http://demos.kendoui.com/web/treeview/index.html)，只需调用以下方法：

    $("ul.tree").kendoTreeView({ /* Configuration goes here */ });

<img class="jail" src="http://webstandardssherpa.com/r/21-2.png" style="display: inline;">

<p style="text-align: center;">Kendo UI TreeView Widget</p>

<!-- If, on the other hand, I wanted to create a [PanelBar](http://demos.kendoui.com/web/panelbar/index.html) from a list, I’ll make a slightly different call. -->
另外，如果我想从一个列表创建一个 [PanelBar](http://demos.kendoui.com/web/panelbar/index.html)，只需调用另一个稍有不同的方法。

    $("ul.panel").kendoPanelBar({ /* Configuration goes here */ });

<img class="jail" src="http://webstandardssherpa.com/r/21-3.png" style="display: inline;">

<p style="text-align: center;">Kendo UI PanelBar</p>

<!-- Kendo UI promotes unity and harmony by using this consistent `kendoX` syntax for all of it’s widgets. What’s more, its dependency on jQuery objects for obtaining DOM elements adds an additional layer of harmony that any developer already familiar with jQuery will benefit from. By using a “local dialect” of JavaScript that millions of developers are familiar with, Kendo UI promotes harmony across libraries. -->
Kendo UI 的组件通过使用一致的 `kendoX` 语法，提升了一致性和协调性。更重要的是，它依赖于封装了 DOM 元素的 jQuery 对象，并基于 jQuery 对象扩展了额外的、协调的附加层，这样一来，任何已经熟悉 jQuery 的开发人员都将从中获益。通过使用数百万开发者所熟悉的“方言”，Kendo UI 促进了跨库协调性。

<!-- Another example of harmony in action is [Backbone’s](http://backbonejs.org/) [object].extend syntax to create objects that inherit and extend the functionality of Backbone [Models](http://backbonejs.org/#Model), [Views](http://backbonejs.org/#View), [Collections](http://backbonejs.org/#Collection) and [Routers](http://backbonejs.org/#Router). To create a new Backbone model, I can do something like the following, and I’ll get a model object that’s fully-supported by Backbone, while being customized to my application’s needs: -->
另一个关于协调性的案例是 [Backbone](http://backbonejs.org/) 的 [object].extend 语法，该语法用于创建新对象，继承和扩展 Backbone Backbone [Models](http://backbonejs.org/#Model)、[Views](http://backbonejs.org/#View)、[Collections](http://backbonejs.org/#Collection) 和 [Routers](http://backbonejs.org/#Router) 的功能。为了创建一个新的 Backbone Model，可以像下面这样实现，创建一个 Backbone 完全支持的 Model 对象，同时还可以按照应用程序的需求自定义实现：

    var Book = Backbone.Model.extend({
      initialize: function() { ... },
      author: function() { ... },
      pubDate: function() { ... },
    });

<!-- The goals of unity and harmony are to convey familiarity and comfort to developers new to your API. By leveraging identical or similar idioms for related but different actions, an API can convey familiarity and comfort which can greatly ease a developer’s adoption of a new tool. -->
一致性和协调性的目的在于向 API 新手传达友好和舒适的感觉。虽然 API 的功能不同，但是通过相同或相似的“方言”，可以大大降低开发人员采用新工具的门槛。

<!-- ## Principle 2: Balance -->
## 原则2：平衡

<!-- The next principle is balance, an arrangement of elements to ensure that no one part of the work overpowers other parts or causes the work to feel unstable. In art, balance is about visual weight. Even when asymmetrical, a work can feel balanced because its asymmetry follows a pattern. In the context of API design, I interpret balance to mean both the visual weight of the code and its predictability. -->
第二个原则是平衡，布置元素时要不能让作品的某个部分过于出彩而是其他部分黯然失色，或者让人感觉作品不稳定。在艺术上，平衡与视觉权重（吸引力）有关。即使作品是不对称的，然而只要这种不对称遵循了某种模式，作品仍然会给人以平衡的感觉。在 API 设计中，平衡特指代码的视觉权重和可预测性。

<!-- A balanced API is one whose component parts feel as though they belong together, because they behave the same or aid the consumer in accomplishing a complementary goal. By extension, these APIs also feel balanced because they allow the consumer to extrapolate usage from a small sample. Consider [Modernizr’s](http://modernizr.com/) [property tests](http://modernizr.com/docs/#howitworks). These achieve balance by a) using property names that match HTML5 and CSS concepts and APIs; and b) by consistently returning a truthy or falsy value for every single test: -->
平衡的 API 让人觉得其组成部分不分彼此、浑然一体，因为它们或者行为相同，或者互补地帮助用户完成目标。以此类推，用户籍由一个小示例就可以推断出 API 的用法。例如 [Modernizr](http://modernizr.com/) 的 [功能测试项](http://modernizr.com/docs/#howitworks)。该库通过以下方式实现了平衡：a) 使用与 HTML5 和 CSS 一致的概念和 API；b) 每个测试项统一返回 true 或 false：

    // All of these properties will be 'true' or 'false' for a given browser
      Modernizr.geolocation
      Modernizr.localstorage
      Modernizr.webworkers
      Modernizr.canvas
      Modernizr.borderradius
      Modernizr.boxshadow
      Modernizr.flexbox 

<img class="jail" src="http://webstandardssherpa.com/r/21-4.png" alt="Modernizr" style="display: inline;">

<!-- Accessing a single property tells the developer everything he or she needs to know in order to access every other property, a quality that’s powerful in its simplicity. It also ensures that the code I write to interact with Modernizr has the same visual weight each time I write or read it. How I use and access the API looks and feels the same, regardless of my usage. If, on the other hand, Modernizr were to add an API to polyfill Canvas, imbalance would take hold. Not only is the visual weight of the library affected by this new API, but the scope and purpose of Modernizr has grown greatly, and my ability to predict how to interact with the API is hampered. -->
通过访问一个测试项，开发人员就可以知道访问其他测试项所需的全部知识，Modernizr 的强大之处正在于它的简单。并且，每次编写或阅读与 Modernizr 交互的代码时，都有着同样的视觉权重。不管在什么场景下，当我使用 Modernizr 时，外观和感觉都是一致的。另一方面，如果 Modernizr 要增加一个 API 来检测是否支持 Canvas，也不会失去平衡性。不仅新 API 不会影响 Modernizr 的视觉权重，即使现在 Modernizr 的功能和适用范围已经扩大，也不会阻碍我和 API 交互时的可预测性。

<!-- Another way to achieve balance through predictability is to rely on concepts already familiar to developers. A notable example is [jQuery’s selector syntax](http://api.jquery.com/category/selectors/), which maps CSS1–3 selectors into its own DOM selector engine: -->
另一种开实现平衡性、可预测性的方式是，依靠发人员已经熟悉的概念。一个明显的例子是 [jQuery 的选择器语法](http://api.jquery.com/category/selectors/)，它的 DOM 选择器引擎直接映射了 CSS1-3 选择器：

    $("#grid") // Selects by ID
    $("ul.nav > li") // All LIs for the UL with class "nav"
    $("ul li:nth-child(2)") // Second item in each list

<!-- By using a familiar concept and mapping it to its own library, jQuery is able to avoid creating a new selector syntax, while also creating a mechanism that makes new users of the library instantly productive with a predictable API. -->
通过使用熟悉的概念并映射到自己的库中，jQuery 避免了创建一套新的选择器语法，同时也创建了一种机制，让新用户可以利用这些可预测的 API 立即提高生产力。

<!-- ## Principle 3: Proportion -->
## 原则3：相衬

<!-- The next principle is proportion, which is a measurement of the size and quantity of elements within a work. Rather than stating that a good API is a small API, proportion is about size relative to purpose. A proportional API is one whose API surface matches its scope of capability. -->
第三个原则是相衬，它用来衡量作品中元素的大小和数量。并不是说小 API 就是好 API，相衬性所衡量的大小与 API 的用途（功能）有关。一个具备相衬性的 API，它的外观应该与它的能力范围相匹配。

<!-- For instance, [Moment.js](http://momentjs.com/), a popular date parsing and formatting library, can be considered proportional because it’s API surface is compact, which matches the straightforward purpose of the library. Moment.js is for working with dates and, as such, its API is filled with convenience functions designed to make the JavaScript `Date` object tolerable to work with: -->
例如 [Moment.js](http://momentjs.com/)，一个流行的日期解析和格式化库，可以认为是相衬的，因为它的 API 很简洁，它的用途（功能）简单明确，两者相辅相成。Moment.js 用于处理日期，因此，它的 API 被设计为一系列可以处理 JavaScript `Date` 对象的便捷函数：

    moment().format('dddd');
    moment().startOf('hour').fromNow();

<img class="jail" src="http://webstandardssherpa.com/r/21-5.png" alt="Moment.js" style="display: inline;">

<!-- For libraries with a targeted purpose, like Moment.js, keeping the API focused and small is important. For larger, more expansive libraries, the size of the API should reflect the capabilities of the library itself. -->
对于像 Moment.js 这样有针对性的库，保持 API 专注和小巧很重要。对于更大、更磅礴的库，API 的大小则应该反映库自身的功能。

<!-- Take [Underscore](http://underscorejs.org/). As a general-purpose utility library, Underscore provides a large number of convenience functions designed to help developers work with JavaScript collections, arrays, functions and objects. It has a larger API surface than a library like Moment.js, and yet Underscore is proportional because each function aids in the purpose of the library. Consider the following examples, the first two of which illustrate using Underscore to work with Arrays, and the last of which illustrates working with strings: -->
就拿 [Underscore](http://underscorejs.org/) 来说，作为一个通用工具库，Underscore 提供了大量的便捷函数，用以帮助开发人员处理 JavaScript 集合、数据、函数和对象。它的 API 比 Moment.js 这样的库更多，但 Underscore 仍然是相衬的，因为每个函数都在协助库实现目标。考虑一下下面的例子，前两个演示了如何用 Underscore 处理数组，最后一个演示了如何处理字符串：
    
    _.each(["Todd", "Burke", "Derick"], function(name){ 
      alert(name); 
    });

    _.map([1, 2, 3], function(num){ 
      return num * 3; 
    });

    _.isNumber("ten"); // False

<img class="jail" src="http://webstandardssherpa.com/r/21-6.png" alt="Underscore.js" style="display: inline;">

<!-- As a library grows, the challenge of maintaining proportion becomes even more critical. Care must be taken to ensure that every feature and function added to a library reinforces the library’s purpose. For a large offering like Kendo UI, an expansive purpose doesn’t mean we need to add every feature under the sun. For a library as large as Kendo, even utility objects and features should prove their worth to be included. Take for example, [Kendo UI’s](http://www.kendoui.com/) JavaScript based [DataSource](http://docs.kendoui.com/getting-started/framework/datasource/overview), which can be used to query and work with remote data: -->
随着库的成长，保持相衬性变得愈发重要。必须确保添加到库中的每个特性和函数都是在加强库的目标。像 Kendo UI 这样庞大的库，一个庞大的目标并不意味着需要添加每个特性。即使是通用的对象和特性也应该证明其价值，才能被包含到库中。例如，[Kendo UI](http://www.kendoui.com/) 的[数据源组件（DataSource）](http://docs.kendoui.com/getting-started/framework/datasource/overview)可以用于查询和处理远程数据：

    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://search.twitter.com/search.json",
            dataType: "jsonp",
            data: { q: "API Design" }
          }
        },
      schema: { data: "results" }
    });

<!-- At first glance, it might seem like a custom DataSource falls outside of the primary purpose of the library. However, many of today’s web widgets assume the existence of dynamic data, and the inclusion of a DataSource allows Kendo UI to use a consistent—and thus, comfortable—paradigm for working with remote data across the entire library. -->
乍看之下，上面的代码似乎是一个自定义的数据源，已经超出了库目标的范围。然而，今天的 Web 组件中普遍存在动态数据，通过引入数据源（DataSource），Kendo UI 得以用一致的、舒适的范式（方式）来处理远程数据。

<!-- Allowing an API to turn into a veritable JavaScript junk drawer is a danger of library growth, but it is not the only danger. Of equal risk is falling in the trap not allowing your API to grow along with a library; constraining the surface area of your library for artificial reasons. -->
让 API 成为名副其实的杂货铺，对库的成长是一种危害，但这还不是唯一的危害。如果掉入不利于库成长的陷阱，或者限制库的范围，同样会危害库的成。

<!-- A good example of how not to handle API growth, is jQuery’s [jQuery or $ function](http://api.jquery.com/jQuery/). As much as I and millions of others love jQuery, the library’s gateway method is a bit of a mess, providing no less than **eleven** separate overloads for everything from DOM selection to the ability to wrap DOM elements in a jQuery object. -->
不控制 API 成长的最佳反面示例，是 jQuery 的入口方法 [jQuery()](http://api.jquery.com/jQuery/)。无数像我一样的开发人员喜欢 jQuery，但是这个入口方法实在是有些混乱，从 DOM 查找到封装 DOM 元素为 jQuery 对象，提供了不下于 11 种独立的处理分支（重载 overload）。

> 译注：jQuery 1.7.1，构造函数 jQuery() 的 [7 种用法](http://nuysoft.com/project/jquery-code-overview/img/jQuery1.7.1-%E6%9E%84%E9%80%A0jQuery%E5%AF%B9%E8%B1%A1-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0.png)、[12 个有效分支](http://nuysoft.com/project/jquery-code-overview/img/jQuery1.7.1-%E6%9E%84%E9%80%A0jQuery%E5%AF%B9%E8%B1%A1-init.png)。

For the most part, these are loosely related features that have been stuffed into one API. Taken on the whole, jQuery is a large library and can be considered reasonably proportional. The jQuery method, on the other hand, represents what can happen when we attempt to force functionality into a single interface, without care for proportion.
塞入 jQuery() 的大多数特性（功能）是松散的，但 jQuery 作为一个大型库，应该考虑适度的相衬性。另一方面，如果我们尝试把 jQuery() 分解为独立的接口，就能清晰的描述可能发生的行为，不必再担心相衬性。

> 译注：从设计的角度看，把多个功能塞入 jQuery() 确实相当丑陋，维护和阅读都不容易，但是对使用者非常方便和友好。

<!-- If you find yourself stuffing tangential features into existing methods, or rationalizing the addition of function overloads that don’t feel natural to the API, chances are you need to loosen the belt and let that library breathe. Your users will have an easier time adapting to a new function with a self-describing name than they will yet another overload on an existing method. -->
如果你发现自己正在把一个不相干的特性塞入一个既有方法，或者正在考虑把一个感觉不自然的函数重载合理化，那么你可能需要松开皮带让库透透气了。这样一来，你的用户会比较容易适应一个可自描述的新函数，否则的话，他们将不得适应对既有方法的再次重载。

<!-- ## Principle 4: Emphasis -->
## 原则4：突出重点
<!-- In art, emphasis is the use of contrast to cause an aspect of the work to stand out and serve as a focal point. In many APIs, the focal point might be a gateway or main method that anchors the library. Another example of emphasis could be a “chained” or [fluent API](http://en.wikipedia.org/wiki/Fluent_interface), which adds emphasis to a central object used by the library. jQuery’s tendency to return a `jQuery` object from many of it’s functions demonstrates this type of emphasis: -->
在艺术上，突出重点是指通过使用对比，使作品的某个方面凸显出来成为焦点。在许多 API 中，焦点可能是锚定库的入口方法或主方法。突出重点的另一个示例可能是“链式”或[流式 API](http://en.wikipedia.org/wiki/Fluent_interface)，它可以突出库所使用的中心对象。jQuery 倾向于让它的众多函数返回一个 `jQuery` 对象，下面的例子演示了 jQuery 是如何用这种方式突出重点的：

> 译注：[锚定_百度百科](http://baike.baidu.com/view/2667180.htm)

    $('ul.first').find('.overdue')
      .css('background-color','red')
      .end()
      .find('.due-soon')
      .css('background-color', 'yellow');

<!-- For many modern libraries, another excellent example of emphasis is extensibility: that part of the library where the creators embrace what’s missing from the library by giving you a vehicle to add functionality yourself. -->
对于许多现代库来说，关于突出重点的另一个极佳例子是可扩展性：对于库所缺失的功能，库作者通过提供一个工具，让你可以自行添加功能。

<!-- A classic example is [jQuery’s fn (pronounced “effin”) namespace](http://docs.jquery.com/Plugins/Authoring), the general extensibility point from which countless plugins and complementary libraries have been launched: -->
一个典型的例子是 [命名空间 jQuery.fn ](http://docs.jquery.com/Plugins/Authoring)，它是无数插件和补充库的通用扩展点：

    (function($) {
      $.fn.kittehfy = function() {
        return this.each(function(idx, el) {        
          var width = el.width,
            height = el.height;
          var src= "http://placekitten.com/";
          el.src= src + width + "/" + height;
        });
      };
    })(jQuery);

<!-- Another example of extensibility is Backbone’s “extend” function, which we’ve looked at already in this article: -->
可扩展性的另一个例子是 Backbone 的 “extend” 函数，我们已经在这篇文章中看过了：

    var DocumentRow = Backbone.View.extend({
      tagName: "li",
      className: "row",
      events: {
        "click .icon": "open",
        "click .button.edit": "openEditDialog"
      },
      render: function() { ... }
    });

<img class="jail" src="http://webstandardssherpa.com/r/21-7.png" alt="Backbone.js" style="display: inline;">

<!-- Adding extensibility exhibits emphasis because it calls attention to the fact that a given library wasn’t meant to be the end–all–be–all, while at the same time encouraging you to add to the capabilities of the library as you see fit. When libraries encourage extensibility, they unlock not only new specialized uses, but additional general uses that might benefit countless other developers. One great example is the [Backbone.Marionette](http://marionettejs.com/) framework, a extension library for Backbone that aims to “…simplify the construction of large scale JavaScript applications.” Were it not for the extensibility of a library like Backbone, libraries like Marionette would be much more difficult, if not impossible, to deliver. -->
增强可扩展性可以突出重点，因为它使人们意识到这样一个事实：既有的库并不意味已经万事俱备，同时它也鼓励人们向库中添加符合自身需求的功能。一旦库开始鼓励扩展，不仅会开启新的功能，原有的功能也将受益。最好的例子之一是 [Backbone.Marionette](http://marionettejs.com/) 框架，一个扩展自 Backbone 的库，旨在“简化大型 JavaScript 应用程序”。若不是 Backbone 的可扩展性，Marionette 将很难实现。因此，如果有可能的话，请尽量增强可扩展性。

<!-- ## API Design: Not Just For Library Authors -->
## API 设计：不仅仅适用于库作者

<!-- If you’re not a JavaScript library author, but consider yourself a JavaScript app developer and library implementer, you might be tempted to think that the principles in this article don’t apply to you. After all, most of us often think of third-party libraries, like those I’ve used for the samples in this article, when we hear the term “API.” -->
如果你不是某个 JavaScript 库的作者，而是 JavaScript 应用开发人员，是库的实施者，你可能会觉得本文中的原则并不适用于你。毕竟我们在听到“API”时，常常想到的是第三方库，就像我在本文中提到的那些例子。

<!-- The truth is that an API, by definition, is nothing more than a segregated piece of functionality that provides an interface for others to leverage. I’m using general terms here to underscore an important point: modular JavaScript code is written to be consumed; the number of consumers is irrelevant. -->
然而事实上，API，顾名思义，不过是封装一些功能以供他人使用的一个接口。在这里，我要用一句概括性的话强调一个重要观点：编写模块化的 JavaScript 代码是为了实用，与使用者的数量无关。

<!-- Your own JavaScript code exposes interfaces for others, just as the libraries referenced in this article do. Even if the consumers of your code are a small, internal team—or even if you’re building a library for private use—you don’t have to be a public library author to think about API design and apply the principles covered in this article. The benefits of leveraging intentional API design pay off for an audience of one, just as they do for an audience of one million. -->
你自己的 JavaScript 代码暴露接口给其他人，这种行为与本文中提到的库没有什么不同。你无须成为一名公开库的作者，就可以考虑 API 设计并应用本文中的原则，即使你的代码的用户数很小，而且仅限于团队内部，或者即使你构建的是一个私有库。这种刻意的 API 设计只要能使一个用户受益，就能使无数人受益。

<!-- Because API design represents UX for developers, it is just as important as UI design for end-users. Just as we can learn to develop a sense for UI design by studying principles and examples of good and bad interfaces, we can learn much about good API design by doing the same. Applying the four principles from this article, as well as others you discover on your own, can result in awesome APIs that delight your users and help them build amazing experiences for others. -->
因为 API 设计代表着开发人员的用户体验，所以它和面向终端用户的 UI 设计同样重要。我们通过学习原则，以及好的和坏的界面示例，逐渐学会了 UI 设计，我们也可以通过同样的方式，深入学习如何设计好的 API。通过应用本文的四个原则和你发现的其他原则，可以设计出出色 API 来取悦你的用户，并且可以帮助你的用户实现出现的终端用户体验。

<!-- ## GOING THE EXTRA MILE -->
## 比别人多做一点点

> 译注：[原文标题是“GOING THE EXTRA MILE”，源出《圣经·马太福音》第五章“山顶布道”，耶稣劝告门徒：“Whosoever shall compel thee to go a mile, go with him twain.”（有人强逼你走一里路，你就同他走二里。）](http://www.chinadaily.com.cn/language_tips/2007-06/25/content_901869.htm)

<!-- The principles in this list are meant to be a jumping off point for your own study into API design. There are many other principles and practices in the world of physical media that can inform the API designs we create, and I encourage you to study these principles and look for examples on display in popular JavaScript libraries, like those mentioned in this article. -->
对于我们学习 API 设计来说，本文所列出的原则仅仅是一个开始。在物理介质领域，尚有许多其他的原则和方法，可以启发我们如何设计 API，我鼓励你去学习这些原则，并且从流行的 JavaScript 库中寻找例证，例如本文前面提到的那些。

<!-- ### PITFALLS TO AVOID -->
### 三省吾身 谓予无愆
> 原文标题是“PITFALLS TO AVOID”，可直译为“避免失误”。

<!-- * Don’t make the mistake of designing your API with only your needs in mind. The best way to design for other developers is to design with those developers. Get your work out in the open early and iterate often based on feedback from others. -->
* 设计 API 时不要只考虑你自己的需求。为其他开发人员设计 API 的最佳方式是与他们一起进行设计。尽早公开你的作品，并且经常要基于其他人的反馈重复修改（迭代）。
<!-- * When considering new interfaces for your library, be on the lookout for interfaces that create imbalance because their behavior is inconsistent with other interfaces, or because the goal of that interface extends beyond the purpose of the library. -->
* 为你的库考虑新接口时，要留心观察那些导致可能库失去平衡性的接口，它们可能在行为上与其他接口不一致，或者在目标上超出了库的范围。
<!-- * Interfaces with too many overloads are the quickest way to introduce disproportion. Be on the lookout for gateway methods or other interfaces that hide functionality behind method overloads. -->
* 为接口设计太多的重载是引入不相衬性的最快方式。留心观察入口方法，以及在方法重载背后隐藏了功能的接口。

<!-- ### THINGS TO DO -->
### 上士闻道 勤而勉之
<!-- 要做的事情 -->
> 原文标题是“THINGS TO DO”，可直译为“要做的事情”。

<!-- * To foster unity and harmony and provide familiarity and comfort for your users, consider placing similar and/or unifying elements throughout your API. -->
* 为了培养一致性和协调性，向你的用户提供友好和舒适的感觉，需要考虑把相同或相似的元素放在一起。
<!-- * To maintain balance, ensure that each interface of your library exhibits consistent behavior, or aids in meeting a complimentary goal. -->
* 为了保持平衡性，需要确保库中每个接口的行为保持一致，或者有着一致的目标。
<!-- * Keep an eye of the proportion of your API by ensuring that every interface of the library matches its intended purpose, and that no extraneous elements exist. -->
* 随时留意 API 的相衬性，确保库中的每个接口符合预期的目标，并且没有冗余元素存在。
<!-- * Consider using (properly-scoped) gateway methods, chained or fluent APIs and extensibility hooks to create a focal point of emphasis in your library. -->
* 考虑使用（适当范围的）入口方法、链式或流式 API，以及可扩展性，以突出库的重点。

<!-- ## FURTHER READING -->
## 扩展阅读

* Frederick P. Brooks, [The Design of Design: Essays from a Computer Scientist](http://my.safaribooksonline.com/book/software-engineering-and-development/9780321702081), Addison-Wesley Professional, 2010
* William Lidwell, Kritina Holden, and Jill Butler, [Universal Principles of Design](http://stuffcreators.com/upod/), Rockport Publishers, 2009
* “[JavaScript API Design](http://eliperelman.com/blog/2011/12/12/javascript-api-design/)”, Eli Perelman, 11 December 2011

<!-- What are some other examples of good (or bad) API designs that you’ve seen? -->
你还见过那些好的（或坏的）API 设计例子？[请告诉我们](http://webstandardssherpa.com/discussions/secrets-of-awesome-javascript-api-design/#comment)，或者[看看别人怎么所](http://webstandardssherpa.com/discussions/secrets-of-awesome-javascript-api-design/)。

<!-- [TELL US](http://webstandardssherpa.com/discussions/secrets-of-awesome-javascript-api-design/#comment) -->

<!-- [SEE WHAT OTHERS SAY](http://webstandardssherpa.com/discussions/secrets-of-awesome-javascript-api-design/) -->

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