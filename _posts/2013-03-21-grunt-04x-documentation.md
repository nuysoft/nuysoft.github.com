---
layout: post
title: "Grunt 0.4.x Documentation"
description: ""
category-substitution: 翻译
tags: [翻译, Grunt, JavaScript, Web]
published: false

subgroup: Grunt
link: ##
---
{% include JB/setup %}

<ul>
  {% for post in site.posts %}
    {% if post.pgroup == "Grunt" %}
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

<!-- 
## Documentation
* [Getting Started]
* [Configuring Tasks]
* [Sample Gruntfile]
* [Creating Tasks]
* [Creating Plugins]

## Advanced
* [Installing Grunt]
* Frequently Asked Questions
* [Project Scaffolding]

## API
* Inside Tasks 
-->

[Getting Started]:      /bak/grunt/Getting-started.html
[Configuring Tasks]:    /bak/grunt/Configuring-tasks.html
[Sample Gruntfile]:     /bak/grunt/Sample-Gruntfile.html
[Creating Tasks]:       /bak/grunt/Creating-tasks.html
[Creating Plugins]:     /bak/grunt/Creating-plugins.html
[Installing Grunt]:     /bak/grunt/Installing-grunt.html
[Frequently Asked Questions]: /bak/grunt/Frequently-Asked-Questions.html
[Project Scaffolding]:  /bak/grunt/Project-Scaffolding.html
[Inside Tasks]:         /bak/grunt/Inside-Tasks.html
