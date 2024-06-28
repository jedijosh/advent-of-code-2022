import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day2/data'

const LOGGING = true

export async function solvePartOne ( filename : string) {

    // Score based on what you selected
    // 1 for Rock, 2 for Paper, and 3 for Scissors
    let scoringGuide: {[key: string]: number} = {
        'X': 1, // Rock
        'Y': 2, // Paper
        'Z': 3 // Scissors
    }

    // A for Rock, B for Paper, and C for Scissors
    // X for Rock, Y for Paper, and Z for Scissors
    
    // 0 if you lost, 3 if the round was a draw, and 6 if you won
    let scoreBasedOnOutcome : {[key: string]: number} = {
        'A X': 3, // Rock Rock
        'A Y': 6, // Rock Paper
        'A Z': 0, // Rock Scissors
        'B X': 0, // Paper Rock
        'B Y': 3, // Paper Paper
        'B Z': 6, // Paper Scissors
        'C X': 6, // Scissors Rock
        'C Y': 0, // Scissors Paper
        'C Z': 3 // Scissors Scissors
    }
    
    let fileLines : string[] = await parseFileIntoArrayOfLines(filename)
        
    let totalScore: number = 0
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let line: string = fileLines[lineNumber]
        let choices: string[] = line.split(' ')
        let myChoice: string = choices[1]
        let outcomeScore = scoreBasedOnOutcome[line]
        totalScore += outcomeScore + scoringGuide[myChoice]
    }

    return totalScore
}

export async function solvePartTwo ( filename : string) {

    // Score based on what you selected
    // 1 for Rock, 2 for Paper, and 3 for Scissors
    let scoringGuide: {[key: string]: number} = {
        'X': 1, // Rock
        'Y': 2, // Paper
        'Z': 3 // Scissors
    }

    // A for Rock, B for Paper, and C for Scissors
    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
    
    // 0 if you lost, 3 if the round was a draw, and 6 if you won
    let scoreBasedOnOutcome : {[key: string]: number} = {
        'X': 0, // Lose
        'Y': 3, // Draw
        'Z': 6 // Win
    }

    let permutations: {[key: string]: string} = {
        'A X': 'Z', // Rock Lose
        'A Y': 'X', // Rock Draw
        'A Z': 'Y', // Rock Win
        'B X': 'X', // Paper Lose
        'B Y': 'Y', // Paper Draw
        'B Z': 'Z', // Paper Win
        'C X': 'Y', // Scissors Lose
        'C Y': 'Z', // Scissors Draw
        'C Z': 'X' // Scissors Win
    }
    
    let fileLines : string[] = await parseFileIntoArrayOfLines(filename)
        
    let totalScore: number = 0
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let line: string = fileLines[lineNumber]
        let choices: string[] = line.split(' ')
        let myChoice: string = permutations[line]
        totalScore += scoreBasedOnOutcome[choices[1]] + scoringGuide[myChoice]
    }

    return totalScore
}

// solution(dataFolder + '/tests/input.txt')
// solvePartOne(dataFolder + '/input.txt')

// solvePartTwo(dataFolder + '/tests/input.txt')
solvePartTwo(dataFolder + '/input.txt')
    .then(answer => console.log('answer:', answer))
