---
layout: post
title: "混入，转发，以及代表团在JavaScript"
tagline: "Mixins, Forwarding, and Delegation in JavaScript"
description: ""
category: 
category-substitution: 翻译
tags: [翻译]
published: false
---
{% include JB/setup %}

> 原文：[Mixins, Forwarding, and Delegation in JavaScript](http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html) [via raganwald.com](http://raganwald.com/)

### preface: where did the prototypes go?
前言：原型何去何从？

This essay discusses how to separate JavaScript domain properties from object behaviour, *without prototypes*. This is deliberate. By examining four basic ways to have one object define the behaviour of other objects, we gain insight into what we’re trying to accomplish at a very basic level.
本文讨论如何不通过原型分离 JavaScript 的域属性和对象行为。

本文讨论如何JavaScript的域属性从对象行为分开， 没有原型 。 这是故意的。 通过检查到有一个对象定义其他对象的行为四种基本方法，我们深入了解了我们所要完成的一个非常基本的水平。

We can then take this insight to working with prototypes and understand the conveniences that prototypes provide as well as the tradeoffs that they make. That does not mean, of course that just because prototypes (or classes, for that matter) are not mentioned here, that prototypes are considered inferior to any of these techniques.
然后，我们可以借此洞察与原型的工作，明白原型提供便利，以及他们所作的权衡。 这并不意味着，仅仅因为原型（或类，对于这个问题），此处不再赘述，当然，那原型被认为逊色于任何这些技术。

This is an essay, not a style guide.
这是一篇文章，而不是一个风格指南。

## Why metaobjects?
为什么元对象？

It is technically possible to write software using objects alone. When we need behaviour for an object, we can give it methods by binding functions to keys in the object:
这在技术上是可能单独使用对象来编写软件。 当我们需要的行为为对象，我们可以给它的方法通过结合功能在对象键：

    var sam = {
      firstName: 'Sam',
      lastName: 'Lowry',
      fullName: function () {
        return this.firstName + " " + this.lastName;
      },
      rename: function (first, last) {
        this.firstName = first;
        this.lastName = last;
        return this;
      }
    }

We call this a “naïve” object. It has state and behaviour, but it lacks division of responsibility between its state and its behaviour.
我们称之为“天真”的对象。 它具有状态和行为，但缺乏自己的状态和行为之间的职责分工。

This lack of separation has two drawbacks. First, it intermingles properties that are part of the model domain (such as `firstName`), with methods (and possibly other properties, although none are shown here) that are part of the implementation domain. Second, when we needed to share common behaviour, we could have objects share common functions, but does it not scale: There’s no sense of organization, no clustering of objects and functions that share a common responsibility.
这种缺乏分离有两个缺点。 首先，它混合了属于模型域（如零件属性firstName ），与方法（可能还有其他的属性，虽然没有在这里显示），是实现域的一部分。 其次，当我们需要分享共同的行为，我们可以有对象共享共同的功能，但它不能扩展：有没有意义的组织，没有集群共享一个共同的责任对象和函数。

Metaobjects solve the lack-of-separation problem by separating the domain-specific properties of objects from their behaviour and implementation-specific properties.
元对象通过分离的对象从自己的行为和执行特定的属性特定于域的性能解决缺乏，分离的问题。

The basic principle of the metaobject is that we separate the mechanics of behaviour from the domain properties of the base object. This has immediate engineering benefits, and it’s also the foundation for designing programs with higher-level constructs like formal classes, expectations, and delegation.
的元对象的基本原则是，我们单独行为的机制从基础对象的域属性。 这有直接的工程效益，而且它也是与像正式上课，期望和代表团更高级别的结构设计方案的基础。

## Mixins, Forwarding, and Delegation
混入，转发和代表团

The simplest possible metaobject in JavaScript is a mixin. Consider our naïve object:
在JavaScript中最简单的元对象是一个混入 。 考虑我们的天真对象：

    var sam = {
      firstName: 'Sam',
      lastName: 'Lowry',
      fullName: function () {
        return this.firstName + " " + this.lastName;
      },
      rename: function (first, last) {
        this.firstName = first;
        this.lastName = last;
        return this;
      }
    }

We can separate its domain properties from its behaviour:
我们可以从它的行为中分离其领域属性：

    var sam = {
      firstName: 'Sam',
      lastName: 'Lowry'
    };
    
    var person = {
      fullName: function () {
        return this.firstName + " " + this.lastName;
      },
      rename: function (first, last) {
        this.firstName = first;
        this.lastName = last;
        return this;
      }
    };

And use `extend` to mix the behaviour in:
和使用extend混合的行为：

    var __slice = [].slice;
    
    function extend () {
      var consumer = arguments[0],
          providers = __slice.call(arguments, 1),
          key,
          i,
          provider,
          except;
    
      for (i = 0; i < providers.length; ++i) {
        provider = providers[i];
        except = provider['except'] || [];
        except.push('except');
        for (key in provider) {
          if (except.indexOf(key) < 0 && provider.hasOwnProperty(key)) {
            consumer[key] = provider[key];
          };
        };
      };
      return consumer;
    };
    
    extend(sam, person);
    
    sam.rename
      //=> [Function]

This allows us to separate the behaviour from the properties in our code. If we want to use the same behaviour with another object, we can do that:
这使我们能够从我们的代码的属性分开的行为。 如果我们要使用与另一个对象相同的行为，我们可以这样做：

    var peck = {
      firstName: 'Sam',
      lastName: 'Peckinpah'
    };
    
    extend(peck, person);

Our `person` object is a `template`, it provides some functionality to be mixed into an object with a function like `extend`. Using templates does not require copying entire functions around, each object gets references to the functions in the template.
我们的person对象是一个模板 ，它提供了一些功能被混合成一个对象具有类似的功能extend 。 使用模板不需要围绕整个复制功能，每个对象获取引用模板中的功能。

Things get even better: You can use more than one template with the same object:
事情变得更好：您可以使用多个模板与同一个对象：

    var hasCareer = {
      career: function () {
        return this.chosenCareer;
      },
      setCareer: function (career) {
        this.chosenCareer = career;
        return this;
      }
    };
    
    extend(peck, hasCareer);
    peck.setCareer('Director');

We say that there is a many-to-many relationship between objects and templates.
我们说有对象和模板之间的许多一对多的关系。

### scope and coupling
范围和耦合

Consider a design that has four kinds of templates, we’ll call them `A`, `B`, `C`, and `D`. Objects in the system might mix in one, two, three, or all four templates. There are fifteen such “kinds” of objects, those that mix in `A`, `B`, `AB`, `C`, `AC`, `BC`, `ABC`, `D`, `AD`, `BD`, `ABD`, `CD`, `ACD`, `BCD`, and `ABCD`.
想想看，有四种模板的设计，我们会打电话给他们A ， B ， C ，和D 。 系统中的对象可能混在一个，两个，三个或四个模板。 有十五个这样的“种”的对象，那些在这混A ， B ， AB ， C ， AC ， BC ， ABC ， D ， AD ， BD ， ABD ， CD ， ACD ， BCD和ABCD 。

When you make a change to and one template, say `A`, you have to consider how that change will affect each of the eight kinds of objects that mixes `A` in. In only one of those, `A`, do you just consider `A`’s behaviour by itself. In `AB`, `ABC`, `ABD`, and `ABCD`, you have to consider how changes to `A` may interact with `B`, because they both share access to each object’s private state. Same for `A` and `C`, and `A` and `D`, of course.
当你做出改变，以与一个模板，说A ，你必须要考虑这种变化会如何影响每个八种，混合对象的A英寸 只有其中的一个， A ，你只是考虑A单独的行为。 在AB ， ABC ， ABD ，和ABCD ，你必须考虑如何改变A可交互B ，因为每个对象的私有状态，它们都共享访问。 同样的A和C ，以及A和D ，当然。

By itself this is not completely revelatory: When objects interact with each other in the code, there are going to be dependencies between them, and you have to manage those dependencies.
就其本身而言，这是不完全启示：当对象在代码中互相交流，有将是它们之间的依赖关系，你必须管理这些依赖关系。

Encapsulation solves this problem by strictly limiting the scope of interaction between objects. If object `a` invokes a method `x()` on object `b`, we know that the scope of interaction between `a` and `b` is strictly limited to the method `x()`. We also know that any change in state it may create is strictly limited to the object `b`, because `x()` cannot reach back and touch `a`’s private state.
封装通过严格限制对象之间的相互作用的范围来解决这个问题。 如果对象a调用方法x()对象b ，我们知道，互动之间的范围， a和b是严格限制的方法， x() 我们也知道，在任何状态变化可能会产生被严格限制在对象b ，因为x()不能伸出手摸a的私有状态。

(There is some simplification going on here as we are ignoring parameters and/or the possibility that `a` is part of `b`’s private state)
（有一些简化怎么回事，因为我们忽略的参数和/或可能a是部分b的私有状态）

However, two methods `x()` and `y()` on the same object are tightly coupled by default, because they both interact with all of the object’s private state. When we write an object like this:
然而，两种方法x()和y()在同一对象上是紧密默认耦合的，因为它们都与所有对象的私有状态交互。 当我们写一个这样的对象：

    var counter = {
      _value: 0,
      value: function () {
        return this._value;
      },
      increment: function () {
        ++this._value;
        return this;
      },
      decrement: function () {
        --this._value;
        return this;
      }
    }

We fully understand that `value()`, `increment()`, and `decrement()` are coupled, and they are all together in our code next to each other.
我们完全明白， value() increment()和decrement()耦合，他们都聚集在我们的代码中彼此相邻。

Whereas, if we write:
然而，如果我们写：

    function isanIncrementor (object) {
      object.increment = function () {
        ++this._value;
        return this;
      };
      return object;
    }
    
    // ...hundreds of lines of code...
    
    function isaDecrementor (object) {
      object.decrement = function () {
        --this._value;
        return this;
      };
      return object;
    }

Our two templates are tightly coupled to each other, but not obviously so. They just ‘happen’ to use the same property. And they might never be both mixed into the same object. Or perhaps they might. Who knows?
我们的两个模板紧密地彼此耦合，但并不明显如此。 他们只是'碰巧'使用相同的属性。 他们可能永远不会两者混合到同一个对象。 或者他们可能。 谁知道？

The technical term for templates referring to an object’s private properties is [open recursion](https://en.wikipedia.org/wiki/Open_recursion#Open_recursion). It is powerful and flexible, in exactly the same sense that having objects refer to each other’s internal properties is powerful and flexible.
该技术术语的模板指的是一个对象的私有属性是开放递归 。 它功能强大，灵活，在完全相同的感觉，有对象相互引用的内部属性是强大和灵活。

And just as objects can encapsulate their own private state, so can templates.
而且，正如对象可以封装自己的私有状态，这样可以模板。

### templates with private properties
与私人性质的模板
Let’s revisit our hasCareer template:
我们再回顾一下hasCareer模板：

    var hasCareer = {
      career: function () {
        return this.chosenCareer;
      },
      setCareer: function (career) {
        this.chosenCareer = career;
        return this;
      }
    };

`hasCareer` stores its private state in the object’s `chosenCareer` property. As we’ve seen, that introduces coupling if any other method touches `chosenCareer`. What we’d like to do is make `chosenCareer` private. Specifically:
hasCareer存储在对象的其私有状态chosenCareer财产。 正如我们已经看到的那样，引入耦合如有其他方法倒是chosenCareer 。 我们想要做的就是让chosenCareer私人。 具体做法是：

1. We wish to store a copy of `chosenCareer` for each object that uses the `hasCareer` template. Mark Twain is a writer, Sam Peckinpah is a director.
2. `chosenCareer` must not be a property of each person object, because we don’t want other methods accessing it and becoming coupled.
1. 我们希望保存的副本chosenCareer为使用的每个对象hasCareer模板。 马克·吐温是一位作家，萨姆派金帕的董事。
2. chosenCareer不能每个人对象的一个属性，因为我们不希望其他方法访问它，并成为耦合。

We have a few options. The very simplest, and most “native” to JavaScript, is to use a closure.
我们有几种选择。 非常简单的，也是最“本土”到JavaScript中，是使用闭包。

### privacy through closures
通过隐私封

We’ll write our own [functional mixin](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/):
我们将我们自己写的功能混入 ：

    function HasPrivateCareer (obj) {
      var chosenCareer;
    
      obj.career = function () {
        return chosenCareer;
      };
      obj.setCareer = function (career) {
        chosenCareer = career;
        return this;
      };
      return obj;
    }
    
    HasPrivateCareer(peck);

`chosenCareer` is a variable within the scope of the `hasCareer`, so the `career` and `setCareer` methods can both access it through lexical scope, but no other method can or ever will.
chosenCareer是范围内的一个变量hasCareer ，所以career和setCareer方法可以通过词法范围既访问它，但没有其他方法能够或曾经会。

This approach works well for simple cases. It only works for named variables. We can’t, for example, write a function that iterates through all of the private properties of this kind of functional mixin, because they aren’t properties, they’re variables. In the end, we have privacy, but we achieve it by not using properties at all.
这种方法只适合比较简单的案件。 它仅适用于命名的变量。 我们不能，例如，写一个函数，遍历所有的这种功能混入的私人性质的，因为它们不是属性，它们是变量。 最后，我们有隐私，但是我们不使用性质在所有实现它。

### privacy through objects
隐私通过对象

Another way to achieve privacy in templates is to write them as methods that operate on `this`, but sneakily make `this` refer to a different object. Let’s revisit our `extend` function:
另一种方式来实现隐私模板是他们写的，关于操作方法this ，但暗中使this指的是不同的对象。 让我们重温我们的extend功能：

    function extendPrivately (receiver, template) {
      var methodName,
          privateProperty = Object.create(null);
    
      for (methodName in template) {
        if (template.hasOwnProperty(methodName)) {
          receiver[methodName] = template[methodName].bind(privateProperty);
        };
      };
      return receiver;
    };

We don’t need to embed variables and methods in our function, it creates one private variable (`privateProperty`), and then uses `.bind` to ensure that each method is bound to that variable instead of to the receiver object being extended with the template.
我们并不需要嵌入在我们的函数的变量和方法，它创建一个私有变量（ privateProperty ），然后使用.bind ，以确保每个方法必然会代替以被扩展与模板接收器对象到该变量。

Now we can extend any object with any template, ‘privately:’
现在，我们可以扩展任何物体与任何模板，'私下：'

    extendPrivately(twain, hasCareer);
    twain.setCareer('Author');
    twain.career()
      //=> 'Author'

Has it modified `twain`’s properties?
有没有修改的twain的属性？

    twain.chosenCareer
      //=> undefined

No. `twain` has `.setCareer` and `.career` methods, but `.chosencareer` is a property of an object created when `twain` was privately extended, then bound to each method using `.bind`.
第twain有.setCareer和.career方法，但.chosencareer是当创建一个对象的属性twain私下扩展，然后使用绑定到每个方法.bind 。

The advantage of this approach over closures is that the template and the mechanism for mixing it in are separate: You just write the template’s methods, you don’t have to carefully ensure that they access private state through variables in a closure.
这种方法在闭包的好处是，模板和机制，在混合它是分开的：你只要写模板的方法，你不必再三保证，他们通过在一个封闭的变量访问私有状态。

### another way to achieve privacy through objects
另一种方式通过对象来实现隐私

In our scheme above, we used `.bind` to create methods bound to a private object before mixing references to them into our object. There is another way to do it:
在上面的方案中，我们使用.bind来创建混合引用到我们的对象之前绑定到一个私有对象的方法。 还有另一种方式来做到这一点：

    function forward (receiver, methods, toProvider) {
      methods.forEach(function (methodName) {
        receiver[methodName] = function () {
          return toProvider[methodName].apply(toProvider, arguments);
        };
      });
    
      return receiver;
    };

This function *forwards* methods to another object. Any other object, it could be a metaobject specifically designed to define behaviour, or it could be a domain object that has other responsibilities.
此功能的方法转发给另一个对象。 任何其他对象，也可能是专门设计用来定义行为的元对象，或者它可能是有其他责任的域对象。

Dispensing with a lot of mixins, here is a very simple example example. We start with some kind of investment portfolio object that has a `netWorth` method:
有很多混入的配药，这里是一个很简单的例子例子。 我们开始与一些投资组合的对象具有的netWorth方法：

    var portfolio = {
      _investments: [],
      addInvestment: function (investment) {
        this._investments.push(investment);
        return this;
      },
      netWorth: function () {
        return this._investments.reduce(
          function (acc, investment) {
            return acc + investment.value;
          },
          0
        );
      }
    };

And next we create an investor who has this portfolio of investments:
而接下来，我们创建谁拥有这个投资组合的投资者：

    var investor = {
      //...
    }

What if we want to make investments and to know an investor’s net worth?
如果我们要投资，要知道投资者的身家？

    forward(investor, ['addInvestment', 'netWorth'], portfolio);

We’re saying “Forward all requests for `addInvestment` and `netWorth` to the portfolio object.”
我们说“转发所有请求addInvestment和netWorth对投资组合的对象。“

### forwarding
转发

Forwarding is a relationship between an object that receives a method invocation receiver and a provider object. They may be peers. The provider may be contained by the consumer. Or perhaps the provider is a metaobject.
转发是接收一个方法调用的接收器和一个提供对象的对象之间的关系。 他们可能是同龄人。 提供者也可以包含由消费者。 或者提供者是一个元对象。

When forwarding, the provider object has its own state. There is no special binding of function contexts, instead the consumer object has its own methods that forward to the provider and return the result. Our `forward` function above handles all of that, iterating over the provider’s properties and making forwarding methods in the consumer.
当转发，提供者对象都有自己的状态。 还有就是函数的上下文没有特殊的结合，而不是消费对象都有自己的方法，那期待的提供者，并返回结果。 我们forward上述函数处理所有这一切，遍历提供者的性质，使转发方法在消费。

The key idea is that when forwarding, the provider object handles each method *in its own context*. This is very similar to the effect of our solution with `.bind` above, but not identical.
关键的想法是，在转发时，提供者对象处理的每个方法在自己的上下文 。 这非常类似于我们的解决方案的效果.bind以上，但不完全相同。

Because there is a forwarding method in the consumer object and a handling method in the provider, the two can be varied independently. Here’s a snippet of our `forward` function from above:
因为在消费对象的转发方法和在提供者的处理方法，这两个可独立改变。 这是我们的一个片段forward从上面的函数：

    consumer[methodName] = function () {
      return toProvider[methodName].apply(toProvider, arguments);
    }

Each forwarding function invokes the method in the provider by name. So we can do this:
每个转发功能调用中的名字提供者的方法。 因此，我们可以这样做：

    portfolio.netWorth = function () {
      return "I'm actually bankrupt!";
    }

We’re overwriting the method in the `portfolio` object, but not the forwarding function. So now, our `investor` object will forward invocations of `netWorth` to the new function, not the original. This is not how our `.bind` system worked above.
我们覆盖的方法在portfolio的对象，而不是转发功能。 所以，现在，我们的investor对象将转发的调用netWorth到新的函数，而不是原来的。 这不是我们如何.bind系统上工作。

That makes sense from a “metaphor” perspective. With our `extendPrivately` function above, we are creating an object as a way of making private state, but we don’t think of it as really being a first-class entity unto itself. We’re mixing those specific methods into a consumer.
这是有道理的从一个“隐喻”的观点。 与我们extendPrivately功能上面，我们创建了一个对象作为使私有状态的一种方式，但我们不认为它真的是本身就是一个一流的经营实体。 我们正在混合这些具体的方法为消费者。

Another way to say this is that mixing in is “early bound,” while forwarding is “late bound:” We’ll look up the method when it’s invoked.
另一种说法是，在混合是“早期绑定”，同时转发“后期绑定：”我们将查找方法调用它的时候。

### summarizing what we know so far
总结我们所知道的，到目前为止

So now we have three things: Mixing in a template; mixing in a template with private state for its methods (“Private Mixin”); and forwarding to a first-class object. And we’ve talked all around two questions:
所以现在我们有三件事情：在混合模板; 与私人状态的方法（“私人密新”）的模板混合; 并转发到第一类对象。 我们已经谈过所有围绕着两个问题：

1. Is the mixed-in method being early-bound? Or late-bound?
2. When a method is invoked on a receiving object, is it evaluated in the receiver’s context? Or in the metaobject’s state’s context?
是混合式方法的早期绑定？ 或后期绑定？
当接收对象上调用一个方法，它是在接收器的上下文中计算？ 或在元对象的状态的情况下？

If we make a little table, each of those three things gets its own spot:
如果我们做一个小桌子，每个这样的三样东西都有自己现货：

|                      | Early-bound   | Late-bound
| -------------------- | ------------- | -----------
| Receiver’s context   | Mixin         | 
| Metaobject’s context | Private Mixin | Forwarding
     
      
       
So… What goes in the missing spot? What is late-bound, but evaluated in the receiver’s context?
所以...什么在缺少点去？ 什么是后期绑定的，但在接收器的上下文中计算？

### delegation
代表团

Let’s build it. Here’s our `forward` function, modified to evaluate method invocation in the receiver’s context:
让我们来构建它。 下面是我们forward的功能，修改，评估方法调用中的接收器的上下文：

    function delegate (receiver, methods, toProvider) {
      methods.forEach(function (methodName) {
        receiver[methodName] = function () {
          return toProvider[methodName].apply(receiver, arguments);
        };
      });
    
      return receiver;
    };

This new `delegate` function does exactly the same thing as the `forward` function, but the function that does the delegation looks like this:
这种新delegate函数做同样的事情作为forward的功能，但也不代表团的函数看起来像这样：

    function () {
      return toProvider[methodName].apply(receiver, arguments);
    }

It uses the receiver as the context instead of the provider. This has all the same coupling implications that our mixins have, of course. And it layers in additional indirection. The indirection gives us some late binding, allowing us to modify the metaobject’s methods after we have delegated behaviour from a receiver to it.
它使用的接收器作为上下文，而不是供应商。 这有所有相同的耦合影响，当然，我们的混入有。 它层额外的间接。 在间接给了我们一些后期绑定，让我们来修改元对象的方法后，我们已委托行为，从接收到它。

### delegation vs. forwarding
代表团与转发

Delegation and forwarding are both very similar. One metaphor that might help distinguish them is to think of receiving an email asking you to donate some money to a worthy charity.
代表团和转发都非常相似。 一个比喻，可以帮助区分他们是想收到一封电子邮件，要求你捐一些钱给慈善机构值得的。

* If you forward the email to a friend, and the friend donates money, the friend is donating their own money and getting their own tax receipt.
* If you *delegate* responding to your accountant, the accountant donates your money to the charity and you receive the tax receipt.
In both cases, the other entity does the work when you receive the email.
如果您将电子邮件转发给您的朋友，和朋友捐钱，朋友捐赠自己的钱，并让自己的税票。
如果您委派响应你的会计师，会计师捐赠你的钱给慈善机构，并且您收到税票。

## Later Binding
后来绑定

When comparing Mixins to Delegation (and comparing Private Mixins to Forwarding), we noted that the primary difference is that Mixins are early bound and Delegation is late bound. Let’s be specific. Given:
当比较混入到代表团（和比较私人混入到转发），我们注意到，主要区别在于混入被早期绑定和代表团是后期绑定。 让我们更具体。 鉴于：

    var counter = {};
    
    var Incrementor = {
      increment: function () {
        ++this._value;
        return this;
      },
      value: function (optionalValue) {
        if (optionalValue != null) {
          this._value = optionalValue;
        }
        return this._value;
      }
    };
    
    extend(counter, Incrementor);

We are mixing Incrementor into counter. At some point later, we encounter:
我们是混合Incrementor到counter 。 在一些点以后，我们遇到：

    counter.value(42);

What function handles the invocation of `.value`? because we mixed `Incrementor` into `counter`, it’s the same function as `Incrementor.counter`. We don’t look that up when `counter.value(42)` is evaluated, because that was bound to `counter.value` when we extended `counter`. This is early binding.
什么函数处理的调用.value ？ 因为我们混Incrementor到counter ，它是相同的功能Incrementor.counter 。 我们不看那个时counter.value(42)进行评估，因为这是必然要counter.value ，当我们扩展counter 。 这是早期绑定。

However, given:
然而，鉴于：

    var counter = {};
    
    delegate(counter, ['increment', 'value'], Incrementor);
    
    // ...time passes...
    
    counter.value(42);

We again are most likely invoking `Incrementor.value`, but now we are determining this *at the time `counter.value(42)` is evaluated*. We bound the target of the delegation, `Incrementor`, to `counter`, but we are going to look the actual property of `Incrementor.value` up when it is invoked. This is late binding, and it is useful in that we can make some changes to `Incrementor` after the delegation has been set up, perhaps to add some logging.
再次，我们最有可能调用Incrementor.value ，但现在我们的时间确定这个counter.value(42)进行评估 。 我们势必代表团的目标Incrementor ，以counter ，但我们要看看实际财产Incrementor.value了被调用时。 这是后期绑定的，我们可以做一些改变它的用处在于Incrementor后，代表团已经成立，可能添加一些记录。

It is very nice not to have to do things like this in a very specific order: When things have to be done in a specific order, they are coupled in time. Late binding is a decoupling technique.
这是非常好的不是必须做这样的事情在一个非常特定的顺序：当一切都必须以特定的顺序完成的，它们连接的时间 。 后期绑定是一个去耦技术。

### but wait, there’s more
别急，还有更精彩

But we can get even later than that. Although the specific function is late bound, the target of the delegation, `Incrementor`, is early bound. We can late bind that too! Here’s a variation on `delegate`:
但是，我们可以更晚比得到。 虽然具体的功能是后期绑定的，代表团的目标Incrementor ，是早期绑定。 我们可以后期绑定的呢！ 这里有一个变化delegate ：

    function delegateToOwn (receiver, methods, propertyName) {
      methods.forEach(function (methodName) {
        receiver[methodName] = function () {
          var toProvider = receiver[propertyName];
          return toProvider[methodName].apply(receiver, arguments);
        };
      });
    
      return receiver;
    };

This function sets things up so that an object can delegate to one of its own properties. Let’s take another look at the investor example. First, we’ll set up our portfolio to separate behaviour from properties with a standard mixin:
这个函数设置的东西了，这样的对象可以委托给它自己的属性之一。 让我们再看看投资者例子。 首先，我们将我们的产品组合设置为从性能与标准混入独立的行为：

    var HasInvestments = {
      addInvestment: function (investment) {
        this._investments.push(investment);
        return this;
      },
      netWorth: function () {
        return this._investments.reduce(
          function (acc, investment) {
            return acc + investment.value;
          },
          0
        );
      }
    };
    
    var portfolio = extend({_investments: []}, HasInvestments);

Next we’ll make that a property of our investor, and delegate to the property, not the object itself:
接下来，我们将让我们的投资者的财产，并委托给物业，而不是对象本身：

    var investor = {
      // ...
      nestEgg: portfolio
    }
    
    delegateToOwn(investor, ['addInvestment', 'netWorth'], 'nestEgg');

Our `investor` object delegates the `addInvestment` and `netWorth` methods to its own `nestEgg` property. So far, this is just like the `delegate` method above. But consider what happens if we decide to assign a new portfolio to our investor:
我们的investor对象代表的addInvestment和netWorth方法自身nestEgg财产。 到目前为止，这就像delegate上述方法。 但考虑如果我们决定到一个新的投资组合分配给我们的投资者会发生什么：

    var retirementPortfolio = {
      _investments: [
        {name: 'IRA fund', worth: '872,000'}
      ]
    }
    
    investor.nestEgg = retirementPortfolio;

The delegateToOwn `delegation` now delegates to the new portfolio, because it is bound to the property name, not to the original object. This seems questionable for portfolios–what happens to the old portfolio when you assign a new one?–but has tremendous application for modeling classes of behaviour that change dynamically.
该delegateToOwn代表团现在委托给新的投资组合，因为它绑定到的属性名称，而不是原来的对象。 这对组合会发生，什么老组合，当你分配一个新的似乎值得商榷？，但具有巨大的应用会动态地改变行为建模的类。

### state machines
状态机

A very common use case for this delegation is when building [finite state machines](https://en.wikipedia.org/wiki/Finite-state_machine). As described in the book [Understanding the Four Rules of Simple Design](https://leanpub.com/4rulesofsimpledesign) by Corey Haines, *you could* implement [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using if statements. Hand waving furiously over other parts of the system, you might get:
一个非常常见的用例这个代表团是建立在有限状态机 。 正如书中所描述了解简单设计的四个规则由科瑞海恩斯，你可以实现康威的生命游戏使用if语句。 手拼命挥舞在系统的其他部分，你可能会得到：

    var Universe = {
      // ...
      numberOfNeighbours: function (location) {
        // ...
      }
    };
    
    var thisGame = extend({}, Universe);
    
    var Cell = {
      alive: function () {
        return this._alive;
      },
      numberOfNeighbours: function () {
        return thisGame.numberOfNeighbours(this._location);
      },
      aliveInNextGeneration: function () {
        if (this.alive()) {
          return (this.numberOfNeighbours() === 3);
        }
        else {
          return (this.numberOfNeighbours() === 2 || this.numberOfNeighbours() === 3);
        }
      }
    };
    
    var someCell = extend({
      _alive: true,
      _location: {x: -15, y: 12}
    }, Cell);
    
One of the many insights from [Understanding the Four Rules of Simple Design](https://leanpub.com/4rulesofsimpledesign) is that this business of having an `if (alive())` in the middle of a method is a hint that cells are stateful.
一个来自许多真知灼见了解简单设计的四大规则是，有一个这样的业务if (alive())的方法的中间是一个暗示，细胞是有状态的。

We can extract this into a state machine using delegation to a property:
我们可以提取到一个状态机使用委托给物业这样的：

    var Alive = {
      alive: function () {
        return true;
      },
      aliveInNextGeneration: function () {
        return (this.numberOfNeighbours() === 3);
      }
    };
    
    var Dead = {
      alive: function () {
        return false;
      },
      aliveInNextGeneration: function () {
        return (this.numberOfNeighbours() === 2 || this.numberOfNeighbours() === 3);
      }
    };
    
    var FsmCell = {
      numberOfNeighbours: function () {
        return thisGame.numberOfNeighbours(this._location);
      }
    }
    
    delegateToOwn(Cell, ['alive', 'aliveInNextGeneration'], '_state');
    
    var someFsmCell = extend({
      _state: Alive,
      _location: {x: -15, y: 12}
    }, FsmCell);

`someFsmCell` delegates `alive` and `aliveInNextGeneration` to its `_state` property, and you can change its state with assignment:
someFsmCell代表alive和aliveInNextGeneration其_state属性，你可以改变它与分配状态：

    someFsmCell._state = Dead;

In practice, states would be assigned en masse, but this demonstrates one of the simplest possible state machines. In the wild, most business objects are state machines, sometimes with multiple, loosely coupled states. Employees can be:
在实践中，国家将被分配集体，但是这展示了最简单的状态机中的一个。 在野生环境中，大多数业务对象是国家机器，有时有多个，松耦合状态。 员工可以是：

* In or out of the office;
* On probation, on contract, or permanent;
* Part time or full time.
在或离开办公室;
试用期，在合同或永久性的;
兼职或全职。

Delegation to a property representing state takes advantage of late binding to break behaviour into smaller components that have cleanly defined responsibilities.
代表团表示状态的属性所采用后期绑定的优势，打破行为纳入已清晰地界定的责任更小的组件。

### late bound forwarding
后期绑定转发

The exact same technique can be used for forwarding to a property, and forwarding to a property can also be used for some kinds of state machines. Forwarding to a property has lower coupling than delegation, and is preferred where appropriate.
确切的相同的技术可用于转发到属性，并将其转发到一个属性也可用于某些类型的状态机。 转发到一个属性具有较低的耦合比代表团，并首选在适当情况下。

## Summary
总结
We’ve seen four techniques for separating object behaviour from object properties:
我们已经看到了四种技术进行分离对象的属性对象行为：

1. Mixins
2. Private Mixins
3. Forwarding
4. Delegation
混入
私人混入
转发
代表团

We’ve also seen how to implement “later binding” delegation by delegating or forwarding to an object property, and how this can be used for building a state machine. We’ve seen how these four techniques can be understood to implement two orthogonal ideas: Early versus late binding, and whether methods are evaluated in the receiver’s context or the metaobject’s context.
我们还看到了如何通过委派或转发到一个对象属性来实现“后绑定”代表团，以及如何可以用来建立一个状态机。 我们已经看到了这四种技术如何被理解为实现两个正交的想法：早期与后期绑定和方法是否在接收器的上下文或元对象的上下文中计算。

We deliberately haven’t discussed prototypes or the things you can build with prototypes (like classes). Instead, we take our understanding gleaned from these prototype-less techniques to help us understand what prototypes offer and what tradeoffs they make.
我们特意没有讨论或原型的东西，你可以用原型（如类）建设。 相反，我们把我们的认识从这些原型技术少收集，以帮助我们了解什么原型提供的，他们做什么的权衡。

(discuss on [hacker news](https://news.ycombinator.com/item?id=7566879) and [reddit](http://www.reddit.com/r/javascript/comments/22p3ex/mixins_forwarding_and_delegation_in_javascript/))
（上讨论黑客新闻和书签交易 ）

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