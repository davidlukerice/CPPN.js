

(function($) {

	$(function() {

		var width = 800,
			height = 600,
			padding = 20;

		var svg = d3.select('.network').append('svg')
				.attr('width', width)
				.attr('height', height);
		svg.append('g').attr('class','edges');
		svg.append('g').attr('class','nodes');

		var Node = function(options) {
			$.extend(this, this.defaultOptions, options);
		};
		Node.prototype = {
			defaultOptions: {
				weight: 1,
				depthX: 0,
				depthY: 0,
				activationFunction: function(x) {
					return x;
				}
			}
		};

		var Edge = function(options) {
			$.extend(this, this.defaultOptions, options);
		};
		Edge.prototype = {
			defaultOptions: {
				inNode: null,
				outNode: null
			}
		};

		var inX = new Node();
		var inY = new Node({depthY: 0.5});
		var bias = new Node({depthY: 1.0});
		var out = new Node({depthX:1.0});

		var xo = new Edge({inNode:inX, outNode:out});
		var yo = new Edge({inNode:inY, outNode:out});
		var bo = new Edge({inNode:bias, outNode:out});

		var nodes = [inX, inY, bias, out];
		var edges = [xo, yo, bo];

		// TODO: calculate from nodes
		var depthBuckets = [
			{
				level: 0,
				nodes:[inX, inY, bias]
			},{
				level: 1,
				nodes:[out]
			}];

		
		function getX(e,i) {
			return e.depthX*(width-2*padding)+padding;
		}
		function getY(e,i) {
			return e.depthY*(height-2*padding) + padding;
		}

		function getNumAtDepth(depth) {
			var num=0, i, len = nodes.length;
			for (i=0; i<len;++i)
				if (depth === nodes[i].depthX)
					++num;
			return num;
		}

		var diff = 200;
		function getD(e,i) {
			var x1 = getX1(e),
				y1 = getY1(e),
				x2 = getX2(e),
				y2 = getY2(e);
			return 'M'+x1+','+y1+' C'+(x1+diff)+
				   ','+y1+' '+(x2-diff)+','+y2+
				   ' '+x2+','+y2;
		}
		function getX1(e) {
			return getX(e.inNode);
		}
		function getY1(e) {
			return getY(e.inNode);
		}
		function getX2(e) {
			return getX(e.outNode);
		}
		function getY2(e) {
			return getY(e.outNode);
		}

		// render nodes
		var dNodes = svg.select('.nodes').selectAll('.node')
				.data(nodes);

		dNodes.transition()
			.duration(750)
			.attr('cx', getX)
			.attr('cy', getY);

		dNodes.enter().append('circle')
			.attr('class', 'node')
			.attr('cx', getX)
			.attr('cy', getY)
			.attr('r', 10)
			.attr('stroke', 'black')
			.attr('stroke-width', 2)
			.attr('fill', 'red');

		// Render edges
		var dEdges = svg.select('.edges').selectAll('.edge')
				.data(edges);
		dEdges.transition()
			.duration(750)
			.attr('d', getD);
		dEdges.enter().append('path')
			.attr('class', 'edge')
			.attr('d', getD)
			.attr('fill', 'none')
			.style('stroke', 'black')
			.style('stroke-width', 2);
	});

})(jQuery);