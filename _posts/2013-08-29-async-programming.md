---
layout: post
title: "异步编程"
tagline: "Async programming"
description: ""
category-substitution: 翻译
tags: [翻译, JavaScript, Async, Promise, when]

subgroup: "异步编程"
---
{% include JB/setup %}

<!-- Managing asynchronous operations is a necessity when working in JavaScript, and it can be messy business, especially when it comes to error handling. -->
当使用 JavaScript 开发时，对异步操作的管理是必要的，然后它可能是凌乱的，特别是当它处理错误时。

<!-- This lesson covers asynchronous error handling pitfalls, and shows how promises can provide familiar synchronous programming patterns for asynchronous operations. -->
本系列涵盖了异步错误处理陷阱，并展示了 Promise 如何为异步操作提供友好的同步编程模型。

<ul>
  {% for post in site.posts %}
    {% if post.pgroup == "异步编程" %}
      {% if post.link == null %}
        <li>
            <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
            <br>
            <span>{{ post.tagline }}。{{ post.description }}</span>
        </li>
      {% else %}
        <li><a href="{{ post.link }}" target="_blank">{{ post.title }}</a></li>
      {% endif %}
    {% endif %}
  {% endfor %}
</ul>