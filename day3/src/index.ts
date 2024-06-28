import { parseFileIntoArrayOfLines } from '../../utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day3/data'

const LOGGING = true

export async function solvePartOne ( filename : string) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename)
        
    let totalSum: number = 0
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let line: string = fileLines[lineNumber]
        let firstHalf: string[] = line.slice(0, line.length / 2).split('')

        // De-duplicate the array to speed up comparison
        let uniqueFirstHalf: string[] = firstHalf.filter((item, pos) => {
            return firstHalf.indexOf(item) === pos
        })
        let secondHalf: string[] = line.slice(line.length / 2).split('')
        // De-duplicate the array to speed up comparison
        let uniqueSecondHalf: string[] = secondHalf.filter((item, pos) => {
            return secondHalf.indexOf(item) === pos
        })
        let commonItem: string = ''
        for (let i = 0; i < uniqueFirstHalf.length; i++) {
            if (uniqueSecondHalf.indexOf(uniqueFirstHalf[i]) !== -1) {
                commonItem = uniqueFirstHalf[i]
                break
            }
        }

        let priorityValue = commonItem.codePointAt(0) || 0
        // Lowercase item types a through z have priorities 1 through 26.
        // Uppercase item types A through Z have priorities 27 through 52.
        if (priorityValue > 96) {
            priorityValue -= 96
        } else {
            priorityValue -= 38
        }
        totalSum += priorityValue
    }
    return totalSum
}

export async function solvePartTwo ( filename : string) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename)
        
    let totalSum: number = 0

    // Elves are in groups of 3.  There is one common letter amongst the 3 elves
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber = lineNumber + 3) {
        let line: string = fileLines[lineNumber]
        let firstElf: string[] = fileLines[lineNumber].split('')
        let secondElf: string[] = fileLines[lineNumber + 1].split('')
        let thirdElf: string[] = fileLines[lineNumber + 2].split('')

        // De-duplicate the array to speed up comparison
        let uniqueFirstElf: string[] = firstElf.filter((item, pos) => {
            return firstElf.indexOf(item) === pos
        })
        
        // De-duplicate the array to speed up comparison
        let uniqueSecondElf: string[] = secondElf.filter((item, pos) => {
            return secondElf.indexOf(item) === pos
        })

        // De-duplicate the array to speed up comparison
        let uniqueThirdElf: string[] = thirdElf.filter((item, pos) => {
            return thirdElf.indexOf(item) === pos
        })

        let commonBetweenFirstAndSecond: string[] = uniqueFirstElf.filter((item) => {
            return uniqueSecondElf.indexOf(item) !== -1
        })
        
        let commonItem: string = commonBetweenFirstAndSecond.filter((item) => {
            return uniqueThirdElf.indexOf(item) !== -1
        })[0]
        
        // Lowercase item types a through z have priorities 1 through 26.
        // Uppercase item types A through Z have priorities 27 through 52.
        let priorityValue = commonItem.codePointAt(0) || 0
        if (priorityValue > 96) {
            priorityValue -= 96
        } else {
            priorityValue -= 38
        }
        totalSum += priorityValue
    }
    return totalSum
}

solvePartOne(dataFolder + '/tests/input.txt')
// solvePartOne(dataFolder + '/input.txt')

// solvePartTwo(dataFolder + '/tests/input.txt')
// solvePartTwo(dataFolder + '/input.txt')
    .then(answer => console.log('answer:', answer))
