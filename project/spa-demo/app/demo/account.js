define(function(require, exports) {
	var Backbone = require('backbone'),
		Handlebars = require('handlebars'),
		$ = require('jquery'),
		Mock = require('mockjs');
	return Backbone.View.extend({
		events: {
			'click #create': function(e) {
				seajs.use(['/app/dialog', '/app/dialog.html'], function(Dialog, template) {
					var d = new Dialog({
						title: 'Create Plan',
						view: '/app/handle',
						viewOptions: {
							message: function(data) {
								console.log(data);
							},
							name: Math.random(),
							price: Math.random()
						}
					});
					d.render(template);
				});
			}
		},
		render: function(template) {
			var data = Mock.mock({
				'list|3-7': [{
					'id|+1': 1,
					'count|1-1000': 1,
					'type|1': [1, -1],
					desc: '@SENTENCE'
				}]
			});
			$(this.el).empty().append(
				Handlebars.compile(template)(data)
			);
		}
	});
})