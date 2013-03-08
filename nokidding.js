(function(){

var Graph = require('./lib/simple_graph')

var Algs = require('./lib/simple_algorithms')

var g = new Graph();

var nodes = [
'San_Francisco'
,'Seattle'
,'New_York'
,'Los_Angeles'
,'Boston'
];

var edges = [
 ['San_Francisco', 'Seattle']
,['San_Francisco', 'Los_Angeles']
,['Seattle', 'Boston']
,['Boston', 'New_York']
//,['New York', 'Los Angeles']
]

for (n in nodes) g.addNode(nodes[n]);

for (e in edges) g.addEdge(edges[e][0], edges[e][1]);

var r = Algs.floyd_warshall(g);

if(typeof(module) !== "undefined") {
  module.exports = r;
} else {
  this["r"] = r;
}

}());