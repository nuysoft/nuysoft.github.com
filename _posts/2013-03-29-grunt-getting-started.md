---
layout: post
title: "Grunt 入门"
tagline: "Getting Started"
description: ""
category-substitution: 翻译
group: Grunt
tags: [Grunt, JavaScript, Web]

short: "Grunt 入门"
pgroup: Grunt
---
{% include JB/setup %}

> 原文：<https://github.com/gruntjs/grunt/wiki/Getting-started>

<!-- Grunt and gruntplugins are installed and managed via [npm](https://npmjs.org/), the [Node.js](http://nodejs.org/) package manager. -->
Grunt 和它的插件通过 [Node.js](http://nodejs.org/) 的包管理器 [npm](https://npmjs.org/) 安装和管理。

<!-- _These instructions are written for Grunt 0.4.x, but are still valid for Grunt 0.3.x. Just note that for 0.3.x, plugin names and task configuration options may be different than those shown in "The Gruntfile" section._ -->
_这些说明为 Grunt 0.4.x 而写，但是对于 Grunt 0.3.x 仍然有效。只需要注意 0.3.x 的插件名称和任务配置选项可能与“The Gruntfile”一节所述不同。_

<!-- _Grunt 0.4.x requires Node.js version `>= 0.8.0`._ -->
_Grunt 0.4x 要求 Node.js 的版本 `>= 0.8.0`。_

<!-- ## Installing the CLI -->

## 安装 CLI
<!-- **If you have installed Grunt globally in the past, you will need to remove it first:** -->

**如果已经全局安装了 Grunt，需要先删除它：**

    npm uninstall -g grunt

<!-- In order to get started, you'll want to install Grunt's command line interface (CLI) globally.  You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this. -->
为了开始使用 Grunt，需要全局安装 Grunt 的命令行接口。你可能需要使用指令 sudo（OSX、\*nix、BSD 等），或者以管理员身份运行命令解释程序来做到这一点。

    npm install -g grunt-cli

<!-- This will put the `grunt` command in your system path, allowing it to be run from any directory. -->
这将把 `grunt` 放入系统路径中，使得可以从任意目录运行它。

<!-- Note that installing `grunt-cli` does not install the grunt task runner!  The job of the grunt CLI is simple: run the version of grunt which has been installed next to a `Gruntfile`. This allows multiple versions of grunt to be installed on the same machine simultaneously. -->
注意：安装 `grunt-cli` 并不会安装 `grunt`！CLI 的工作很简单：运行已安装的与 `Gruntfile` 紧挨着的 grunt 版本。这样可以在一台机器上同时安装多个版本的 grunt。

<!-- ## How the CLI works -->
## CLI 是如何工作的

<!-- Each time `grunt` is run, it looks for a locally installed grunt using node's `require()` system. Because of this, you can run `grunt` from any subfolder in your project. -->
每次 `grunt` 被运行时，它会使用 node 的 `require()` 系统寻找一个本地安装的 grunt。正因为如此，你可以在项目的任意子文件夹中运行 `grunt`。

<!-- If a locally installed Grunt is found, the CLI loads the local installation of the grunt library, applies the configuration from your `Gruntfile`, and executes any tasks you've requested for it to run. -->
如果找到了本地安装的 Grunt，CLI 会加载它，并且应用 `Gruntfile` 中的配置，然后执行所要求的所有任务。

<!-- *To really understand what is happening, [read the code](https://github.com/gruntjs/grunt-cli/blob/master/bin/grunt).  It's very short.* -->
*要了解真正发生了什么，[读读这段代码](https://github.com/gruntjs/grunt-cli/blob/master/bin/grunt)，很短的。*

<!-- ## Working with an existing grunt project -->
## 用现有的 grunt 项目工作

<!-- Assuming that the Grunt CLI has been installed and that the project has already been configured with a `package.json` and a `Gruntfile`, it's very easy to start working with Grunt: -->
假设 Grunt CLI 已经被安装，并且项目已经配置了 `package.json` 和 `Gruntfile`，那么很容易使用 Grunt 开始工作：

<!-- 1. Change to the project's root directory.
1. Install project dependencies with `npm install`.
1. Run Grunt with `grunt`. -->

<ol>
<li>切换到项目的根目录。</li>
<li>使用 `npm install` 安装项目的依赖库。</li>
<li>使用 `grunt` 运行 Grunt。</li>
</ol>

<!-- That's really all there is to it. Installed Grunt tasks can be listed by running `grunt --help` but it's usually a good idea to start with the project's documentation. -->

这就是所要做的所有工作。安装的 Grunt 任务可以通过运行 `grunt --help` 罗列出来，通常这也是一个好主意：从项目的文档开始。

<!-- ## Preparing a new grunt project -->

## 准备一个新的 grunt 项目

<!-- A typical setup will involve adding two files to your project: `package.json` and the `Gruntfile`. -->

一次典型的安装会涉及添加两个文件到你的项目中：`package.json` 和 `Gruntfile`。

<!-- **package.json**: This file is used by [npm] to store metadata for projects published as npm modules.  You will list grunt and the Grunt plugins your project needs as [devDependencies] in this file. -->

**package.json**：该文件被 [npm] 用来存储被发布为 npm 模块的项目的元数据。你将在该文件的 [devDependencies] 中列出项目所依赖的 grunt 和插件。

> 该文件用来存储 npm 模块的元数据，通过 [devDependencies] 列出项目依赖的 grunt 和插件。

<!-- **Gruntfile**: This file is named `Gruntfile.js` or `Gruntfile.coffee` and is used to configure or define tasks and load Grunt plugins.  -->

**Gruntfile**：该文件被命名为 `Gruntfile.js` 或 `Gruntfile.coffee`，被用于配置或定义任务、加载 Grunt 插件。

<!-- _This file was named `grunt.js` for 0.3.x versions of Grunt._ -->

_在 Grunt 0.3.x 版本中，该文件被命名为 `grunt.js`。_

## package.json

<!-- The `package.json` file belongs in the root directory of your project, next to the `Gruntfile`, and should be committed with your project source.  Running `npm install` in the same folder as a `package.json` file will install the correct version of each dependency listed therein. -->

文件 `package.json` 为了项目的根目录，紧挨着 `Gruntfile`，并且应该随项目源码一起提交。在文件 `package.json` 的同级目录下运行 `npm install` 将安装其中列出的每个依赖模块。

<!-- There are a few ways to create a `package.json` file for your project: -->

有几种方式为你的项目创建一个 `package.json` 文件：

<!-- * Most [grunt-init] templates will automatically create a project-specific `package.json` file.
* The [npm init] command will create a basic `package.json` file.
* Start with the example below, and expand as needed, following this [specification][json]. -->

* 大部分 [grunt-init] 模板会自动创建一个项目特定的 `package.json` 文件。
* [npm init] 命令会创建一个基本的 `package.json` 文件。
* 从下面的例子开始，需要时扩展，遵循这个[规范][json]。

    {
      "name": "my-project-name",
      "version": "0.1.0",
      "devDependencies": {
        "grunt": "~0.4.1",
        "grunt-contrib-jshint": "~0.1.1",
        "grunt-contrib-nodeunit": "~0.1.2"
      }
    }

<!-- ### Installing Grunt and gruntplugins -->

### 安装 Grunt 和 插件

<!-- The easiest way to add Grunt and gruntplugins to an existing `package.json` is with the command `npm install <module> --save-dev`.  Not only will this install `<module>` locally, but it will automatically be added to the [devDependencies] section, using a [tilde version range]. -->

向一个已存在的 `package.json` 添加 Grunt 和插件的最简单的方式是使用命令 `npm install <module> --save-dev`。不仅会本地安装 `<module>`，还会被自动添加到 [devDependencies]，使用[波浪号版本范围][tilde version range]。

For example, this will install the latest version of Grunt in your project folder, adding it to your devDependencies:

下面的例子将安装最新版本的 Grunt 到你的项目文件夹中，并且添加到你的 devDependencies：

    npm install grunt --save-dev

<!-- The same can be done for gruntplugins and other node modules. Be sure to commit the updated `package.json` file with your project when you're done! -->
Grunt 插件和其他 node 模块同样可以这么做。当你完成后，请务必提供更新后的 `package.json`。

<!-- ## The Gruntfile -->
## Gruntfile

<!-- The `Gruntfile.js` or `Gruntfile.coffee` file is a valid JavaScript or CoffeeScript file that belongs in the root directory of your project, next to the `package.json` file, and should be committed with your project source. _This file was named `grunt.js` for 0.3.x versions of Grunt._ -->
文件 `Gruntfile.js` 或 `Gruntfile.coffee` 是一个有效的 JavaScript 或 CoffeeScript 文件，位于项目的更目录中，紧挨着文件 `package.json`，并且应该随你的项目源码一起提交。*该文件在 Grunt 0.3.x 版本中被命名为 `grunt.js`。*

<!-- A Gruntfile is comprised of the following parts: -->
一个 Gruntfile 文件由以下几部分组成：

<!-- * The "wrapper" function
* Project and task configuration
* Loading grunt plugins and tasks
* Custom tasks -->

<ul>
<li>包裹函数</li>
<li>项目和任务配置</li>
<li>加载 grunt 插件和任务</li>
<li>自定义任务</li>
</ul>

<!-- ### An example Gruntfile -->
### Gruntfile 示例

<!-- In the following Gruntfile, project metadata is imported into the grunt config from the project's `package.json` file and the [grunt-contrib-uglify] plugin's `uglify` task is configured to minify a source file and generate a banner comment dynamically using that metadata. When grunt is run on the command line, the `uglify` task will be run by default. -->
在下面的 Gruntfile 文件中，项目元数据被从项目的 `package.json` 文件导入到 grunt 配置，并且插件 [grunt-contrib-uglify] 的任务 `uglify` 被配置为压缩一个源文件，并且使用元数据动态生成一个标题注释。当通过命令行运行 gurnt 时，任务 `uglify` 默认被运行。

    module.exports = function(grunt) {
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
          }
        }
      });
      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks('grunt-contrib-uglify');
      // Default task(s).
      grunt.registerTask('default', ['uglify']);
    };

