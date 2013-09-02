---
layout: post
title: "安装 Grunt"
tagline: "Installing Grunt"
description: "介绍如何安装特定版本的 grunt 和 grunt 插件。"
category-substitution: 翻译
group: Grunt
tags: [翻译, Grunt, JavaScript, Web]

short: "安装 Grunt"
pgroup: Grunt
---
{% include JB/setup %}

> 原文：<https://github.com/gruntjs/grunt/wiki/Installing-grunt>

<!-- This document explains how to install specific versions of grunt and grunt plugins.  If you haven't read the [[Getting Started]] guide, you should check that out first. -->
本文介绍了如何安装特定版本的 grunt 和 grunt 插件。如果还没有读过[入门](http://gruntjs.com/getting-started)指南，你应该先读读它。

<!-- ## Overview -->

## 概览

<!-- Grunt and grunt plugins should be defined as [devDependencies](https://npmjs.org/doc/json.html#devDependencies) in your project's [package.json](https://npmjs.org/doc/json.html).  This will allow you to install all of your project's dependencies with a single command: `npm install`.  The current stable and development versions of grunt are always listed on the wiki's [home page](https://github.com/gruntjs/grunt/wiki/). -->

Grunt 和 Grunt 插件应该被定义在项目的 [package.json] 中的 [devDependencies] 上。

[package.json]: https://npmjs.org/doc/json.html
[devDependencies]: https://npmjs.org/doc/json.html#devDependencies

<!-- ## Installing a specific version -->

## 安装特定版本

<!-- If you need a specific version of grunt or a grunt plugin, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need.  This will install the specified version, adding it to your package.json devDependencies. -->

如果你需要特定版本的 Grunt 或 Grunt 插件，运行 `npm install grunt@VERSION --save-dev`，其中 `VERSION` 是你所需的版本号。这将安装特定的版本，同时添加到 package.json 的 devDependencies 中。

<!-- Note that a [tilde version range] will be used in your `package.json` when you add the `--save-dev` flag to `npm install`. This is typically good, as new patch releases of the specified version will automatically be upgraded as development continues, per [semver]. -->

需要注意的是，如果运行 `npm install` 添加了标记 `--save-dev`，[波浪号版本范围]将被用于你的 `package.json`。这么做非常好，因为随着开发继续，特定版本的新补丁发布会自动更新，按照 [semver] 规范。

[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges
[波浪号版本范围]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges
[semver]: http://semver.org

<!-- ## Installing a published development version -->

## 安装发布的开发版本

<!-- Periodically, as new functionality is being developed, grunt builds may be published to npm. These builds will _never_ be installable without explicitly specifying a version number, and will typically have a build number or alpha/beta/release candidate designation. -->

当开发新功能之后，Grunt 编译版本可能定期发布到 npm。如果不显示地指定一个版本号，这些版本_永远_不会被安装，并且通常会有一个编译版本号，或指定内侧/公测/发布候选版。

> 译注：[Build 版](http://baike.baidu.com/view/750252.htm)，[命名风格和管理策略](http://baike.baidu.com/view/707808.htm#1)

<!-- Like installing a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need, and npm will install that version of grunt in your project folder, adding it to your `package.json` devDependencies. -->

就像安装特定版本的 Grunt 一样，运行 `npm install grunt@VERSION --save-dev`，其中 `VERSION` 所需的版本号，npm 将安装指定版本的 Grunt 到你的项目目录，同时添加到 `package.json` 的 devDependencies 中。

<!-- Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. **This is very bad**, as new, possibly incompatible, patch releases of the specified development version may be installed by npm, breaking your build.
 -->
请注意，不管你指定的版本，一个[波浪号版本范围]将被指定到 `package.json`。**这是非常糟糕的**，因为指定的开发版本的新补丁发布能是不兼容的，通过 npm 安装后会破坏你的编译。

<!-- _In this case it is **very important** that you manually edit your `package.json` and remove the ~ (tilde) from the version number. This will lock in the exact development version that you have specified._ -->

_在这种情况下，手动编辑你的 `package.json` 并从版本号中移除 ~（波浪号）**非常重要**。这将锁定在你所指定的精确的开发版本。_

<!-- The same process may be used to install a published development version of a grunt plugin. -->
同样的过程可以用于安装 Grunt 插件发布的开发版本。


<!-- ## Installing directly from github -->
## 直接从 github 安装
<!-- If you want to install a bleeding-edge, unpublished version of grunt or grunt plugin, follow the instructions for specifying a [git URL as a dependency](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies) and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`. This will guarantee that your project always uses that exact version of grunt. -->
如果想安装 Grunt 或 Grunt 插件的最新但是未发布的版本，按照[指定 git 地址作为依赖]的说明进行踩哦啊做，确保指定一个实际提交的 SHA（不是分支名）作为 `commit-ish`。这将保证你的项目总是使用精确版本的 Grunt。

[git URL as a dependency]: https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies
[指定 git 地址作为依赖]: https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies

<!-- The specified git URL may be that of the official grunt repo or a fork. -->

指定的 git 地址可能是官方 grunt 库或一个分支。


