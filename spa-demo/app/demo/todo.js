define(function(require, exports) {
	var _ = require('underscore'),
		Backbone = require('backbone'),
		Mustache = require('mustache'),
		$ = require('$');
	return Backbone.View.extend({
		events: {
			'click #create': function(e) {}
		},
		render: function(template) {
			var data = {
				list: [{
					id: _.uniqueId(),
					title: 'javascript',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'jQuery-less JavaScript, prototypal inheritance, Function.bind, basics of Backbone, Ember, canJS or similar'
				}, {
					id: _.uniqueId(),
					title: 'git & github',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'collaboration work!ow, pull requests, code reviews'
				}, {
					id: _.uniqueId(),
					title: 'modularity & builds',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'AMD, RequireJS / Almond, UglifyJS, Closure Compiler'
				}, {
					id: _.uniqueId(),
					title: 'dev tools',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'breakpoints & step debugging, $0, timelines & pro"les, other browsers'
				}, {
					id: _.uniqueId(),
					title: 'command line',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'ack, ssh, "nd, curl, git, npm; creating aliases for commonly used commands'
				}, {
					id: _.uniqueId(),
					title: 'templates',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'various templating libraries & tradeoffs, the RequireJS text! plugin'
				}, {
					id: _.uniqueId(),
					title: 'css',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'SASS, Stylus, and/or LESS; RequireJS for plain CSS optimization'
				}, {
					id: _.uniqueId(),
					title: 'testing',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'modularizing code makes testing easier; baby steps are better than no steps at all'
				}, {
					id: _.uniqueId(),
					title: 'automation',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'grunt'
				}, {
					id: _.uniqueId(),
					title: 'code quality',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'JSHint, pre-commit hooks, editor plugins'
				}, {
					id: _.uniqueId(),
					title: 'docs',
					priority: _.random(0, 3),
					progress: _.random(0, 100) + '%',
					desc: 'MDN, dochub.io; pre"x all your JS searches with “mdn” (or !js on duckduckgo)'
				}]
			};
			data['_priority'] = function() {
				return ['-', 'low', 'medium', 'high'][this.priority];
			}
			data['_priority_color'] = function() {
				return ['', 'warning', 'success', 'error'][this.priority];
			}
			$(this.el).empty().append(Mustache.to_html(template, data));
		}
	});
})