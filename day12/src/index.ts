import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

import { Edge } from '../../classes/Edge'
import { Graph } from '../../classes/Graph'
import { Node } from '../../classes/Node'

const LOGGING = false

export async function solution ( filename : string, partNumber:number) {
    const fileLines = await parseFileIntoArrayOfLines(filename)
    let result = Infinity

    let heightMap: Graph = new Graph()
    let startingNode: string = '(0,0)'
    let destinationNode: string = '(0,0)'

    for (let row = 0; row < fileLines.length; row++) {
        let line = fileLines[row]
        for (let column = 0; column < line.length; column++) {
            heightMap.nodes.push(new Node(`(${row},${column})`, row, column))        
            if (line[column] === 'E') destinationNode = `(${row},${column})`
            if (line[column] === '$') startingNode = `(${row},${column})`
        }
    }

    // Populate edges
    // startingNode.edges.push(new Edge(startingNode, destinationNode))

    if (startingNode && destinationNode) {
        result = await heightMap.findShortestPathBetweenTwoNodes(startingNode, destinationNode)
    }
    return result
}

solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1, 20)

// solution(dataFolder + '/tests/input.txt', 2, 10000)
// solution(dataFolder + '/input.txt', 2, 10000)
    .then(answer => console.log('answer:', answer))
