define(function(require, exports) {
	var _ = require('underscore'),
		Backbone = require('backbone'),
		Mustache = require('mustache'),
		$ = require('$');
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
			var data = {
				list: [{
					id: 1,
					count: '$' + _.random(0, 100),
					type: 1,
					desc: '过夜费'
				}, {
					id: 2,
					count: '$' + _.random(0, 100),
					type: -1,
					desc: '吃肉钱'
				}]
			};
			$(this.el).empty().append(Mustache.to_html(template, data));
		}
	});
})