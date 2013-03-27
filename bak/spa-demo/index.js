;
(function() {
	seajs.config({
		preload: ['./gallery/seajs/2.0.0b3/plugin-text'],
		alias: {
			'spa': './gallery/backbone-spa/0.1/backbone-spa'
		}
	});
	seajs.use(['spa'], function(spa) {
		spa.start({
			frame: './app/frame/frame',
			target: '.main',
			view: './app/frame/main',
			404: './app/frame/404'
		});
	});
	// debug
	seajs.use('jquery', function($) {
		window.$ = $;
	});
})();