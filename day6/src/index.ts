import { parseFileIntoArrayOfLines } from '../../utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day6/data'

const LOGGING = false

export async function solution ( filename : string, numberOfCharactersToCheck: number) {

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename, true)
        
    let startPosition = 0
    let markerFound = false
    let line = fileLines[0]
    if (LOGGING) console.log('line', line)

    while(!markerFound) {
        // TODO: Check if any of the letters in last 3 letters are duplicated
        let lettersToCheck = line.substring(startPosition, startPosition + numberOfCharactersToCheck)

        let duplicateIndex = await indexOfDuplicate(lettersToCheck)
        if (duplicateIndex !== -1) {
            startPosition = startPosition + duplicateIndex + 1
            if (LOGGING) console.log(`found duplicates in substring, increasing start position to ${startPosition}`)
            
        } else {
            markerFound = true
        }
    }

    return startPosition + numberOfCharactersToCheck
}

async function indexOfDuplicate ( stringToCheck: string ) {
    if (LOGGING) console.log(`checking for duplicates in ${stringToCheck}`)
    let duplicateIndex = -1
    // Iterate through each letter of stringToCheck.  Check the remainder of the string to see if the letter is present.
    // If the letter is duplicated in the string, the next search should exclude the second-to-last instance of the duplicate.
    for (let i = 0; i < stringToCheck.length - 1; i++) {
        let letterToCheck = stringToCheck.substring(i, i+1)
        if (LOGGING) console.log(`checking letter ${letterToCheck} in ${stringToCheck.substring(i+1)}`)
        // The current letter at i is duplicated.  Set the duplicate index so the next search starts at the next letter.
        if (stringToCheck.substring(i+1).indexOf(letterToCheck) !== -1) {
            duplicateIndex = i
            if (LOGGING) console.log(`setting duplicate position to ${duplicateIndex}`)
        }
    }
    return duplicateIndex
}

solution(dataFolder + '/tests/input2.txt', 4)
// solution(dataFolder + '/input.txt', 4)

// solution(dataFolder + '/tests/input.txt', 14)
// solution(dataFolder + '/input.txt', 14)
    .then(answer => console.log('answer:', answer))
