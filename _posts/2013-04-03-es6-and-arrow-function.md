---
layout: post
title: "ECMAScript 6 and Arrow Function"
tagline: "箭头函数"
description: "函数表达式的简写形式"
category: 翻译
tags: [ECMAScript 6, JavaScript, Web]

short: "Arrow Function"
pgroup: es6
---
{% include JB/setup %}

> 原文：[ECMAScript 6 and Arrow Function](http://ariya.ofilabs.com/2013/02/es6-and-arrow-function.html)

<!-- Experienced JavaScript programmers take advantage of function expressions, they are used a lot in callbacks, either for DOM access or any other related setup. Another syntax addition to the upcoming ECMAScript 6 is the **arrow function expression** to let us write a shorter function expression. -->
有经验的 JavaScript 程序员会在回调函数中大量使用函数表达式，或者用于 DOM 访问，或者用于任何其他相关的设置。即将到来的 ECMAScript 6 增加了另外一种语法，称为**箭头函数**，允许我们编写更短的函数表达式。

<!-- A simple way to look at this arrow function notation (section [13.2](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.2) in the latest ES6 draft) is as a shorthand form of a normal function expression. This is best illustrated with an example. Say you want to produce the list containing the salary of every employees. By using [Array map](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.html), it will look like the following snippet: -->

箭头函数（最新的 ES6 草稿 [13.2](http://teramako.github.com/ECMAScript/ecma6th_syntax.html#13.2) 节）可以简单的理解为普通函数表达式的简写形式。最好是用一个例子来说明。假设你想要生成一个包含了每个员工工资的列表。可以通过使用 [Array map](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.html) 实现，就像下面的代码片段：

    salaryList = employeeList.map(function (e) { return e.salary; });

<!-- Note the function expression as the callback for map() is rather verbose. With an arrow function expression, that construct can be shortened to: -->

可以看到，函数表达式作为 map() 的回调函数相当冗长。而使用箭头函数表达式，该结构可以缩短为：

    salaryList = employeeList.map(e => e.salary);

<!-- No need for function and return. In fact, if you are about to implement the same task with other languages (such as Scala, CoffeeScript, C#), you would end up with a very similar syntax. -->

不需要函数和返回值。事实上，如果使用其他语言（比如 Scala、CoffeeScript、C#）实现同样的任务，最后会有一个非常相似的语法。

<!-- How does a syntax tree look like when there is an arrow function? Rather straightforward, no surprise there. -->

箭头函数的[语法树](http://esprima.googlecode.com/git-history/harmony/demo/parse.html)看起来会是什么样子？相当简单，没有任何惊喜。

![arrow_function](http://ariya.ofilabs.com/wp-content/uploads/2013/02/arrow_function.png)

<!-- An arrow function expression is designed primary for the case where you need to return a value. However, it still works if you don’t care about returning anything and just want to execute some statements. Take a look at this example: -->

箭头函数表达式主要为了需要返回一个值的情况而设计。然而，如果你不关心返回值、只是想执行一些语句，它仍然是有效的。看看这个例子：

    employeeList.forEach(e => { console.log(e.name); });

<!-- Another fun thing with such a shorthand is when you start cascading more functions. For example, if now we are interested in the average salary, this can be computed by: -->

当你使用这种简写方式级联更多的函数时，事情变得有趣起来。例如，如果现在我们感兴趣的是平均工资，可以这样计算：

    var total = employeeList.map(e => e.salary).reduce((p, q) => p + q));
    var averageSalary = total / employeeList.length;

<!-- That’s just way shorter and less crowded compare to function expressions everywhere. It is important to notice that if you have more than one parameter, you need to enclose the parameters with brackets. -->

相较于无处不在的函数表达式，这种方式要更短、更简洁。重要的是要注意到，如果有一个以上的参数，需要用括号把参数包起来。

<!-- Since an arrow function expression is just another form of an assignment expression, we can keep it as a normal object (either for further reuse or just to make it easy to follow), as illustrated in the following fragment (neat, isn’t it?): -->

因为箭头函数表达式仅仅是另一种形式的赋值表达式，我们可以将它保存为一个普通对象（或者为了将来复用，或者仅仅是为了易于跟踪），就像下面的代码片段所示（很优雅是不是？）：

    var adder = (p, q) => p + q;
    var avg = employeeList.map(e => e.salary).reduce(adder) / employeeList.length;

<!-- Combine it with [array comprehension](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.html) and magically it does not look to JavaScript-y anymore! -->

如果把箭头函数表达式与[数组推导式](http://ariya.ofilabs.com/2013/01/es6-and-array-comprehension.html) 结合使用，箭头函数魔法般地不再像是由 JavaScript 构成的。

<!-- I believe the use of arrow function expression strikes a good balance between readability and expressiveness. What do you think? -->

我相信箭头函数表达式的使用可以在可读性和表达丰富性之间取得一个良好的平衡。你怎么看？


