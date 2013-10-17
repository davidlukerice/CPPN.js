
var CPPN = CPPN || {};

(function() {

	var log = CPPN.Utils.log,
		im = {},
		lastRenderer = null,
		params;

	im.init = function(passedParams) {

		$('.thumbnails .btn.reset').on('click', reset);

		$('.thumbnails .btn.random').on('click', function(){
			next(function(renderer) {
				renderer.network.randomMutation();
			})
		});
		$('.thumbnails .btn.split').on('click', function(){
			next(function(renderer) {
				renderer.network.splitRandomConnection();
			})
		});
		$('.thumbnails .btn.connection').on('click', function(){
			next(function(renderer) {
				renderer.network.addRandomConnection();
			})
		});
		$('.thumbnails .btn.weightMutation').on('click', function(){
			next(function(renderer) {
				renderer.network.mutateAllConnectionWeights();
			})
		});

		params = passedParams;
		reset();
	};

	im.registerLastRenderer = function(networkRenderer) {
		lastRenderer = networkRenderer;
	};

	function reset() {
		var network, renderer;

		$('img').remove();
		network = new CPPN.Network(2,3);
		renderer = new CPPN.NetworkRenderer({
			$networkContainer: params.$networkContainer,
			$renderContainer: params.$renderContainer,
			network: network,
			previewWidth: params.previewWidth,
			previewHeight: params.previewHeight,
			renderWidth: params.renderWidth,
			renderHeight: params.renderHeight
		});
		renderer.renderThumbnail();
		im.registerLastRenderer(renderer);
		console.log(renderer.network.toString());
	}

	/**
	 * @param modifyHandler(CPPN.Renderer) A function to modify the network
	 **/
	function next(modifyHandler) {
		var newRenderer = lastRenderer.clone(),
			$thumbnails = $('.thumbnails');
		modifyHandler(newRenderer);
		newRenderer.renderThumbnail();
		CPPN.InterfaceManager.registerLastRenderer(newRenderer);
		
		var leftPos = $thumbnails.scrollLeft();
		var width = $thumbnails.width();
		$('.thumbnails').animate({scrollLeft: leftPos+width}, 400);
		console.log(newRenderer.network.toString());
	}

	CPPN.InterfaceManager = im;
})();