<!-- Now that you've seen the whole Gruntfile, let's look at its component parts. -->

现在你已经看到了完整的 Gruntfile，让我们看看它的组成部分。

<!-- ### The "wrapper" function -->
### 包裹函数

<!-- Every Gruntfile (and gruntplugin) uses this basic format, and all of your Grunt code must be specified inside this function: -->
每个 Gruntfile（和 Grunt 插件）使用这个基本格式，所有的 Grunt 代码必须被指定在这个函数内：

    module.exports = function(grunt) {
      // Do grunt-related things in here
    };

<!-- ### Project and task configuration -->
### 项目和任务配置

<!-- Most Grunt tasks rely on configuration data defined in an object passed to the [[grunt.initConfig|grunt#grunt.initconfig]] method. -->
大部分 Grunt 任务依赖于传给方法 [grunt.initConfig](https://github.com/gruntjs/grunt/wiki/grunt#grunt.initconfig) 的配置对象。

<!-- In this example, `grunt.file.readJSON('package.json')` imports the JSON metadata stored in `package.json` into the grunt config. Because `<% %>` template strings may reference any config properties, configuration data like filepaths and file lists may be specified this way to reduce repetition. -->
在这个例子中，`grunt.file.readJSON('package.json')` 将存储在 `package.json` 中的 JSON 元数据导入到 grunt 配置中。因为模板字符串 `<% %>` 可以引用任何配置属性，像文件路径和文件列表这样的配置数据可以通过这种方式指定，以减少重复。

<!-- You may store any arbitrary data inside of the configuration object, and as long as it doesn't conflict with properties your tasks require, it will be otherwise ignored. Also, because this is JavaScript, you're not limited to JSON; you may use any valid JS here. You can even programmatically generate the configuration if necessary. -->
你可以在配置对象中存储任意数据，只要它不与你的任务需要的属性发生冲突，否则将被忽略。另外，因为是 JavaScript，所以不局限于 JSON；你可以在这里使用任何有效的 JS。有必要的话，你甚至可以用编程的方式生成配置对象。

<!-- Like most tasks, the [grunt-contrib-uglify] plugin's `uglify` task expects its configuration to be specified in a property of the same name. Here, the `banner` option is specified, along with a single uglify target named `build` that minifies a single source file to a single destination file. -->
像大部分任务一样，插件 [grunt-contrib-uglify] 的任务 `uglify` 需要它的配置被指定到一个同名属性。在这里，选项 `banner` 被指定，命名为 `build` 的一个 uglify 目标被一同指定，用于压缩一个源文件到一个目标文件。

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      }
    });

