
var CPPN = CPPN || {};

(function() {

	var log = CPPN.Utils.log,
		r;

	r = function(parameters) {
		this.parameters = parameters;
		$.extend(this,
				 this.defaultOptions,
				 parameters);
	};

	r.prototype = {
		defaultOptions: {
			$networkContainer: null,
			$renderContainer: null,
			network: null,
			previewWidth: 320, previewHeight: 200,
			renderWidth: 1900, renderHeight: 1200
		},

		renderThumbnail: function() {
			var canvas;
			canvas = render.call(this,
								 this.previewWidth,
								 this.previewHeight);
			appendPreview.call(this, canvas);
		},

		clone: function() {
			var clonedParameters = this.parameters,
				newNetwork = clonedParameters.network.copy(),
				newRenderer;
			clonedParameters.network = newNetwork;
			return new r(clonedParameters);
		}
	};

	// Private Functions
	function render(width, height) {
		return CPPN.renderNetwork(this.network, width, height);
	}
	function appendPreview(canvas) {
		var self = this,
			img = CPPN.Utils.canvasToImage(canvas),
			$img = $(img);

		// attach appropriate handlers
		$img.on('click', function() {
			showFullRender.call(self);
		});
		this.$networkContainer.append($img);
	}

	function showFullRender() {
		var self = this,
			canvas, img;
		this.$renderContainer.html('loading...');
		setTimeout(function(){
			canvas = render.call(self,
								 self.renderWidth,
								 self.renderHeight);
			img = CPPN.Utils.canvasToImage(canvas);
			self.$renderContainer.html(img);
		}, 100);
	}

	CPPN.NetworkRenderer = r;
})();