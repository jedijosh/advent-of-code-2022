import { Edge } from '../classes/Edge'
import { Node } from '../classes/Node'

// A graph is made up of points/nodes/verticies.
// Connections between verticies are called edges/links/lines.  These can have a weight associated with them
export class Graph {
    nodes: Array<Node> = new Array()
    edges: Array<Edge> = new Array()

    constructor() {
        
    }

    public async findShortestPathBetweenTwoNodes(startingNodeId: string, goalNodeId: string, logging: boolean = false) {
        let shortestPathLength: number = Infinity

        // Algorithm
        // Let the node at which we are starting be called the initial node. Let the distance of node Y be the distance from the initial node to Y. 
        // Dijkstra's algorithm will initially start with infinite distances and will try to improve them step by step.

        // 1. Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.

        // 2. Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. During the run of the algorithm, the tentative distance of a node v is the length of the shortest path discovered so far between the node v and the starting node. Since initially no path is known to any other vertex than the source itself (which is a path of length zero), all other tentative distances are initially set to infinity. Set the initial node as current.[17]

        // 3. For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node. Compare the newly calculated tentative distance to the one currently assigned to the neighbor and assign it the smaller one. For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbor B has length 2, then the distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, the current value will be kept.

        // 4. When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited and remove it from the unvisited set. A visited node will never be checked again (this is valid and optimal in connection with the behavior in step 6.: that the next nodes to visit will always be in the order of 'smallest distance from initial node first' so any visits after would have a greater distance).

        // 5. If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial node and remaining unvisited nodes), then stop. The algorithm has finished.

        // 6. Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new current node, and go back to step 3.

        // When planning a route, it is actually not necessary to wait until the destination node is "visited" as above: the algorithm can stop once the destination node has the smallest tentative distance among all "unvisited" nodes (and thus could be selected as the next "current"). 

        ////////


        // 1. Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
        // 2. Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. 
        //    During the run of the algorithm, the tentative distance of a node v is the length of the shortest path discovered so far between the node v and the starting node. 
        //    Since initially no path is known to any other vertex than the source itself (which is a path of length zero), all other tentative distances are initially set to infinity.
        let nodesInGraph: Array<{ node: Node, distanceFromStartingNode: number, visited: boolean }> = new Array()
        this.nodes.forEach((node: Node) => {
            nodesInGraph.push({
                node: node, 
                distanceFromStartingNode: node.id === startingNodeId ? 0 : Infinity,
                visited: false
            })
        })
        console.log(nodesInGraph)
        // Set the initial node as current by sorting for the shortest distance.
        nodesInGraph.sort((nodeA, nodeB) => { return nodeA.distanceFromStartingNode - nodeB.distanceFromStartingNode })

        // 3. For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node. 
        //    Compare the newly calculated tentative distance to the one currently assigned to the neighbor and assign it the smaller one. 
        //    For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbor B has length 2, then the distance to B through A will be 6 + 2 = 8. \
        //    If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, the current value will be kept.
        while (nodesInGraph.length > 0 ) {   
            // Find first node in the array which has not been visited.  Array is already sorted by shortest distance. 
            let firstItemInArray: any = nodesInGraph.find(node => node.visited === false )
            console.log('Evaluating node', firstItemInArray)
            if (!firstItemInArray) break

            if (firstItemInArray.node.id === goalNodeId) {
                console.log('reached goal!')
                // Shift() removed the node from nodesInGraph
                let goalNode = nodesInGraph.find(node => { return node.node.id === goalNodeId})
                console.log('goal node:', goalNode)
                if (goalNode) {
                    console.log('updating shortest path length to', goalNode.distanceFromStartingNode)
                    shortestPathLength = goalNode.distanceFromStartingNode
                }
                break
            }

            let sourceNode = nodesInGraph.find(node => { return node.node.id === firstItemInArray.node.id })
            firstItemInArray.node.edges.forEach((edge: Edge) => {
                console.log('Evaluating edge', edge)
                let destinationNode = nodesInGraph.find(node => { return node.node.id === edge.node2.id })
                // Don't consider visited neighbors
                if (destinationNode && !destinationNode.visited) {
                    let distanceToDestinationNodeViaThisPath = firstItemInArray.distanceFromStartingNode + edge.cost
                    console.log(`new distance: ${distanceToDestinationNodeViaThisPath}, previous distance: ${destinationNode.distanceFromStartingNode}`)
                    if (destinationNode && (distanceToDestinationNodeViaThisPath < destinationNode.distanceFromStartingNode)) {
                        console.log(`new distance of ${distanceToDestinationNodeViaThisPath} is shorter than the previous distance ${destinationNode.distanceFromStartingNode}`)
                        destinationNode.distanceFromStartingNode = distanceToDestinationNodeViaThisPath
                        console.log('destination node after update:', destinationNode)
                    }
                }
                
            })

            // 4. When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited and remove it from the unvisited set. 
            //    A visited node will never be checked again (this is valid and optimal in connection with the behavior in step 6.: that the next nodes to visit will always be 
            //    in the order of 'smallest distance from initial node first' so any visits after would have a greater distance).
            if (sourceNode) sourceNode.visited = true
            nodesInGraph.sort((nodeA, nodeB) => { return nodeB.distanceFromStartingNode - nodeA.distanceFromStartingNode })
        }

        // If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial node and remaining unvisited nodes), then stop. The algorithm has finished.

        // Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new current node, and go back to step 3.

        // When planning a route, it is actually not necessary to wait until the destination node is "visited" as above: the algorithm can stop once the destination node has the smallest tentative distance among all "unvisited" nodes (and thus could be selected as the next "current"). 
        

        // }
        // let currentTime: Date = new Date(Date.now())
        // console.log(`${currentTime.toISOString()} execution finished`)
        // console.log('Counter', counter)
        return shortestPathLength
    }
} 