import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    let positionsVisited = new Set()
    let knots: Array<{x: number, y: number}> = new Array()
    let numberOfKnots
    partNumber === 1? numberOfKnots = 2 : numberOfKnots = 10 
    for(let i = 0; i < numberOfKnots; i++) {
        knots[i] = {x: 0, y: 0}
    }
    let positionAsString: string = knots[knots.length-1].x.toString() + ',' + knots[knots.length-1].y.toString()
    positionsVisited.add(positionAsString)

    const fileLines = await parseFileIntoArrayOfLines(filename)
    
    // Read in a line at a time
    for (let i = 0; i < fileLines.length; i++) {
        const line = fileLines[i]
        const splitLine = line.split(' ')
        let direction = splitLine[0]
        let numberOfSteps = splitLine[1]
        if (LOGGING) console.log(`direction: ${direction}, number: ${numberOfSteps}`)

        for (let numberOfStepsRemaining = numberOfSteps; numberOfStepsRemaining > 0; numberOfStepsRemaining--) {
            // Move the head of the rope
            findNewPosition(knots[0], direction)
            // For each other knot, see if the knot needs to move
            for (let knotNumber = 1; knotNumber < knots.length; knotNumber++) {
                let firstLocation = knots[knotNumber-1]
                let secondLocation = knots[knotNumber]
                if (!isAdjacent(firstLocation, secondLocation)) {
                    if (LOGGING) console.log(`${knotNumber}: (${secondLocation.x}, ${secondLocation.y}) is not adjacent to (${firstLocation.x}, ${firstLocation.y})`)
                    // Check if in same row or same column.  If not, make 1 tail move to get into same row or same column.
                    if (firstLocation.x === secondLocation.x) {
                        firstLocation.y < secondLocation.y ? findNewPosition(secondLocation, 'D') : findNewPosition(secondLocation, 'U')
                    } else if (firstLocation.y === secondLocation.y) {
                        firstLocation.x < secondLocation.x ? findNewPosition(secondLocation, 'L') : findNewPosition(secondLocation, 'R')
                        // Tail is in same row or column, move the same direction as the head was moving
                    } else {
                        // Tail needs to move diagonally to get into the same row or same column
                        if (firstLocation.x < secondLocation.x) {
                            findNewPosition(secondLocation, 'L')
                        } else {
                            findNewPosition(secondLocation, 'R')
                        }
                    
                        if (firstLocation.y < secondLocation.y) {
                            findNewPosition(secondLocation, 'D')
                        } else {
                            findNewPosition(secondLocation, 'U')
                        }
                    }
                    if (LOGGING) console.log(`${knotNumber}: new location is (${secondLocation.x}, ${secondLocation.y})`)
                }
            }
            if (LOGGING) console.log(knots)
            positionAsString = knots[knots.length-1].x.toString() + ',' + knots[knots.length-1].y.toString()
            positionsVisited.add(positionAsString)             
        }    
    }   

    if (LOGGING) console.log(knots)
    if (LOGGING) console.log(positionsVisited)
    return positionsVisited.size
}

function findNewPosition (currentLocation: {x: number, y: number}, direction: String) {
    switch (direction) {
        case 'D':
            currentLocation.y--
            break
        case 'U':
            currentLocation.y++
            break
        case 'L':
            currentLocation.x--
            break
        case 'R':
            currentLocation.x++
    }
    return currentLocation
}

export function isAdjacent (firstLocation: {x: number, y: number}, secondLocation: {x: number, y: number}) {
    let xDifference = Math.abs(firstLocation.x - secondLocation.x)
    let yDifference = Math.abs(firstLocation.y - secondLocation.y)

    if (xDifference <= 1 && yDifference <= 1) {
        return true
    } else {
        return false
    }
}

// export async function solution ( filename : string, partNumber: number) {
//     let positionsVisited = new Set()
//     let headCurrentPosition = {x: 0, y: 0}
//     let tailCurrentPosition = {x: 0, y: 0}
//     positionsVisited.add(tailCurrentPosition)

//     const fileLines = await parseFileIntoArrayOfLines(filename)
    
//     // Read in a line at a time
//     for (let i = 0; i < fileLines.length; i++) {
//         const line = fileLines[i]
//         const splitLine = line.split(' ')
//         let direction = splitLine[0]
//         let numberOfSteps = splitLine[1]
//         console.log(`direction: ${direction}, number: ${numberOfSteps}`)

//         for (let numberOfStepsRemaining = numberOfSteps; numberOfStepsRemaining > 0; numberOfStepsRemaining--) {
//             findNewPosition(headCurrentPosition, direction)
//             // If not adjacent, tail needs to move.
//             if (!isAdjacent(headCurrentPosition, tailCurrentPosition)) {
//                 // Check if in same row or same column.  If not, make 1 tail move to get into same row or same column.
//                 if (headCurrentPosition.x === tailCurrentPosition.x || headCurrentPosition.y == tailCurrentPosition.y) {
//                     findNewPosition(tailCurrentPosition, direction)
//                     // Tail is in same row or column, move the same direction as the head was moving
//                 } else {
//                     // Tail needs to move diagonally to get into the same row or same column
//                     if (headCurrentPosition.x < tailCurrentPosition.x) {
//                         findNewPosition(tailCurrentPosition, 'L')
//                     } else {
//                         findNewPosition(tailCurrentPosition, 'R')
//                     }
                    
//                     if (headCurrentPosition.y < tailCurrentPosition.y) {
//                         findNewPosition(tailCurrentPosition, 'D')
//                     } else {
//                         findNewPosition(tailCurrentPosition, 'U')
//                     }
//                 }
//                 // Check if new tail location exists in the set
//                 let positionAsString: string = tailCurrentPosition.x.toString() + ',' + tailCurrentPosition.y.toString()
//                 if (!positionsVisited.has(positionAsString)) positionsVisited.add(positionAsString)
//             }
//         }    
//     }   

//     if (partNumber === 1) {
        
//     } else {
        
//     }
//     return positionsVisited.size
// }



// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 2)
// solution(dataFolder + '/tests/input2.txt', 2)
solution(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
