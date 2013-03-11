(function(){
  var Network = function(config) {
    var that = this; 
    config = config || {};
    config.nodes = config.nodes || [];
    config.links = config.links || [];

    if (config.groups) {
      for(var g in config.groups){
        var result = Network._generateGroup(config.groups[g]);
        config.nodes = config.nodes.concat(result.nodes);
        that.groups.push({ g: result.group_nodes});
      }
    }

    that.nodes = config.nodes ? that._mapNodes(config.nodes) : [];
    that.links = config.links ? that._mapLinks(config.links) : [];
  };

  Network._generateGroup = function(options){
    var options = options || {};
    var size = options.size || 50;
    var group = options.group || 11;
    var targets = Array.isArray(options.target) ? options.target : [options.target];

    var result = { nodes: [], group_nodes: [] };

    for(var i=0; i<size; i++) {
      var node_id = "random_" + group + "_" + i;

      result.group_nodes.push(node_id);
      result.nodes.push({
        id: node_id,
        group: group
      });


      for(var t in targets) {
        result.links.push({
          source: "random_" + group + "_" + i,
          target: targets[t],
          value: 1
        });
      }
    }

    return result;
  };

  Network.prototype._mapNodes = function(nodes){
    return nodes.map(function(node){
      node.indegree = 0;
      node.outdegree = 0;
      node.cc = node.cc || 0;
      node.bc = node.bc || 0;
      node.outs = [];
      node.ins = [];

      //Set up this function to return sensible charge
      node.charge = function(){ return 3 + (this.indegree * 0.1 + this.cc * 5 + this.bc * 10); }
      return node;
    });
  }

  Network.prototype.directed_edge = function(link) {
    var that = this;

    var source = that.find(link.source),
        target = that.find(link.target);

    source.outdegree++;
    target.indegree++;

    source.outs.push(target);
    target.ins.push(source);

    link.source = source;
    link.target = target;
    
    return link;      
  }

  Network.prototype.invert_link = function(link) {
    return { source: link.target, target: link.source }
  }

  Network.prototype.Edge = function Edge(s,t) {
    return { source: s, target: t }
  }

  Network.prototype.edge = function(link) {
      directed_edge(link);
      if (!link.directed) {
        directed_edge(invert_link(link));
      }
  }  

  Network.prototype.group_edges = function(link) {
    var group = this.groups[link.source_group];
    for (s in group) {
      directed_edge(this.Edge(s, link.target));
    }

    var num_back_edges = Math.min(Math.ceiling(group.length * link.outratio), group.length);

    for (var i = 0; i < num_back_edges; i++) {
      directed_edge(this.Edge(link.target, group[i]));
    }
  }

  Network.prototype._mapLinks = function(links){
    return links.map(function(link) {
      if (link.source) edge(link)
      else if (link.source_group) group_edges(link)
      else console.log("Bad link:"+link)
    });
  }

  Network.prototype.find = function(id) {
    id = id.toLowerCase();
    for(var i in this.nodes) {
      if(this.nodes[i].id.toLowerCase() === id) return this.nodes[i];
    }
  }

  if(typeof(define) === "function") {
    define([], function(){
      return Network;
    })
  }
  else if(typeof(module) !== "undefined") {
    module.exports = Network;
  } else {
    this["Network"] = Network;
  }
}());
