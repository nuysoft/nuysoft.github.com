---
layout: post
title: "创建插件"
tagline: "Creating Plugins"
description: "如何创建插件以及注意事项。"
category-substitution: 翻译
group: Grunt
tags: [翻译, Grunt, JavaScript, Web]

short: "创建插件"
pgroup: Grunt
---
{% include JB/setup %}

> 原文：<https://github.com/gruntjs/grunt/wiki/Configuring-tasks>

## 创建插件
<!-- 1. Install [grunt-init](https://github.com/gruntjs/grunt-init) with `npm install -g grunt-init`
2. Install the gruntplugin template with `git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin`
3. Run `grunt-init gruntplugin` in an empty directory.
4. Run `npm install` to prepare the development environment.
5. Author your plugin.
6. Run `npm publish` to publish the grunt plugin to npm! -->

<ol>
<li>运行 `npm install -g grunt-init` 安装 [grunt-init](https://github.com/gruntjs/grunt-init)</li>
<li>运行 `git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin` 安装 Grunt 插件模板</li>
<li>在一个空目录中运行 `grunt-init gruntplugin`。</li>
<li>运行 `npm install` 准备开发环境。</li>
<li>编写你的插件。</li>
<li>运行 `npm publish` 发布 Grunt 插件到 npm！</li>
</ol>

<!-- ## Notes -->
## 注意

<!-- ### Naming your task -->
### 命名你的任务
<!-- The "grunt-contrib" namespace is reserved for tasks maintained by the grunt team, please name your task something appropriate that avoids that naming scheme. -->
命名空间“grunt-contrib”是保留给 Grunt 团队维护的任务，请适当的命名你的任务，避免该命名方案。

<!-- ### Debugging -->
### 调试
<!-- Grunt hides error stack traces by default, but they can be enabled for easier task debugging with the `--stack` option. If you want grunt to always log stack traces on errors, create an alias in your shell. Eg, in bash, you could do `alias grunt='grunt --stack'`. -->
Grunt 默认隐藏堆栈跟踪信息，为了更容易调试任务，可以启用选项 `--stack`。如果你希望 Grunt 在发生错误时总是打印堆栈跟踪信息，在你的 shell 中创建一个别名。例如，在 bash 中你可以运行 `alias grunt='grunt --stack'`。


<!-- ### Storing task files -->
### 存储任务文件
<!-- Only store data files in a .grunt/[npm-module-name]/ directory at the project's root and clean up after yourself when appropriate. This is not a solution for temporary scratch files, use one of the common npm modules (eg [temporary](https://npmjs.org/package/temporary), [tmp](https://npmjs.org/package/tmp)) that take advantage of the OS level temporary directories for that case. -->
只在项目根目录的路径 .grunt/\[npm-module-name\]/ 存储数据文件，并且在适当的时候清理掉。这并不是一个临时文件解决方案，在这种情况下，使用利用了操作系统级别的临时文件的 common npm 模块（例如 [temporary](https://npmjs.org/package/temporary)、[tmp](https://npmjs.org/package/tmp)）。

<!-- ### Avoid Changing the Current Working Directory: `process.cwd()` -->
### 避免改变当前工作目录：`process.cwd()`
<!-- By default, the current working directory is set to be the directory that contains the gruntfile. The user can change it using `grunt.file.setBase()` in their gruntfile, but plugins should take care to not change it. -->
默认情况下，当前工作目录被设置为包含了 Gruntfile 的目录。用户可以在 Gruntfile 中使用 `grunt.file.setBase()` 改变当前工作目录，但是插件应当小心不要改变它。

<!-- `path.resolve('foo')` can be used to get the absolute path of the filepath 'foo' relative to the gruntfile. -->
`path.resolve('foo')` 可以用于获取文件路径 'foo' 相对于 Gruntfile 的绝对路径。

