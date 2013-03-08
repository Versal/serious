/*
 *  Serious Graph 
 *  (c) 2013 Alexy Khrabrov <deliverable@gmail.com>
 *
 *  based on the Graph Dracula library
 *  (c) 2010 Philipp Strathausen <strathausen@gmail.com>, http://strathausen.eu
 *  Contributions by Jake Stothard <stothardj@gmail.com>.
 *
 *  based on the Graph JavaScript framework, version 0.0.1
 *  (c) 2006 Aslak Hellesoy <aslak.hellesoy@gmail.com>
 *  (c) 2006 Dave Hoover <dave.hoover@gmail.com>
 *
 *  This code is freely distributable under the MIT license. Commercial use is
 *  hereby granted without any cost or restriction.
 *
 /*--------------------------------------------------------------------------*/


(function(){

/*
 * Graph
 */
var Graph = function() {
  this.nodes = {};
  this.edges = [];
  this.snapshots = []; // previous graph states TODO to be implemented
};
Graph.prototype = {
  /*
   * add a node
   * @id          the node's ID (string or number)
   * @content     (optional, dictionary) can contain any information that is
   *              being interpreted by the layout algorithm or the graph
   *              representation
   */
  addNode: function(id, content) {
    /* testing if node is already existing in the graph */
    if(this.nodes[id] === undefined) {
      this.nodes[id] = new Graph.Node(id, content);
    }
    return this.nodes[id];
  },

  
  addEdge: function(source, target, directed, weight) {
    weight = weight || 1;
    var s = this.addNode(source);
    var t = this.addNode(target);

    var directedEdge = function(g, s,t,weight) {
      var edge = new Graph.Edge({ source: s, target: t, weight: weight });
      s.edges.push(edge);
      g.edges.push(edge);
      // NOTE: Even directed edges are added to both nodes.
      t.edges.push(edge);
    }

    directedEdge(this, s,t, weight);
    if (!directed) directedEdge(this, t,s, weight);
  },

  addNetwork: function(network) {
    var nodes  = network['nodes'];
    var edges  = network['links'];
    var groups = network['groups'];

    for (n in nodes) {
      this.addNode(n);
    }

    var directed = true;
    for (e in edges) {
      var edge = edges[e];
      this.addEdge(edge['source'], edge['target'], directed);
    }

    for (g in groups) {
      group = groups[g];
      var anon_id = 0;
      for (i = 0; i < group.size; i++, anon_id++) {
        node_id = group.name + anon_id;
        this.addNode(node_id);
        this.addEdge(node_id, group['target'])
      }
    }
  },

  /* TODO to be implemented
   * Preserve a copy of the graph state (nodes, positions, ...)
   * @comment     a comment describing the state
   */
  snapShot: function(comment) {
    // FIXME
    //var graph = new Graph();
    //graph.nodes = jQuery.extend(true, {}, this.nodes);
    //graph.edges = jQuery.extend(true, {}, this.edges);
    //this.snapshots.push({comment: comment, graph: graph});
  },
  removeNode: function(id) {
    delete this.nodes[id];
    for(var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].source.id == id || this.edges[i].target.id == id) {
        this.edges.splice(i, 1);
        i--;
      }
    }
  }
};

/*
 * Edge
 */
Graph.Edge = function SeriousEdge(opts) {
  this.source = opts.source;
  this.target = opts.target;
  this.weight = opts.weight;
  this.style = { directed: false };
};

Graph.Edge.prototype = {
  weight: 0
}

/*
 * Node
 */
Graph.Node = function SeriousNode(id, node) {
  node = node || {};
  node.id = id;
  node.edges = [];
  
  return node;
};
Graph.Node.prototype = {
};

/*
"network": {
    "nodes": [
      { "id": "Mary", "color": "pink" },
      { "id": "Pete", "color": "blue" }
    ],

    "links": [
      { "source": "Mary", "target": "Pete" },
      { "source": "Pete", "target": "Mary" }
    ],

    "groups": [
      { "name": "MaryFriends", "group": 11, "size": 3, "target": "Mary"}
    ]
  }
*/

if(typeof(module) !== "undefined") {
  module.exports = Graph;
} else {
  this["Graph"] = Graph;
}
}());