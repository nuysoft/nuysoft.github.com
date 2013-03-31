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
    
  </p>

{% endfor %}
<hr>
<p>[链接] 当年师友尽豪英</p>
　　　[逸才](http://cyj.me/)、[逐飞](http://fizzwu.im/)、[凌征](http://yehao.diandian.com/)、[白汀](http://feliving.github.com/)、[崇志](http://www.ueder.net/)、[左莫]()、[黄龙]()，谁还有？
