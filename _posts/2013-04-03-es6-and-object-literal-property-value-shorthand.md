---
layout: post
title: "Object Literal Property Value Shorthand"
tagline: "对象字面属性值简写"
description: "属性值与属性标识符同名"
category: 翻译
tags: [ECMAScript 6, JavasSript, Web]

short: "Object Literal Property Value Shorthand"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and Object Literal Property Value Shorthand](http://ariya.ofilabs.com/2013/02/es6-and-object-literal-property-value-shorthand.html)

<!-- Constructing an object using the literal syntax is something that is very familiar to every JavaScript developer, quite likely because this reminds everyone of [JSON](http://json.org/). While every object property needs to be either a key-value pair or getter/setter, this may change in the near future. Another syntactic sugar in the upcoming ECMAScript 6 is the **object literal property value shorthand**. -->
对于每个 JavaScript 开发人员，使用字面量语法构造一个对象是非常熟悉的做法，这很可能是因为受到了 [JSON](http://json.org/) 的影响。而每个对象属性必须是一对 key-value 或 getter/setter，这可能会在不久的将来改变。即将到来的 ECMAScript 6 的另一个语法糖是**对象字面属性值简写**。

<!-- Consider the following ECMAScript 5 fragment: -->
考虑下面的 ECMAScript 5 代码片段：

    function createMonster(name, power) {
      return { type: 'Monster', name: name, power: power };
    }
    function createWitch(name) {
      return { type: 'Witch', name: name };
    }

<!-- With the new shorthand form, this can be rewritten as the following code: -->
使用新的简写形式后，这段代码可以被改写为下面的代码：

    function createMonster(name, power) {
      return { type: 'Monster', name, power };
    }
    function createWitch(name) {
      return { type: 'Witch', name };
    }

<!-- As you can see, this works because the property value has the same name as the property identifier. This a new addition to the syntax of *Object Initialiser* ([section 11.1.5](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.1.5)) in the latest [ECMAScript 6 draft Rev 13](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts). Of course, just like the limitations set from ECMAScript 3, you can't use a reserved word as your property name. -->
正如你看到的，这段代码可以工作是因为属性值与属性标识符同名。这是最新的 [ECMAScript 6 草案 Rev 13](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) 对*对象初始化*语法（[11.1.5 节](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#11.1.5)）新的补充。当然，就像 ECMAScript 3 的限制集合，你不能使用保留字作为属性名。

<!-- What about real-world code which can use the shorthand notation? Somewhere in [Backbone.js](http://backbonejs.org/), we should be able to use the following form instead of its longer one: -->
在现在世界的代码中使用这种简写符号会怎么样？在 [Backbone.js](http://backbonejs.org/) 的某个地方，我们可以使用下面的形式，代替它更长的形式：

    route: function(route, callback) {
      this.handlers.unshift({route, callback});
    },

<!-- For improved readibility, many times we use temporary variables before constructing an object out of the properties. As another example, a piece of code [QUnit](http://qunitjs.com/) may have the following simplified syntax: -->
为了提高可读性，很多时候，我们在用属性构造对象之前会使用临时变量。再举一个例子，[QUnit](http://qunitjs.com/) 的某块代码可以使用下面的简化语法：

    test = new Test({nameHtml, testName, expected, async,
      callback,module: config.currentModule,
      moduleTestEnvironment: config.currentModuleTestEnvironment,
      stack: sourceFromStacktrace(2)
    });

<!-- Such a shorthand won't dramatically change your code, it only makes everything a little bit sweeter! -->
这种简写不会显著的改变你的代码，它仅仅是让事情变得有点“甜蜜”。

<!-- **Addendum**. While the literal shorthand is useful on its own, in many cases it would be more frequently encountered as it is combined with *object pattern* (see my previous post on [ECMAScript 6 destructuring](http://ariya.ofilabs.com/2013/02/es6-and-destructuring-assignment.html)). Thus, the following code fragment: -->

**附录**

虽然字面量简写本身就是有用的，但在许多情况下，更频繁遇到的是它与*对象模式*（见我以前关于 [ECMAScript 6 解构](http://ariya.ofilabs.com/2013/02/es6-and-destructuring-assignment.html) 的帖子）结合使用。因此，下面的的代码片段：

    books.forEach(function ({title: title, author: author}) {
      console.log(title, 'is written by', author);
    });

<!-- turns into something like this one: -->
变成这样：

    books.forEach(function ({title, author}) {
      console.log(title, 'is written by', author);
    });

<!-- As you can see, such a symmetry is well suited for this case. -->
正如你看到的，这样的对称性（属性值与属性标识符同名）非常适合这种情况。



