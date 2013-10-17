
/**
 * Final Project
 * CS 5970 - ANNE 
 * David Rice
 **/

;(function($) {
	$(function() {

		// Preview and rendered qualities
		var pWORLD_WIDTH = 320,
			pWORLD_HEIGHT = 200,
			rWORLD_WIDTH = 1900,
			rWORLD_HEIGHT = 1200;

		var networkContainer = $('.thumbnails > .networks'),
			renderedContainer = $('.rendered');

		CPPN.InterfaceManager.init({
			$networkContainer: networkContainer,
			$renderContainer: renderedContainer,
			previewWidth: pWORLD_WIDTH,
			previewHeight: pWORLD_HEIGHT,
			renderWidth: rWORLD_WIDTH,
			renderHeight: rWORLD_HEIGHT
		});
	});
}) (jQuery);
