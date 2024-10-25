import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    const fileLines = await parseFileIntoArrayOfLines(filename)
    let currentCycle = 1
    let xValue = 1
    let signalStrengths: Array<{cycle: number, strength: number}> = new Array()
    let cyclesToMeasure = [20, 60, 100, 140, 180, 220]
    let nextCycleToMeasure = cyclesToMeasure.splice(0, 1)[0]
    
    // Read in a line at a time
    for (let i = 0; i < fileLines.length; i++) {
        const line = fileLines[i]
        const splitLine = line.split(' ')
        let instruction = splitLine[0]
        let valueIncrease = parseInt(splitLine[1])
        if (LOGGING) console.log(`instruction: ${instruction}, value: ${valueIncrease}`)

        if (instruction === 'noop') {
            if (nextCycleToMeasure === currentCycle) {
                if (LOGGING) console.log(`pushing strength ${xValue} for cycle ${nextCycleToMeasure}. instruction is ${line}`)
                signalStrengths.push({cycle: nextCycleToMeasure, strength: xValue})
                nextCycleToMeasure = cyclesToMeasure.splice(0, 1)[0]
            }
            currentCycle++
        }
        if (instruction === 'addx') {
            // If the nextCycleToMeasure falls within the next 2 cycles, add the signal strength to the array
            if (nextCycleToMeasure === currentCycle || currentCycle + 2 > nextCycleToMeasure) {
                if (LOGGING) console.log(`pushing strength ${xValue} for cycle ${nextCycleToMeasure}. instruction is ${line}`)
                signalStrengths.push({cycle: nextCycleToMeasure, strength: xValue})
                nextCycleToMeasure = cyclesToMeasure.splice(0, 1)[0]
            }
            currentCycle += 2
            xValue += valueIncrease
        }
    }   

    let result: number = 0
    signalStrengths.forEach(signalStrength => {
        result += (signalStrength.cycle * signalStrength.strength)
    })
    return result
}

export async function solutionPartTwo ( filename : string, partNumber: number) {
    const fileLines = await parseFileIntoArrayOfLines(filename)
    let currentCycle = 1
    let xValue = 1

    let displayOutput: Array<string> = new Array(6)
    for (let i = 0; i < 6; i++) {
        displayOutput[i] = ''
    }
    
    let spriteMin = xValue - 1
    let spriteMax = xValue + 1
    
    // Read in a line at a time
    for (let i = 0; i < fileLines.length; i++) {

        let rowNumber = Math.floor((currentCycle-1) / 40)
        let columnNumber = (currentCycle-1) % 40
        console.log(`columnNumber: ${columnNumber}, rowNumber: ${rowNumber}`)
        const line = fileLines[i]
        const splitLine = line.split(' ')
        let instruction = splitLine[0]
        let valueIncrease = parseInt(splitLine[1])

        if (instruction === 'noop') {
            if (LOGGING) console.log(`columnNumber: ${columnNumber}, spriteMin: ${spriteMin}, spriteMax: ${spriteMax}`)
            if (columnNumber >= spriteMin && columnNumber <= spriteMax) {
                displayOutput[rowNumber] += '#'
            } else {
                displayOutput[rowNumber] += '.'
            }
            currentCycle++
        }
        if (instruction === 'addx') {
            if (LOGGING) console.log(`columnNumber: ${columnNumber}, spriteMin: ${spriteMin}, spriteMax: ${spriteMax}`)
            if (columnNumber >= spriteMin && columnNumber <= spriteMax) {
                displayOutput[rowNumber] += '#'
            } else {
                displayOutput[rowNumber] += '.'
            }
            currentCycle++
            rowNumber = Math.floor((currentCycle-1) / 40)
            columnNumber = (currentCycle-1) % 40
            if (LOGGING) console.log(`columnNumber: ${columnNumber}, spriteMin: ${spriteMin}, spriteMax: ${spriteMax}`)
            if (columnNumber >= spriteMin && columnNumber <= spriteMax) {
                displayOutput[rowNumber] += '#'
            } else {
                displayOutput[rowNumber] += '.'
            }
            currentCycle++
            xValue += valueIncrease
            spriteMin = xValue - 1
            spriteMax = xValue + 1
        }
    }   

    console.log(displayOutput)
    return 0
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solutionPartTwo(dataFolder + '/tests/input.txt', 2)
solutionPartTwo(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
