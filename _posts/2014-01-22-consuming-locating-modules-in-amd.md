---
layout: post
title: "定位模块"
tagline: "Locating modules in AMD"
description: ""
category: 
category-substitution: 翻译
tags: [翻译, 模块化, modules, curl]

short: "定位模块"
pgroup: "Learning modules"
---
{% include JB/setup %}

<!-- Consuming modules: Locating modules in AMD -->
<!-- 使用模块：定位模块 -->

> 原文：<http://know.cujojs.com/tutorials/modules/consuming-locating-modules-in-amd.html.md>

<!-- In [module ids](./consuming-modules-module-ids.html.md), we noted that slashes delineate terms, which represent hierarchies of modules.  Ultimately, though, AMD environments must locate modules.  The ids must somehow resolve to uris.  It's possible that the uris resolve to records in a database or values in localStorage, for example.  However, most of the time, the uri resolves to a file path on the server or a url in the browser. -->
在 [模块标识符] 一文中我们注意到，斜杠用来分隔词条，表示模块的层次结构。不过说到底，AMD 环境必须能够定位到模块，标识符也必须以某种方式转换为 URI。URI 可能会被解析为数据库中的记录或 HTML5 localStorage 中的值，不会在大多数时候，URI 被解析为服务器上的一个文件路径或浏览器中的 URL。

[模块标识符]: ./consuming-modules-module-ids.html.md

<!-- ## Default module location and base url -->
## 默认位置和基础路径

<!-- For *extremely simple* applications, you could hypothetically put all of the modules in one location. Call this location the "base url".  The method for resolving module ids would simply be basic string concatenation: -->
对于*非常简单的*的应用程序，你可以把所有模块都放在同一个位置。这个位置称为“基础路径”。此时，模块标识符的解析仅仅是简单的字符串拼接：

    module url = base url + module id + ".js"

<!-- By default, most AMD loaders set the base url to the location of the html document.  For example, if the html document is at //know.cujojs.com/index.html, then a module with the id "blog/controller" resides at //know.cujojs.com/blog/controller.js.  The ".js" extension is added automatically when the AMD environment resolves the url. -->
默认情况下，大多数 AMD 加载器把基础路径设置为当前 HTML 的地址。例如，如果 HTML 文档是“//know.cujojs.com/index.html”，标识符为“blog/controller”的模块应该位于“//know.cujojs.com/blog/controller.js”。当 AMD 环境解析 URL 时，扩展名“.js”被自动添加。

