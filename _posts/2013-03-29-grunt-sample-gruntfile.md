---
layout: post
title: "Gruntfile 示例"
tagline: "Sample Gruntfile"
description: "介绍和分析一个 Gruntfile 示例，其中使用了 5 个 grunt 插件"
category-substitution: 翻译
group: Grunt
tags: [Grunt, JavaScript, Web]

short: "Gruntfile 示例"
pgroup: Grunt
---
{% include JB/setup %}

> 原文：<https://github.com/gruntjs/grunt/wiki/Sample-Gruntfile>

<!-- Below we walk through a sample gruntfile which uses five grunt plugins: -->
下面我们介绍和分析一个 Gruntfile 示例，其中使用了 5 个 grunt 插件：

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

<!-- The entire Gruntfile is at the bottom of this page, but if you keep reading we'll walk through it a step at a time. -->
完整的 Gruntfile 在页面底部，但是如果你继续读下去，我们会每次只处理一步。

<!-- The first part is the "wrapper" function, which encapsulates your Grunt configuration. -->
第一个部分是”包裹“函数，封装你的 Grunt 配置。

    module.exports = function(grunt) {
    }

<!-- Within there we can then initialize our configuration object: -->
在“包裹”函数中，我可以稍后初始化我们的配置对象：

    grunt.initConfig({
    });

<!-- Next we can read in the project settings from the `package.json` file into the `pkg` property. This allows us to refer to the values of properties within our `package.json` file, as we'll see shortly. -->
接下来，我们可以从文件 `package.json` 读取项目配置到属性 `pkg`。这使得我们可以引用文件 `package.json` 中的属性值，我很快就会看到这一点。

    pkg: grunt.file.readJSON('package.json')

<!-- This leaves us with this so far: -->
到目前为止的 Gruntfile：

    module.exports = function(grunt) {
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json');
      });
    };

<!-- Now we can define configuration for each of the tasks we have. The configuration object for a task lives as a property on the configuration object, that's named the same as the task. So the "concat" task goes in our config object under the "concat" key. Below is my configuration object for the "concat" task. I -->
现在，我们可以为每个任务定义配置。一个任务的配置对象挂在整个配置对象的一个属性上，属性名与任务同名。因此，任务 “concat” 在配置对象中对应一个属性 “concat”。下面是任务“concat”的配置对象。

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    }

<!-- Note how I refer to the `name` property that's in the JSON file. We access this using `pkg.name` as earlier we defined the `pkg` property to be the result of loading the `package.json` file, which is then parsed to a JavaScript object. Grunt has simple template engine to output the values of properties in the configuration object. Here I tell the concat task to concatenate all files that exist within `src/` and end in `.js`. -->
请注意我是如何在 JSON 文件中应用属性 `name` 的。我们通过使用 `pkg.name` 来访问，在前面我们定义了属性 `pkg` 为文件 `package.json` 的加载结果，它被解析为一个 JavaScript 对象。Grunt 拥有简单的模板引擎，来输出配置对象中的属性值。在这里，我告诉任务 concat 合并 `src/` 下以 `.js` 结尾的所有文件。

<!-- Now lets configure the uglify plugin, which minifies our JavaScript: -->
现在，让我们配置 uglify 插件，压缩我们的 JavaScript 代码：

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }

<!-- This tells uglify to create a file within `dist/` that contains the result of minifying the JavaScript files. Here I use `<%= concat.dist.dest %>` so uglify will minify the file that the concat task produces. -->
上面的配置告诉任务 uglify 在 `dist/` 下创建一个包含了压缩后的 JavaScript 的文件。在这里，我使用了 `<%= concat.dist.dest %>`，因此 uglify 将压缩任务 concat 产生的文件。

<!-- The QUnit plugin is really simple to set up. You just need to give it the location of the test runner files, which are the HTML files QUnit runs on. -->
QUnit 插件非常易于设置。你只需要给定测试运行文件的位置，QUnit 在这些 HTML 文件上运行。

    qunit: {
      files: ['test/**/*.html']
    },

<!-- The JSHint plugin is also very simple to configure: -->
JSHint 插件的配置也很简单：

    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }

<!-- JSHint simply takes an array of files and then an object of options. These are all [documented on the JSHint site](http://www.jshint.com/docs/). If you're happy with the JSHint defaults, there's no need to redefine them in the Gruntfile. -->
JSHint 简单的接受一个文件数组和一个选项对象。[JSHint 网站上的文档]描述了所有的选项。如果用 JSHint 默认值用的很开心，就没有必要在 Gruntfile 中重新它们。

[JSHint 网站上的文档]: http://www.jshint.com/docs/

<!-- Finally we have the watch plugin: -->
最后，我们还有 watch 插件：

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }

<!-- This can be run on the command line with `grunt watch`. When it detects any of the files specified have changed (here, I just use the same files I told JSHint to check), it will run the tasks you specify, in the order they appear. -->
可以在命令行中通过 `grunt watch` 来运行它。当它检测到任何指定的文件发生变化时（在这里，我只是使用了与 JSHint 相同的文件），它将运行指定的任务，按照出现的顺序。

<!-- Finally, we have to load in the Grunt plugins we need. These should have all been installed through npm. -->
最后，我们必须加载所需的 Grunt 插件。它们应该已经通过 npm 安装了。

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

<!-- And finally set up some tasks. Most important is the default task: -->
并且在最后我们设置了一些任务。其中最重要的是 default 任务：

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);
    
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

<!-- And here's the finished `Gruntfile.js`: -->
下面是完成后的 `Gruntfile.js`：

    module.exports = function(grunt) {
      //
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
          options: {
            separator: ';'
          },
          dist: {
            src: ['src/**/*.js'],
            dest: 'dist/<%= pkg.name %>.js'
          }
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
          },
          dist: {
            files: {
              'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },
        qunit: {
          files: ['test/**/*.html']
        },
        jshint: {
          files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
          options: {
            // options here to override JSHint defaults
            globals: {
              jQuery: true,
              console: true,
              module: true,
              document: true
            }
          }
        },
        watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint', 'qunit']
        }
      });
      //
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-qunit');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-concat');
      //
      grunt.registerTask('test', ['jshint', 'qunit']);
      //
      grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    };

