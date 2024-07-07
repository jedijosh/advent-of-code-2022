import { parseFileIntoArrayOfLines } from '../../utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day5/data'

const LOGGING = false

export async function solution ( filename : string, moveOneAtATime: boolean) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename, false)
        
    let totalSum: number = 0
    let lineNumber = 0
    let line = fileLines[lineNumber]
    if (LOGGING) console.log('line', line)
    let startingStackLines: string[] = []
    
    // Parse the starting stack text representation into an array of arrays.
    // The start of the array is the bottom of the stack.
    while (line.trim() != '')
    {
        startingStackLines.push(line)
        lineNumber++
        line = fileLines[lineNumber]
    }
    if (LOGGING) console.log('startingStackLines', startingStackLines)
    lineNumber++


    let numberOfStacks = startingStackLines[startingStackLines.length-1].split(' ').filter(x => x != '').length
    if (LOGGING) console.log('numberOfStacks', numberOfStacks)
    
    let stackOfCrates: string[][] = new Array(numberOfStacks)
    for (let i = 0; i < numberOfStacks; i++) {
        stackOfCrates[i] = []
    }
    if (LOGGING) console.log('startingStack', stackOfCrates)
    for (let stackLineNumber = startingStackLines.length-2; stackLineNumber >= 0; stackLineNumber--) {
        let stackLine: string = startingStackLines[stackLineNumber]
        for(let stackNumber = 0; stackNumber < numberOfStacks; stackNumber++) {
            // Each stack is represented by 3 characters
            let letterToPush = stackLine[stackNumber*4+1]
            if (letterToPush && letterToPush != ' ') {
                stackOfCrates[stackNumber].push(letterToPush)
            }
        }
    }
    if (LOGGING) console.log('startingStack', stackOfCrates)

    // Parse the instructions and change the arrays as needed
    for(lineNumber; lineNumber < fileLines.length; lineNumber++) {
        let instruction = fileLines[lineNumber].split(' ')
        if (LOGGING) console.log('instruction', instruction)
        let numberOfCratesToMove = Number(instruction[1])
        let sourceStack = Number(instruction[3])-1
        let destinationStack = Number(instruction[5])-1
        // The start of the array is the bottom of the stack.
        if (LOGGING) console.log('sourceStack', stackOfCrates[sourceStack])
        if (LOGGING) console.log('destinationStack', stackOfCrates[destinationStack])
        if (LOGGING) console.log('splice start:', stackOfCrates[sourceStack].length-numberOfCratesToMove+1)
        let cratesToMove: string[] = stackOfCrates[sourceStack].splice(stackOfCrates[sourceStack].length-numberOfCratesToMove)
        if (LOGGING) console.log('cratesToMove', cratesToMove)
        if (moveOneAtATime) cratesToMove.reverse()
        stackOfCrates[destinationStack].push(...cratesToMove)
        if (LOGGING) console.log('sourceStack', stackOfCrates[sourceStack])
        if (LOGGING) console.log('destinationStack', stackOfCrates[destinationStack])
        if (LOGGING) console.log('')
    }

    let answerString = ''
    for(let stackNumber = 0; stackNumber < numberOfStacks; stackNumber++) {
        answerString += stackOfCrates[stackNumber].pop()
    }
        
    return answerString
}

// solution(dataFolder + '/tests/input.txt', true)
// solution(dataFolder + '/input.txt', true)

// solution(dataFolder + '/tests/input.txt', false)
solution(dataFolder + '/input.txt', false)
    .then(answer => console.log('answer:', answer))