<!-- ### Loading grunt plugins and tasks -->
### 加载 grunt 插件和任务

<!-- Many commonly used tasks like [concatenation], [minification][grunt-contrib-uglify] and [linting] are available as [grunt plugins](https://github.com/gruntjs). As long as a plugin is specified in `package.json` as a dependency, and has been installed via `npm install`, it may be enabled inside your `Gruntfile` with a simple command: -->
常用的任务，例如 [concatenation]、[minification][grunt-contrib-uglify] 和 [linting] 都是有效的 [grunt 插件](https://github.com/gruntjs)。只要一个
插件在 `package.json` 中作为依赖库被指定，并且已经通过 `npm install` 安装，就可以在你的 `Gruntfile` 中使用一个简单的命令启用它：

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

<!-- **Note:** the `grunt --help` command will list all available tasks. -->
**注意：** 命令 `grunt --help` 将列出所有有效任务。

<!-- ### Custom tasks -->
### 自定义任务

<!-- You can configure Grunt to run one or more tasks by default by defining a `default` task. In the following example, running `grunt` at the command line without specifying a task will run the `uglify` task. This is functionally the same as explicitly running `grunt uglify` or even `grunt default`. Any number of tasks (with or without arguments) may be specified in the array. -->
默认情况下，你可以定义一个 `default` 任务来运行一个或多个任务。在下面的例子中，在命令行中运行 `grunt` 而不指定一个任务，将运行任务 `uglify`。等价于明确的运行 `grunt uglify`，甚至等价于 `grunt default`。可以在数组中指定任务数量的任务（可以带有或不带参数）。

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

<!-- If your project requires tasks not provided by a Grunt plugin, you may define custom tasks right inside the `Gruntfile`. For example, this Gruntfile defines a completely custom `default` task that doesn't even utilize task configuration: -->

如果 Grunt 插件不能提供项目所需的任务，你可以在 `Gruntfile` 中定义自定义任务。例如，下面的 Gruntfile 定义了一个完全自定义的任务 `default`，甚至没有使用任务配置：

    module.exports = function(grunt) {
    
      // A very basic default task.
      grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
      });
    
    };

