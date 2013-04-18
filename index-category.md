---
layout: page
title: Hello World!
tagline: 
---
{% include JB/setup %}

{% for post in site.posts %}
  {% if post.pgroup == null %}
  <p>
      {% if site.categories.first[0] == null %}
        {% for category in site.categories %}
          {% if category == post.category %}
          [<a href="{{ BASE_PATH }}{{ site.JB.categories_path }}#{{ category }}-ref">{{ category | join: "/" }}</a>]
          {% endif %}
        {% endfor %}
      {% else %}
        {% for category in site.categories %}
          {% if category[0] == post.category %}
          [<a href="{{ BASE_PATH }}{{ site.JB.categories_path }}#{{ category[0] }}-ref">{{ category[0] | join: "/" }}</a>]
          {% endif %}
        {% endfor %}
      {% endif %}

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
  {% endif %}
{% endfor %}
<hr>
<p>[链接] 当年师友尽豪英</p>
　　　[逸才](http://cyj.me/)、[逐飞](http://fizzwu.im/)、[凌征](http://yehao.diandian.com/)、[白汀](http://feliving.github.com/)、[崇志](http://www.ueder.net/)、[左莫](http://xubo.me/)、[黄龙](http://blog.iblack7.com/)、[巴韶](http://www.ibashao.com/)，谁还有？



