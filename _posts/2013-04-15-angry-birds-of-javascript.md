---
layout: post
title: "前端 JavaScript 架构"
tagline: "JavaScript 之愤怒的小鸟系列"
description: ""
category-substitution: 翻译
tags: ["Angry Birds of JavaScript", "JavaScript"]

subgroup: "前端 JavaScript 架构"
---
{% include JB/setup %}

<ul>
  {% for post in site.posts %}
    {% if post.pgroup == "前端 JavaScript 架构" %}
      {% if post.link == null %}
        <li>
            <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
            <br>
            <span>{{ post.tagline }}。{{ post.description }}。</span>
        </li>
      {% else %}
        <li><a href="{{ post.link }}" target="_blank">{{ post.title }}</a></li>
      {% endif %}
    {% endif %}
  {% endfor %}
</ul>