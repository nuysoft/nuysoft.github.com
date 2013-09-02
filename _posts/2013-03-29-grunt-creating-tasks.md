---
layout: post
title: "创建任务"
tagline: "Creating Tasks"
description: "每次运行 Grunt 时，你可以指定一个或多个任务来运行，任务告诉了 Grunt 你想要它做的事情。"
category-substitution: 翻译
group: Grunt
tags: [翻译, Grunt, JavaScript, Web]

short: "创建任务"
pgroup: Grunt
---
{% include JB/setup %}

> 原文：<https://github.com/gruntjs/grunt/wiki/Creating-tasks>

<!-- Tasks are grunt's bread and butter. The stuff you do most often, like `jshint` or `nodeunit`. Every time Grunt is run, you specify one or more tasks to run, which tells Grunt what you'd like it to do. -->

任务是 Grunt 的面包和奶油。是你最常用的，例如 `jshint` 或 `nodeunit`。每次运行 Grunt 时，你可以指定一个或多个任务来运行，任务告诉了 Grunt 你想要它做的事情。

> 译注：bread and butter 基本生活资料，生计

<!-- If you don't specify a task, but a task named "default" has been defined, that task will run (unsurprisingly) by default. -->

如果没有指定一个任务，但是已经定义了一个命名为“default”的任务，该任务将默认运行。

<!-- ## Alias Tasks -->

## 别名任务

<!-- If a task list is specified, the new task will be an alias for one or more other tasks. Whenever this "alias task" is run, every specified tasks in `taskList` will be run, in the order specified. The `taskList` argument must be an array of tasks. -->
如果指定了一个任务列表，新的任务将是其他一个或多个任务的别名。每当运行这个“别名任务”，在 `taskList` 中指定的每个任务将被执行，并按照指定的属性。参数 `taskList` 必须是一个任务数组。

    grunt.registerTask(taskName, [description, ] taskList)

<!-- This example alias task defines a "default" task whereby the "jshint", "qunit", "concat" and "uglify" tasks are run automatically if Grunt is executed without specifying any tasks: -->
示例的别名任务定义了一个“default”任务，如果执行 Grunt 时没有指定任何任务，其中的“jshint”、“qunit”、“concat”和“uglify”任务被自动运行。

    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

<!-- Task arguments can be specified as well. In this example, the alias "dist" runs both the "concat" and "min" tasks, each with a "dist" argument: -->
也可以为任务指定参数。在这个例子中，别名任务“dist”同时运行任务”concat“和”min“，并且各自带一个参数“dist”。

    grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);

<!-- ## Multi Tasks -->
## 多任务

<!-- When a multi task is run, Grunt looks for a property of the same name in the Grunt configuration. Multi-tasks can have multiple configurations, defined using arbitrarily named "targets." -->
当运行一个多任务时，Grunt 在配置中查找同名的属性。多任务可以有多个配置，通过任意命名的“targets”。

> 译注：Multi Tasks 理解为可以含有多个 Target 的 Task。

<!-- Specifying both a task and target like `grunt concat:foo` or `grunt concat:bar` will process just the specified target's configuration, while running `grunt concat` will iterate over _all_ targets, processing each in turn.  Note that if a task has been renamed with [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask), Grunt will look for a property with the _new_ task name in the config object. -->
同时指定一个任务和目标将只处理指定目标的配置，例如 `grunt concat:foo` 或 `grunt concat:bar`，而运行 `grunt concat` 将遍历_所有_目标，顺序处理每个目标。请注意，如果一个任务已经通过 [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) 重命名，Grunt 将在配置对象查找_新_任务名对应的属性。