> 译注：[Browser support for URLs beginning with double slash](http://stackoverflow.com/questions/6785442/browser-support-for-urls-beginning-with-double-slash)

<!-- Keeping your modules in the same location as your html documents can be inconvenient.  Therefore, essentially all AMD environments allow the base url to be set via configuration.  For example, if you configure the base url to be "client/", the module id "blog/controller" resolves to //know.cujojs.com/client/blog/controller.js. -->
把模块和 HTML 文档放在同一位置中可能不太方便。因此，基本上所有的 AMD 环境都允许以配置的方式设置基本路径。例如，如果配置基本路径为“client/”，模块标识符“blog/controller”将被解析为“//know.cujojs.com/client/blog/controller.js”。

<!-- The `require` variable that you can inject into your module has a method, `toUrl(id)` that can be used to convert a module id to a url.  You'll probably never use this in application code, but it's a nice utility for exploring the id-to-url conversion. -->
变量 `require` 除了可以注入模块外，还含有一个方法 `toUrl(id)`，用于把一个模块标识符转换为一段 URL。可能你从没在应用程序的代码中使用过该方法，但对于探索标识符和 URL 之间的转换，该方法是一个很好的工具。

    // module app/billing/billTo/Customer
    // base url is client/
    // document is //know.cujojs.com/index.html
    define(function (require) {

        // resolves to "//know.cujojs.com/client/app/billing/billTo/store"
        var url = require.toUrl('./store');

    });

<!-- ### Module ids != urls -->
### 标识符不等于 URL

<!-- It's very easy to get started by setting the base url and putting a few modules in that folder, but don't be lured into thinking that module ids are simply shortened urls!  This pattern fails to scale beyond smallish apps.  Larger apps require organizational strategies.  In another tutorial, we'll explore an organizational strategy called "packages". -->
设置基本路径，然后在基本路径对应的文件夹中放置几个模块，这些都很容易做到，但是不要被这种模式迷惑了，想当然地认为标识符不过就是些短网址！这种模式只适用于小型应用程序，无法扩展到较大些的应用程序中。较大些的应用程序需要有策略地组织层次结构。在另一篇教程中，我们讲讨论称为“包 package”的组织策略。

<!-- ### Sometimes id == url, no? -->
### 标识符有时候不就是 URL 吗？

<!-- > What if my module requires a library on a CDN? -->
> 假使模块依赖了 CDN 上的库，将会怎么样呢？

Most AMD loaders allow urls to be specified in place of ids.  This is perfectly
valid:
大多数 AMD 加载器允许用 URL 来代替标识符。下面的代码是完全合法的：

    define(function (require) {

        // attempt to get "moment" by url
        var moment = require('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js');

    });

<!-- However, there are several problems with this code: -->
但是，这段代码有几个问题：

<!-- 
* Hard-coding urls in code limits maintainability. What if you want to update to the latest version?
* The ".js" extension can trigger some AMD environments to use legacy, non-module behavior.  RequireJS, for instance will do this.
3.  Some AMD-aware libraries have hard coded ids into their files, unfortunately.  Moment.js, for instance, hard-coded the id, "moment" into its file, essentially squatting on this name.  Even worse, this means that in the example above, the AMD environment fetched a module named "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js", but received a module named "moment".  The AMD environment will probably throw an error because the ids didn't match.
 -->
* 代码中的硬编码 URL 限制了可维护性。假使你要它们更新到最新的版本，想想将会怎么样呢？
* 扩展名“.js”可能会触发 AMD 环境采用传统的方式加载文件。例如，RequireJS 就会这么做。
* 某些支持（可以感知） AMD 的库会硬编码一个标识符，这一点很不幸。例如，Moment.js 会在它的文件中把标识符硬编码为“moment”，即抢注了这个名字。在上面的例子中，AMD 环境期望获取一个名为“//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js”的模块，得到的却是一个名为“moment”的模块。AMD 环境可能会因为标识符不匹配而抛出一个错误。

<!-- use legacy, non-module behavior -->
<!-- ，而不是模块化的行为 -->

<!-- > So how do I use modules on a cross-domain server such as a CDN? -->
> 所以，我应该如何使用跨域的模块呢？例如 CDN 上的模块。

<!-- We'll get back to this shortly! -->
我们很快会给出答案！

<!-- ## Configuring id-to-uri mappings -->
## 配置 标识符-URI 映射

<!-- Ultimately, you have to tell the AMD environment how to map ids to uris. This is called _path mapping_ or _package mapping_ and is done through configuration. -->
最终你还是不得不，告诉 AMD 环境如何把标识符映射为 URI。这个过程称为 _路径映射_ 或 _包映射_，需要通过配置完成。

<!-- _By specifying the urls in a central configuration, instead of inside your modules, you decrease maintenance costs and increase the portability of your code._ -->
_通过集中配置这些模块，而不是在模块中配置，可以降低维护成本，提高代码的可移植性。_

<!-- Here's what the configuration looks like in most AMD environments: -->
在大多数 AMD 环境中，配置代码看起来像是下面这样：

    var config = {
        baseUrl: "client/apps",
        paths: {
            "blog": "blog", // this is redundant, unnecessary
            "dont": "../dont"
        }
    };

<!-- In curl.js, you set the configuration using the global `curl` variable. Lots of other AMD environments use this API, too: -->
在 curl.js 中，使用全局变量 `curl` 来执行配置。许多其他的 AMD 环境也使用了类似的 API：

    // auto-sniff for an object literal:
    curl(config);

    // or, more explicitly:
    curl.config(config);

<!-- The `baseUrl` config property tells the AMD environment that all module ids are resolved relative to the given url path.  The path could be absolute (starts with a protocol or `//`), relative to the host (starts with a `/`), or relative to the page as show above. -->
选项 `baseUrl` 是一个 URL 路径，AMD 环境在解析标识符时，会相对于该路径来解析。路径可以是绝对路径（以协议或 `//` 开头）、相对于 host 的路径（以 `/` 开头），或相对于当前页面的路径（如前面示例所示）。

<!-- The `paths` config object is a mapping of module ids to urls.  You don't have to specify every module your app uses.  You can simply specify the top term in the module's hierarchy, and deeper modules are resolved by appending their corresponding id  hierarchies.  For example, here's how a typical AMD environment might resolve the module "dont/even" given the configuration above: -->
选项 `paths` 是一个映射对象，其中包含了模块标识符到 URL 的映射。你不必为每个模块指定映射，而是可以简单地指定模块层级结构的顶层词条。在解析更深层次的模块时，会自动附加上相应的标识符层级。基于前面的配置，以模块“dont/even”为例，AMD 环境的解析过程如下：

<!-- 
* Construct a full base url by appending baseUrl to the page location:
    * "//know.cujojs.com/" + "client/" => "//know.cujojs.com/client/".
* Look up "dont/even" in the paths config.
    * Because it's not found, remove one level and look up "dont".
    * Find "dont" which maps to "../dont".
* Resolve the full url by appending "../dont" to the full base url:
    "//know.cujojs.com/client/../dont/even".
 -->

1. 把 baseUrl 附加到当前页面的地址，从而构建一个完整的基本路径：

        "//know.cujojs.com/" + "client/" => "//know.cujojs.com/client/"

2. 在选项 paths 中查找“dont/even”
    * 因为没有找到映射关系，所以移除当前层级，转而查找“dont”。
    * 发现“dont”映射到了“../dont”。
3. 把“../dont”附加到基本路径：

        "//know.cujojs.com/client/../dont/even"

<!-- The `packages` config property also maps ids to urls, but in a more structured way.  In curl.js, it also provides more advanced features.  Consider using `packages` instead of `paths` in more sophisticated applications. -->
选项 packages 也可以映射标识符到 URL，但是更加结构化。在 curl.js 中，该选项还提供了更高级的特性。在复杂一些的应用中，建议用 `packages` 代替 `paths`。

<!-- ## Why multiple `../` is a code smell -->
<!-- ## 多个 `../` 是一种代码坏味道，为什么 -->
## 避免出现多个 `../`

<!-- To the AMD environment, the base url determines the "root" or "top level" of the location of the module hierarchy.  Attempting to *traverse* above the root doesn't make much sense.  Consider the following scenario: -->
对于 AMD 环境，基础路径指定了模块层级结构的“根”或“顶层”。试图*遍历*至根路径没有太大意义。考虑下面的场景：

<!-- https://github.com/seajs/seajs/issues/262 -->

    // module blog/controller
    // base url is //know.cujojs.com/client/
    define(function (require) {

        var dont = require("../../dont/please");

    });

<!-- In order to resolve this relative id ("../../dont/please"), the AMD environment must traverse up two levels before traversing back down to "dont" and "please". -->
为了解析相对标识符“../../dont/please”，AMD 环境在查找“dont”和“please”之前，必须向让遍历两层。

<!-- 
1. Start at the current level: "blog/controller" is at the "blog/" level
2. Traverse up one level: "blog/" -> "" (the top level)
3. Traverse up a second level: ???? (we can't, we're already at the top!)
 -->

1. 从当前层级开始：“blog/controller”处于“blog/”层。
2. 向上遍历一层：“blog/”-->“”（到达顶层路径）
3. 再向上遍历一层：？？？（无法实现，因为已经处于最顶层了！）

<!-- How AMD environments handle this situation is *not defined* in any spec. curl.js resolves it by assuming the id is actually a url and keeps the `../` so the url can be normalized against the base url.  The implication is that curl.js will load the module as usual, but will not recognize that "dont/please" and "../../dont/please" are the same module.  This could cause double-loading of the "dont/please" module. Furthermore, the module's factory could execute twice, causing all sorts of problems, such as making singletons no longer be single, etc. -->
任何规范都*没有定义* AMD 该如何处理这种情况。curl.js 会假设该标识符实际上是一个 URL，并保留 `../`，这样就可以基于基础路径进行解析。言下之意是说，curl.js 会照常加载这样的模块，但不会认为“dont/please”和“../../dont/please”是同一个模块。这可能导致模块“dont/please”被加载两次。而且，该模块的的工厂函数也将执行两次，进而引起各种各样的问题，例如，单例 singleton 不再是唯一的实例。

> 译注：Singleton，单例模式，确保只有一个实例，并提供一个全局访问点。

<!-- _Note:_ curl.js also assumes that ids that start with `/` or a protocol (`http:`, `https:`, etc.) are urls. -->
_注：_对于以 `/` 或协议（`http:`、`https:` 等）开头的标识符，curl.js 也会把它们认为是 URL。

<!-- If you need to reference other modules using multiple `../`, be sure to read the tutorial about packages!  Packages solve everything. Seriously.  They do. -->
如果你需要用多个 `../` 才能引用其他模块，请务必读一读有关包 package 的教程。包 package 可以解决所有的问题。

<!-- ## Configuring id-to-remote-url mappings -->
## 配置 标识符-远程URL 映射

<!-- Returning to the moment.js example, moment.js resides on a CDN, which -- to our sensibilities -- sure seems like a url.  However, as we noted earlier, moment.js declares that it has a module id of "moment".  Here's how we reconcile remote urls: -->
回到 moment.js 示例，它存储在 CDN 上，并且看起来确实像一个 URL。然后，正如我们前面所提到的，moment.js 却声明了一个标识符为“moment”的模块。下面的代码演示了如何协调远程 URL：

    var config = {
        baseUrl: "client/apps",
        paths: {
            "moment": "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js",
            "blog": "blog", // this is redundant, unnecessary
            "dont": "../dont"
        }
    };
    curl.config(config);

<!-- Now, if you have a module that requires moment.js, you can reference it by id: -->
现在，如果摸个模块需要 moment.js，可以通过标识符来引用它：

    define(function (require) {

        // "moment" will resolve to //cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js
        var moment = require('moment');

    });

<link rel="stylesheet" type="text/css" href="/assets/github.css">
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