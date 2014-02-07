---
layout: page
title: Hello World!
tagline: 
---
{% include JB/setup %}

<div class="row index_recommended">
  <div class="span4">
    <a href="http://product.china-pub.com/3769266" target="_blank"><img src="/assets/jquery_internals/shupi.jpg" width=256></a>
    <div class="title">《jQuery 技术内幕》</div>
    <div class="desc">新书预售</div>
  </div>
  <div class="span4">
    <a href="http://mockjs.com/" target="_blank"><i class="iconlogo">&#x3435;</i></a>
    <div class="title">Mock.js</div>
    <div class="desc">一款模拟数据生成器</div>
  </div>
  <div class="span4">
    <a href="http://bishengjs.com/" target="_blank"><i class="iconlogo">&#x3438;</i></a>
    <div class="title">BiSheng.js</div>
    <div class="desc">一款小巧轻便的数据双向绑定库</div>
  </div>
</div>
<link rel="stylesheet" type="text/css" href="/assets/github.css">

---

{% for post in site.posts %}
{% if post.pgroup == null %}
<div>
    [{{ post.category-substitution }}]

    {% if post.link == null %}
      <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    {% else %}
      <a href="{{ post.link }}" target="_blank">{{ post.title }}</a>
    {% endif %}
    <span style="color: #999;">{{ post.date | date: "%Y-%m-%d" }}</span>

    {% if post.description != null %}
    <p style="padding-left: 40px; " class="_description">{{ post.description }}</p>
    {% endif %}

    {% if post.subgroup != null %}
    <p style="padding-left: 40px; " class="_subgroup">
      {% for subpost in site.posts %}
        {% if subpost.pgroup == post.subgroup %}
          {% if subpost.link == null %}
            <a href="{{ BASE_PATH }}{{ subpost.url }}">
              {% if subpost.short != null %} {{ subpost.short }}
              {% else %} {{ subpost.title }}
              {% endif %}
            </a>、
          {% else %}
            <a href="{{ subpost.link }}" target="_blank">
              {% if subpost.short != null %} {{ subpost.short }}
              {% else %} {{ subpost.title }}
              {% endif %}
            </a>、
          {% endif %}
        {% endif %}
      {% endfor %}
    </p>
    {% endif %}
</div>
{% endif %}
{% endfor %}
<hr>
<p>[链接] 当年师友尽豪英</p>
　　　[逸才](http://cyj.me/)、[逐飞](http://fizzwu.im/)、[凌征](http://yehao.diandian.com/)、[白汀](http://feliving.github.com/)、[崇志](http://www.ueder.net/)、[左莫](http://xubo.me/)、[黄龙](http://blog.iblack7.com/)、[巴韶](http://www.ibashao.com/)、[释剑](http://litao229.cnblogs.com/)、[柯拓](http://www.cnblogs.com/ziyunfei/)、[雪卒](http://luckydrq.com)、[如彼](http://q.pnq.cc/)，谁还有？



