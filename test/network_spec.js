var assert = require("assert");
var Network = require("./../js/network");

describe("Network", function(){
  describe("find", function(){
    var network = new Network();
    network.nodes.push({ id: "Mary", name: "Mary" });
    network.nodes.push({ id: "Suzy", name: "Suzy" });

    it("should find a node by id", function(){
      var mary = network.find("mary");
      var Mary = network.find("Mary");

      assert.equal(mary.id, "Mary");
      assert.equal(Mary.id, "Mary");
    });
  });

  describe("generate", function(){
    var config = require("./../test/fixtures/groups.json")
    var network = new Network(config);

    it("should have 42 nodes", function(){
      assert.equal(network.nodes.length, 42);
    });

    it("Mary should have indegree 25", function(){
      assert.equal(network.find("Mary").indegree, 25);
    })

    it("Suzy should have indegree 35", function(){
      assert.equal(network.find("Suzy").indegree, 35);
    })
  });

  describe("simple.json", function(){
    var simple = require("./../test/fixtures/simple.json");
    var network = new Network(simple);

    it("should have 3 nodes", function(){
      assert.equal(network.nodes.length, 3);
    });

    it("should have 4 links", function(){
      assert.equal(network.links.length, 4);
    });

    it("should convert link source and target to nodes", function(){
      assert.equal(network.links[0].source.id, "Mary");
    });

    it("should correctly calculate indegree", function(){
      var mary = network.find("Mary");
      var suzy = network.find("Suzy");

      assert.equal(mary.indegree, 1);
      assert.equal(suzy.indegree, 2);
      assert.equal(suzy.outdegree, 2);
    });

    it("should correctly set ins and outs", function(){
      var mary = network.find("Mary");

      assert.equal(mary.outs.length, mary.outdegree);
      assert.equal(mary.ins.length, mary.indegree);
    });
  });
});