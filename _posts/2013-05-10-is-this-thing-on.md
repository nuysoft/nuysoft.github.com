---
layout: post
title: "Is This Thing On? (Part 1)"
description: ""
category-substitution: 翻译
tags: ["JavaScript", "Web"]
published: false
---
{% include JB/setup %}

> 原文：[Is This Thing On? (Part 1)](http://www.icenium.com/community/blog/icenium-team-blog/2013/04/23/is-this-thing-on-(part-1)) by Jim Cowart / Apr 23 , 2013

*This is a three part series where we explore some of the tools available to detect and manage online/offline connectivity in web/mobile applications.*
*这是一个三部分的系列文章我们探讨一些可用的工具来检测和管理在线/离线的连接，网络/移动应用。*

* *Part 1 - You're reading it!*
* *Part 2 - coming soon*
* *Part 3 - coming soon*

The growth of technologies like local storage, and the exposure of certain device APIs — like the camera or geolocation — to the browser (or to a hybrid application) has had an interesting side effect on web developers: the growing need to check the connectivity state of the client. Users are becoming more accustomed to the ability to work seamlessly while disconnected and then synchronize later. In fact, as I write this I'm en route to the AngleBrackets conference, 30k feet in the air with no connectivity on my iPad using Daedalus (an awesome app, btw). But I fully plan to upload this post to my DropBox account when I land. The expectation for this kind of process to just *work* — maybe a novelty a few years ago — has overwhelmingly become the **norm**.
技术，如本地存储，曝光某些设备API - 喜欢相机或地理位置 - 浏览器（或混合应用程序）的增长对Web开发人员有一个有趣的副作用：越来越需要检查连接状态的客户端。用户越来越习惯无缝工作的能力，同时断开，然后稍后同步。事实上，我写这篇文章，我在途中的的AngleBrackets会议，30K的脚在空中没有连接在我的iPad上使用代达罗斯（真棒应用程序，顺便说一句）。但我完全打算上传这篇文章，当我降落到我的Dropbox帐户。期望这种过程只是*工作* - 几年前也许新奇 - 绝大多数已经成为**规范**。

The reason(s) you are checking connectivity may vary per the type of application and intent:
可能的原因（次），检查连通的类型而有所不同，应用程序和意图：

* Your user wants to upload a picture using your hybrid social app, but they're on a train that just entered a tunnel, causing a temporary loss of connectivity. Wouldn't it be great if the upload could simply be queued while potentially alerting the user that their action hasn't been ignored and will be executed as soon as possible?
* You have a cloud-based IDE or document editor, but the user wants to be able to work while in airplane mode. Sure would be nice if the changes the user has made while offline could get immediately persisted to your back end once the connection is available, right?
* Your application has a news or stock ticker. You want to keep displaying the most recent data, but perhaps let the user know through some change in the UI that they're currently offline and might not have the latest information.
*你的用户想要上传图片，使用混合的社交应用程序，但他们在火车上刚进入隧道，导致暂时失去连接。那岂不是巨大的，如果可以简单地上传排队可能提醒用户他们的行动没有被忽略，将尽快执行？
*您有一个基于云的IDE或文件的编辑器，但用户希望能够在飞行模式下工作，而。肯定会是很好的，如果更改了用户离线时可以立即得到保存到你的后端，一旦连接是可用的，右？
*你的应用程序有一个新闻或股票行情。你要保持最新的数据显示，但也许通过一些变化，他们目前正在离线，可能不会有最新的信息的用户界面让用户知道。

Regardless of the reason or device - if you're working on web, mobile web or hybrid mobile applications, odds are very high that you will run into the need to check connectivity state on your current or next project. The question is....HOW should you go about it? Lets take a look at some of the APIs available to help you. (Warning: this isn't going to be an all-encompassing list, but a quick tour of some of the more common approaches.)
不管或设备的原因 - 如果你的工作网络，移动网络或混合移动应用，赔率是非常高的，你会碰到需要检查您的当前或下一个项目上的连接状态。现在的问题是....你应该如何去做呢？让我们一起来看看一些可用的API来帮助你。 （警告：这是不会成为一个无所不包的清单，但快速浏览一些比较常见的方法。）

