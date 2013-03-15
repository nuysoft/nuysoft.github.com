define(function(require, exports) {
	var Backbone = require('backbone'),
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
					count: Math.random(),
					type: 1,
					desc: 'hello'
				}, {
					id: 2,
					count: Math.random(),
					type: -1,
					desc: 'account'
				}]
			};
			$(this.el).empty().append(Mustache.to_html(template, data));
		}
	});
})