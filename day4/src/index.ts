import { parseFileIntoArrayOfLines } from '../../utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day4/data'

const LOGGING = true

export async function solvePartOne ( filename : string) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename)
        
    let totalSum: number = 0
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let elfAssignments = fileLines[lineNumber].split(',')
        const firstElfAssignment = elfAssignments[0].split('-')
        const secondElfAssignment = elfAssignments[1].split('-')
        console.log('')

        // Check if the first elf assignment is fully within the second
        if (Number(firstElfAssignment[0]) >= Number(secondElfAssignment[0]) && Number(firstElfAssignment[1]) <= Number(secondElfAssignment[1])) {
            totalSum++
        } else if (Number(secondElfAssignment[0]) >= Number(firstElfAssignment[0]) && Number(secondElfAssignment[1]) <= Number(firstElfAssignment[1])) {
            totalSum++
        }
    }
    
    return totalSum
}

export async function solvePartTwo ( filename : string) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename)
        
    let totalSum: number = 0
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let elfAssignments = fileLines[lineNumber].split(',')
        const firstElfAssignment = elfAssignments[0].split('-')
        const secondElfAssignment = elfAssignments[1].split('-')
        const firstAssignmentStart = Number(firstElfAssignment[0])
        const firstAssignmentEnd = Number(firstElfAssignment[1])
        const secondAssignmentStart = Number(secondElfAssignment[0])
        const secondAssignmentEnd = Number(secondElfAssignment[1])

        if (firstAssignmentStart >= secondAssignmentStart && firstAssignmentStart <= secondAssignmentEnd) {
            totalSum++
        } else if (secondAssignmentStart >= firstAssignmentStart && secondAssignmentStart <= firstAssignmentEnd) {
            totalSum++
        }  else if (firstAssignmentEnd <= secondAssignmentStart && firstAssignmentEnd >= secondAssignmentEnd) {
            totalSum++
        }  else if (secondAssignmentEnd <= firstAssignmentStart && secondAssignmentEnd >= firstAssignmentEnd) {
            totalSum++
        }
    }
    return totalSum
}

// solvePartOne(dataFolder + '/tests/input.txt')
// solvePartOne(dataFolder + '/input.txt')

// solvePartTwo(dataFolder + '/tests/input.txt')
solvePartTwo(dataFolder + '/input.txt')
    .then(answer => console.log('answer:', answer))
