# [Jison](http://zaach.github.com/jison/)

友好的 JavaScript 解析器生成器

* [文档](http://zaach.github.com/jison/docs/)
* [演示](http://zaach.github.com/jison/demos/)
* [尝试](http://zaach.github.com/jison/try/)
* [安装](http://zaach.github.com/jison/docs/#installation)
* [社区](http://zaach.github.com/jison/community/)


# [文档](http://zaach.github.com/jison/docs/)

Jison 接受一个上下文无关文法作为输入，输出一个可以解析文法所描述的语言的 JavaScript 文件。然后，你可以使用生成的脚本来解析、接受、拒绝输入，或基于输入执行动作。如果你熟悉 Bison 或 Yacc 或其他类似的工具，你差不多已经准备好了。


## 安装 

Jison 可以使用 npm 安装：

    npm install jison -g


## 命令行用法

克隆 github 库，获取示例：

    git clone git://github.com/zaach/jison.git
    cd jison/examples

现在，你可以生成一些解析器：

    jison calculator.jison

这将在当前工作目录下生成 calculator.js。这个脚本可以用来解析一个输入文件，如下所示：

    echo "2^32 / 1024" > testcalc
    node calculator.js testcalc

上面的脚本将打印 4194304。


## CommonJS 模块用法

你也可以从 JavaScript 以编程的方法生成解析器。假设 Jison 在 CommonJS 环境的加载路径中：

    // mygenerator.js
    var Parser = require("jison").Parser;

    var grammar = {
        "lex": {
            "rules": [
               ["\\s+", "/* skip whitespace */"],
               ["[a-f0-9]+", "return 'HEX';"]
            ]
        },

        "bnf": {
            "hex_strings" :[ "hex_strings HEX",
                             "HEX" ]
        }
    };

    var parser = new Parser(grammar);

    // generate source, ready to be written to disk
    var parserSource = parser.generate();

    // you can also use the parser directly from memory

    parser.parse("adfe34bc e82a");
    // returns true

    parser.parse("adfe34bc zxg");
    // throws lexical error


## 使用生成的解析器

一旦你生成并保存了生成的解析器，你不再需要 Jison 或任何其他依赖。

正如之前的示例，解析器可以在命令行中使用：

    node calculator.js testcalc

不过更理想的是，解析被其他模块所依赖。你可以从另一个模块加载解析器，像这样：

    // mymodule.js
    var parser = require("./calculator").parser;

    function exec (input) {
        return parser.parse(input);
    }

    var twenty = exec("4 * 5");

或者，更简洁的说：

    // mymodule.js
    function exec (input) {
        return require("./calculator").parse(input);
    }

    var twenty = exec("4 * 5");


## 在网页中使用解析器

生成的解析器脚本可以被包含在一个网页中，不需要任何 CommonJS 加载环境。简单的通过一个 script 标签指向解析器：

    <script src="calculator.js"></script>

生成解析器时，你可以通过下面的声明指定变量名：

    // mygenerator.js
    var parserSource = generator.generate({moduleName: "calc"});
    // then write parserSource to a file called, say, calc.js

声明的 moduleName 用于在网页中访问解析器：

    <script src="calc.js"></script>
    <script>
      calc.parse("42 / 0");
    </script>

声明的 moduleName 也可以包含一个命名空间，例如：

    // mygenerator.js
    var parserSource = parser.generate({moduleName: "myCalculator.parser"});

然后可以这样使用：

    <script>
      var myCalculator = {};
    </script>

    <script src="calc.js"></script>

    <script>
      myCalculator.parser.parse("42 / 0");
    </script>

或者类似的用法 - 你能想象到的。

在网页中使用计算器脚本的演示在[这里](http://zaach.github.com/jison/demos/calc/)。


## Jison 的概念

Jison 移植自 [Bision 指南](http://dinosaur.compilertools.net/bison/bison_4.html#SEC7)，你可以参考主要概念，它们是等价的（除了静态语义类型，和其他明显的 C 工件）。

其他有用的部分：

* [Bison Grammar Files](http://dinosaur.compilertools.net/bison/bison_6.html#SEC34)
* [The Bison Parser Algorithm](http://dinosaur.compilertools.net/bison/bison_8.html#SEC68)
* [Error Recovery](http://dinosaur.compilertools.net/bison/bison_9.html#SEC81) (alpha support, at this point)

## 指定一门语言

解析语言的过程包括两个阶段：词法分析（词法单元）和解析，著名的组合有 Lex/Yacc 和 Flex/Bison。Jison 允许你用两个含有词法规则和语言语法的独立文件，或在主语法中嵌入词法规则，来指定一个解析器，就像使用 Bison/Flex 一样。

例如，下面是计算器解析器的语法：

    /* description: Parses end executes mathematical expressions. */

    /* lexical grammar */
    %lex

    %%
    \s+                   /* skip whitespace */
    [0-9]+("."[0-9]+)?\b  return 'NUMBER';
    "*"                   return '*';
    "/"                   return '/';
    "-"                   return '-';
    "+"                   return '+';
    "^"                   return '^';
    "("                   return '(';
    ")"                   return ')';
    "PI"                  return 'PI';
    "E"                   return 'E';
    <<EOF>>               return 'EOF';

    /lex

    /* operator associations and precedence */

    %left '+' '-'
    %left '*' '/'
    %left '^'
    %left UMINUS

    %start expressions

    %% /* language grammar */

    expressions
        : e EOF
            {print($1); return $1;}
        ;

    e
        : e '+' e
            {$$ = $1+$3;}
        | e '-' e
            {$$ = $1-$3;}
        | e '*' e
            {$$ = $1*$3;}
        | e '/' e
            {$$ = $1/$3;}
        | e '^' e
            {$$ = Math.pow($1, $3);}
        | '-' e %prec UMINUS
            {$$ = -$2;}
        | '(' e ')'
            {$$ = $2;}
        | NUMBER
            {$$ = Number(yytext);}
        | E
            {$$ = Math.E;}
        | PI
            {$$ = Math.PI;}
        ;

将上面的语法编译为 Jison 可以直接使用的 JSON 格式：

    {
        "lex": {
            "rules": [
               ["\\s+",                    "/* skip whitespace */"],
               ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER';"],
               ["\\*",                     "return '*';"],
               ["\\/",                     "return '/';"],
               ["-",                       "return '-';"],
               ["\\+",                     "return '+';"],
               ["\\^",                     "return '^';"],
               ["\\(",                     "return '(';"],
               ["\\)",                     "return ')';"],
               ["PI\\b",                   "return 'PI';"],
               ["E\\b",                    "return 'E';"],
               ["$",                       "return 'EOF';"]
            ]
        },

        "operators": [
            ["left", "+", "-"],
            ["left", "*", "/"],
            ["left", "^"],
            ["left", "UMINUS"]
        ],

        "bnf": {
            "expressions" :[[ "e EOF",   "print($1); return $1;"  ]],

            "e" :[[ "e + e",   "$$ = $1 + $3;" ],
                  [ "e - e",   "$$ = $1 - $3;" ],
                  [ "e * e",   "$$ = $1 * $3;" ],
                  [ "e / e",   "$$ = $1 / $3;" ],
                  [ "e ^ e",   "$$ = Math.pow($1, $3);" ],
                  [ "- e",     "$$ = -$2;", {"prec": "UMINUS"} ],
                  [ "( e )",   "$$ = $2;" ],
                  [ "NUMBER",  "$$ = Number(yytext);" ],
                  [ "E",       "$$ = Math.E;" ],
                  [ "PI",      "$$ = Math.PI;" ]]
        }
    }

Jison 接受 Bison/Flex 风格的格式，或者原始的 JSON 格式，例如：

    node bin/jison examples/calculator.jison

或者

    node bin/jison examples/calculator.json

如果词法语法存放在它自己的文件（.jisonlex）中，将它作为第 2 个参数传给 Jison，例如：

    node bin/jison examples/classy.jison examples/classy.jisonlex

可以在目录 [examples/](http://github.com/zaach/jison/tree/master/examples/) 和 [tests/parser/](http://github.com/zaach/jison/tree/master/tests/parser/) 找到更多的例子。


## 词法分析

Jison 包含一个相当基本的扫描器生成器，因此可以替换为支持基本扫描器 API 的任意模块。

[输入文件](http://dinosaur.compilertools.net/flex/flex_6.html#SEC6)（包括宏支持）的格式和[模式匹配](http://dinosaur.compilertools.net/flex/flex_7.html#SEC7)的风格模仿自 Flex。几个[元字符已被添加](https://github.com/zaach/jison/wiki/Deviations-From-Flex-Bison)，但是相比 Flex 模式有一个小小的不便，就是明确的字符串必须放入引号中，例如：

Bad:

    [0-9]+zomg    print(yytext)

Good:

    [0-9]+"zomg"    print(yytext);

跨行的行为应该用花括号包裹：

    [0-9]+"zomg"    %{ print(yytext);
                       return 'ZOMG'; %}

最近添加的[启动条件](http://dinosaur.compilertools.net/flex/flex_11.html)功能，允许某些规则只匹配某些状态。如果词法分析器不处于指定的状态，相应的规则被忽略。语法分析器开始于 INITIAL 状态，可以移动到指定的新状态。阅读纲要链接。下面的例子显示了 Jison 的不同之处，即在一个行动中用 *this.begin('state')* 代替 *BEGIN(STATE)* 来改变状态。

    %s expect

    %%
    expect-floats        this.begin('expect');

    <expect>[0-9]+"."[0-9]+      {
                console.log( "found a float, = " + yytext );
                }
    <expect>\n           %{
                /* that's the end of the line, so
                 * we need another "expect-number"
                 * before we'll recognize any more
                 * numbers
                 */
                this.begin('INITIAL');
                %}

    [0-9]+      console.log( "found an integer, = " + yytext );

    "."         console.log( "found a dot" );

另外，可以在一个行动中使用 this.popState() 恢复到前一个状态。


## 跟踪位置

Jison 的词法分析器将跟踪每个词法单元（token）的行号和列号信息，并且使它们在解析器的动作中可用。与 Bison 的 API 完全相同。


## 自定义扫描器

你不是必须使用 Jison 内置的词法扫描器。一个含有 lex 和 setInput 方法的对象就足够了，例如：

    parser.lexer = {lex: function () { return 'NIL'; }, setInput: function (str) {} }

这个语法扫描器将一直返回词法单元 NIL。

TODO：更多示例

## 共享范围

在 Bison 中，代码被预期定义在语义行为的范围。例如，代码块可以被包含在生成的解析器源码中，语义行为中的代码块是有效的。

Jison 更加模块化。不是向生成的模块插入代码，而是生成的模块期待被其他模块加载和使用。这意味着如果你想要向语义行为暴漏功能，你不能依赖词法范围。相反，解析器含有一个 yy 属性，该属性被暴露给语义行为，就像自由变量 yy 一样。任何绑定到该属性的功能可以在词法和语义行为中通过自由变量 yy 使用。

来自 orderly.js 的一个例子：

    var parser = require("./orderly/parse").parser;

    // set parser's shared scope
    parser.yy = require("./orderly/scope");

    // returns the JSON object
    var parse = exports.parse = function (input) {
        return parser.parse(input);
    };
    ...

范围模块包含用于创建数据结构的逻辑，在语义行为中使用。

TODO：更多这方面的内容。


## 解析算法

像 Bison 一样，Jison 可以识别 LALR(1) 文法描述的语言，也有支持 LR(0), SLR(1) 和 LR(1) 文法的模式。Jison 还有一个特殊模式用于生成 LL(1) 分析表（我的教授要求的），并且可以在将来扩展到生成一个解析 LL(k) 语言的递归下降解析器。但是，就目前而言，Jison 面向自底向上的语法分析。

*LR(1) 模式在目前是不实用的，最多就是玩具语法，但它完全是所使用的算法的一个推论，并且可能在将来发生改变。


## 使用 Jison 的项目

访问 [wiki](https://github.com/zaach/jison/wiki/ProjectsUsingJison) 查看使用 Jison 的项目，或添加你自己的项目。

## 贡献者

访问 [github](http://github.com/zaach/jison/contributors)

## 许可证

Copyright (c) 2009 Zachary Carter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

By Zach Carter, 2010. MIT Licensed.

