/*
    Backbone plugin for SPA
    1. Nested view parse and render.
    2. Update a partial area of DOM.
    3. Auto load HTML, JavaScript, and CSS from the web sever.

    参考 Magix 功能列表：
      通信：必须持有 View，才能通信
      加载：
      销毁：不需要

    功能列表：
    * 支持只加载模板文件
    * 某个 View 抛出无错，不会影响其他 View 的加载和执行
  
*/
define(function(require, exports, module) {
	require('underscore')
	var Backbone = require('backbone'),
		$ = require('jquery');
	var rhash = /^!(.*)\/(.*)$/;
	exports.options = {
		frame: '/frame',
		// default target
		target: '.main',
		// defeult main view
		view: '/main'
	}
	exports.unparam = function(param) {
		if (!param) return {}

		var re = {};
		for (var i = 0, arr = param.split('&'), kv;
			(kv = arr[i]); i++) {
			kv = kv.split('=');
			re[kv[0]] = kv[1];
		}
		return re;
	}
	// start hash change event listener
	/*
        options
            frame   框架页
            target  默认 View 关联的元素
            view    默认 View
    */
	exports.start = function(options) {
		// frame
		exports.mount(options.frame, {}, null, function() {

			// route handle
			new Backbone.Router().route(rhash, 'dispatch', function(path, param) {
				param = exports.unparam(param) || {};
				param.target = param.target || options.target;
				console.log('[Router.route]', path, '→', param.target);
				$(param.target).each(function(index, el) {
					exports.mount(path || options.view, param, el);
				});
			});

			// start
			Backbone.history.start();

			// init
			if (!location.hash) exports.mount(options.view, {}, $(options.target));

		});

	};
	/*  
        方法 exports.mount(path, param, el, callback)
        参数 path：View 路径
        参数 param：hash 参数
        参数 el：View 绑定的元素
        参数 callback：挂载完成后的回调函数
    */
	exports.mount = function mount(path, param, el, callback) {
		console.log('[spa.mount]', arguments)
		$(el).html('loading...')

		// delete last backslash
		path = path.replace(/\/$/, '').replace(/^\//, '')
		// load js、html file
		require([path + '.js', 'text!' + path + '.html'], handle, errorHandle)

		function errorHandle(error) {
			require(['text!' + path + '.html'], function(template) {
				handle(undefined, template)
			}, function(error) {
				console.log(error)
			})
		}

		function handle(View, template) {
			if (!View && !template) {
				$(param.target).empty().append('<h1>404</h1>')
				return
			}
			// 只有模板
			if (!View && template) {
				$(param.target).empty().append(template)
				return
			}

			param.el = el
			var view = new View(param)

			// 非阻塞渲染
			if (view.render(template) === false) {
				view.on('render', function() {
					view.off('render'); // release memory
					callback && callback();
				});
				return
			}

			// 阻塞渲染 parse and render sub view
			var attr = 'data-view'
			$(view.el).find('[' + attr + ']').each(function(index, elem) {
				var path = $(elem).attr(attr)
				if (path) {
					// 不会因为抛出错误，而导致其他脚本不执行
					setTimeout(function() {
						exports.mount(path, param, elem)
					}, 0)
				}
			})
			callback && callback()
			return
		}

	}
})