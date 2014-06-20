---
layout: page
title: Hello World!
tagline: 
---
{% include JB/setup %}

<div class="row index_recommended">
  <div class="span4">
    <a href="http://www.amazon.cn/jQuery%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95-%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90jQuery%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86-%E9%AB%98%E4%BA%91/dp/B00IAGOSCW/ref=sr_1_4?s=books&ie=UTF8&qid=1400243386&sr=1-4" target="_blank"><img src="/assets/jquery_internals/shupi.jpg" width=256></a>
    <div class="title">《jQuery 技术内幕》</div>
    <div class="desc">深入解析架构设计与实现原理</div>
    <div class="link">
      <a href="http://www.amazon.cn/jQuery%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95-%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90jQuery%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86-%E9%AB%98%E4%BA%91/dp/B00IAGOSCW/ref=sr_1_4?s=books&ie=UTF8&qid=1400243386&sr=1-4" target="_blank">亚马逊</a>
      <a href="http://product.dangdang.com/23414526.html#ddclick?act=click&pos=23414526_0_1_q&cat=&key=jQuery%BC%BC%CA%F5%C4%DA%C4%BB&qinfo=22_1_48&pinfo=&minfo=&ninfo=&custid=&permid=20120929004846033204736365326630651&ref=http%3A%2F%2Fsearch.dangdang.com%2F%3Fkey%3DjQuery%25BC%25BC%25CA%25F5%25C4%25DA%25C4%25BB&rcount=&type=&t=1400243715000" target="_blank">当当网</a>
      <a href="http://s.taobao.com/search?q=jQuery%BC%BC%CA%F5%C4%DA%C4%BB&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=1.7274553.1997520841.1&initiative_id=tbindexz_20140516" target="_blank">淘宝网</a>
    </div>
  </div>
  <div class="span4">
    <a href="http://mockjs.com/" target="_blank"><i class="iconlogo">&#x3435;</i></a>
    <div class="title">Mock.js</div>
    <div class="desc">一款模拟数据生成器</div>
    <div class="link">
      <a href="http://mockjs.com" target="_blank">http://mockjs.com</a>
    </div>
  </div>
  <div class="span4">
    <a href="http://bishengjs.com/" target="_blank"><i class="iconlogo">&#x3438;</i></a>
    <div class="title">BiSheng.js</div>
    <div class="desc">一款小巧轻便的数据双向绑定库</div>
    <div class="link">
      <a href="http://bishengjs.com" target="_blank">http://bishengjs.com</a>
    </div>
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
    <p style="padding-left: 40px; margin-top: 10px;" class="_description">{{ post.description }}</p>
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
　　　[逸才](http://cyj.me/)、[逐飞](http://fizzwu.im/)、[凌征](http://yehao.diandian.com/)、[白汀](http://feliving.github.com/)、[崇志](http://www.ueder.net/)、[左莫](http://xubo.me/)、[黄龙](http://blog.iblack7.com/)、[巴韶](http://www.ibashao.com/)、[释剑](http://litao229.cnblogs.com/)、[柯拓](http://www.cnblogs.com/ziyunfei/)、[雪卒](http://luckydrq.com)、[如彼](http://q.pnq.cc/)、[胡伯](http://jser.me/)、[霍雍](http://bosn.me/)，谁还有？



