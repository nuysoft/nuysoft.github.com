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
			var books = [
				'JavaScript权威指南 第6版（影印版）',
				'JavaScript高级程序设计(第2版)',
				'JavaScript DOM编程艺术(第2版)',
				'高性能JavaScript',
				'JAVASCRIPT语言精髓与编程实践',
				'测试驱动的JavaScript开发（JavaScript敏捷测试指南）',
				'深入浅出JavaScript（中文版）',
				'JavaScript修炼之道',
				'JavaScript设计模式',
				'悟透JavaScript'];
			var data = {
				list: []
			}, list = data.list;
			for (var i = 0; i < books.length; i++) {
				list.push({
					id: i + 1,
					date: _.random(0, 31),
					count: _.random(0, 100),
					type: _.random(-1, 1),
					desc: books[i]
				})
			}
			data['_type'] = function() {
				return this.type === 1 && '收入' || this.type === -1 && '支出' || '-';
			}
			data['_type_color'] = function() {
				return this.type === 1 && 'success' || this.type === -1 && 'error';
			}
			$(this.el).empty().append(Mustache.to_html(template, data));
		}
	});
})