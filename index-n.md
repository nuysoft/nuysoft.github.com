---
layout: page
title: Hello World!
tagline: 
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
      [{{ post.category }}]<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      <span>{{ post.date | date_to_string }}</span>
    </li> 
  {% endfor %}
</ul>

{% for post in site.posts %}
  {{ post.date | date_to_string }},
  {{ post.title }},
  {{ post.category }},
  {{ post.tags }},
{% endfor %}