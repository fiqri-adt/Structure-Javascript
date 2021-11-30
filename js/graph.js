function createNode(key) {
    const neighbors = [];

    return {
        key,
        neighbors,

        addNeighbor: function(node) {
            neighbors.push(node);
        }
    }
}

function createGraph(directed = false) {
    const nodes = [];
    const edges = [];

    return {
        directed,
        nodes,
        edges,

        addNode: function(key) {
            const newNode = createNode(key);
            nodes.push(newNode);
        },
        getNode: function(key) {
            return nodes.find(function(node) {
                return node.key == key;
            })
        },
        addEdge: function(node1key, node2key) {
            const node1 = this.getNode(node1key);
            const node2 = this.getNode(node2key);

            node1.addNeighbor(node2);

            if (!directed) {
                node2.addNeighbor(node1);
            }
        },
        print: function() {
            return nodes.map(function({key, neighbors}) {
                let result = key;

                if (neighbors.length) {
                    result += ` => ${neighbors.map(function (neighbor) {
                        return neighbor.key;
                    }).join(' ')}`;
                }

                return result;
            }).join(`\n`);
        },
        recommend:function (){
            // [{id:1, title: "Backpack"}]
            // {1: [{}, {}], 2:[{}, {}, {}]}
            // localhost:8000/product.html?id=1
            let results = {};
            nodes.map(function ({ key, neighbors }){
                let itemId = key.id;
                
                if (neighbors.length) {
                    results[itemId] = neighbors.map(function (neighbor) {
                        return neighbor.key;
                    });
                }

                return itemId;
            });

            return results;
        }
    }
}

