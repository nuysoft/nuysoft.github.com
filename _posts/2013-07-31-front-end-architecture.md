---
layout: post
title: "front end architecture"
description: ""
category: 
tags: []
published: false
---
{% include JB/setup %}



* 需求：
* 设计：API Manager
* 开发：JBoss Service, Nginx, Mock.js, Auto Deploy, Brackets
    * https://github.com/BlueJeansAndRain/proxima.git
* 测试：
* 联调：
* 压缩：Grunt 5份代码，
* 上线：Gitlab, Git Hooks
* 示例：ux-scaffold

## 最佳实践

1. 直接调试弹出窗口
    
    在 app/config/ini.js 中增加弹窗口的 View 路径，然后修改 URL Hash，即可直接加载弹出窗口中的内容，免去需要反复点击的烦扰。