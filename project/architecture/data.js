/*
    参考资料：
    样式参考 http://emmet.io/download/

    TODO
    * https://gist.github.com/dypsilon
    * https://github.com/dypsilon/frontend-dev-bookmarks
        * [直接拿来用！最火的前端开源项目（一）](http://www.csdn.net/article/2013-06-25/2815979-front-end-development)
        * [直接拿来用！最火的前端开源项目（二）](http://www.csdn.net/article/2013-06-27/2816017-front-end-development)
        * [直接拿来用！最火的前端开源项目（三）](http://www.csdn.net/article/2013-06-28/2816047-front-end-development)
    * http://pinterest.com/eanakashima/learn-the-front-end/
    * http://hikejun.com/blog/2011/09/25/d2%E6%8A%80%E6%9C%AF%E5%98%89%E5%B9%B4%E5%8D%8E%E5%88%86%E4%BA%AB%EF%BC%9A%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%9E%B6%E6%9E%84%E7%9A%84%E5%AE%9E%E8%B7%B5%E5%92%8C%E6%80%9D%E8%80%83/
    * [Nicholas Zakas: Scalable JavaScript Application Architecture](http://www.youtube.com/watch?v=vXjVFPosQHw)
    * https://github.com/joyent/node/wiki/modules
    * [How to keep up to date on Front-End Technologies - The Recipe](http://uptodate.frontendrescue.org/)
    * [The Toolbox  a directory of the best time-saving apps and tools](http://thetoolbox.cc/)

    ## Promises
    http://wiki.commonjs.org/wiki/Promises/A#Proposal
    http://promises-aplus.github.io/promises-spec/
    http://jsbooks.revolunet.com/
    http://www.nczonline.net/
    http://callbackhell.com/
    https://github.com/substack/stream-handbook
    
    [ES6 Uncensored](https://speakerdeck.com/anguscroll/es6-uncensored)

    GitHub 前 1000 名分类：
    https://github.com/jquery/jquery        Sizzle, Cache, Queue, Promise, DOM, Attribute, CSS, Aja, Effect

    [Publish Early, Publish Often](https://leanpub.com/)

    [五种开源协议的比较(BSD,Apache,GPL,LGPL,MIT) – 整理](http://www.awflasher.com/blog/archives/939)

    https://sourcegraph.com/nuysoft
    http://howtonode.org/

    ## Architecture
    http://blog.ponyfoo.com/2014/01/20/how-to-design-great-programs

    ## README.md
    https://github.com/mashery/iodocs

    分类：
    http://123.jser.us/
        ["CDN", "HTTP", "MVVM", "UI库", "兼容性", "占位图", "原型设计", "字体", "安全", "工作流", "工具", "性能", "敏捷", "文档", "文档工具", "格式化", "正则", "测试框架", "浏览器", "浏览器插件", "演示", "社区", "类库", "编辑器", "调试", "跨平台", "配色"]
    http://www.javascriptoo.com/
        ["Add On / Plug In10", "AJAX15", "AMD10", "Animation15", "Async9", "Audio6", "Browser29", "Canvas18", "Charting7", "Code59", "CSS20", "Data27", "Events28", "Forms2", "Framework29", "Gaming3", "Geolocation2", "Images11", "Local Storage13", "Mobile7", "MVC5", "PubSub10", "Routing13", "Selector15", "String8", "SVG9", "Templating25", "Time4", "UI71", "Unit Testing7", "Utility97", "WebGL3"]

*/
var data = {
    'Specifications': [{
        name: 'HTML',
        url: 'http://www.w3.org/html/',
        desc: 'the Hypertext Markup Language'
    }, {
        name: 'CSS',
        url: 'http://www.w3.org/Style/CSS/',
        desc: 'Cascading Style Sheets'
    }, {
        name: 'JAVASCRIPT WEB APIS',
        url: 'http://www.w3.org/standards/webdesign/script',
        desc: ''
    }, {
        name: 'ECMAScript',
        url: 'http://www.ecmascript.org/',
        desc: ['<a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">ES5</a>',
            '<a href="http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts">ES6</a>'
        ].join(' ')
    }, {
        name: 'HTTP',
        url: 'http://www.w3.org/Protocols/rfc2616/rfc2616.html',
        desc: 'Hypertext Transfer Protocol'
    }],

    JavaScript: [{
        name: 'ECMAScript 5'
    }, {
        name: 'ECMAScript 6'
    }, {
        name: 'CommonJS'
    }, {
        name: 'CoffeeScript'
    }],

    HTML: [{
        name: 'HTML5',
        url: 'http://www.w3.org/html/wg/drafts/html/master/',
        desc: ''
    }, {
        name: 'Markdown',
        url: 'http://www.w3.org/html/wg/drafts/html/master/',
        desc: ''
    }, {
        name: 'YAML',
        url: 'http://www.w3.org/html/wg/drafts/html/master/',
        desc: ''
    }],

    CSS: [{
        name: 'CSS2'
    }, {
        name: 'CSS3'
    }, {
        name: 'LESS',
        url: 'http://lesscss.org/',
        icon: '',
        desc: ''
    }, {
        name: 'SASS',
        url: 'http://sass-lang.com/',
        icon: 'http://sass-lang.com/images/sass.gif',
        desc: 'Syntactically Awesome Stylesheets'
    }, {
        name: 'cssmin'
    }, {
        name: 'Stylus',
        url: 'http://learnboost.github.io/stylus/',
        icon: 'http://learnboost.github.io/stylus/assets/stylus.png',
        desc: 'Expressive, dynamic, robust CSS'
    }, {
        name: 'Bootstrap 3',
        url: 'http://getbootstrap.com/',
        desc: 'Sleek, intuitive, and powerful mobile-first front-end framework for faster and easier web development.'
    }, {
        name: 'Responsive Design',
        desc: ''
    }, {
        name: 'Compatiblity'
    }, {
        url: 'http://usablica.github.io/front-end-frameworks/compare.html?v=2.0'
    }, {
        url: 'http://www.cssflow.com/snippets'
    }],

    DOM: [{
        name: 'DOM 3',
        desc: ['DOM', 'Event', 'Ajax'].join(' ')
    }, {
        name: 'DOM 2'
    }],

    Modularity: [{
        name: 'AMD', // https://github.com/amdjs/amdjs-api/wiki
        url: 'http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition',
        desc: 'Asynchronous Module Definition'
    }, {
        name: 'CMD',
        url: 'http://wiki.commonjs.org/wiki/Modules/1.1.1',
        desc: 'Common Module Definition'
        // [CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)
        // [Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md)
    }, {
        name: 'UMD',
        url: 'http://nuysoft.com/2014/01/24/authoring-umd-modules/'
    }, {
        name: 'RequireJS',
        url: 'http://requirejs.org/',
        desc: 'JavaScript file and module loader'
    }, {
        name: 'Sea.js',
        url: 'http://seajs.org/',
        desc: 'A Module Loader for the Web'
    }, {
        name: 'SeaJS 所为何',
        url: 'http://cyj.me/why-seajs/zh/'
    }],

    Tool: [{
        name: 'jQuery',
        url: 'http://jquery.com/',
        desc: ['New Wave JavaScript', '<a href="http://sizzlejs.com/">Sizzle</a>'].join(' ')
    }, {
        name: 'Underscore',
        url: 'http://underscorejs.org/',
        desc: 'A Utility-Belt Library'
    }, {
        name: 'Lazy',
        desc: '-'
    }, {
        url: 'http://www.regexper.com/'
    }],

    SPA: [{
        name: 'ExtJS',
        desc: '-'
    }, {
        name: 'Angular.js',
        desc: '-',
        other: [
            ['Angular Tips - Join us in our way to learning Angular.js', 'http://angular-tips.com/']
            ['$watch How the $apply Runs a $digest', 'http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/']
        ]
    }],

    'MV*': [{
        name: 'Backbone',
        desc: '-'
    }, {
        name: 'Ember.js'
    }, {
        name: 'Knockout',
        desc: '-'
    }, {
        name: 'BiSheng.js'
    }],

    Templating: [{
        name: 'Template Engine Chooser',
        url: 'http://garann.github.io/template-chooser/'
    }, {
        name: 'Mustache',
        url: 'http://mustache.github.io/'
    }, {
        name: 'Handlebars.js',
        url: 'http://handlebarsjs.com/'
    }, {
        name: 'Dust.js',
        url: 'http://akdubya.github.io/dustjs/'
    }, {
        name: 'Micro-Templating',
        url: 'http://ejohn.org/blog/javascript-micro-templating/'
    }],

    API: [{
        name: 'RESTful',
        url: '',
        desc: '',
    }],

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
        name: 'Coding Style',
        desc: ['<a href="https://github.com/airbnb/javascript">airbnb/javascript</a>'].join(' ')
    }, {
        name: 'Learning JavaScript Design Patterns',
        desc: 'http://addyosmani.com/resources/essentialjsdesignpatterns/book/'
    }],

    Beautifier: [{
        name: 'CSS'
    }, {
        name: 'HTML'
    }, {
        name: 'JavaScript'
    }],

    Editor: [{
        name: 'codemirror'
    }],

    'Online services': [{
        name: 'JSFiddle',
        url: 'http://jsfiddle.net/'
    }, {
        name: 'JS Bin',
        url: 'http://jsbin.com/'
    }, {
        name: 'Plunker',
        url: 'http://plnkr.co/',
        desc: 'Plunker is an online community for creating, collaborating on and sharing your web development ideas.'
    }, {
        name: 'CodePen',
        url: 'http://codepen.io/'
    }, {
        url: 'http://colourco.de/'
    }, {
        url: 'http://www.responsinator.com/'
    }],

    Testing: [{
        name: 'QUnit'
    }, {
        name: 'Jasmine'
    }, {
        name: 'Mocha'
    }, {
        name: 'WebDriver'
    }, {
        name: 'Mock.js'
    }],

    'Automation & Build': [{
        name: 'Grunt'
    }, {
        name: 'Twitter Bower',
        url: ''
    }, {
        name: 'Yeoman'
    }, {
        name: 'UglifyJS'
    }, {
        name: 'Semantic Versioning',
        url: 'http://semver.org/',
        desc: ''
    }, {
        name: 'node-semver',
        url: 'https://github.com/isaacs/node-semver',
        desc: 'The semantic versioner for npm'
    }],
    Server: [{
        name: 'Node.js'
    }, {
        name: 'Express',
        url: 'https://github.com/visionmedia/express'
    }],
    DataBase: [{
        url: 'http://sequelizejs.com/'
    }],

    'IDE & Dev Tool': [{
        name: 'Sublime & Plugins'
    }, {
        name: 'iTerm2'
    }, {
        name: 'Nodepad++'
    }, {
        name: 'console'
    }, {

    }],
    Performence: [{
        name: 'window.preformance'
    }, {
        name: 'Chrome DevTools'
    }, {
        name: 'YSlow',
        desc: ['<a href="">abcdef</a>', '<a href="">abcdef</a>', '<a href="">abcdef</a>'].join(' ') // <a href="">a</a>
    }],
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
    }],

    Component: [],

    Chart: [{
        name: 'Google Chart'
    }, {
        name: 'D3'
    }, {
        name: 'Three.js'
    }, {
        name: 'ExtJS Chart'
    }],
    'Community': [{
        name: 'stackoverflow',
        url: 'http://stackoverflow.com/'
    }],
    DOCS: [{
        name: 'MDN'
    }],
    'Email Group': [{
        name: 'JavaScript Weekly',
        url: 'http://javascriptweekly.com/',
        desc: 'A free, once–weekly e-mail round-up of JavaScript news and articles.'
    }, {
        name: 'Responsive Design Weekly',
        url: 'http://responsivedesignweekly.com/',
        desc: 'A free, once–weekly round-up of responsive design articles, tools, tips, tutorials and inspirational links.'
    }, {
        name: 'Sidebar',
        url: 'http://sidebar.io/',
        desc: 'The 5 best design links, every day'
    }, {
        name: 'CSS Weekly',
        url: 'http://css-weekly.com/',
        desc: 'weekly e-mail roundup of css articles, tutorials, experiments and tools'
    }, {
        name: 'Web Design Weekly News',
        url: 'http://web-design-weekly.com/',
        desc: 'A once a week email with no spam, no rambling. Just pure awesome links to the best news and articles to hit the interweb during the week.'
    }, {
        name: 'HTML5 Weekly',
        url: 'http://html5weekly.com/',
        desc: 'Top browser technology news and links straight to your inbox, weekly'
    }, {
        name: 'Front-end Weekly',
        url: 'http://www.frontendweekly.net/',
        desc: ''
    }, {
        name: 'Web Tools Weekly',
        url: 'http://webtoolsweekly.com/',
        desc: 'A weekly newsletter for front-end developers'
    }, {
        name: 'Frontend Weekly',
        url: 'http://netzartist.de/blog/',
        desc: ''
    }, {
        name: 'Frontend Weekly',
        url: 'http://www.scoop.it/t/netzartist',
        desc: ''
    }],
    Browser: [{
        name: 'Old App',
        url: 'http://www.oldapps.com/'

    }],

    // [Principles of Object-Oriented Programming in JavaScript](https://leanpub.com/oopinjavascript)
    // [Beautiful Visualization](http://it-ebooks.info/book/283/)
    Book: [{
        name: 'JavaScript - The Definitive Guide'
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
    }, {
        name: 'Eloquent JavaScript',
        desc: 'A Modern Introduction to Programming'
    }, {
        name: 'Closure: The Definitive Guide',
        url: 'http://www.amazon.cn/Closure-The-Definitive-Guide-Bolin-Michael/dp/1449381871/ref=sr_1_1?ie=UTF8&qid=1383373186&sr=8-1&keywords=Closure%3A+The+Definitive+Guide',
        desc: ''
    }, {
        name: 'JavaScript权威指南 第6版（影印版）',
        desc: ''
    }, {
        name: 'JavaScript高级程序设计(第2版)',
        desc: ''
    }, {
        name: 'JavaScript DOM编程艺术(第2版)',
        desc: ''
    }, {
        name: '高性能JavaScript',
        desc: ''
    }, {
        name: 'JAVASCRIPT 语言精髓与编程实践',
        desc: ''
    }, {
        name: '测试驱动的 JavaScript 开发（JavaScript 敏捷测试指南）',
        desc: ''
    }, {
        name: '深入浅出 JavaScript（中文版）',
        desc: ''
    }, {
        name: 'JavaScript 修炼之道',
        desc: ''
    }, {
        name: 'JavaScript 设计模式',
        desc: ''
    }, {
        name: '悟透JavaScript',
        desc: ''
    }, {
        name: 'JavaScript 标准',
        desc: ''
    }, {
        name: 'How to become an Advanced Front End Developer',
        url: 'http://davidshariff.com/how-to-become-advanced-front-end-developer-ebook/'
    }, {
        name: 'jQuery 技术内幕',
        url: ''
    }, {
        name: 'Developing JavaScript Web Applications',
        url: '',
        desc: '基于 MVC 的 JavaScript Web 富应用开发'
    }],

    Reference: [{
        name: 'IE API Reference',
        url: 'http://msdn.microsoft.com/en-us/library/hh772374(v=vs.85).aspx'
    }, {
        name: 'Web technology for developers',
        url: 'https://developer.mozilla.org/en-US/docs/Web'
    }, {
        name: 'WebGL: Up and Running',
        url: 'http://shop.oreilly.com/product/0636920024729.do'
    }, {
        name: 'Interactive 3D Graphics',
        url: 'https://www.udacity.com/course/cs291'
    }],
    'CheatSheet': [],
    'BBS': [{
        name: 'lanyrd.com',
        url: 'http://lanyrd.com/topics/javascript/',
        desc: 'JavaScript conferences and events'
    }, {
        name: 'Volocity'
        //  VelocityNY2013 http://yunpan.taobao.com/share/link/0112tTrNJ
    }, {
        name: 'D2 前端技术论坛',
        url: '',
        desc: 'Designer & Developer Front End Technology Forum'
    }, {
        name: 'London JS',
        url: 'http://lanyrd.com/series/londonjs/',
        desc: ''
    }, {
        name: 'JSConf',
        url: 'http://jsconf.com/',
        desc: 'Conferences for the JavaScript community.'
    }, {
        name: 'Edge NYC',
        url: 'http://lanyrd.com/2013/edge-nyc/',
        desc: ''
    }, {
        name: 'Fluent',
        url: 'http://fluentconf.com/fluent2013',
        desc: ''
    }],
    Blog: [
        'https://blog.othree.net/',
        'http://www.web-tinker.com/'
    ],
    Resources: [{
        name: 'Echo JS',
        url: 'http://www.echojs.com/',
        desc: ''
    }, {
        name: 'HOW TO KEEP UP TO DATE ON FRONT-END TECHNOLOGIES',
        url: 'http://uptodate.frontendrescue.org/',
        desc: ''
    }, {
        name: 'JS The Right Way',
        url: 'http://jstherightway.org/'
    }, {
        name: 'Performance Calendar - The speed geek\'s favorite time of the year',
        url: 'http://calendar.perfplanet.com/'
    }],
    Other: [{
        name: 'MANIFESTO',
        url: 'http://www.manifesto.asia/',
        desc: 'A declaration of fashion, design and pop culture'
    }, {
        name: 'frontend-dev-bookmarks',
        url: 'https://github.com/dypsilon/frontend-dev-bookmarks',
        desc: ''
    }],
    'Compatibility': [{
        name: 'Can I use...',
        url: 'http://caniuse.com/',
        desc: 'Compatibility tables for support of HTML5, CSS3, SVG and more in desktop and mobile browsers.'
    }, {
        name: 'QuirksMode.org',
        url: 'http://www.quirksmode.org/',
        desc: 'the prime source for browser compatibility information on the Internet. '
    }],
    'Read List': [{
        name: 'Web Design and Web Development Agency',
        url: 'http://www.ma-no.org/',
        desc: ''
    }],
    'Learn': [{
        name: 'Learn the Front End',
        url: 'http://pinterest.com/eanakashima/learn-the-front-end/',
        desc: 'Resources for HTML, CSS, JavaScript, and other front-end learning.'
    }, {
        name: 'Codecademy',
        url: 'http://www.codecademy.com/',
        desc: 'Learn to code interactively, for free.'
    }, {
        name: 'Code School',
        url: 'http://www.codeschool.com/',
        desc: 'Learn by Doing'
    }, {
        name: 'JavaScript Garden',
        url: 'http://bonsaiden.github.io/JavaScript-Garden/',
        desc: 'a growing collection of documentation about the most quirky parts of the JavaScript programming language.'
    }, {
        name: 'John Resig\'s Learning app',
        url: 'http://ejohn.org/apps/learn' // http://ejohn.org/
    }, {
        name: 'art-of-node',
        url: 'https://github.com/maxogden/art-of-node',
        desc: 'a short introduction to node.js'
    }, {
        name: '开课吧',
        url: 'http://www.kaikeba.com/',
        // http://www.kaikeba.com/Contents/dx/dx_content196.aspx#6669708-tsina-1-87808-1d5dcdfa105b9c347882ca2e4825a657
        desc: ''
    }],
    'Test Framework': [{
        name: 'QUnit',
        url: 'http://qunitjs.com/',
        desc: 'QUnit is a powerful, easy-to-use JavaScript unit testing framework.'
    }, {
        name: 'Jasmine',
        url: 'http://pivotal.github.io/jasmine/',
        desc: 'DOM-less simple JavaScript testing framework'
    }, {
        name: 'Mocha',
        url: 'http://visionmedia.github.io/mocha/',
        desc: 'simple, flexible, fun javascript test framework for node.js & the browser. (BDD, TDD, QUnit styles via interfaces)'
    }],
    'Test Platform': [{
        name: 'BrowserSwarm',
        url: 'http://www.browserswarm.com/',
        desc: ''
    }],

    'Game': [{
        url: 'http://jakearchibald.github.io/request-quest/'
    }, {
        url: 'http://davidshariff.com/quiz/'
        // http://www.w3cplus.com/css/front-end-web-development-quiz.html
    }, {
        url: 'http://jakearchibald.github.io/jank-invaders/'
    }],

    'Coding Guideline': [
        'http://jscode.org/',
        'https://github.com/styleguide',
        'https://github.com/mdo/code-guide',
        'http://sideeffect.kr/popularconvention',
        'http://www.thinkful.com/learn/javascript-best-practices-1/',
        'http://www.thinkful.com/learn/javascript-best-practices-2/'
    ],

    'Fun': [
        'https://github.com/blog/1162-github-data-challenge-winners',
        'https://github.com/blog/1544-data-challenge-ii-results',
        'http://osrc.dfm.io/',
        'http://osrc.dfm.io/nuysoft',
        'http://stackoverflow.com/questions/84556/whats-your-favorite-programmer-cartoon',
    ],

    'Future': [
        'https://speakerdeck.com/ariya',
    ],

    'History': [{
        name: 'Frequently Misunderstood JavaScript Concepts',
        url: 'http://bolinfest.com/javascript/misunderstood.html'
    }],

    CDN: [{
        url: 'http://www.uiframe.com/jscss.html'
    }, {
        url: 'http://www.staticfile.org/'
    }],
    Slide: [{
        name: 'csss',
        url: 'http://leaverou.github.io/csss/',
        desc: 'CSS-based SlideShow System'
    }]
}
/*

https://github.com/novus/nvd3
    chart doc
https://github.com/facebook/react
    library framework doc
https://github.com/trifacta/vega
    chart demo
https://github.com/1602/compound
    MVC 
http://linkedin.github.io/hopscotch/

http://h5bp.github.io/
    团队官网

*/