---
layout: post
title: "配置任务"
tagline: "Configuring Tasks"
description: "介绍如何在项目中使用文件 Gruntfile 配置任务。"
category-substitution: 翻译
group: Grunt
tags: [Grunt, JavaScript, Web]

short: "配置任务"
pgroup: Grunt
---
{% include JB/setup %}

> 原文：<https://github.com/gruntjs/grunt/wiki/Configuring-tasks>

<!-- # Configuring Tasks -->

<!-- This guide explains how to configure tasks for your project using a Gruntfile.  If you don't know what a Gruntfile is, please read the [[Getting Started]] guide and check out a [[Sample Gruntfile]]. -->

本指南介绍了如何在项目中使用文件 Gruntfile 配置任务。如果你不知道 Gruntfile 是什么，请阅读 [Grunt 入门]指南，并查看 [Gruntfile 示例]。

[Grunt 入门]: http://gruntjs.com/getting-started/
[Gruntfile 示例]: http://gruntjs.com/sample-gruntfile/

<!-- ## Grunt Configuration -->

## Grunt 配置

<!-- Task configuration is specified in your Gruntfile via the `grunt.initConfig` method. This configuration will mostly be under task-named properties, but may contain any arbitrary data. As long as properties don't conflict with properties your tasks require, they will be otherwise ignored. -->
任务配置通过 Gruntfile 中的 `grunt.initConfig` 指定。配置通常挂在以任务命名的属性上，但是可以包含任意数据。只要这些属性与任务需要的属性不冲突，否则会被忽略。

<!-- Also, because this is JavaScript, you're not limited to JSON; you may use any valid JavaScript here. You may even programmatically generate the configuration if necessary. -->
另外，因为是在 javaScript 文件中，就不局限于 JSON；你可以使用任何有效的 JavaScript。如有必要，你设置可以以编程的方法生成配置。

    grunt.initConfig({
      concat: {
        // concat task configuration goes here.
      },
      uglify: {
        // uglify task configuration goes here.
      },
      // Arbitrary non-task-specific properties.
      my_property: 'whatever',
      my_src_files: ['foo/*.js', 'bar/*.js'],
    });

<!-- ## Task Configuration and Targets -->

## 任务配置和目标

> Task 和 Target 似乎没必要翻译

<!-- When a task is run, Grunt looks for its configuration under a property of the same name. Multi-tasks can have multiple configurations, defined using arbitrarily named "targets." In the example below, the `concat` task has `foo` and `bar` targets, while the `uglify` task only has a `bar` target. -->

当一个任务运行时，Grunt 在同名属性下查找该任务的配置。多个任务可以有多个配置，定义在任意命名的 "targets" 中。在下面的例子中，任务 `concat` 含有 `foo` 和 `bar` 两个目标，而任务 `uglify` 只有一个目标 `bar`。

    grunt.initConfig({
      concat: {
        foo: {
          // concat task "foo" target options and files go here.
        },
        bar: {
          // concat task "bar" target options and files go here.
        },
      },
      uglify: {
        bar: {
          // uglify task "bar" target options and files go here.
        },
      },
    });

<!-- Specifying both a task and target like `grunt concat:foo` or `grunt concat:bar` will process just the specified target's configuration, while running `grunt concat` will iterate over _all_ targets, processing each in turn.  Note that if a task has been renamed with [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask), Grunt will look for a property with the _new_ task name in the config object. -->

同时指定一个任务和目标，例如 `grunt concat:foo` 或 `grunt concat:bar` 将只处理指定目标的配置，而运行 `grunt concat` 则会遍历_所有_的目标，顺序处理。注意，如果一个任务已经通过 [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) 重命名，Grunt 将在配置对象中查找以_新_任务名命名的属性。

<!-- ## Options -->

## 选项

<!-- Inside a task configuration, an `options` property may be specified to override built-in defaults.  In addition, each target may have an `options` property which is specific to that target.  Target-level options will override task-level options. -->

在一个任务配置中，可以指定属性 `options` 来覆盖内置的默认子。此外，每个目标可以含有一个特定该目标的 `options` 属性。Target 级别的选项将覆盖任务界别的选项。

<!-- The `options` object is optional and may be omitted if not needed. -->

