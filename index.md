---
layout: page
title: Hello World!
tagline: 
---
{% include JB/setup %}

{% for post in site.posts %}
  {% if post.pgroup != null %}
    {% continue %}
  {% endif %}

  <p>
    <span>[{{ post.category }}]</span>
    {% if post.link == null %}
      <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    {% else %}
      <a href="{{ post.link }}" target="_blank">{{ post.title }}</a>
    {% endif %}
    <span style="color: #999;">{{ post.date | date: "%Y-%m-%d" }}</span>

    {% if post.description != null %}
    <p style="padding-left: 40px; ">{{ post.description }}</p>
    {% endif %}

    {% if post.subgroup != null %}
    <p style="padding-left: 40px; ">
      {% for subpost in site.posts %}
        {% if subpost.pgroup == post.subgroup %}
          {% if subpost.link == null %}
            <a href="{{ BASE_PATH }}{{ subpost.url }}">{{ subpost.short }}</a>、
          {% else %}
            <a href="{{ subpost.link }}" target="_blank">{{ subpost.short }}</a>、
          {% endif %}
        {% endif %}
      {% endfor %}
    </p>
    {% endif %}
  </p>
{% endfor %}
<hr>
<p>[链接] 当年师友尽豪英</p>
　　　[逸才](http://cyj.me/)、[逐飞](http://fizzwu.im/)、[凌征](http://yehao.diandian.com/)、[白汀](http://feliving.github.com/)、[崇志](http://www.ueder.net/)、[左莫]、[黄龙]，谁还有？
