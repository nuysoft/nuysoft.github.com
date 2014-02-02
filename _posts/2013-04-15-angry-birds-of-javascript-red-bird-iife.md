---
layout: post
title: "立即调用的函数表达式"
tagline: "Immediately-invoked Function Expression"
description: "保护代码免受其他代码的干扰，并且通过封装的方式组织你的代码。"
category-substitution: 翻译
tags: [翻译, "Angry Birds of JavaScript", "JavaScript", "Web", "IIFE", Architecture]
published: true

short: "立即调用的函数表达式"
pgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

> 原文：[Angry Birds of JavaScript: Red Bird - IIFE](http://www.elijahmanor.com/2013/03/angry-birds-of-javascript-red-bird.html)

<!-- ## Introduction -->
## 简介
![](http://3.bp.blogspot.com/-gdPxI78dJRM/UUPoi2KHFkI/AAAAAAAAX94/M6gVKm4DN64/s1600/Loading_screen.png)
<!-- ![](http://3.bp.blogspot.com/-gdPxI78dJRM/UUPoi2KHFkI/AAAAAAAAX94/M6gVKm4DN64/s320/Loading_screen.png) -->

<!-- A diabolical herd of pigs stole all of the front-end architecture from an innocent flock of birds and now they want it back! A team of special agent hero birds will attack those despicable pigs until they recover what is rightfully theirs, front-end JavaScript architecture! -->
一群无法无天的猪从无辜的小鸟那里偷走了所有的前端架构，现在小鸟们要把它们夺回来！一队特殊的小鸟英雄将攻击这些卑鄙的猪，直到夺回原本属于它们的前端 JavaScript 架构！

<!-- In this post we will take a look at the Red Bird who attacks with the force of their trusty IIFE, the basic block of all privacy. -->
在这篇文章中，我们将看看红色小鸟，它使用可靠的 IIFE 作为攻击武器，而 IIFE 是一切秘密的基础。

> IIFE Immediately-invoked Function Expression

<!-- ## What Was Stolen by the Pigs? -->
## 猪偷走了什么？

![](http://4.bp.blogspot.com/-JMM-_2Tl7Es/UUOFH81EAUI/AAAAAAAAX8k/GxsgENgc4kY/s1600/red-bird.png)
![](http://4.bp.blogspot.com/-JMM-_2Tl7Es/UUOFH81EAUI/AAAAAAAAX8k/GxsgENgc4kY/s200/red-bird.png)

<!-- For ages the birds used to litter the global namespace (the window object) with their custom objects and functions. Over time the birds slowly learned techniques to protect their objects from the global namespace, however, since the recent pig invasion all of their anti-global secrets have been stolen! Thankfully the birds are fortunate that a one foul exists with the knowledge of this secret and plans to attack the pigs to unleash what is rightfully theirs. -->
很长时间以来，小鸟们习惯了向全局命名空间（window 对象）乱丢它们的自定义对象和函数。随着时间的慢慢推移，小鸟们逐渐学会了利用全局命名空间来保护它们的对象的技术，然而由于近期猪群的入侵，反全局的秘密都被偷走了！侥幸的是这项秘密技术仍然存在缺陷，小鸟们计划攻击猪群，解放原本属于它们的技术。

<!-- ## How Objects Become Global? -->
## 对象是如何变为全局对象的？
<!-- There are several ways that an object can become global. Part of the battle is just knowing the various ways. -->
一个对象变为全局对象有好几种方式。了解各种方式正是战争的一部分。

<!-- 1. **Declaring an Object in the Window Scope** -->
<p>1. <b>在 Window 作用域中声明对象</b></p>

<!-- TODO: Is this called the Window Scope? Top Level Scope? -->
<!-- In the following example there two variables declared, `type` and `attack`. These variables were declared in the top level scope and therefore are accessible off of the `window` object. -->
在下面的例子有两个变量声明，`type` 和 `attack`。变量在顶级作用域中声明，因此 `window` 对象可以访问它们。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=global-variables.js">
  </script>

<!-- 2. **Not Declaring an Object in Any Scope** -->
<p>2. <b>任何作用域中未声明的对象</b></p>

<!-- One of the most dangerous and easiest things to do in JavaScript is to accidentally declare a global variable when you didn't mean to. If you forget to declare a variable then JavaScript declares it for you as a global! This is usually not what you meant to do and could expose parts of your application that you didn't intend. -->
在 JavaScript 中，意外的声明一个全局变量是最危险也是最容易发生的事情是，而这并不是你的初衷。如果你忘记声明一个变量，JavaScript 将把它声明为一个全局变量！这通常不是你的初衷，却在无意中暴漏了应用程序的某些部分。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=not-declaring-variable.js">
  </script>

<!-- 3. **Specifically Adding an Object to the Window** -->
<p>3. <b>明确向 Window 添加对象</b></p>

<!-- You also have the opportunity to expose variables to the global namespace intentionally. You can easily do this by accessing the `window` object and adding a property or method manually. It isn't a good idea to use this technique deep inside your code, but it is worth nothing that you can. -->
你也有机会故意向全局命名空间暴漏变量。通过访问 `window` 对象并手动添加一个属性或方法，你可以很容易的做到这一点。在你的代码深处使用这项技术并不是一个好主意，你可以这么做，但是没什么价值。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=explicit-global.js">
  </script>

<!-- ## Why Are Global Objects a Problem? -->
## 为什么全局对象是一个问题？

<!-- * **Conflicts within Your Code**     -->
* **与你的代码冲突**

<!-- There is a risk that developers within your own company may define the same function, method, or property that already exists in your application. If you have no mechanism to reduce the number of items in the global namespace your risk of accidentally reassigning a variable grows as your application gets larger and more complex. -->
和你同属一个公司的开发人员，可能会定义在你的程序中已存在的同名函数、方法或属性，这是有风险的。如果你没有一套机制来减少全局命名空间中的条目，随着你的程序变得更大和更复杂，意外重新分配变量的风险随之增加。

You may dismiss this reason because you have rigid code reviews and all your developers know your codebase inside out. If that describes you, then check out the next reason ;)
你可能会反驳这个原因，因为你拥有严格的代码审核，并且所有的开发人员都透彻了解你的代码库。如果你觉得这说的是你，那么看看下一个原因 ;)

<!-- * **Conflicts with Your Code and Third-Party Libraries** -->
* **与你的代码和第三方库冲突**

<!-- Another danger of having multiple global objects is that your code could conflict with third-party libraries that you are using. There are a lot of libraries, plugins, and frameworks out there and not all of them are as aware and conscious about keeping their global variables to a minimum. Your code and the libraries you include could clash and override each-other's behavior which can cause unexpected results. -->
拥有多个全局对象的另一个风险是，你的代码可能与你所使用的第三方库冲突。存在大量的库、插件和框架，并不是所有这些第三方库都了解和意识到要保持全局变量到最小集。你的代码和这些库可能会发生冲突，并覆盖彼此的行为，这可能导致意想不到的结果。

<!-- You may dismiss this reason because you deeply scrutinize all third-party libraries that your team uses and are fully aware of what global variables are exposed by these libraries. If that describes you, then check out the next reason :) -->
你可能会反驳这个原因，因为你深入的审视你的团队所使用的所有第三方库，并且充分了解这些库暴露的全局变量。如果你觉得这说的是你，那么看看下一个原因 :)

<!-- * **Conflicts with Your Code and Browser Add-ons/Extensions/Plugins** -->
* **与你的代码和浏览器附加元件/扩展/插件冲突**

<!-- The final danger of having multiple global objects is that your code could conflict with the browser itself. What!?! Lets take Google Chrome for an example. Chrome's add-ons are JavaScript based and all of your installed add-ons run on your web page when it is loaded. You never know what add-ons your users have installed and as a result there is a risk that those add-ons will expose global variables that conflict with your code-base. -->
拥有多个全局对象的最后一个风险是，你的代码可能与浏览器本身冲突。什么！？！那以谷歌浏览器 Chrome 为例。Chrome 的插件基于 JavaScript，并且当你的网页加载后，你安装的所有插件会在你的网页上运行。你永远不会知道用户安装了什么插件，这就导致一个风险，这些附加元件会暴露全局变量并和你的代码库发生冲突。

<!-- Does this seem far-fetched? Well, it can at first, but I've actually seen a high profile website (not going to mention which one) run into this very problem. I was trying to use the website and it was broken. I knew the developer so I reached out to him. After some back and forth it turned out I had an add-on installed that broke the website. I contacted the add-on author and they updated their code and now all is fine. -->
这似乎有些牵强？好吧，它仅仅一种可能，但是我确实看到过一个高调的网站（不想提是哪个）遇到了这个特殊问题。我试着使用这个网站，但是它崩溃了。我认识这个开发人员，然后我联系到了他。经过一番反复，结果是我曾经安装的一个插件导致了网站崩溃。我联系到插件作者，然后他们更新了代码，现在一切运行正常。

<!-- ## Various Ways to Protect Yourself -->
## 保护自己的多种方式

<!-- Although the above code snippets were very small and simple, they all exposed way too many variables to the global namespace. So, how do we protect ourselves? -->
虽然上面的代码片段非常简短和简单，但是它们向全局命名空间暴露了太多的变量。那么，我们该如何保护自己呢？

<!-- * **Object Literal** -->
* **对象字面量**

<!-- The easiest way to help prevent global variable proliferation is to protect yourself with an object literal that limits gathers all objects that would have been global and attaches them to once central object. -->
防止全局变量扩展的最简单的方法是，使用一个对象字面量来收集所有全局对象，把它们附加到一个中间对象。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=object-literal.js">
  </script>
    
<!-- * **Immediately Invoked Function Expression** -->
* **立即调用的函数表达式**

<!-- The Immediately Invoked Function Expression (IIFE) is another technique to get around the global issue. This technique is more complicated than the Object Literal, but provides much more power as well. This technique allows the developer to expose public and private properties and methods to the consumer. -->
解决全局问题的另一项技术是立即调用的函数表达式（IIFE）。这项技术比对象字面量更复杂，但是也更强大。这项继续允许开发人员向消费者公开公共和私有的属性和方法。

<!-- Before we get into what this looks like, lets work through some of their weird syntax that we are about to see. The scoping of variables in JavaScript is determined via the function scope and not block scope. So, if you have a variable declared inside an `if` statement for example it would be available everywhere inside its containing function. This might seem a little jarring to some developers that are used to C, C++, C#, Java, or similar languages. -->
在我们进入正题之前，先解释一些怪异的语法，稍后会看到。在 JavaScript 中，变量的作用域由函数作用域决定，而不是块级作用域。因为，假设如果在一条 'if' 语句中决定了一个变量，这个变量在包含它的函数的所有地方都是可见的。对于曾经使用 C、C++、C#、Java 或类似语言的开发人员来说，这个看起来有点不和谐。

<!-- So, we are going to use this functional scope idea to create an anonymous function (function with no name) and immediately invoke it. -->
下面，我们将利用函数作用域这一特性来创建一个匿名函数（没有名字的函数），并立即调用它。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=unwrapped-iife.js">
  </script>
    
<!-- Unfortunately, the above snippet doesn't work in JavaScript because it can't parse it correctly. The idea is solid, but the implementation is off just a little bit. Thankfully, there is an easy way to let JavaScript know that we know what we are doing and that is to surround the expression with an extra set of parenthesis. -->
不幸的是，上面的代码片段在 JavaScript 中不能工作，因为不能正确的解析他。思路是对的，但是实现有一点点偏差。值得庆幸的，有一种简单的方式让 JavaScript 知道我们在做什么，就是用一组额外的括号包裹这个表达式。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=empty-iife.js">
  </script>
    
<!-- The following pattern is known as the Revealing Module Pattern. You should notice the use of the IIFE to create the special functional scope and the note-worthy part is the end where you `return` the parts of the scope that you want to be public to object and anything not returned will be private. -->
下面的模式被称为 Revealing Module Pattern。你应该注意到，IIFE 被用于创建特殊的函数作用域，而且在末尾返回了作用域的一部分，它们是你想公开给对象的，而任何没有返回的部分将是私有的。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=revealing-module.js">
  </script>
    
<!-- You may also run across this alternate syntax that is popular in many libraries and frameworks. The pattern uses the IIFE, but this one passes in the global variable to use as a namespace. The `window.bird = window.bird || {}` code snippet is a fancy way to check if the `bird` object already exists and if it doesn't then to create a new one. Whatever gets added to the object from within the IIFE becomes public and whatever memory isn't attached to the object stays private. The nice thing about this pattern is that it can be repeated and build up a library with various components. -->
你可能也遇到过下面这种替代语法，它在很多库和框架中很流行（很受欢迎）。这种模式使用了 IIFE，但是传入了一个全局变量作为命名空间。代码片段 `window.bird = window.bird || {}` 以一种奇特的方式来检查 `bird` 对象是否存在，如果不存在就创建一个新对象。在 IIFE 中，添加到 `bird` 对象的都变为公开的，而其他的则都变为私有的。可以重复这种模式，用各种组件来构建一个库。

  <script src="https://gist.github.com/elijahmanor/4991287.js?file=parameter-iife.js">
  </script>

<!-- ## Attack! -->
## 进攻！

下面是一个用 [boxbox] 构建的简版 Angry Birds，boxbox 是一个用于 [box2dweb] 的框架，由 [Bocoup] 的 [Greg Smith] 编写。

[boxbox]: http://incompl.github.com/boxbox/
[box2dweb]: https://code.google.com/p/box2dweb/
[Bocoup]: http://bocoup.com
[Greg Smith]: http://twitter.com/_gsmith

<!-- > Press the `space bar` to launch the Red Bird and you can also use the arrow keys. -->
> 按下`空格键`来发射红色小鸟，你也可以使用方向键。

[![](http://1.bp.blogspot.com/-uVcHLO0YlUo/UUPqxGUmyrI/AAAAAAAAX-I/Xjqh5Qn_rEw/s640/angry-birds-jsfiddle-shadow.png)](http://jsfiddle.net/hzz3U/1/show)

<!-- ## Conclusion -->
## 结论

<!-- These techniques are vital for a front-end application so that it can protect itself from other code and it also gives the opportunity to structure your code in a way that is encapsulated from its surroundings.  -->
这些技术对一个前端应用程序是至关重要的，因为它可以保护自己免受其他代码的干扰，并且可以通过封装的方式组织你的代码。

<!-- There are many other frotn-end architecture techniques that have been stolen by the pigs. Tune in next time as the next Angry Bird takes its revenge! Dun, dun, daaaaaaa! -->
还有很多其他的前端架构技术被猪偷走了。在下篇文章中，另一只愤怒的小鸟将继续复仇！Dun, dun, daaaaaaa!

> [@sunnylost](http://nuysoft.com/2013/04/21/angry-birds-of-javascript-orange-bird-templating/#comment-881925473) 补充：Dun, dun, daaaaaaaaaa! 应该是在模拟背景音乐，类似于这种 <http://missingno.ocremix.org/musicpages/game_on.html>
