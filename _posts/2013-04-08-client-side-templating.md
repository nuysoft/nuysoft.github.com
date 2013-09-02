---
layout: post
title: "客户端模板"
tagline: "从服务端到客户端"
description: ""
category-substitution: 翻译
tags: [翻译, HTML, JavaScript, Template]
---
{% include JB/setup %}

> 原文：[Client-Side Templating](http://coding.smashingmagazine.com/2012/12/05/client-side-templating/), From The Server To The Client, 2012.12.5

<!-- Using templates in the browser is becoming more and more widespread. Moving application logic from the server to the client, and the increasing usage of MVC-like patterns (model–view–controller) inspired templates to embrace the browser. This used to be a server-side only affair, but templates are actually very powerful and expressive in client-side development as well. -->
在浏览器中使用模板正变得越来越广泛。随着应用程序的逻辑从服务端转移到客户端，以及类似 MVC（模型-视图-控制）的模式的广泛使用，促使模板开始拥抱浏览器。这曾经仅仅是服务端的事务，但其实模板在客户端同样非常强大并且极富表现力。

<!-- ![](http://media.smashingmagazine.com/wp-content/uploads/2012/12/client-side-template.jpg)
Image Credit: Viktor Hertz -->

<!-- ## Why Would You Use It? -->
## 为什么要使用模板？

<!-- In general, leveraging templates is a great way to separate markup and logic in views, and to maximize code reusability and maintainability. With a syntax close to the desired output (i.e. HTML), you have a clear and fast way to get things done. Although templates can be used to output any kind of text, in this article we provide examples using HTML, since that is what we want in client-side development. -->
通常，在视图中利用模板分离标记和逻辑是非常棒的做法，并且最大限度的提高了代码的可重用性和可维护性。使用近似于最终输出（即 HTML）的语法，你可以快速和清晰的把事情做好。虽然模板适用于任意类型的文本输出，不过在这篇文章中，我们使用 HTML 作为示例，因为这正是我们在客户端开发中想要的。

<!-- In today’s dynamic applications, the client frequently needs to update the user interface (UI). This might be done by fetching an HTML fragment from the server that can be readily inserted into the document. Yet this requires the server to support delivering such fragments (as opposed to complete pages). Moreover, as a client-side developer who is responsible for the markup, **you want to have full control over your templates**. No need to know anything about Smarty, Velocity, ASP, some other obscure server-side syntax or even worse: dealing with spaghetti code such as HTML containing those infamous `< ?` or `< %` tags all over the place. -->
在如今的动态应用程序中，客户端经常需要更新用户界面。这个需求可以通过从服务端获取一个易于插入文档的 HTML 片段实现。然而，这就要求服务端支持提供这样的片段（而不是完整的页面）。此外，作为负责这些标记的客户端开发人员，又**想对模板有完全的控制权**。客户端开发人员也没有必要知道关于 Smarty、Velocity、ASP 以及其他晦涩的服务端语法，甚至更糟糕的：处理意大利面条式的代码，例如 HTML 中到处充斥着臭名昭著的 `<?` 或 `<%` 标签。

<!-- So let’s take a fresh look at a viable alternative: client-side templating. -->
因此，让我们重新审视一个可行的替代方案：客户端模板。

<!-- ## First Impressions -->
## 第一印象

<!-- For starters, I’d like to give a definition of the term “template”. Here is a [good definition](http://foldoc.org/template) from foldoc: -->
对于初学者，[在线计算机词典](http://foldoc.org/)对术语“模板”给出了[很好的定义](http://foldoc.org/template)：

<!-- >“A document that contains parameters, identified by some special syntax, that are replaced by actual arguments by the template processing system.” -->
> “一个文档，包含了由特殊语法定义的参数，参数被模板处理系统替换为实际的参数值。”

<!-- Let’s observe an example, and see what a basic template might look like: -->
让我们看一个例子，一个基本的模板可能看起来像是这样：

    {% raw %}
    <h1>{{title}}</h1>
    <ul>
        {{#names}}
            <li>{{name}}</li>
        {{/names}}
    </ul>
    {% endraw %}

<!-- This probably looks pretty familiar if you know HTML. It contains HTML tags with some placeholders. We will replace them with some actual data. For instance with this simple object: -->
这可能看起来很熟悉，如果你了解 HTML 的话。上面的例子包含了带有一些占位符的 HTML 标签。我们将用一些真实数据替换这些占位符。例如用下面的简单对象：

    var data = {
        "title": "Story",
        "names": [
            {"name": "Tarzan"},
            {"name": "Jane"}
        ]
    }

<!-- Combining the template and data should result in the following HTML: -->
结合模板和数据将生成下面的 HTML：

    <h1>Story</h1>
    <ul>
        <li>Tarzan</li>
        <li>Jane</ul>
    </ul>

<!-- With the template and data separated, it becomes easy to maintain the HTML. For example, changing tags or adding classes will only need changes in the template. Additionally, adding an attribute to repeating elements such as the `<li>` element only needs to be done once. -->
因为模板和数据的分离，HTML 变得易于维护。例如，想要改变标签或添加样式，只需要在模板中修改即可。再例如，想要给重复元素添加一个属性，例如 `<li>` 元素，也只需要修改一次。

<!-- ## Template Engine -->
## 模板引擎

<!-- The syntax of the template (i.e. the format of the placeholders such as `{{title}}`) depends on the template engine you want to use. This engine takes care of parsing the templates, and replacing the placeholders (variables, functions, loops, etc.) with the actual data it is provided. -->
模板的语法（即占位符的格式，例如 `{% raw %}{{title}}{% endraw %}`）取决于你想要使用的模板引擎。模板引擎负责解析模板，并且用提供的真实数据替换替换占位符（变量、函数、循环等）。

<!-- Some template engines are `logic-less`. This doesn’t mean you can only have simple placeholders in a template, but the features are pretty limited to some intelligent tags (i.e. array iteration, conditional rendering, etc.). Other engines are more feature-rich and extensible. Without going into details here, a question to ask yourself is whether and how much logic you allow in your templates. -->
某些模板引擎是`弱逻辑`的。虽然这并不意味着模板中只能有简单的占位符，但是某些智能标签（即数组迭代、条件渲染）的功能确实相当有限。其他模板引擎则有更丰富的功能，并且可扩展。在这里暂不纠结细节，你需要要考虑的问题是，在你的模板中是否允许出现逻辑，以及允许出现多少逻辑。

<!-- Although each template engine has its own API, usually you will find methods such as `render()` and `compile()`. The **render** process is the creation of the end result by putting the actual data in the template. In other words, the placeholders are replaced with the actual data. And if there is any templating logic, it is executed. To **compile** a template means to parse it, and translate it into a JavaScript function. Any templating logic is translated into plain JavaScript, and data can be fed to the function, which concatenates all the bits and pieces together in an optimized way. -->
虽然每个模板引擎有自己的 API，但是通常你会找到诸如  `render()` 和 `compile()` 这样的方法。**渲染**过程是指，将真实数据放入模板从而创造最终结果的过程。换句话说，占位符被替换为真实数据的过程。并且，如果含有任何模板逻辑，也将被执行。**编译**一个模板，意味着解析模板，并把模板翻译为一个 JavaScript 函数。任何模板逻辑都会被翻译为普通的 JavaScript 代码，并且可以将数据传入翻译后的函数，函数则将所有的点点滴滴以一种优化的方法串联在一起。

<!-- ## A Mustache Example -->
## Mustache 示例

<!-- The production of the example above can be performed by using a template engine, e.g. `mustache.js`. This uses the popular **Mustache** templating syntax. More about them, and alternatives, later. Let’s take a look at a little JavaScript to produce some results: -->
可以使用一个模板引擎生成上面例子中的结果，例如 `mustache.js`。上面的例子使用了时下流行的 **Mustache** 模板语法。稍后会讲到关于模板语法和替代品的更多内容，暂且按下不表。让我们先来看看如何用 JavaScript 生成同样的结果：

    {% raw %}
    var template = '<h1>{{title}}</h1><ul>{{#names}}<li>{{name}}</li>{{/names}}</ul>';
    var data = {"title": "Story", "names": [{"name": "Tarzan"}, {"name": "Jane"}]};

    var result = Mustache.render(template, data);
    {% endraw %}

<!-- Now we want to show this in the page. In plain JavaScript this could be done like this: -->
现在，我们想要把结果显示到页面中。在普通的 JavaScript 中，可以这样实现：

    document.body.innerHTML = result;

<!-- That’s all! You can try the above in your browser by placing the Mustache script before your own code: -->
这就是全部了！你可以把 Mustache 脚本放到你自己的代码之前，然后在本地尝试上面的例子：

    <script src="https://raw.github.com/janl/mustache.js/master/mustache.js"></script>

<!-- Or, you can try this example at [jsFiddle](http://jsfiddle.net/webpro/huuDd/). -->
或者，你可以试试 [jsFiddle](http://jsfiddle.net/webpro/huuDd/) 上的例子。

<!-- ## Organizing Templates -->
## 组织模板

<!-- If you’re like me, you probably don’t like to have the HTML in one long string. This is hard to read, and hard to maintain. Ideally, we can put our templates in separate files so we still have all the benefits of syntax highlighting, and the ability to properly indent the lines of HTML for readability. -->
你可能不希望持有一个长字符串的 HTML，就像我一样。这样很难读，也很难维护。理想的情况是，我们可以把模板放到单独的文件中，这样仍然有语法高亮，并且能正确的缩进 HTML，以保持代码的可行性。

<!-- But this leads to another issue. If our project contains a lot of templates, we don’t want to load all of those files separately, since this issues a lot of (Ajax) requests. This would be bad for performance. -->
但是这会导致另一个问题。如果我们的项目包含了很多模板，而我们又不希望单独加载所有这些文件，因为这会导致很多（Ajax）请求。这对性能不利。

<!-- ### SCENARIO 1: SCRIPT TAGS -->
### 方案1：SCRIPT 标签

<!-- An often seen solution is to put all the templates within `<script>` tags with an alternative `type` attribute, e.g. `type="text/template"` (which is ignored for rendering or parsing by the browser): -->
经常看到的解决方案是把所有模板放入 `<script>` 标签，并为属性 `type` 设置一个另类的值，例如 `type="text/template"`（浏览器将忽略该标签，不渲染也不解析）：

    {% raw %}
    <script id="myTemplate" type="text/x-handlebars-template">
        <h1>{{title}}</h1>
        <ul>
            {{#names}}
                <li>{{name}}</li>
            {{/names}}
        </ul>
    </script>
    {% endraw %}

<!-- This way, you can put all of your templates in the HTML document and prevent all the extra Ajax requests to those templates. -->
通过这种方式，你可以把所有模板放在 HTML 文档中，并防止了对这些模板额外的 Ajax 请求。

<!-- The content of such a script tag can then be used later in your JavaScript as a template. The following code example, this time using the Handlebars templating engine and a bit of jQuery, uses the previous `<script>` tag: -->
在你的 JavaScript 中，类似这样一个 script 标签的内容可以稍后作为模板使用。下面的代码示例使用了前面的 `<script>` 标签，注意这次我们使用了 Handlebars 模板引擎和一点点 jQuery：

    var template = $('#myTemplate').html();
    var compiledTemplate = Handlebars.compile(template);
    var result = compiledTemplate(data);

<!-- You can try this example as well at [jsFiddle](http://jsfiddle.net/webpro/9xwum/). -->
你也可以在 [jsFiddle](http://jsfiddle.net/webpro/9xwum/) 上试试这个例子。

<!-- The result here is the same as in our Mustache example. Handlebars can use Mustache templates as well, so we use the same template here. There is one (important) difference though, which is that Handlebars is using an intermediate step to get the HTML result. It first compiles the template into a JavaScript function (we named it `compiledTemplate` here). This function is then executed using the data as its only argument, returning the final output. -->
生成的结果与 Mustache 示例相同。Handlebars 也可以使用 Mustache 模板，因为我们在这里使用了相同的模板。不过有一个重要的区别，Handlebars 使用一个中间步骤来得到 HTML 结果。它首先把模板编译为一个 JavaScript 函数（我们把它命名为 `compiledTemplate`）。然后该函数被执行，数据作为其唯一的参数，最后返回最终的输出。

<!-- ### SCENARIO 2: PRECOMPILED TEMPLATES -->
### 方案2：预编译模板

<!-- While only one function to perform the template rendering may seem convenient, there are significant advantages to splitting up the compilation and rendering process. Most importantly, this allows for the compilation part to happen on the server-side. We can execute JavaScript on the server (e.g. using Node), and some of the templating engines support this precompilation of templates. -->
虽然只用一个函数执行模板渲染可能看起来很方便，但是分离编译和渲染过程有很大的优势。最重要的是允许编译部分发生在服务端。我们可以在服务端执行 JavaScript（例如使用 Node），并且一些模板引擎支持模板预编译。

<!-- Putting it all together, we can organize and serve a single JavaScript file (say, `compiled.js`) that contains multiple, precompiled templates. This could roughly look like this: -->
我们可以组织和提供单一的 JavaScript 文件（假设是 `compiled.js`），其中包含了多个预编译过的模板。大致看起来会是这样：

    var myTemplates = {
        templateA: function() { ….},
        templateB: function() { ….};
        templateC: function() { ….};
    };

<!-- Then, in the application code we only need to populate the precompiled template with data: -->
然后，我们只需要在应用代码中用数据来填充预编译模板：

    var result = myTemplates.templateB(data);

<!-- This is generally a far better-performing approach than putting templates within `<script>` tags as discussed before, since the client can skip the compilation part. Depending on your application stack, this approach is not necessarily harder to accomplish, as we’ll see next. -->
较之前面讨论过的把模板放入 `<script>` 标签，通常这是一个性能更好的办法，因为客户端可以跳过编译部分。根据你的应用程序架构，这个方案很有必要并且不是难以完成，接下我们会看到如何实现。

<!-- **Node.js example** -->
**Node.js 示例**

<!-- Any template precompilation script should at least do the following: -->
任何模板预编译脚本至少应该做到以下几点：

<!-- * read the template files,
* compile the templates,
* combine the resulting JavaScript functions in one or more files. -->
<ul>
<li>读取模板文件，</li>
<li>编译模板，</li>
<li>把编译后的 JavaScript 函数合并到一个或多个文件。</li>
</ul>
<!-- The next basic Node.js script does all that (using the Hogan.js templating engine): -->
下面的 Node.js 脚本实现了上述所有步骤（使用 Hogan.js 模板引擎）：

    var fs = require('fs'),
        hogan = require('hogan.js');

    var templateDir = './templates/',
        template,
        templateKey,
        result = 'var myTemplates = {};';

    fs.readdirSync(templateDir).forEach(function(templateFile) {

        template = fs.readFileSync(templateDir + templateFile, 'utf8');
        templateKey = templateFile.substr(0, templateFile.lastIndexOf('.'));

        result += 'myTemplates["'+templateKey+'"] = ';
        result += 'new Hogan.Template(' + hogan.compile(template, {asString: true}) + ');'

    });

    fs.writeFile('compiled.js', result, 'utf8');

<!-- This reads all files in the **templates/** folder, compiles the templates and writes them to **compiled.js**. -->
上面的 Node.js 示例读取目录 **templates/** 中的所有文件，编译模板，并把它们写入 **compiled.js**。

<!-- Note that this is highly unoptimized code, and does not include any error handling. Still, it does the job, and shows that it doesn’t require a lot of code to precompile templates. -->
注意，这是高度未优化的代码，并且不包含任何任何错误处理。不过，它确实完成了任务，并且表明了预编译模板不需要大量代码。

<!-- ### SCENARIO 3: AMD & REQUIREJS -->
### 方案3：AMD 与 REQUIREJS

<!-- The Asynchronous Module Definition (AMD) is gaining more and more traction. Decoupled modules are often a great way to organize an application. One of the most popular module loaders is RequireJS. In a module definition, dependencies can be specified, which will be resolved and made available to the actual module (factory). -->
异步模板定义（AMD）正在焕发越来越多的活力。解耦模块往往是组织应用程序的一种很好的方式。RequireJS 是最流行的模块加载器之一。在一个模块的定义中，可以指定依赖关系，依赖的模块将被解析并且在当前模块（工厂）中可用。

<!-- In the context of templates, RequireJS has a “text” plugin that allows you to specify text-based dependencies. AMD dependencies are treated as JavaScript by default, but templates are just text (e.g. HTML), so we use the plugin for that. For example: -->
RequireJS 的“text”插件允许你指定基于文本的依赖。AMD 依赖默认被当作 JavaScript 处理，但是模板只是文本（例如 HTML），所有我们使用“text”插件来指定模板依赖。例如：

    define(['handlebars', 'text!templates/myTemplate.html'], function(Handlebars, template) {

        var myModule = {

            render: function() {

                var data = {"title": "Story", "names": [{"name": "Tarzan"}, {"name": "Jane"}]};
                var compiledTemplate = Handlebars.compile(template);
                return compiledTemplate(data);

            }
        };

        return myModule;
    });

<!-- This way, the advantage lies (only) in the ability to organize the templates in separate files. This is nice, but it needs an extra Ajax request to get the template, and it still needs to compile the template client-side. However, the extra request can be removed by using the `r.js` optimizer that comes with RequireJS. This resolves dependencies, and will “inline” the templates (or any dependency) into this module definition, vastly reducing the number of requests. -->
这种方式的优势仅仅在于组织不同文件中的模板。这很不错，但是仍然需要一个额外的 Ajax 请求来获取模板，仍然需要在客户端编译模板。然而，额外的请求可以通过使用 RequireJS 的 `r.js` 优化器来避免。`r.js` 解析依赖关系，并且将模板（或任何依赖）内联在当前模块定义中，从而极大地降低请求数。

<!-- The absence of a precompilation step can be solved in a couple of ways. It may come to mind to have the optimizer also precompile the templates (e.g. we could write a plugin for `r.js`). But that would require a change in the module definition as well, since we would be using a template string before optimization, and a template function afterwards. Yet this would not be terribly hard to deal with, either by checking for this variable type, or by abstracting away this logic (in either the plugin or the application). -->
预编译步骤的缺乏可以通过多种方式解决。你可以会考虑让优化器同时预编译模板（例如，我们可以为 `r.js` 编写一个插件）。但是，这同时需要改变模块的定义，因为在优先前我们使用的是模板字符串，优化之后使用又是模板函数。不过这不是非常难处理的问题，可以通过检查变量类型或者抽象这部分逻辑（或者在插件中，或者在应用程序中）解决。

<!-- ### WATCHING TEMPLATES -->
### 监听模板

<!-- In both scenarios #2 and #3, we can do even better by treating our templates as uncompiled source files. Just like CoffeeScript, or Less or SCSS files. We can have our template files watched for changes during development, and recompile them automatically when a file is changed, i.e. just like you would compile CoffeeScript into JavaScript. This way, we’re always dealing with precompiled templates in our code, and the optimizer effortlessly inlines the precompiled templates in the build process. -->
在方案2和方案3中，通过把模板当作未编译的源文件，我们可以做的更好。就像 CoffeeScript、Less、SCSS 文件。我们可以在开发过程中监听模板的变化，当然文件改变时自动重编译它们，就像你会把 CoffeeScript 编译为 JavaScript 一样。这样一来，我们在代码中始终处理的是预编译后的模板，并且在构建过程中优化器可以毫不费力的内联预编译后的模板。

    define(['templates/myTemplate.js'], function(compiledTemplate) {

        var myModule = {

            render: function() {

                var data = {"title": "Story", "names": [{"name": "Tarzan"}, {"name": "Jane"}]};
                return compiledTemplate(data);

            };
        };                

        return myModule;
    }

<!-- ## Performance Considerations -->
## 性能注意事项

<!-- Rendering *UI* updates by using client-side templates is often the way to go. Still, the best performance for the initial *full page* load is achieved by serving that page as a whole. This allows the browser to render the HTML as is without requiring any JavaScript parsing or extra requests for data. This might be a challenge, especially for pages that are both dynamic and require the best initial loading times possible. Then, ideally, templates are being developed and reused on the client and the server to both support the best performance and still be maintainable. -->
使用客户端模板更新 *UI* 往往是不可避免的事情。尽管如此，最佳性能仍然是作为一个整体由服务端提供*完整的初始化页面*。这样浏览器渲染 HTML 时不需要任何 JavaScript 解析或额外的数据请求。这可能是一个挑战，尤其当页面是动态的，同时又要求最佳的初始化时间。然后，理想情况下，模板可以在客户端和服务端之间开发和重用，提供最佳性能的同时仍然易于维护。

<!-- Two questions to consider here are: -->
这里需要考虑两个问题：

<!-- * What part of my application is mostly dynamic, and what part requires the best possible initial loading times?
* Do you want to move the processing to the client, or should the server do the heavy lifting? -->
<ul>
<li>应用程序的哪部分是动态的，哪部分要求最佳初始化加载时间？</li>
<li>是把处理过程转移到客户端，还是由服务端做繁重的工作？</li>
</ul>
<!-- The answer can only be given by actually measuring different approaches. Yet by using precompiled templates, the client usually doesn’t have a very hard time rendering them on the fly. And in case you want to reuse templates on the client and server, you will find a logic-less template syntax to be the most versatile. -->
答案只能通过测试不同的方法给出。然后通过使用预编译模板，客户端渲染模板时通常不会花费很多时间。另外，如果你想要在客户端和服务端之间重用模板，你会发现弱逻辑模板语法会是最合适的。

<!-- ## Conclusion -->
## 结论

<!-- We have seen many strengths of client-side templating, including: -->
我们已经看到了客户端模板的许多优势，包括：

<!-- 
* Application servers and APIs are best at serving just the data (i.e. JSON); client-side templates fit in perfectly.
* HTML and JavaScript naturally match the skills of client-side developers.
* Using templates enforces a good practice of separating presentation and logic.
* The templates can be fully precompiled and cached, this leaves only the actual data to be refreshed from server.
* Moving the rendering phase from server to client may positively affect performance. 
-->

<ul>
<li>应用程序服务端和 API 最擅长仅仅提供数据（例如 JSON）；而客户端模板实现了完美融合。</li>
<li>HTML 和 JavaScript 天然地匹配前端开发人员的技能。</li>
<li>使用模板强化了分离展现和逻辑这一最佳实践。</li>
<li>模板完全可以预编译和缓存，只剩下从服务端获取和更新实际的数据。</li>
<li>把渲染环节从服务端转移到客户端可以提升性能。</li>
</ul>

<!-- We have been looking at quite some aspects of (client-side) templating. Hopefully by now you have a better understanding of the concept, and why you would use it. -->
我们一直在考虑（客户端）模板的各个方面。希望你现在对模板的概念以及为什么要使用模板有了一个更好的理解。


## 作者 Lars Kappert
![](http://0.gravatar.com/avatar/24f5c266f0241825b12bed1a43120022?s=78&d=http%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D78&r=G)

Lars Kappert is a freelance front-end developer at WebPro based in The Netherlands working as an architect, performance tuner, and developer.