## Window offline/online Event
窗口离线/在线事件
These events are fired when the browser switches to online or offline - starting on the body, and bubbling up to the document and the window. For a completely contrived example of using the window `online` and `offline` events:
这些事件被触发时，浏览器切换到联机或脱机 - 在身上，开始冒泡到的文件和窗口。对于一个完全人为的例子，使用窗口`在线`和`离线事件：

    // We simply subscribe to the offline or online event and pass a function (or function reference)
    // invoke our handler when the offline event occurs
    window.addEventListener("offline", whoopsWeAreOffline);
    // and when the online event occurs....
    window.addEventListener("online", sweetBackOnLine); 

> 译注：[在线和离线事件](https://developer.mozilla.org/zh-CN/docs/Online_and_offline_events), [Online and offline events](https://developer.mozilla.org/fi/docs/Online_and_offline_events)

## navigator.onLine

The [W3C spec description](http://www.w3.org/TR/2011/WD-html5-20110405/author/offline.html#browser-state) for `navigator.onLine` is priceless:
[W3C规范描述]（http://www.w3.org/TR/2011/WD-html5-20110405/author/offline.html＃浏览器的状态）`navigator.onLine`是无价的：
> Returns false if the user agent is definitely offline (disconnected from the network). Returns true if the user agent *might* be online…. Note: This attribute is *inherently unreliable*. A computer can be connected to a network without having Internet access. [emphasis added]
>返回false，如果用户代理肯定是离线（断开网络连接）。返回true，如果用户代理*可能*在线....注：此属性是*本质上是不可靠*。可以将电脑连接到网络，而不必上网。 [重点]

This does not inspire confidence. It's becoming apparent that a clear delineation between "The user said to work offline" and "Oops, we've lost our connectivity" hasn't quite landed with great browser API support yet. Nevertheless, for another contrived example, using the `navigator.onLine` property:
这并不鼓舞信心。它变得越来越明显，清晰划分“用户说脱机工作”和“哎呀，我们已经失去了我们的连通性”还没有完全降落伟大的浏览器API支持。然而，另一个做作的例子，使用`navigator.onLine`属性：

    if (navigator.onLine) {
        sweetWeAreKindaMaybeOnline();
    } else {
        uhOhWeAreProbablyButNotDefinitelyOffline();
    } 

### applicationCache downloading/error
applicationCache下载/错误

The "HTML5 rocks" website has a [great post](http://www.html5rocks.com/en/mobile/workingoffthegrid/#toc-appcache) on using applicationCache events (as well as custom XHR response handling) to help indicate online/offline status. It's not sufficient on it's own, entirely – it still doesnt address the "User said to go offline" concern, and should ultimately be used in tandem with other approaches:
“HTML5岩石”的网站上有一个伟大的职位（http://www.html5rocks.com/en/mobile/workingoffthegrid/＃TOC-AppCache的）使用的applicationCache事件（以及自定义XHR响应处理）有助于说明联机/脱机状态。这不是足以在它自己的，完全是 - 它仍然没有解决“用户说要去离线”的关注，并最终应配合其他方法：

    window.applicationCache.addEventListener("error", function(e) {
        weMightBeOffline();
    });

    window.applicationCache.addEventListener("downloading", function(e) {
        weAreProbablyOnline();
    }); 

You might also be interested in reading Jake Archibald's aptly named post: ["Application Cache is a Douchebag"](http://alistapart.com/article/application-cache-is-a-douchebag) (really, read it!).
您可能也有兴趣在读杰克阿奇博尔德后恰当地命名为：“应用程序Cache是​​一个恶棍”]（http://alistapart.com/article/application-cache-is-a-douchebag）（真的，读吧！） 。

## Cordova/Icenium/PhoneGap Connection Object
连接对象

If you're building a [Cordova](http://cordova.apache.org/)/[Icenium](http://www.icenium.com/)/[PhoneGap](http://phonegap.com/) application, you can take advantage of the `navigator.connection.type` property. Of course, this requires eager checking (it's not an event) - so it's best used in tandem with window `online` and `offline` (and possibly other) events.
如果你正在构建一个应用程序，你可以利用`navigator.connection.type`属性。当然，这需要急于检查（它不是一个事件） - 因此最好串联使用窗口`在线`和`离线`（可能还有其他的）事件。

    if (navigator.connection.type === Connection.NONE) {
        weMightBeOffline();
    } else {
        whoKnows(); // Could be wifi, cell*, ethernet or unknown
    } 

## Web Socket Connect/Disconnect Event

If you're using a socket library such as [socket.io](http://socket.io/), and you want the socket's connection state to play a part in your application's "online/offline" status, then you can hook into `connect` and `disconnect` events (assuming the library you chose provides them). Here's another contrived example, this time using socket.io:
果您使用的是socket库，如 [socket.io](http://socket.io/)，你想扮演一个角色插座的连接状态，在你的应用程序的“在线/离线”状态，那么你就可以勾成`连接`和`断开事件（假设您选择的库提供）。这里的另一个做作的例子，这次使用socket.io：

    socket.on('connect', function() {
        socketIsOnline();
    });
    
    socket.on('disconnect', function() {
        socketIsOffline();
    }); 

