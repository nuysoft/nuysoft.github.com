---
layout: post
title: "编写高效的 JavaScript"
tagline: "Writing Fast, Memory-Efficient JavaScript"
description: ""
category: 
tags: [JavaScript, Optimization, Performance]
published: false
---
{% include JB/setup %}

> 原文：[2012/11/05 Writing Fast, Memory-Efficient JavaScript](http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/)

JavaScript engines such as Google’s [V8](http://code.google.com/p/v8/) (Chrome, Node) are specifically designed for the [fast execution](http://www.html5rocks.com/en/tutorials/speed/v8/) of large JavaScript applications. As you develop, if you care about memory usage and performance, you should be aware of some of what’s going on in your user’s browser’s JavaScript engine behind the scenes.

Whether it’s V8, [SpiderMonkey](https://developer.mozilla.org/en-US/docs/SpiderMonkey) (Firefox), [Carakan](http://my.opera.com/ODIN/blog/carakan-faq) (Opera), [Chakra](http://en.wikipedia.org/wiki/Chakra_(JScript_engine)) (IE) or something else, doing so can help you **better optimize your applications**. That’s not to say one should optimize for a single browser or engine. Never do that.

You should, however, ask yourself questions such as:
* Is there anything I could be doing more efficiently in my code?
* What (common) optimizations do popular JavaScript engines make?
* What is the engine unable to optimize for, and is the garbage collector able to clean up what I’m expecting it to?

[![](http://media.smashingmagazine.com/wp-content/uploads/2012/10/fast_memory.jpg)](http://dhybridcars.com/toyota-hybrid/2013-scion-fr-s-sexy-sport-car/media/2013-scion-fr-s-speed-gauge-img-8/)

_Fast-loading Web sites — like fast cars — require the use specialized tools. Image source: [dHybridcars](http://dhybridcars.com/toyota-hybrid/2013-scion-fr-s-sexy-sport-car/media/2013-scion-fr-s-speed-gauge-img-8/)._

There are many common pitfalls when it comes to writing memory-efficient and fast code, and in this article we’re going to explore some test-proven approaches for writing code that performs better.

## So, How Does JavaScript Work In V8?
While it’s possible to develop large-scale applications without a thorough understanding of JavaScript engines, any car owner will tell you they’ve looked under the hood at least once. As Chrome is my browser of choice, I’m going to talk a little about its JavaScript engine. V8 is made up of a few core pieces.

* **A base compiler**, which parses your JavaScript and generates native machine code before it is executed, rather than executing bytecode or simply interpreting it. This code is initially not highly optimized.
* V8 represents your objects in an **object model**. Objects are represented as associative arrays in JavaScript, but in V8 they are represented with [hidden classes](https://developers.google.com/v8/design), which are an internal type system for optimized lookups.
* The **runtime profiler** monitors the system being run and identifies “hot” functions (i.e. code that ends up spending a long time running).
* An **optimizing compiler** recompiles and optimizes the “hot” code identified by the runtime profiler, and performs optimizations such as inlining (i.e. replacing a function call site with the body of the callee).
* V8 supports **deoptimization**, meaning the optimizing compiler can bail out of code generated if it discovers that some of the assumptions it made about the optimized code were too optimistic.
* It has a **garbage collector**. Understanding how it works can be just as important as the optimized JavaScript.

## Garbage Collection
Garbage collection is a form of memory management. It’s where we have the notion of a collector which attempts to reclaim memory occupied by objects that are no longer being used. In a garbage-collected language such as JavaScript, objects that are still referenced by your application are not cleaned up.

Manually de-referencing objects is not necessary in most cases. By simply putting the variables where they need to be (ideally, as local as possible, i.e. inside the function where they are used versus an outer scope), things should just work.

[![Garbage Collection Attempts To Reclaim Memory](http://media.smashingmagazine.com/wp-content/uploads/2012/10/robot-cleaner.jpg)](http://www.flickr.com/photos/26817893@N05/2864644153/)

_Garbage collection attempts to reclaim memory. Image source: [Valtteri Mäki](http://www.flickr.com/photos/26817893@N05/2864644153/)._

It’s not possible to force garbage collection in JavaScript. You wouldn’t want to do this, because the garbage collection process is controlled by the runtime, and it generally knows best when things should be cleaned up.

### DE-REFERENCING MISCONCEPTIONS
In quite a few discussions online about reclaiming memory in JavaScript, the `delete` keyword is brought up, as although it was supposed to be used for just removing keys from a map, some developers think you can force de-referencing using it. Avoid using `delete` if you can. In the below example, `delete o.x` does a lot more harm than good behind the scenes, as it changes `o‘s` hidden class and makes it a generic slow object.

    var o = { x: 1 }; 
    delete o.x; // true 
    o.x; // undefined

That said, you are almost certain to find references to `delete` in many popular JavaScript libraries – it does have a purpose in the language. The main takeaway here is to avoid modifying the structure of hot objects at runtime. JavaScript engines can detect such “hot” objects and attempt to optimize them. This is easier if the object’s structure doesn’t heavily change over its lifetime and `delete` can trigger such changes.

There are also misconceptions about how `null` works. Setting an object reference to `null` doesn’t “null” the object. It sets the object reference to `null`. Using `o.x = null` is better than using `delete`, but it’s probably not even necessary.

    var o = { x: 1 }; 
    o = null;
    o; // null
    o.x // TypeError

If this reference was the last reference to the object, the object is then eligible for garbage collection. If the reference was not the last reference to the object, the object is reachable and will not be garbage collected.

Another important note to be aware of is that global variables are not cleaned up by the garbage collector during the life of your page. Regardless of how long the page is open, variables scoped to the JavaScript runtime global object will stick around.

    var myGlobalNamespace = {};

Globals are cleaned up when you refresh the page, navigate to a different page, close tabs or exit your browser. Function-scoped variables get cleaned up when a variable falls out of scope. When functions have exited and there aren’t any more references to it, the variable gets cleaned up.

### RULES OF THUMB
To give the garbage collector a chance to collect as many objects as possible as early as possible, **don’t hold on to objects you no longer need**. This mostly happens automatically; here are a few things to keep in mind.

* As mentioned earlier, a better alternative to manual de-referencing is to use variables with an appropriate scope. I.e. instead of a global variable that’s nulled out, just use a function-local variable that goes out of scope when it’s no longer needed. This means cleaner code with less to worry about.
* Ensure that you’re unbinding event listeners where they are no longer required, especially when the DOM objects they’re bound to are about to be removed
* If you’re using a data cache locally, make sure to clean that cache or use an aging mechanism to avoid large chunks of data being stored that you’re unlikely to reuse

### FUNCTIONS
Next, let’s look at functions. As we’ve already said, garbage collection works by reclaiming blocks of memory (objects) which are no longer reachable. To better illustrate this, here are some examples.

    function foo() {
        var bar = new LargeObject();
        bar.someCall();
    }

When `foo` returns, the object which `bar` points to is automatically available for garbage collection, because there is nothing left that has a reference to it.

Compare this to:

    function foo() {
        var bar = new LargeObject();
        bar.someCall();
        return bar;
    }

    // somewhere else
    var b = foo();

We now have a reference to the object which survives the call and persists until the caller assigns something else to `b` (or `b` goes out of scope).


### CLOSURES
When you see a function that returns an inner function, that inner function will have access to the outer scope even after the outer function is executed. This is basically a [closure](http://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/) — an expression which can work with variables set within a specific context. For example:

    function sum (x) {
        function sumIt(y) {
            return x + y;
        };
        return sumIt;
    }

    // Usage
    var sumA = sum(4);
    var sumB = sumA(3);
    console.log(sumB); // Returns 7

The function object created within the execution context of the call to `sum` can’t be garbage collected, as it’s referenced by a global variable and is still very much accessible. It can still be executed via `sumA(n)`.

Let’s look at another example. Here, can we access `largeStr`?

    var a = function () {
        var largeStr = new Array(1000000).join('x');
        return function () {
            return largeStr;
        };
    }();

Yes, we can, via `a()`, so it’s not collected. How about this one?

    var a = function () {
        var smallStr = 'x';
        var largeStr = new Array(1000000).join('x');
        return function (n) {
            return smallStr;
        };
    }();

We can’t access it anymore and it’s a candidate for garbage collection.

### TIMERS
One of the worst places to leak is in a loop, or in `setTimeout()`/`setInterval()`, but this is quite common.

Consider the following example.

    var myObj = {
        callMeMaybe: function () {
            var myRef = this;
            var val = setTimeout(function () { 
                console.log('Time is running out!'); 
                myRef.callMeMaybe();
            }, 1000);
        }
    };

If we then run:

    myObj.callMeMaybe();

to begin the timer, we can see every second “Time is running out!” If we then run:

    myObj = null;

The timer will still fire. `myObj` won’t be garbage collected as the closure passed to `setTimeout` has to be kept alive in order to be executed. In turn, it holds references to `myObj` as it captures `myRef`. This would be the same if we’d passed the closure to any other function, keeping references to it.

It is also worth keeping in mind that references inside a `setTimeout`/`setInterval` call, such as functions, will need to execute and complete before they can be garbage collected.

## Be Aware Of Performance Traps
It’s important never to optimize code until you actually need to. This can’t be stressed enough. It’s easy to see a number of micro-benchmarks showing that N is more optimal than M in V8, but test it in a real module of code or in an actual application, and **the true impact of those optimizations may be much more minimal** than you were expecting.

[![Speed](http://media.smashingmagazine.com/wp-content/uploads/2012/10/speed-trap.jpg)](http://www.flickr.com/photos/tim_uk/7717078488/sizes/c/in/photostream/)

_Doing too much can be as harmful as not doing anything. Image source: [Tim Sheerman-Chase](http://www.flickr.com/photos/tim_uk/7717078488/sizes/c/in/photostream/)._

Let’s say we want to create a module which:

* Takes a local source of data containing items with a numeric ID,
* Draws a table containing this data,
* Adds event handlers for toggling a class when a user clicks on any cell.

There are a few different factors to this problem, even though it’s quite straightforward to solve. How do we store the data? How do we efficiently draw the table and append it to the DOM? How do we handle events on this table optimally?

A first (naive) take on this problem might be to store each piece of available data in an object which we group into an array. One might use jQuery to iterate through the data and draw the table, then append it to the DOM. Finally, one might use event binding for adding the click behavior we desire.

**Note: This is NOT what you should be doing**

    var moduleA = function () {

        return {

            data: dataArrayObject,

            init: function () {
                this.addTable();
                this.addEvents();
            },

            addTable: function () {

                for (var i = 0; i < rows; i++) {
                    $tr = $('<tr></tr>');
                    for (var j = 0; j < this.data.length; j++) {
                        $tr.append('<td>' + this.data[j]['id'] + '</td>');
                    }
                    $tr.appendTo($tbody);
                }

            },
            addEvents: function () {
                $('table td').on('click', function () {
                    $(this).toggleClass('active');
                });
            }

        };
    }();

Simple, but it gets the job done.

In this case however, the only data we’re iterating are IDs, a numeric property which could be more simply represented in a standard array. Interestingly, directly using `DocumentFragment` and native DOM methods are more optimal than using jQuery (in this manner) for our table generation, and of course, event delegation is typically more performant than binding each `td` individually.

Note that jQuery does use `DocumentFragment` internally behind the scenes, but in our example, the code is calling `append()` within a loop and each of these calls has little knowledge of the other so it may not be able to optimize for this example. This should hopefully not be a pain point, but be sure to benchmark your own code to be sure.

In our case, adding in these changes results in some good (expected) performance gains. Event delegation provides decent improvement over simply binding, and [opting for](http://jsperf.com/first-pass) `documentFragment` was a real booster.

    var moduleD = function () {

        return {

            data: dataArray,

            init: function () {
                this.addTable();
                this.addEvents();
            },
            addTable: function () {
                var td, tr;
                var frag = document.createDocumentFragment();
                var frag2 = document.createDocumentFragment();

                for (var i = 0; i < rows; i++) {
                    tr = document.createElement('tr');
                    for (var j = 0; j < this.data.length; j++) {
                        td = document.createElement('td');
                        td.appendChild(document.createTextNode(this.data[j]));

                        frag2.appendChild(td);
                    }
                    tr.appendChild(frag2);
                    frag.appendChild(tr);
                }
                tbody.appendChild(frag);
            },
            addEvents: function () {
                $('table').on('click', 'td', function () {
                    $(this).toggleClass('active');
                });
            }

        };

    }();

We might then look to other ways of improving performance. You may have read somewhere that using the prototypal pattern is more optimal than the module pattern (we confirmed it wasn’t earlier), or heard that using JavaScript templating frameworks are highly optimized. Sometimes they are, but use them because they make for readable code. Also, precompile!. Let’s test and find out how true this hold in practice.

    moduleG = function () {};
    
    moduleG.prototype.data = dataArray;
    moduleG.prototype.init = function () {
        this.addTable();
        this.addEvents();
    };
    moduleG.prototype.addTable = function () {
        var template = _.template($('#template').text());
        var html = template({'data' : this.data});
        $tbody.append(html);
    };
    moduleG.prototype.addEvents = function () {
       $('table').on('click', 'td', function () {
           $(this).toggleClass('active');
       });
    };

    var modG = new moduleG();

As it turns out, in this case the performance benefits are negligible. [Opting for templating and prototypes](http://jsperf.com/second-pass) didn’t really offer anything more than what we had before. That said, performance isn’t really the reason modern developers use either of these things — it’s the readability, inheritance model and maintainability they bring to your codebase.

More complex problems include [efficiently drawing images using canvas](http://jsperf.com/canvas-drawimage-vs-webgl-drawarrays/6) and [manipulating pixel data](http://jsperf.com/canvas-pixel-manipulation/30) with or without [typed arrays](http://jsperf.com/typed-arrays-for-pixel-manipulation)


## V8 Optimization Tips
Whilst detailing every V8 optimization is outside the scope of this article, there are certainly many tips worth noting. Keep these in mind and you’ll reduce your chances of writing unperformant code.

* Certain patterns will cause V8 to bail out of optimizations. A try-catch, for example, will cause such a bailout. For more information on what functions can and can’t be optimized, you can use `--trace-opt file.js` with the d8 shell utility that comes with V8.
* If you care about speed, try very hard to keep your functions monomorphic, i.e. make sure that variables (including properties, arrays and function parameters) only ever contain objects with the same hidden class. For example, don’t do this:

        function add(x, y) { 
           return x+y;
        } 

        add(1, 2); 
        add('a','b'); 
        add(my_custom_object, undefined);

* Don’t load from uninitialized or deleted elements. This won’t make a difference in output, but it will make things slower.
* Don’t write enormous functions, as they are more difficult to optimize

For more tips, watch Daniel Clifford’s Google I/O talk [Breaking the JavaScript Speed Limit with V8](http://www.youtube.com/watch?v=UJPdhx5zTaw) as it covers these topics well. [Optimizing For V8 — A Series](http://floitsch.blogspot.co.uk/2012/03/optimizing-for-v8-introduction.html) is also worth a read.

### OBJECTS VS. ARRAYS: WHICH SHOULD I USE?
* If you want to store a bunch of numbers, or a list of objects of the same type, use an array.
* If what you semantically need is an object with a bunch of properties (of varying types), use an object with properties. That’s pretty efficient in terms of memory, and it’s also pretty fast.
* Integer-indexed elements, regardless of whether they’re stored in an array or an object, are [much faster to iterate over than object properties](http://jsperf.com/performance-of-array-vs-object/3).
* Properties on objects are quite complex: they can be created with setters, and with differing enumerability and writability. Items in arrays aren’t able to be customized as heavily — they either exist or they don’t. At an engine level, this allows for more optimization in terms of organizing the memory representing the structure. This is particularly beneficial when the array contains numbers. For example, when you need vectors, don’t define a class with properties x, y, z; use an array instead..

There’s really only one major difference between objects and arrays in JavaScript, and that’s the arrays’ magic `length` property. If you’re keeping track of this property yourself, objects in V8 should be just as fast as arrays.

### TIPS WHEN USING OBJECTS
* Create objects using a constructor function. This ensures that all objects created with it have the same hidden class and helps avoid changing these classes. As an added benefit, it’s also [slightly faster than](http://jsperf.com/object-create-vs-constructor-vs-object-literal/7) `Object.create()`
* There are no restrictions on the number of different object types you can use in your application or on their complexity (within reason: long prototype chains tend to hurt, and objects with only a handful of properties get a special representation that’s a bit faster than bigger objects). For “hot” objects, try to keep the prototype chains short and the field count low.

**Object Cloning**

Object cloning is a common problem for app developers. While it’s possible to benchmark how well various implementations work with this type of problem in V8, be very careful when copying anything. Copying big things is generally slow — don’t do it. for..in loops in JavaScript are particularly bad for this, as they have a devilish specification and will likely never be fast in any engine for arbitrary objects.

When you absolutely do need to copy objects in a performance-critical code path (and you can’t get out of this situation), use an array or a custom “copy constructor” function which copies each property explicitly. This is probably the fastest way to do it:

    function clone(original) {
      this.foo = original.foo;
      this.bar = original.bar;
    }
    var copy = new clone(original);

**Cached Functions in the Module Pattern**
Caching your functions when using the module pattern can lead to performance improvements. See below for an example where the variation you’re probably used to seeing is slower as it forces new copies of the member functions to be created all the time.

![Performance Improvements When Using The Module And Prototypal Patterns](http://media.smashingmagazine.com/wp-content/uploads/2012/11/Screen-Shot-2012-11-06-at-10.42.10.png)

_Performance improvements when using the module or prototypal patterns._

Here is a [test of prototype versus module pattern performance](http://jsperf.com/prototypal-performance/12)

    // Prototypal pattern
    Klass1 = function () {}
    Klass1.prototype.foo = function () {
      log('foo');
    }
    Klass1.prototype.bar = function () {
      log('bar');
    }

    // Module pattern
    Klass2 = function () {
      var foo = function () {
          log('foo');
      },
      bar = function () {
          log('bar');
      };

      return {
          foo: foo,
          bar: bar
      }
    }


    // Module pattern with cached functions
    var FooFunction = function () {
      log('foo');
    };
    var BarFunction = function () {
      log('bar');
    };

    Klass3 = function () {
      return {
          foo: FooFunction,
          bar: BarFunction
      }
    }


    // Iteration tests

    // Prototypal
    var i = 1000,
      objs = [];
    while (i--) {
      var o = new Klass1()
      objs.push(new Klass1());
      o.bar;
      o.foo;
    }

    // Module pattern
    var i = 1000,
      objs = [];
    while (i--) {
      var o = Klass2()
      objs.push(Klass2());
      o.bar;
      o.foo;
    }

    // Module pattern with cached functions
    var i = 1000,
      objs = [];
    while (i--) {
      var o = Klass3()
      objs.push(Klass3());
      o.bar;
      o.foo;
    }
    // See the test for full details

**Note: **If you don’t require a class, avoid the trouble of creating one. Here’s an example of how to gain performance boosts by remoxing the class overhead altogether <http://jsperf.com/prototypal-performance/54>.

### TIPS WHEN USING ARRAYS
Next let’s look at a few tips for arrays. In general, **don’t delete array elements**. It would make the array transition to a slower internal representation. When the key set becomes sparse, V8 will eventually switch elements to dictionary mode, which is even slower.

**Array Literals**

Array literals are useful because they give a hint to the VM about the size and type of the array. They’re typically good for small to medium sized arrays.

    // Here V8 can see that you want a 4-element array containing numbers:
    var a = [1, 2, 3, 4];

    // Don't do this:
    a = []; // Here V8 knows nothing about the array
    for(var i = 1; i <= 4; i++) {
         a.push(i);
    }

**Storage of Single Types Vs. Mixed Types**

It’s never a good idea to mix values of different types (e.g. numbers, strings, undefined or true/false) in the same array (i.e. `var arr = [1, “1”, undefined, true, “true”]`)

[Test of type inference performance](http://jsperf.com/type-inference-performance/2)

As we can see from the results, the array of `ints` is the fastest.

**Sparse Arrays vs. Full Arrays**
When you use sparse arrays, be aware that accessing elements in them is much slower than in full arrays. That’s because V8 doesn’t allocate a flat backing store for the elements if only a few of them are used. Instead, it manages them in a dictionary, which saves space, but costs time on access.

[Test of sparse arrays versus full arrays](http://jsperf.com/sparse-arrays-vs-full-arrays).

The full array `sum` and `sum` of all elements on an array without zeros were actually the fastest. Whether the full array contains zeroes or not should not make a difference.

**Packed Vs. Holey Arrays**
Avoid “holes” in an array (created by deleting elements or `a[x] = foo` with `x > a.length`). Even if only a single element is deleted from an otherwise “full” array, things will be much slower.

[Test of packed versus holey arrays](http://jsperf.com/packed-vs-holey-arrays).

**Pre-allocating Arrays Vs. Growing As You Go**
Don’t pre-allocate large arrays (i.e. greater than 64K elements) to their maximum size, instead grow as you go. Before we get to the performance tests for this tip, keep in mind that this is specific to only some JavaScript engines.

![Empty Literal VS. Pre-Allocated Array In Various Browsers](http://media.smashingmagazine.com/wp-content/uploads/2012/10/graph2.jpg)

_Test of empty literal versus pre-allocated array in various browsers._

Nitro (Safari) actually treats pre-allocated arrays more favorably. However, in other engines (V8, SpiderMonkey), not pre-allocating is more efficient.

[Test of pre-allocated arrays](http://jsperf.com/pre-allocated-arrays).

    // Empty array
    var arr = [];
    for (var i = 0; i < 1000000; i++) {
        arr[i] = i;
    }

    // Pre-allocated array
    var arr = new Array(1000000);
    for (var i = 0; i < 1000000; i++) {
        arr[i] = i;
    }

## Optimizing Your Application
In the world of Web applications, **speed is everything**. No user wants a spreadsheet application to take seconds to sum up an entire column or a summary of their messages to take a minute before it’s ready. This is why squeezing every drop of extra performance you can out of code can sometimes be critical.

[![Old Phone On iPad Screen](http://media.smashingmagazine.com/wp-content/uploads/2012/10/improving-apps.jpg)](http://www.flickr.com/photos/perolofforsberg/6691744587/in/photostream/)

_Image source: [Per Olof Forsberg](http://www.flickr.com/photos/perolofforsberg/6691744587/in/photostream/)._

While understanding and improving your application performance is useful, it can also be difficult. We recommend the following steps to fix performance pain points:

* Measure it: Find the slow spots in your application (~45%)
* Understand it: Find out what the actual problem is (~45%)
* Fix it! (~10%)

Some of the tools and techniques recommended below can assist with this process.

### BENCHMARKING
There are many ways to run benchmarks on JavaScript snippets to test their performance — the general assumption being that benchmarking is simply comparing two timestamps. One such pattern was pointed out by the [jsPerf](http://jsperf.com/) team, and happens to be used in [SunSpider](http://www.webkit.org/perf/sunspider/sunspider.html)‘s and [Kraken](http://krakenbenchmark.mozilla.org/)‘s benchmark suites:

    var totalTime,
        start = new Date,
        iterations = 1000;
    while (iterations--) {
      // Code snippet goes here
    }
    // totalTime → the number of milliseconds taken 
    // to execute the code snippet 1000 times
    totalTime = new Date - start;

Here, the code to be tested is placed within a loop and run a set number of times (e.g. six). After this, the start date is subtracted from the end date to find the time taken to perform the operations in the loop.

However, this oversimplifies how benchmarking should be done, especially if you want to run the benchmarks in multiple browsers and environments. Garbage collection itself can have an impact on your results. Even if you’re using a solution like `window.performance`, you still have to account for these pitfalls.

Regardless of whether you are simply running benchmarks against parts of your code, writing a test suite or coding a benchmarking library, there’s a lot more to JavaScript benchmarking than you might think. For a more detailed guide to benchmarking, I highly recommend reading [JavaScript Benchmarking](http://mathiasbynens.be/notes/javascript-benchmarking) by Mathias Bynens and John-David Dalton.

### PROFILING