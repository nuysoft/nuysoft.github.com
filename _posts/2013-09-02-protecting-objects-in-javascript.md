---
layout: post
title: "在 JavaScript 中保护对象"
tagline: "Protecting Objects in JavaScript"
description: ""
category-substitution: 翻译
tags: [翻译, dev, javascript, jslang]
---
{% include JB/setup %}

<!-- This blog post is a quick refresher of how objects can be protected in JavaScript. There are three levels of protection: -->
这篇博客旨在快速复习如何在 JavaScript 中保护对象。有 3 种程度的保护：

<!-- 1. Preventing extensions is the weakest level,
1. sealing is stronger,
1. freezing is strongest. -->

1. 最弱的是阻止扩展，
2. 稍强的是封闭对象，
3. 最强的是冻结对象。


<!-- ## Preventing extension -->
## 阻止扩展

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)

<!-- makes it impossible to add properties to obj. Example: -->
使对象不能再添加属性。例如

    var obj = { foo: 'a' };
    Object.preventExtensions(obj);

<!-- Now adding a propert fails silently in sloppy mode: -->
现在，在宽松模式下添加属性会静默失败：

    > obj.bar = 'b';
    > obj.bar
    undefined

<!-- And throws an error in strict mode [1](#[1]), which we switch to via an IIFE [2](#[2]). -->
而在严格模式[[1]](#[1])下会抛出一个错误，我们通过一个 IIFE[[2]](#[2]) 使用严格模式。

    > (function () { 'use strict'; obj.bar = 'b' }());
    TypeError: Can't add property bar, object is not extensible

<!-- You can still delete properties, though. -->
但是，仍然可以删除属性。

    > delete obj.foo
    true
    > obj.foo
    undefined

<!-- ### Checking whether an object is extensible -->
### 检查对象是否可扩展

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)

<!-- checks whether obj is extensible: -->
检查 obj 是否可扩展：

    > Object.isExtensible(obj)
    false

<!-- ## Sealing -->
## 封闭对象

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

<!-- prevents extensions and makes all properties “unconfigurable”. The latter means that the attributes [3](#[3]) of properties can’t be changed, any more. Read-only properties stay read-only, enumerable properties stay enumerable, etc. -->
阻止扩展，并使所有属性“不可配置”。后者意味着属性的特性不可修改。只读的属性保持只读，可枚举的属性仍可枚举，等等。

<!-- (As an aside, JavaScript does allow you to change an unconfigurable property from writable to read-only, due to [historical reasons](http://stackoverflow.com/questions/9829817/why-can-i-set-enumerability-and-writability-of-unconfigurable-property-descripto/9843191#9843191).) -->
（顺便说一句，因为[历史原因](http://stackoverflow.com/questions/9829817/why-can-i-set-enumerability-and-writability-of-unconfigurable-property-descripto/9843191#9843191)，JavaScript 允许把不可配置的属性从可写改为只读。）

<!-- The following example demonstrates that sealing makes all properties unconfigurable. -->
下面的例子演示了封闭使所有属性不可配置。

    > var obj = { foo: 'a' };

    > Object.getOwnPropertyDescriptor(obj, 'foo')  // before sealing
    { value: 'a',
      writable: true,
      enumerable: true,
      configurable: true }

    > Object.seal(obj)

    > Object.getOwnPropertyDescriptor(obj, 'foo')  // after sealing
    { value: 'a',
      writable: true,
      enumerable: true,
      configurable: false }

<!-- You can still change the property foo: -->
你仍然可以改变属性 foo：

    > obj.foo = 'b';
    'b'
    > obj.foo
    'b'

<!-- But you can’t change its attributes: -->
但是你不能改变它的特性：

    > Object.defineProperty(obj, 'foo', { enumerable: false });
    TypeError: Cannot redefine property: foo

Additionally, obj is not extensible, any more.
此外，obj 不再可扩展。

<!-- ### Checking whether an object is sealed -->
### 检查对象是否是封闭的

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)

<!-- checks whether obj is sealed: -->
检查 obj 是否是封闭的：

    > Object.isSealed(obj)
    true

<!-- ## Freezing -->
## 冻结对象

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

<!-- makes all properties non-writable and seals obj. That is, obj is not extensible, all properties are read-only and there is no way to change that. -->
是所有属性不可写，并封闭对象。也就是说，对象不可扩展，所有属性为只读并不可修改。

    var point = { x: 17, y: -5 };
    Object.freeze(point);

<!-- Once again, you get silent failures in sloppy mode: -->
在宽松模式中，将再次静默失败：

    > point.x = 2;  // no effect, point.x is read-only
    > point.x
    17

    > point.z = 123;  // no effect, point is not extensible
    > point
    { x: 17, y: -5 }

<!-- And errors in strict mode: -->
在严格模式中则抛出一个错误：

    > (function () { 'use strict'; point.x = 2 }());
    TypeError: Cannot assign to read-only property 'x'

    > (function () { 'use strict'; point.z = 123 }());
    TypeError: Can't add property z, object is not extensible

<!-- ### Checking whether an object is frozen -->
### 检查对象是否是冻结的

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)

<!-- checks whether obj is frozen: -->
检查 obj 是否是冻结的：

    > Object.isFrozen(point)
    true

<!-- ## References -->
## 参考文献

<a name="[1]"></a>
<a name="[2]"></a>

1. [JavaScript’s strict mode: a summary](http://www.2ality.com/2011/01/javascripts-strict-mode-summary.html)
1. [JavaScript variable scoping and its pitfalls](http://www.2ality.com/2011/02/javascript-variable-scoping-and-its.html)
1. [Object properties in JavaScript](http://www.2ality.com/2012/10/javascript-properties.html)

<hr>
> 原文：[Protecting objects in JavaScript](http://www.2ality.com/2013/08/protecting-objects.html)

<link href="/assets/codemirror/lib/codemirror.css" rel="stylesheet">
<link href="/assets/codemirror/theme/neat.css" rel="stylesheet">
<script src="/assets/codemirror/lib/codemirror.js"></script>
<script src="/assets/codemirror/addon/runmode/runmode.js"></script>
<script src="/assets/codemirror/mode/javascript/javascript.js"></script>
<script type="text/javascript">
    $('pre').each(function(index, el){
        $(this).hide()
        var ctn = $('<pre class="cm-s-neat">').insertAfter(this)
        CodeMirror.runMode($(this).find('code').text(), 'javascript',
                 ctn.get(0));
    })
</script>