## Heartbeat Check
心跳检查
Seriously, what more foolproof way to verify connectivity than to actually reach out and try to touch an endpoint? It definitely bypasses the weaknesses of other approaches that could give false positives (I'm looking at you, navigator.onLine). However, this method best demonstrates the need for a dedicated and structured way for your application to determine connectivity state. Think about it — are you going to make a heartbeat check before *every* request? I hope not! No —what we need is a way to trigger a heartbeat check when something might indicate (or even hint) that our connection might have dropped. The problem, though, is that most applications I've seen tend to only worry about connectivity right when they need to do something with the connection. This leads to if/else branching logic — testing for connectivity — being sprinkled all throughout the app. A better approach, in my opinion, is to separate the concern of connectivity so that it is handled by a dedicated component that can serve as the single source of truth for the app, and event out to other interested components as the state changes. There is an abstraction that is perfect for this, in my opinion: the [finite state machine](http://en.wikipedia.org/wiki/Finite_state_machine) (FSM).
严重的是，更多的万无一失的方法来验证比实际伸手去尝试触摸一个端点连接？它绝对绕过其他的方法，可以给误报（我看着你，navigator.onLine）的弱点。然而，这种方法最好的证明需要一个专门的和结构化的方式为你的应用程序，以确定连接状态。想想吧 - 你打算做一个心跳检查前*每个*请求？我不希望！没有什么，我们需要的是一种方法来触发一个心跳检查东西时，可能表明我们的连接（或暗示）有可能下降。这个问题，虽然是我所见过的大多数应用程序往往只担心连通性权利时，他们需要做的事情与连接。这导致的if / else分支逻辑 - 的连接测试 - 洒在整个应用程序。一个更好的办法，在我看来，是分开连接的关注，它是由一个专用的组件，可以作为应用程序的单一来源的真相，事件其他相关组件状态变化处理。有是一个抽象的概念，这是完美的，在我看来：有限状态机]（http://en.wikipedia.org/wiki/Finite_state_machine）（FSM）。

In part 2 of this series, we'll cover what an FSM is, look at some real world examples of them as well as how to create them using machina.js - a helper library for writing FSMs in JavaScript. Stay tuned for next week!
在本系列的第2部分中，我们将介绍一个FSM是什么，以及如何创建它们使用machina.js的看一些真实世界的例子 - 写在JavaScript中的有限状态机的一个辅助库。敬请关注下周！

## About the Author
[Jim Cowart](http://freshbrewedcode.com/jimcowart) is an architect, developer, open source author, and overall web/hybrid mobile development geek. He is an active speaker and writer, with a passion for elevating developer knowledge of patterns and helpful frameworks. Jim works for Telerik as a Developer Advocate and is [@ifandelse on Twitter](http://twitter.com/ifandelse).
[吉姆·科沃特]（http://freshbrewedcode.com/jimcowart）是一名建筑师，开发商，开源的作者，以及整体网络/的混合移动开发怪胎。他是一个活跃的演讲者和作家，提升开发模式和有用的框架知识的热情。吉姆Telerik开发者倡导，[@ ifandelse Twitter上（http://twitter.com/ifandelse）的。


