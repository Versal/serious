
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

//for (n in nodes) g.addNode(nodes[n]);

//for (e in edges) g.addEdge(edges[e][0], edges[e][1]);

var network = 
  { nodes:
   [ { id: 'Mary', color: 'pink' },
     { id: 'Pete', color: 'blue' } ],
  links:
   [ { source: 'Mary', target: 'Pete' },
     { source: 'Pete', target: 'Mary' } ],
  groups:
   [ { name: 'MaryFriends',
       group: 11,
       size: 3,
       targets: { 'Mary': 0.6, 'MrPhillips': 0.4 } ] };

g.addNetwork(network);

var r = Algs.simple_betweenness_centrality(g);

console.log(r)
