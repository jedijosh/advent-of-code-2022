import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day1/data'

const LOGGING = false

export async function solution ( filename : string, numberOfElves : number) {

    let caloriesByElf: number[] = []
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    
    
    let currentWeightBeingCarried: number = 0
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let line = Number(fileLines[lineNumber])
        if (!line) {
            if (LOGGING) console.log('---------------- BLANK LINE - END OF ELF ----------------')
            caloriesByElf.push(currentWeightBeingCarried)
            currentWeightBeingCarried = 0
        } else {
            currentWeightBeingCarried += line
        }
    }
    caloriesByElf.push(currentWeightBeingCarried)
    caloriesByElf.sort((a, b) => b - a)

    if (LOGGING) console.log(caloriesByElf)
    let totalWeight: number = 0
    for (let i = 0; i < numberOfElves; i++) {
        totalWeight += caloriesByElf[i]
    }
    return totalWeight
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 3)
solution(dataFolder + '/input.txt', 3)
    .then(answer => console.log('answer:', answer))