对象 `options` 时可选的，如果不需要的话还可以省略它。

    grunt.initConfig({
      concat: {
        options: {
          // Task-level options may go here, overriding task defaults.
        },
        foo: {
          options: {
            // "foo" target options may go here, overriding task-level options.
          },
        },
        bar: {
          // No options specified; this target will use task-level options.
        },
      },
    });

<!-- ## Files -->

## 文件集合

<!-- Because most tasks perform file operations, Grunt has powerful abstractions for declaring on which files the task should operate. There are several ways to define **src-dest** (source-destination) file mappings, offering varying degrees of verbosity and control. Any multi task will understand all the following formats, so choose whichever format best meets your needs. -->

因为大部分任务执行的是文件操作，Grunt 拥有强大的抽象，用于声明任务应该操作哪些文件。有几种方式来定义 **src-dest** (源-目标) 文件映射，提供了不同程度的冗余和控制。任何任务都会明白以下所有格式，所以选择最能满足你的需求的格式。

<!-- All files formats support `src` and `dest` but the "Compact" and "Files Array" formats support a few additional properties: -->

所有文件都支持 `src` 和 `dest`，但是“紧凑型”和“文件数组”格式支持一些额外的属性：

<!-- * `filter` Either a valid [fs.Stats method name](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) or a function that is passed the matched `src` filepath and returns `true` or `false`.
* `nonull` When a match is not found, return a list containing the pattern itself. Otherwise, an empty list is returned if there are no matches. Combined with grunt's `--verbose` flag, this option can help debug file path issues.
* `dot` Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period in that spot.
* `matchBase` If set, patterns without slashes will be matched against the basename of the path if it contains slashes. For example, a?b would match the path `/xyz/123/acb`, but not `/xyz/acb/123`.
* `expand` Process a dynamic src-dest file mapping, see "Building the files object dynamically" for more information.
* Other properties will be passed into the underlying libs as matching options. See the [node-glob][] and [minimatch][] documentation for more options. -->

* `filter` 可以是一个有效的 [fs.Stats 方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)，也可以是一个函数，接受匹配的文件路径 `src`，并返回 `true` 或 `false`。
* `nonull` 当没有找到任何匹配文件时，返回含有通配符的列表。否则，如果没有任何匹配文件，则返回一个空列表。结合 Grunt `--verbose` 标记，该选项可以帮助调试文件路径问题。
* `dot` 允许通配符匹配以一段字符开头的文件名，即使是通配符没有明确指定那段字符的位置。
* `matchBase` 如果设置了属性，不含斜杠的模式将不配路径名，如果该路径还有斜杠。例如，模式 a?b 将匹配路径 `/xyz/123/acb`，但是不匹配 `/xyz/acb/123`。
* `expand` 处理一个动态的源文件-目标文件的映射，更多信息请查看“动态构建文件集合对象”。
* 其他属性会被作为匹配选项传递到底层库。更多选项查看文档 [node-glob][] 和 [minimatch][]。


<!-- ### Compact Format -->

### 紧凑型格式

<!-- This form allows a single **src-dest** (source-destination) file mapping per-target. It is most commonly used for read-only tasks, like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint), where a single `src` property is needed, and no `dest` key is relevant. This format also supports additional properties per src-dest file mapping. -->

该格式允许为每个目标设置一个单独的 **src-dest**（源-目标）文件映射。经常用于只读任务，例如 [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)，只需要一个单一的 `src` 属性，没有相关的 `dest` 属性。该格式还支持为每个 src-dest 文件映射附加额外属性。

    grunt.initConfig({
      jshint: {
        foo: {
          src: ['src/aa.js', 'src/aaa.js']
        },
      },
      concat: {
        bar: {
          src: ['src/bb.js', 'src/bbb.js'],
          dest: 'dest/b.js',
        },
      },
    });

<!-- ### Files Object Format -->

### 文件对象格式

<!-- This form supports multiple src-dest mappings per-target, where the property name is the destination file, and its value is the source file(s). Any number of src-dest file mappings may be specified in this way, but additional properties may not be specified per mapping. -->

该格式支持为每个目标设置多个 src-dest 映射，此时属性名是目标文件，值是源文件。可以通过这种方法指定任意属性的 src-dest 文件映射，但是每对映射可以无法指定额外的属性。

    grunt.initConfig({
      concat: {
        foo: {
          files: {
            'dest/a.js': ['src/aa.js', 'src/aaa.js'],
            'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
          },
        },
        bar: {
          files: {
            'dest/b.js': ['src/bb.js', 'src/bbb.js'],
            'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
          },
        },
      },
    });