<!-- Custom project-specific tasks don't need to be defined in the Gruntfile; they may be defined in external `.js` files and loaded via the [[gruntgrunt.loadTasks|grunt#grunt.loadtasks]] method. -->
自定义的项目特定任务不需要被定义在 Gruntfile 中；它们可以被定义在外部的 `.js` 文件中，然后通过方法 [gruntgrunt.loadTasks](http://gruntjs.com/grunt#grunt.loadtasks) 加载。

<!-- ## Further Reading -->
## 延伸阅读

<!-- * The [[Installing grunt]] guide has detailed information about installing specific, production or in-development, versions of Grunt and grunt-cli.
* The [[Configuring Tasks]] guide has an in-depth explanation on how to configure tasks, targets, options and files inside the Gruntfile, along with an explanation of templates, globbing patterns and importing external data.
* The [[Creating Tasks]] guide lists the differences between the types of Grunt tasks and shows a number of sample tasks and configurations.
* For more information about writing custom tasks or Grunt plugins, check out the [[developer documentation|grunt]]. -->

* [安装 Grunt](http://gruntjs.com/installing-grunt/) 指南详细描述了安装、生产、开发、Grunt 版本、grunt-cli 版本的信息。
* [配置任务](http://gruntjs.com/configuring-tasks/)指南深入说明了如何在 Gruntfile 中配置任务、目标、选项和文件，还解释了模板、通配符以及导入外部数据。
* [创建任务](http://gruntjs.com/creating-tasks/)指南列出了 Grunt 任务之间的差异，并暂时了一些示例任务和配置。
* 关于编写自定义任务或 Grunt 插件的更多信息，请查看[开发人员文档](http://gruntjs.com/grunt)。

[npm]: https://npmjs.org/
[devDependencies]: https://npmjs.org/doc/json.html#devDependencies
[json]: https://npmjs.org/doc/json.html
[npm init]: https://npmjs.org/doc/init.html
[grunt-init]: Project-Scaffolding
[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges
[grunt-contrib-uglify]: http://github.com/gruntjs/grunt-contrib-uglify
[concatenation]: https://github.com/gruntjs/grunt-contrib-concat
[linting]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt.loadTasks]: https://github.com/gruntjs/grunt/wiki/grunt.task

## 译者后记

<ol>
<li>[[]] 的链接是如何生成的？</li>
<li>通过在 md 文件的最后统一定义链接配置，以减少重复。</li>
<li>只用 [] 可以生成锚文。</li>
<li>grunt 采用了什么版本的 md 转换工具？</li>
</ol>

