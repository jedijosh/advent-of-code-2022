import { parseFileIntoArrayOfLines } from '../../utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day6/data'

const LOGGING = false

export async function solution ( filename : string, moveOneAtATime: boolean) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename, true)
        
    let startPosition = 0
    let markerFound = false
    let line = fileLines[0]
    if (LOGGING) console.log('line', line)
    // Find starting position.  Make sure the first 3 letters don't have any duplicates
    const first3Letters: string = line.substring(0, 3)
    for (let i = 1; i < first3Letters.length; i++) {
        let letterToCheck = first3Letters.substring(i, i+1)
        if (LOGGING) console.log(`checking letter ${letterToCheck}`)
        let index = first3Letters.substring(0, i).indexOf(letterToCheck)
        if (index !== -1) {
            startPosition = index + 1
            if (LOGGING) console.log(`setting start position to ${startPosition}`)
        }
    }

    let skippedMultiple = false

    while(!markerFound) {
        // TODO: Check if any of the letters in last 3 letters are duplicated
        let last3Letters = line.substring(startPosition, startPosition + 3)

        let duplicateIndex = await indexOfDuplicate(last3Letters)
        if (duplicateIndex !== -1) {
            startPosition = startPosition + duplicateIndex + 1
            if (LOGGING) console.log(`found duplicates in substring, increasing start position to ${startPosition}`)
            
        } else {
            let nextLetter = line.substring(startPosition + 3, startPosition + 4)
            if (LOGGING) console.log(`startPosition: ${startPosition}, searching for ${nextLetter} in ${last3Letters}`)
            let index = last3Letters.indexOf(nextLetter)
            if (index === -1) {
                markerFound = true
            } else {
                startPosition = startPosition + index + 1
                if (index > 0) skippedMultiple = true
                if (LOGGING) console.log(`starting next search at ${startPosition}`)
            }
        }
    }

    return startPosition + 4
}

async function indexOfDuplicate ( stringToCheck: string ) {
    if (LOGGING) console.log(`checking for duplicates in ${stringToCheck}`)
    let newIndex = -1
    for (let i = 1; i < stringToCheck.length; i++) {
        let letterToCheck = stringToCheck.substring(i, i+1)
        if (LOGGING) console.log(`checking letter ${letterToCheck}`)
        let index = stringToCheck.substring(0, i).indexOf(letterToCheck)
        if (index !== -1) {
            newIndex = index
            if (LOGGING) console.log(`setting start position to ${index}`)
        }
    }
    return newIndex
}

export async function solvePartTwo ( filename : string) {

    
}

// solution(dataFolder + '/tests/input.txt', true)
solution(dataFolder + '/input.txt', true)

// solution(dataFolder + '/tests/input.txt', true)
// solution(dataFolder + '/input.txt', true)
    .then(answer => console.log('answer:', answer))
