import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    let result: number = 0
    let highestVisibility = 0
    const fileLines = await parseFileIntoArrayOfLines(filename)
    
    const numberOfColumns = fileLines[0].length
    const numberOfRows = fileLines.length

    // Using a set so only distinct coordinates are counted
    let visibleTrees: Set<string> = new Set()

    const topToBottom: number [][] = new Array(numberOfRows)
    const leftToRight: number [][] = new Array(numberOfColumns)

    for (let i = 0; i < numberOfColumns; i++) {
        topToBottom[i] = []
    }
    // Read in a line at a time
    for (let i = 0; i < fileLines.length; i++) {
        const line = fileLines[i]
        leftToRight[i] = line.split('').map(Number) 
        for(let j = 0; j < line.length; j++) {
            // Go through each character in the line
            // j becomes the column, i is the row
            topToBottom[j][i] = Number(line[j])
        }
    }

    if (partNumber === 1) {
        // Process each row from left to right
        for (let i = 0; i < leftToRight.length; i++) {
            let tallestTree: number = -1
            for (let j = 0; j < leftToRight[i].length; j++) {
                let currentHeight = leftToRight[i][j]
                if (currentHeight > tallestTree) {
                    visibleTrees.add(`${i},${j}`)
                    if (LOGGING) console.log(`leftToRight: tree at ${i},${j} is visible.`)
                    tallestTree = currentHeight
                }
                if (currentHeight === 9) break
            }
        }

        // Process each row from right to left
        for (let i = 0; i < leftToRight.length; i++) {
            let tallestTree = -1
            for (let j = leftToRight[i].length; j > 0; j--) {
                let currentHeight = leftToRight[i][j]
                if (currentHeight > tallestTree) {
                    // Row would be correct, column needs to be calculated
                    visibleTrees.add(`${i},${j}`)
                    if (LOGGING) console.log(`rightToLeft: tree at ${i},${j} is visible.`)
                    tallestTree = currentHeight
                }
                if (currentHeight === 9) break
            }
        }

        // Process each column from top to bottom
        for (let i = 0; i < topToBottom.length; i++) {
            let tallestTree: number = -1
            for (let j = 0; j < topToBottom[i].length; j++) {
                let currentHeight = topToBottom[i][j]
                if (currentHeight > tallestTree) {
                    // i is the column number, j is the row number
                    visibleTrees.add(`${j},${i}`)
                    if (LOGGING) console.log(`topToBottom: tree at ${i},${j} is visible.`)
                    tallestTree = currentHeight
                }
                if (currentHeight === 9) break
            }
        }

        // Process each column from bottom to top
        for (let i = 0; i < topToBottom.length; i++) {
            let tallestTree: number = -1
            for (let j = topToBottom[i].length; j > 0; j--) {
                let currentHeight = topToBottom[i][j]
                if (currentHeight > tallestTree) {
                    // i is the column number, j is the row number
                    visibleTrees.add(`${j},${i}`)
                    if (LOGGING) console.log(`bottom to top: tree at ${i},${j} is visible.`)
                    tallestTree = currentHeight
                }
                if (currentHeight === 9) break
            }
        }
    } else {
        // Part 2
        // Process each square to find visibility
        // Skip all entries on the edge.  They will have a 0 visibility in one direction meaning the multiplication will be 0.
        for (let row = 1; row < leftToRight.length - 1; row++) {
            for (let column = 1; column < leftToRight[row].length - 1; column++) {
                let visibilityLookingRight = findVisibility(leftToRight[row].slice(column))
                let currentVisibility = visibilityLookingRight
                if (currentVisibility === 0) continue
                
                let visibilityLookingLeft = findVisibility(leftToRight[row].slice(0, column+1).reverse())
                currentVisibility = currentVisibility * visibilityLookingLeft
                if (currentVisibility === 0) continue
                
                let visibilityLookingUp = findVisibility(topToBottom[column].slice(0, row+1).reverse())
                currentVisibility = currentVisibility * visibilityLookingUp
                if (currentVisibility === 0) continue

                let visibilityLookingDown = findVisibility(topToBottom[column].slice(row))
                currentVisibility = currentVisibility * visibilityLookingDown

                if (currentVisibility > highestVisibility) {
                    highestVisibility = currentVisibility
                    console.log(`Tree at ${row}, ${column} has highest visibility of ${currentVisibility}`)
                    // console.log('lookingDown', topToBottom[column].slice(row))
                    // console.log('visibilityLookingRight', visibilityLookingRight)
                    // console.log('visibilityLookingLeft', visibilityLookingLeft)
                    // console.log('visibilityLookingUp', visibilityLookingUp)
                    // console.log('visibilityLookingDown', visibilityLookingDown)
                    // console.log('topToBottom', topToBottom[column])
                    // console.log('leftToRight', leftToRight[row])
                    // console.log('')
                }
            }
        }
    }
    partNumber === 1 ? result = visibleTrees.size : result = highestVisibility
    return result
}

// searchArray[0] is the current location
// The contents of the array are the trees in the direction being searched
function findVisibility (searchArray: Array<number>) {
    // console.log('searchArray', searchArray)
    let visibility = 1
    let i = 1
    let currentHeight = searchArray[0]
    while (searchArray[i] < currentHeight && i < searchArray.length - 1) {
        // currentHeight = searchArray[i]
        visibility += 1
        i++
    }
    return visibility
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 2)
solution(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
