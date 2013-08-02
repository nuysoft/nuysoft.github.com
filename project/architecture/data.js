/*
    参考资料：
    样式参考 http://emmet.io/download/
*/
var data = {
    'Specifications': [{
            name: 'HTML',
            home: 'http://www.w3.org/html/',
            desc: 'the Hypertext Markup Language'
        }, {
            name: 'CSS',
            home: 'http://www.w3.org/Style/CSS/',
            desc: 'Cascading Style Sheets'
        }, {
            name: 'JAVASCRIPT WEB APIS',
            home: 'http://www.w3.org/standards/webdesign/script',
            desc: ''
        }, {
            name: 'ECMAScript',
            home: 'http://www.ecmascript.org/',
            desc: ['<a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">ES5</a>',
                    '<a href="http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts">ES6</a>'
            ].join(' ')
        }, {
            name: 'HTTP',
            home: 'http://www.w3.org/Protocols/rfc2616/rfc2616.html',
            desc: 'Hypertext Transfer Protocol'
        }
    ],
    JavaScript: [{
            name: 'ECMAScript 5'
        }, {
            name: 'ECMAScript 6'
        }, {
            name: 'CommonJS'
        }, {
            name: 'CoffeeScript'
        }
    ],
    HTML: [{
            name: 'HTML5',
            home: 'http://www.w3.org/html/wg/drafts/html/master/',
            desc: ''
        }, {
            name: 'Markdown',
            home: 'http://www.w3.org/html/wg/drafts/html/master/',
            desc: ''
        }, {
            name: 'YAML',
            home: 'http://www.w3.org/html/wg/drafts/html/master/',
            desc: ''
        }
    ],
    CSS: [{
            name: 'CSS2'
        }, {
            name: 'CSS3'
        }, {
            name: 'LESS',
            home: 'http://lesscss.org/',
            icon: '',
            desc: ''
        }, {
            name: 'SASS',
            home: 'http://sass-lang.com/',
            icon: 'http://sass-lang.com/images/sass.gif',
            desc: 'Syntactically Awesome Stylesheets'
        }, {
            name: 'cssmin'
        }, {
            name: 'Stylus',
            home: 'http://learnboost.github.io/stylus/',
            icon: 'http://learnboost.github.io/stylus/assets/stylus.png',
            desc: 'Expressive, dynamic, robust CSS'
        }, {
            name: 'Bootstrap 3',
            home: 'http://getbootstrap.com/',
            desc: 'Sleek, intuitive, and powerful mobile-first front-end framework for faster and easier web development.'
        }, {
            name: 'Responsive Design',
            desc: ''
        }, {
            name: 'Compatiblity'
        }
    ],
    DOM: [{
            name: 'DOM 3',
            desc: ['DOM', 'Event', 'Ajax'].join(' ')
        }, {
            name: 'DOM 2'
        }
    ],
    Modularity: [{
            name: 'AMD', // https://github.com/amdjs/amdjs-api/wiki
            home: 'http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition',
            desc: 'Asynchronous Module Definition'
        }, {
            name: 'CMD',
            home: 'http://wiki.commonjs.org/wiki/Modules/1.1.1',
            desc: 'Common Module Definition'
        }, {
            name: 'RequireJS',
            home: 'http://requirejs.org/',
            desc: 'JavaScript file and module loader'
        }, {
            name: 'Sea.js',
            home: 'http://seajs.org/',
            desc: 'A Module Loader for the Web'
        }
    ],
    Tool: [{
            name: 'jQuery',
            home: 'http://jquery.com/',
            desc: ['New Wave JavaScript', '<a href="http://sizzlejs.com/">Sizzle</a>'].join(' ')
        }, {
            name: 'Underscore',
            home: 'http://underscorejs.org/',
            desc: 'A Utility-Belt Library'
        }, {
            name: 'Lazy',
            desc: '-'
        }
    ],
    SPA: [{
            name: 'ExtJS',
            desc: '-'
        }, {
            name: 'Angular.js',
            desc: '-'
        }
    ],
    'MV*': [{
            name: 'Backbone',
            desc: '-'
        }, {
            name: 'Ember.js'
        }, {
            name: 'Knockout',
            desc: '-'
        }
    ],
    Templating: [{
            name: 'Template Engine Chooser'
        }, {
            name: 'Mustache'
        }, {
            name: 'Handlebars.js'
        }, {
            name: 'Dust.js'
        }, {
            name: 'Micro-Templating',
            home: 'http://ejohn.org/blog/javascript-micro-templating/'
        }
    ],
    API: [{
            name: 'RESTful',
            home: '',
            desc: '',
        }
    ],

    Quality: [{
            name: 'JShint'
        }, {
            name: 'Plato'
        }, {
            name: 'Refactor'
        }, {
            name: 'Design Patterns'
        }, {
            name: '有限状态机'
        }, {
            name: 'coding style'
        }
    ],
    Beautifier: [{
            name: 'CSS'
        }, {
            name: 'HTML'
        }, {
            name: 'JavaScript'
        }
    ],
    Editor: [{
            name: 'codemirror'
        }
    ],
    'Online services': [{
            name: 'JSFiddle',
            home: 'http://jsfiddle.net/'
        }, {
            name: 'JS Bin',
            home: 'http://jsbin.com/'
        }
    ],
    Testing: [{
            name: 'QUnit'
        }, {
            name: 'Jasmine'
        }, {
            name: 'Mocha'
        }, {
            name: 'WebDriver'
        }
    ],
    'Automation & Build': [{
            name: 'Grunt'
        }, {
            name: 'Twitter Bower'
        }, {
            name: 'Yeoman'
        }, {
            name: 'UglifyJS'
        }, {
            name: 'Semantic Versioning',
            home: 'http://semver.org/',
            desc: ''
        }, {
            name: 'node-semver',
            home: 'https://github.com/isaacs/node-semver',
            desc: 'The semantic versioner for npm'
        }
    ],
    Server: [{
            name: 'Node.js'
        }, {
            name: 'Express',
            home: 'https://github.com/visionmedia/express'
        }
    ],
    'IDE & Dev Tool': [{
            name: 'Sublime & Plugins'
        }, {
            name: 'iTerm2'
        }, {
            name: 'Nodepad++'
        }, {
            name: 'console'
        }, {

        }
    ],
    Performence: [{
            name: 'window.preformance'
        }, {
            name: 'Chrome DevTools'
        }, {
            name: 'YSlow',
            desc: ['<a href="">abcdef</a>', '<a href="">abcdef</a>', '<a href="">abcdef</a>'].join(' ') // <a href="">a</a>
        }
    ],
    Repository: [{
            name: 'Git'
        }, {
            name: 'Github'
        }, {
            name: 'Gist'
        }, {
            name: 'Pages'
        }, {
            name: 'npm'
        }
    ],
    Component: [],

    Chart: [{
            name: 'Google Chart'
        }, {
            name: 'D3'
        }, {
            name: 'Three.js'
        }, {
            name: 'ExtJS Chart'
        }
    ],
    'Community': [{
            name: 'stackoverflow',
            home: 'http://stackoverflow.com/'
        }
    ],
    DOCS: [{
            name: 'MDN'
        }
    ],
    'Email Group': [{
            name: 'JavaScript Weekly'
        }
    ],
    Browser: [{
            name: 'Old App'
        }
    ],
    Book: [{
            name: 'The Definitive Guide'
        }, {
            name: 'The Good Parts'
        }, {
            name: 'Async JavaScript'
        }, {
            name: 'Pro JavaScript Techniques'
        }, {
            name: 'Refactoring',
            desc: 'Improving the Design & Existing Code'
        }, {
            name: 'Head First Design Patterns'
        }
    ],
    Reference: [{
            name: 'IE API Reference',
            home: 'http://msdn.microsoft.com/en-us/library/hh772374(v=vs.85).aspx'
        }, {
            name: 'Web technology for developers',
            home: 'https://developer.mozilla.org/en-US/docs/Web'
        }
    ],
    'CheatSheet': [],
    'BSS': [{
            name: 'Volocity'
        }, {
            name: 'D2 前端技术论坛',
            home: '',
            desc: 'Designer & Developer Front End Technology Forum'
        }
    ],
    Blog: [{
            name: ''
        }
    ],
    Other: [{
            name: 'MANIFESTO',
            desc: ''
        }
    ]
}