<!-- Most of the contrib tasks, including the [grunt-contrib-jshint plugin jshint task](https://github.com/gruntjs/grunt-contrib-jshint), [concat task](https://github.com/gruntjs/grunt-contrib-concat) and [grunt-contrib-concat plugin concat task](https://github.com/gruntjs/grunt-contrib-concat) are multi tasks. -->
大部分扩展任务是多任务的，包括 [grunt-contrib-jshint plugin jshint task](https://github.com/gruntjs/grunt-contrib-jshint)、[concat task](https://github.com/gruntjs/grunt-contrib-concat) 和 [grunt-contrib-concat plugin concat task](https://github.com/gruntjs/grunt-contrib-concat)。

    grunt.registerMultiTask(taskName, [description, ] taskFunction)

<!-- Given the specified configuration, this example multi task would log `foo: 1,2,3` if Grunt was run via `grunt log:foo`, or it would log `bar: hello world` if Grunt was run via `grunt log:bar`. If Grunt was run as `grunt log` however, it would log `foo: 1,2,3` then `bar: hello world` then `baz: false`. -->
下面的多任务示例被指定了配置，如果运行 `grunt log:foo` 将打印 `foo: 1,2,3`，或者如果运行 `gurnt log:bar` 将打印 `bar: hello world`。但是如果运行 `grunt log` 将顺序打印 `foo: 1,2,3`、`bar: hello world`、`baz: false`。

    grunt.initConfig({
      log: {
        foo: [1, 2, 3],
        bar: 'hello world',
        baz: false
      }
    });
    //
    grunt.registerMultiTask('log', 'Log stuff.', function() {
      grunt.log.writeln(this.target + ': ' + this.data);
    });


<!-- ## "Basic" Tasks -->
## “基本”任务

<!-- When a basic task is run, Grunt doesn't look at the configuration or environment—it just runs the specified task function, passing any specified colon-separated arguments in as function arguments. -->
当一项基本任务运行时，Grunt 仅仅是运行指定的任务函数，不会查找配置或环境，传入任意冒号分割的参数作为函数参数。

    grunt.registerTask(taskName, [description, ] taskFunction)

<!-- This example task logs `foo, testing 123` if Grunt is run via `grunt foo:testing:123`. If the task is run without arguments as `grunt foo` the task logs `foo, no args`. -->
在这个例子中，如果运行 `grunt foo:testing:123` 将打印 `foo, testing 123`。如果不带参数运行 `grunt foo` 将打印 `foo, no args`。

    grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
      if (arguments.length === 0) {
        grunt.log.writeln(this.name + ", no args");
      } else {
        grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
      }
    });

<!-- ## Custom tasks -->
## 自定义任务

<!-- You can go crazy with tasks. If your tasks don't follow the "multi task" structure, use a custom task. -->
你可能会着迷于任务。如果你的任务不遵循“多任务”结构，使用一个自定义任务。


    grunt.registerTask('default', 'My "default" task description.', function() {
      grunt.log.writeln('Currently running the "default" task.');
    });

<!-- Inside a task, you can run other tasks. -->
在一个任务中，你可以运行其他任务。

    grunt.registerTask('foo', 'My "foo" task.', function() {
      // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
      grunt.task.run('bar', 'baz');
      // Or:
      grunt.task.run(['bar', 'baz']);
    });

<!-- Tasks can be asynchronous. -->
任务可能是异步的。

    grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
      // Force task into async mode and grab a handle to the "done" function.
      var done = this.async();
      // Run some sync stuff.
      grunt.log.writeln('Processing task...');
      // And some async stuff.
      setTimeout(function() {
        grunt.log.writeln('All done!');
        done();
      }, 1000);
    });

<!-- Tasks can access their own name and arguments. -->
任务可以访问它们自己的名称和参数。

    grunt.registerTask('foo', 'My "foo" task.', function(a, b) {
      grunt.log.writeln(this.name, a, b);
    });

    // Usage:
    // grunt foo foo:bar
    //   logs: "foo", undefined, undefined
    //   logs: "foo", "bar", undefined
    // grunt foo:bar:baz
    //   logs: "foo", "bar", "baz"

