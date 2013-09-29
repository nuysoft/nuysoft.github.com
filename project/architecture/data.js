/*
    参考资料：
    样式参考 http://emmet.io/download/

    TODO
    https://gist.github.com/dypsilon
    https://github.com/dypsilon/frontend-dev-bookmarks
    http://pinterest.com/eanakashima/learn-the-front-end/
    http://hikejun.com/blog/2011/09/25/d2%E6%8A%80%E6%9C%AF%E5%98%89%E5%B9%B4%E5%8D%8E%E5%88%86%E4%BA%AB%EF%BC%9A%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80%E6%9E%B6%E6%9E%84%E7%9A%84%E5%AE%9E%E8%B7%B5%E5%92%8C%E6%80%9D%E8%80%83/
    [Nicholas Zakas: Scalable JavaScript Application Architecture](http://www.youtube.com/watch?v=vXjVFPosQHw)
    https://github.com/joyent/node/wiki/modules

    ## Promises
    http://wiki.commonjs.org/wiki/Promises/A#Proposal
    http://promises-aplus.github.io/promises-spec/
    http://jsbooks.revolunet.com/
    http://www.nczonline.net/

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
    }],
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
    }],
    DOM: [{
        name: 'DOM 3',
        desc: ['DOM', 'Event', 'Ajax'].join(' ')
    }, {
        name: 'DOM 2'
    }],
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
    }],
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
    }],
    SPA: [{
        name: 'ExtJS',
        desc: '-'
    }, {
        name: 'Angular.js',
        desc: '-'
    }],
    'MV*': [{
        name: 'Backbone',
        desc: '-'
    }, {
        name: 'Ember.js'
    }, {
        name: 'Knockout',
        desc: '-'
    }],
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
    }],
    API: [{
        name: 'RESTful',
        home: '',
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
        home: 'http://jsfiddle.net/'
    }, {
        name: 'JS Bin',
        home: 'http://jsbin.com/'
    }, {
        name: 'Plunker',
        home: 'http://plnkr.co/',
        desc: 'Plunker is an online community for creating, collaborating on and sharing your web development ideas.'
    }, {
        name: 'CodePen',
        home: 'http://codepen.io/'
    }],
    Testing: [{
        name: 'QUnit'
    }, {
        name: 'Jasmine'
    }, {
        name: 'Mocha'
    }, {
        name: 'WebDriver'
    }],
    'Automation & Build': [{
        name: 'Grunt'
    }, {
        name: 'Twitter Bower',
        home: ''
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
    }],
    Server: [{
        name: 'Node.js'
    }, {
        name: 'Express',
        home: 'https://github.com/visionmedia/express'
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
        home: 'http://stackoverflow.com/'
    }],
    DOCS: [{
        name: 'MDN'
    }],
    'Email Group': [{
        name: 'JavaScript Weekly',
        home: 'http://javascriptweekly.com/',
        desc: 'A free, once–weekly e-mail round-up of JavaScript news and articles.'
    }, {
        name: 'Responsive Design Weekly',
        home: 'http://responsivedesignweekly.com/',
        desc: 'A free, once–weekly round-up of responsive design articles, tools, tips, tutorials and inspirational links.'
    }, {
        name: 'Sidebar',
        home: 'http://sidebar.io/',
        desc: 'The 5 best design links, every day'
    }, {
        name: 'CSS Weekly',
        home: 'http://css-weekly.com/',
        desc: 'weekly e-mail roundup of css articles, tutorials, experiments and tools'
    }, {
        name: 'Web Design Weekly News',
        home: 'http://web-design-weekly.com/',
        desc: 'A once a week email with no spam, no rambling. Just pure awesome links to the best news and articles to hit the interweb during the week.'
    }, {
        name: 'HTML5 Weekly',
        home: 'http://html5weekly.com/',
        desc: 'Top browser technology news and links straight to your inbox, weekly'
    }, {
        name: 'Front-end Weekly',
        home: 'http://www.frontendweekly.net/',
        desc: ''
    }, {
        name: 'Web Tools Weekly',
        home: 'http://webtoolsweekly.com/',
        desc: 'A weekly newsletter for front-end developers'
    }, {
        name: 'Frontend Weekly',
        home: 'http://netzartist.de/blog/',
        desc: ''
    }, {
        name: 'Frontend Weekly',
        home: 'http://www.scoop.it/t/netzartist',
        desc: ''
    }],
    Browser: [{
        name: 'Old App'
    }],
    // https://leanpub.com/oopinjavascript
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
    }, {
        name: 'Eloquent JavaScript',
        desc: 'A Modern Introduction to Programming'
    }],
    Reference: [{
        name: 'IE API Reference',
        home: 'http://msdn.microsoft.com/en-us/library/hh772374(v=vs.85).aspx'
    }, {
        name: 'Web technology for developers',
        home: 'https://developer.mozilla.org/en-US/docs/Web'
    }],
    'CheatSheet': [],
    'BSS': [{
        name: 'lanyrd.com',
        home: 'http://lanyrd.com/topics/javascript/',
        desc: 'JavaScript conferences and events'
    }, {
        name: 'Volocity'
    }, {
        name: 'D2 前端技术论坛',
        home: '',
        desc: 'Designer & Developer Front End Technology Forum'
    }, {
        name: 'London JS',
        home: 'http://lanyrd.com/series/londonjs/',
        desc: ''
    }, {
        name: 'JSConf',
        home: 'http://jsconf.com/',
        desc: 'Conferences for the JavaScript community.'
    }, {
        name: 'Edge NYC',
        home： 'http://lanyrd.com/2013/edge-nyc/',
        desc: ''
    }],
    Blog: [],
    Resources: [{
        name: 'Echo JS',
        home: 'http://www.echojs.com/',
        desc: ''
    }, {
        name: 'HOW TO KEEP UP TO DATE ON FRONT-END TECHNOLOGIES',
        home: 'http://uptodate.frontendrescue.org/',
        desc: ''
    }],
    Other: [{
        name: 'MANIFESTO',
        home: 'http://www.manifesto.asia/',
        desc: 'A declaration of fashion, design and pop culture'
    }, {
        name: '',
        home: 'https://github.com/dypsilon/frontend-dev-bookmarks',
        desc: ''
    }],
    'Compatibility': [{
        name: 'Can I use...',
        home: 'http://caniuse.com/',
        desc: 'Compatibility tables for support of HTML5, CSS3, SVG and more in desktop and mobile browsers.'
    }, {
        name: 'QuirksMode.org',
        home: 'http://www.quirksmode.org/',
        desc: 'the prime source for browser compatibility information on the Internet. '
    }],
    'Read List': [{
        name: 'Web Design and Web Development Agency',
        home: 'http://www.ma-no.org/',
        desc: ''
    }],
    'Learn': [{
        name: 'Learn the Front End',
        home: 'http://pinterest.com/eanakashima/learn-the-front-end/',
        desc: 'Resources for HTML, CSS, JavaScript, and other front-end learning.'
    }, {
        name: 'Codecademy',
        home: 'http://www.codecademy.com/',
        desc: 'Learn to code interactively, for free.'
    }, {
        name: 'Code School',
        home: 'http://www.codeschool.com/',
        desc: 'Learn by Doing'
    }, {
        name: 'JavaScript Garden',
        home: 'http://bonsaiden.github.io/JavaScript-Garden/',
        desc: 'a growing collection of documentation about the most quirky parts of the JavaScript programming language.'
    }, {
        name: 'John Resig\'s Learning app',
        home: 'http://ejohn.org/apps/learn' // http://ejohn.org/
    }, {
        name: 'art-of-node',
        home: 'https://github.com/maxogden/art-of-node',
        desc: 'a short introduction to node.js'
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