---
layout: post
title: "前端工程师宣言"
tagline: "A FRONT END ENGINEER'S MANIFESTO"
description: ""
category-substitution: 翻译
tags: [翻译]

<!-- link: /bak/a-front-end-engineer-s-manifesto.html -->
---
{% include JB/setup %}

> 原文：<http://f2em.com/>

> 作者：[@ZACHLEAT](http://twitter.com/zachleat/) ，一名专业前端工程师，来自 [BrainHeart](http://www.brainheart.com/)。作者的 [简介](http://www.zachleat.com/web/about-me/) 充满了正能量，[简历](http://www.zachleat.com/r%C3%A9sum%C3%A9/) 也很值得借鉴。关于原文，作者还有一篇短小有趣还有见地的[声明](http://www.zachleat.com/web/manifesto/)。原文中使用了 [BigText](http://www.zachleat.com/web/bigtext-makes-text-big/) 和 [sausage.js](http://christophercliff.github.com/sausage/) 插件，效果很酷。

> 翻译：[@nuysoft](http://weibo.com/u/1809037057?from=profile&wvr=5&loc=infdomain)


**A FRONT END ENGINEER'S MANIFESTO**

**前端工程师宣言**

1. Most importantly and above all, I will put the needs of the **user first** over my own needs as a developer.

    最重要的，也是最优先的，我会把 **用户第一** 放在作为一名开发人员的自我需求之上。

2. **Progressive Enhancement** and **Unobtrusive JavaScript**[1] are my tools.

    Without JavaScript or CSS, or without mobile Webkit, my site may not look pretty but will still be functional.

    渐进增强 和 静默 JavaScript 是我的工具。

    如果没有 JavaScript 或 CSS，或不是移动版 Webkit，我的网站可能看起来不会很漂亮，但功能仍然是可用的。

    

3. **Simplicity is Respect**
    
    I will not unnecessarily tax my users' brains with complicated designs and user interfaces. I will strive to make interactions succinct and minimize mental overhead.
    
    简单即尊重

    我不会用不必要的复杂的设计和用户界面困扰我的用户。我将努力使交互交互简洁和最小化精神开销。

4. I will educate my friends and family that **Web Browser choice matters**.
    
    Web Browsers should at minimum properly implement web standards and should be responsive to the advancing web. Web Browser Choice should be separate from picking an operating system. This is especially important for mobile devices.

    我将教育我的朋友和家人关于 Web 浏览器的选择事宜。
    
    Web 浏览器至少应该正确的实践网络标准，并且应该积极推进网络发展。Web 浏览器的选择应该与操作系统的选择区分开。这一点对于移动设备尤为重要。

5. I believe in the power of the **Open Web**.

    My content was accessible when full Flash / Flex apps were popular, and I will continue to provide accessible device independent content in the face of App Store ubiquity.
    
    我相信开放式网络的力量。

    在全是 Flash/Flex 应用程序盛行的年代，我的内容是可用的，在面对无处不在的 App Store 时，我将继续提供独立于设备的可用内容。

6. I acknowledge that **Performance is Critical**.

    My own developer hardware is not representative of the real world, and will be mindful of limited hardware, poor latency, and low bandwidth situations.
    
    我承认性能是至关重要的。

    我自己的开发环境并不能代表现实世界，并且要考虑受限的硬件、可怜的延迟，和低带宽的情况。

7. I will learn at the root, not the abstraction: **JavaScript before jQuery** or YUI, Prototype, Mootools, et al.
    
    我会好好学习基础，而不是抽象层：jQuery、YUI、Prototype、Mootools 等背后的 JavaScript。

8. I believe that **Open Source Code** and **royalty free tools** represent the best future for the Web.

    Especially when considering file formats and codecs for images, audio, or video.

    我相信开放源代码免费工具代表了互联网的未来。

    特别是考虑到图像、音频、视频的文件格式和编解码器。

9. I will not underestimate the importance of **accessibility**.

    It is not just about helping users that may have trouble differentiating colors or difficulty reading small fonts, but is about providing comprehensive access for users that may prefer to use either the keyboard or the mouse; in providing a clean print friendly format; in providing content to devices of varying technological capabilities.

    我不会低估可访问性的重要性。

    这不仅仅是帮助无法分辨颜色或阅读小字体苦难的用户，而是为用户提供全面的可访问性，用户可能更愿意使用键盘或鼠标，提供一个干净的、对打印友好的格式，提供内容给拥有不同技术能力的设备。

10. I will **give back** to the **Community**
    
    I will contribute workarounds, fixes, and document issues that may help others. I will file bugs at the source with the web browser’s bug tracker.

    我会回馈社区。

    我将贡献解决方法、修复问题，和可能会帮助别人的问题文档。我将从源码上提出 bug，通过利用 Web 浏览器的 bug 跟踪系统。

11. I will continue to foster both **hemispheres of my brain**

    I will better myself not just in math and code, but also in art, music, design, and usability.

    我将继续培养我的左右脑。
    
    我会更上一层楼，不仅在数学和代码上，还要在艺术、音乐、设计和可用性上。

12. I will do my best to keep my k**nowledge current**.

    I understand that I cannot learn everything and will be mindful of what I do not know.
    
    我会尽我所能保持我的知识最新。

    我明白我不可能学习所有东西，我会留心我所不知道的知识。

13. I accept **responsibility for View Source**.

    I will take care to use approaches that will be compatible with current and future web browsers, including preference for feature detection over user agent sniffing when it does not violate rules #1 or #5.

    我承担查看源代码的责任[2]。

    我会小心使用兼容现在和未来浏览器的方法，包括优先使用特性检测而不是浏览器嗅探，当这种做法没有违反规则 #1 和 #5 时。
    
14. My **code** will be **portable**.

    I will be mindful of overzealous CSS specificity, overuse of CSS !important, the global JavaScript namespace, as well as numerous browser implementation quirks.

    我的代码是可移植的。

    我会注意专有 CSS、过渡使用 !important、全局 JavaScript 命名空间，和众多的浏览器实现怪癖。

15. I will choose the **right tool for the job**
    
    Whether it be a big choice between a full stack framework and a simple DOM-centric library, or even the simple choice between CSS and JavaScript to solve a task, I will educate myself on the mistakes of those before me to make the correct choice for my project.
    
    我会选择正确的工具工作。

    无论是一个全站框架或一个简单的 DOM 库之间的大选择，甚至的简单的选择 CSS 或 JavaScript 解决问题，我将在做出正确选择之前训练我自己避免错误。

16. I will strive to create **secure applications**.
    
    I will properly escape my output and code to prevent XSS and CSRF. I will not store sensitive information in Cookies, and will use HTTPS where appropriate. I will be responsive in correcting issues that may cause harm to applications I have created.

    我会努力创建安全的应用程序。

    我将妥善的编码我的输出和代码，以预防 XSS 和 CSRF 攻击。我不会在 Cookie 中存储敏感信息，并且在恰当的地方使用 HTTPS。我将响应修正可能对我创建的应用程序造成伤害的问题。

**I AM A FRONT END ENGINEER.**

**我是一名前端工程师。**


> [1] Unobtrusive JavaScript <http://en.wikipedia.org/wiki/Unobtrusive_JavaScript>

> [2] 不太理解，翻译的可能有问题。