<!-- ### Files Array Format -->

### 文件数组格式

<!-- This form supports multiple src-dest file mappings per-target, while also allowing additional properties per mapping. -->

该格式支持为每个目标设置多个 src-dest 文件映射，也允许为每对映射指定额外的属性。

    grunt.initConfig({
      concat: {
        foo: {
          files: [
            {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
            {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
          ],
        },
        bar: {
          files: [
            {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
            {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
          ],
        },
      },
    });

<!-- ### Older Formats -->

### 旧格式

<!-- The **dest-as-target** file format is a holdover from before multi tasks and targets existed, where the destination filepath is actually the target name. Unfortunately, because target names are filepaths, running `grunt task:target` can be awkward. Also, you can't specify target-level options or additional properties per src-dest file mapping. -->

文件格式 **dest-as-target** 多任务和多目标存在之前的剩余物，即目标文件就是目标名。不幸的是，由于目标名是文件路径，运行 `grunt task:target` 可能是尴尬的。此外，你不能执行目标级别的选项，或者为每对 src-dest 文件映射指定额外的属性。

<!-- Consider this format deprecated, and avoid it where possible. -->

思考一下这种过时的格式，并在可能的情况下避免它。

    grunt.initConfig({
      concat: {
        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        'dest/b.js': ['src/bb.js', 'src/bbb.js'],
      },
    });

<!-- ### Custom Filter Function -->
### 自定义过滤函数

<!-- The `filter` property can help you target files with a greater level of detail. Simply use a valid [fs.Stats method name](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats). The following will clean only if the pattern matches an actual file: -->
属性 `filter` 可以帮助你定位文件，在更高的文件详细信息级别。只需使用一个有效的 [fs.Stats 方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)。下面的例子将在模式匹配实际文件时清理。

    grunt.initConfig({
      clean: {
        foo: {
          src: ['tmp/**/*'],
          filter: 'isFile',
        },
      },
    });

<!-- Or create your own `filter` function and return `true` or `false` whether the file should be matched. For example the following will only clean folders that are empty: -->
或者创建你自己的 `filter` 函数，当文件是否该匹配时返回 `true` 或 `false`。例如下面的例子将只清理空文件夹。

    grunt.initConfig({
      clean: {
        foo: {
          src: ['tmp/**/*'],
          filter: function(filepath) {
            return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
          },
        },
      },
    });

<!-- ### Globbing patterns -->
### 匹配模式

<!-- It is often impractical to specify all source filepaths individually, so Grunt supports filename expansion (also know as globbing) via the built-in [node-glob][] and [minimatch][] libraries. -->
单独指定所有的源文件路径，往往是不切实际的，所以 Grunt 通过内置的 [node-glob] 和 [minimatch] 库支持文件名扩展（也称为通配符）。

[node-glob]: https://github.com/isaacs/node-glob
[minimatch]: https://github.com/isaacs/minimatch

<!-- While this isn't a comprehensive tutorial on globbing patterns, know that in a filepath: -->
虽然这不是一个全面的匹配模式指南，但是要知道，在一个文件路径中：

<!-- * `*` matches any number of characters, but not `/`
* `?` matches a single character, but not `/`
* `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
* `{}` allows for a comma-separated list of "or" expressions
* `!` at the beginning of a pattern will negate the match -->

<ul>
<li><code>*</code> 匹配任意数量的字符，但是不匹配 <code>/</code></li>
<li><code>?</code> 匹配单个字符，但是不匹配 <code>/</code></li>
<li><code>**</code> 匹配任意数量的字符，包括 <code>/</code>，只要它是唯一的路径部分</li>
<li><code>{}</code> 允许用逗号分割的“或”表达式列表</li>
<li><code>!</code> 在模式的开始处，将对匹配取反</li>
</ul>

<!-- All most people need to know is that `foo/*.js` will match all files ending with `.js` in the `foo/` subdirectory, but `foo/**/*.js` will match all files ending with `.js` in the `foo/` subdirectory _and all of its subdirectories_. -->
大多数人都需要知道的是，`foo/*.js` 将匹配子目录 `foo/` 中所有以 `.js` 结尾的文件，但是 `foo/**/*.js` 将匹配子目录 `foo/` _和它的所有子目录_中所有以 `.js` 结尾的文件。

<!-- Also, in order to simplify otherwise complicated globbing patterns, Grunt allows arrays of file paths or globbing patterns to be specified. Patterns are processed in-order, with `!`-prefixed matches excluding matched files from the result set. The result set is uniqued. -->

此外，为了简化复杂的模式匹配，Grunt 允许指定文件路径数组或匹配模式。模式被顺序处理，以 `!` 为前缀的模式剔除结果集中匹配的文件。结果集是唯一的。

For example:

    // You can specify single files:
    {src: 'foo/this.js', dest: ...}
    // Or arrays of files:
    {src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
    // Or you can generalize with a glob pattern:
    {src: 'foo/th*.js', dest: ...}
    
    // This single node-glob pattern:
    {src: 'foo/{a,b}*.js', dest: ...}
    // Could also be written like this:
    {src: ['foo/a*.js', 'foo/b*.js'], dest: ...}
    
    // All .js files, in foo/, in alpha order:
    {src: ['foo/*.js'], dest: ...}
    // Here, bar.js is first, followed by the remaining files, in alpha order:
    {src: ['foo/bar.js', 'foo/*.js'], dest: ...}
    
    // All files except for bar.js, in alpha order:
    {src: ['foo/*.js', '!foo/bar.js'], dest: ...}
    // All files in alpha order, but with bar.js at the end.
    {src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: ...}
    
    // Templates may be used in filepaths or glob patterns:
    {src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
    // But they may also reference file lists defined elsewhere in the config:
    {src: ['foo/*.js', '<%= jshint.all.src %>'], dest: ...}

For more on glob pattern syntax, see the [node-glob][] and [minimatch][] documentation.

关于匹配模式语法的更新信息，请查看 [node-glob][] 和 [minimatch][] 文档。

<!-- ### Building the files object dynamically -->

### 动态创建文件对象

> 似乎应该保留 files，因为属性名就是 files

<!-- When you want to process many individual files, a few additional properties may be used to build a files list dynamically. These properties may be specified in both "Compact" and "Files Array" mapping formats. -->

当你要处理许多单独文件时，一些额外的属性可以用来动态的创建一个文件列表。这些属性可能被指定在映射格式“紧凑型”和“文件数组”中。

<!-- * `expand` Set to `true` to enable the following options:
* `cwd` All `src` matches are relative to (but don't include) this path.
* `src` Pattern(s) to match, relative to the `cwd`.
* `dest` Destination path prefix.
* `ext` Replace any existing extension with this value in generated `dest` paths.
* `flatten` Remove all path parts from generated `dest` paths.
* `rename` This function is called for each matched `src` file, (after extension renaming and flattening). The `dest` and matched `src` path are passed in, and this function must return a new `dest` value.  If the same `dest` is returned more than once, each `src` which used it will be added to an array of sources for it. -->

* `expand` 设置为 true，以启用以下选项：
* `cwd` 所有 `src` 相对于（但不包括）该路径进行匹配。
* `src` 匹配模式，相对于 `cwd`。
* `dest` 目标路径前缀。
* `ext` 在生成的 `dest` 路径中替换任何现有的扩展名。
* `flatten` 从生成的 `dest` 路径中移除所有的路径部分。
* `rename` 为每个匹配的 `src` 文件调用该函数，（在扩展名重命名和扁平化之后）。`dest` 和匹配的 `src` 被转入，该函数必须返回一个新 `dest` 值。如果多次返回同样的 `dest`，使用它的每个 `src` 将被添加到它一个源数组中。

<!-- In the following example, the `minify` task will see the same list of src-dest file mappings for both the `static_mappings` and `dynamic_mappings` targets, because Grunt will automatically expand the `dynamic_mappings` files object into 4 individual static src-dest file mappings—assuming 4 files are found—when the task runs. -->

在下面的例子中，任务 `minify` 将得到相同的源-目标文件映射列表，对于目标 `static_mapping` 和 `dynamic_mapping`，因为 Grunt 将自动扩展 `dynamic_mappings` 文件对象为 4 个独立的静态的源-目标文件映射，假设任务运行时只找到 4 个文件。

<!-- Any combination of static src-dest and dynamic src-dest file mappings may be specified. -->

可以指定任意组合的静态和动态的源-目标文件映射。

    grunt.initConfig({
      minify: {
        static_mappings: {
          // Because these src-dest file mappings are manually specified, every
          // time a new file is added or removed, the Gruntfile has to be updated.
          files: [
            {src: 'lib/a.js', dest: 'build/a.min.js'},
            {src: 'lib/b.js', dest: 'build/b.min.js'},
            {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
            {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
          ],
        },
        dynamic_mappings: {
          // Grunt will search for "**/*.js" under "lib/" when the "minify" task
          // runs and build the appropriate src-dest file mappings then, so you
          // don't need to update the Gruntfile when files are added or removed.
          files: [
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'lib/',      // Src matches are relative to this path.
              src: ['**/*.js'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              ext: '.min.js',   // Dest filepaths will have this extension.
            },
          ],
        },
      },
    });

<!-- ## Templates -->

## 模板

<!-- Templates specified using `<% %>` delimiters will be automatically expanded when tasks read them from the config. Templates are expanded recursively until no more remain. -->

使用分隔符 `<% %>` 指定的模板将被自动扩展，当任务从配置中读取它们时。模板被递归扩展直到没有剩余。

<!-- The entire config object is the context in which properties are resolved. Additionally, `grunt` and its methods are available inside templates, eg. `<%= grunt.template.today('yyyy-mm-dd') %>`. -->

整个配置对象是上下文，在使用的属性下的。此外，在模板中，`grunt` 和它的方法也是有效的，例如 `<%= grunt.template.today('yyyy-mm-dd') %>`。

<!-- * `<%= prop.subprop %>` Expand to the value of `prop.subprop` in the config, regardless of type. Templates like this can be used to reference not only string values, but also arrays or other objects.
* `<% %>` Execute arbitrary inline JavaScript code. This is useful with control flow or looping. -->

* `<%= prop.subprop %>` 扩展为配置中 `prop.subprop` 的值。像这样的模板可能用来不仅仅引用字符串值，也可以是数组或其他对象。
* `<% %>` 执行任意的内联 JavaScript 代码。对于控制流程或循环非常有用。

<!-- Given the sample `concat` task configuration below, running `grunt concat:sample` will generate a file named `build/abcde.js` by concatenating the banner `/* abcde */` with all files matching `foo/*.js` + `bar/*.js` + `baz/*.js`. -->

下面给定简单任务 `concat` 的配置，运行 `grunt concat:sample` 将生成一个命名为 `build/abcde.js` 的文件，通过合并 `/* abcde */` 和所有匹配 `foo/*.js` + `bar/*.js` + `baz/*.js` 的文件。

    grunt.initConfig({
      concat: {
        sample: {
          options: {
            banner: '/* <%= baz %> */\n',   // '/* abcde */\n'
          },
          src: ['<%= qux %>', 'baz/*.js'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
          dest: 'build/<%= baz %>.js',      // 'build/abcde.js'
        },
      },
      // Arbitrary properties used in task configuration templates.
      foo: 'c',
      bar: 'b<%= foo %>d', // 'bcd'
      baz: 'a<%= bar %>e', // 'abcde'
      qux: ['foo/*.js', 'bar/*.js'],
    });

<!-- ## Importing External Data -->

## 导入外部数据

<!-- In the following Gruntfile, project metadata is imported into the Grunt config from a `package.json` file, and the [grunt-contrib-uglify plugin](http://github.com/gruntjs/grunt-contrib-uglify) `uglify` task is configured to minify a source file and generate a banner comment dynamically using that metadata. -->

在下面的 Gruntfile 中，项目元数据从一个 `package.json` 文件被导入到 Grunt 配置，并且 [grunt-contrib-uglify 插件](http://github.com/gruntjs/grunt-contrib-uglify)任务被配置为压缩源文件并且使用元数据动态生成一段顶部注释。

<!-- Grunt has `grunt.file.readJSON` and `grunt.file.readYAML` methods for importing JSON and YAML data. -->

Grunt 拥有方法 `grunt.file.readJSON` and `grunt.file.readYAML`，来导入 JSON 和 YAML 数据。

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        dist: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'dist/<%= pkg.name %>.min.js'
        }
      }
    });