<!-- Tasks can fail if any errors were logged. -->
如果打印了任何错误，任务可能会失败。

    grunt.registerTask('foo', 'My "foo" task.', function() {
      if (failureOfSomeKind) {
        grunt.log.error('This is an error message.');
      }
      //
      // Fail by returning false if this task had errors
      if (ifErrors) { return false; }
      //
      grunt.log.writeln('This is the success message');
    });

<!-- When tasks fail, all subsequent tasks will be aborted unless `--force` was specified. -->
当任务失败时，所有后续任务将被终止，除非指定了 `--force`。

    grunt.registerTask('foo', 'My "foo" task.', function() {
      // Fail synchronously.
      return false;
    });
    // 
    grunt.registerTask('bar', 'My "bar" task.', function() {
      var done = this.async();
      setTimeout(function() {
        // Fail asynchronously.
        done(false);
      }, 1000);
    });

<!-- Tasks can be dependent on the successful execution of other tasks. Note that `grunt.task.requires` won't actually RUN the other task(s). It'll just check to see that it has run and not failed. -->
任务可以依赖于其他任务的成功执行。需要注意的是，`grunt.task.requires` 实际上不会执行其他任务。它会仅仅检查其他任务是否已运行，并且没有失败。

    grunt.registerTask('foo', 'My "foo" task.', function() {
      return false;
    });
    
    grunt.registerTask('bar', 'My "bar" task.', function() {
      // Fail task if "foo" task failed or never ran.
      grunt.task.requires('foo');
      // This code executes if the "foo" task ran successfully.
      grunt.log.writeln('Hello, world.');
    });
    
    // Usage:
    // grunt foo bar
    //   doesn't log, because foo failed.
    // grunt bar
    //   doesn't log, because foo never ran.

<!-- Tasks can fail if required configuration properties don't exist. -->

如果需要的配置属性不存在，任务可能失败。

    grunt.registerTask('foo', 'My "foo" task.', function() {
      // Fail task if "meta.name" config prop is missing.
      grunt.config.requires('meta.name');
      // Also fails if "meta.name" config prop is missing.
      grunt.config.requires(['meta', 'name']);
      // Log... conditionally.
      grunt.log.writeln('This will only log if meta.name is defined in the config.');
    });

<!-- Tasks can access configuration properties. -->

任务可以访问配置属性。

    grunt.registerTask('foo', 'My "foo" task.', function() {
      // Log the property value. Returns null if the property is undefined.
      grunt.log.writeln('The meta.name property is: ' + grunt.config('meta.name'));
      // Also logs the property value. Returns null if the property is undefined.
      grunt.log.writeln('The meta.name property is: ' + grunt.config(['meta', 'name']));
    });

<!-- Take a look at the [contrib tasks](https://github.com/gruntjs/) for more examples. -->
更多例子请查看[官方扩展任务](https://github.com/gruntjs/)。

<!-- ## CLI options / environment -->
## CLI 选项/环境

_TODO_
(pull from FAQ, recommend process.env)

<!-- ## Why doesn't my asynchronous task complete? -->
## 为什么我的异步任务不完成？
<!-- Chances are this is happening because you have forgotten to call the [this.async](grunt.task#wiki-this-async) method to tell Grunt that your task is asynchronous. For simplicity's sake, Grunt uses a synchronous coding style, which can be switched to asynchronous by calling `this.async()` within the task body. -->
可能会发生这种情况，因为你忘记了调用方法 [this.async] 来告诉 Grunt 你的任务是异步的。为了简单起见，Grunt 使用一种同步编码风格，通过在任务体中调用 `this.async` 切换到异步。

[this.async]: http://gruntjs.com/grunt.task#wiki-this-async

<!-- Note that passing `false` to the `done()` function tells Grunt that the task has failed. -->
需要注意的是，通过为函数 `done()` 传入 `false` 来告诉 Grunt 任意已经失败。

<!-- For example: -->
例如：

    grunt.registerTask('asyncme', 'My asynchronous task.', function() {
      var done = this.async();
      doSomethingAsync(done);
    });


