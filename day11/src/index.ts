import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

const LOGGING = false

class Monkey {
    items: Array<number>
    getNewWorryLevel: Function
    getMonkeyThrownTo: Function
    numberOfItemsInspected: number
    // monkeyIfTrue: number
    // monkeyIfFalse: number
    
    constructor(items: Array<number>, getNewWorryLevel: Function, getMonkeyThrownTo: Function) {
        this.items = items
        this.getNewWorryLevel = getNewWorryLevel
        this.getMonkeyThrownTo = getMonkeyThrownTo
        this.numberOfItemsInspected = 0
        // this.monkeyIfTrue = monkeyIfTrue
        // this.monkeyIfFalse = monkeyIfFalse
    }
}

export async function solution ( filename : string, partNumber:number, numberOfRounds: number) {
    const fileLines = await parseFileIntoArrayOfLines(filename)
    let result: number = 0
    let monkeys: Array<Monkey> = new Array<Monkey>()
    let divisorsProduct = 1

    for (let i = 0; i < fileLines.length; i+=7) {
        // Each monkey has 6 lines.  Assumption is the lines will always be in the same order
        let lineNumber: number = i
        
        // First line: Find monkey number
        let line = fileLines[lineNumber]
        const numberRegEx = RegExp(/\d+/, 'g')
        let monkeyNumberRegexResult = line.match(numberRegEx)
        let monkeyNumber: number  = -1
        if (monkeyNumberRegexResult) monkeyNumber = parseInt(monkeyNumberRegexResult[0])
        if (monkeyNumber !== -1) console.log('Monkey:', monkeyNumber)

        // Second line: Find starting items
        lineNumber++
        let items: Array<number> = new Array()
        line = fileLines[lineNumber]
        let monkeyItemsRegexResult = line.matchAll(numberRegEx)
        for (const monkeyItem of monkeyItemsRegexResult) {
            let monkeyItemWorryLevel: number = parseInt(monkeyItem[0])
            console.log('Worry level:', monkeyItemWorryLevel)   
            if (monkeyItemWorryLevel) items.push(monkeyItemWorryLevel)
        }        

        // Line 3: Calculate worry level after inspection
        lineNumber++
        line = fileLines[lineNumber]
        let functionCode: string = line.split(':')[1]
        let equalsLocation: number = functionCode.indexOf('=')
        functionCode = functionCode.substring(equalsLocation + 1)
        
        let newWorryLevel 
        newWorryLevel = partNumber === 1 ? 'return Math.floor( (' + functionCode + ')/ 3) % divisorsProduct' : 'return Math.floor( ' + functionCode + ') % divisorsProduct'
        console.log(newWorryLevel)
        // const operation: Function = new Function('old', 'newValue', 'return ' + functionCode)
        const getNewWorryLevel: Function = new Function('old', 'divisorsProduct', newWorryLevel)
        
        // Line 4: Test worry level after inspection
        lineNumber++
        line = fileLines[lineNumber]
        functionCode = line.split(':')[1]
        let divisibleByString = functionCode.match(numberRegEx)
        let divisibleBy: number = -1
        if (divisibleByString) divisibleBy = parseInt(divisibleByString[0])
        divisorsProduct *= divisibleBy
        console.log('divisibleBy:', divisibleBy)
        
        // Line 5: Find monkey to be thrown to when the divisible test passes
        lineNumber++
        line = fileLines[lineNumber]
        let monkeyIfPassesString = line.match(numberRegEx)
        let monkeyIfPasses: number = -1
        if (monkeyIfPassesString) monkeyIfPasses = parseInt(monkeyIfPassesString[0])
        console.log('monkeyIfPasses', monkeyIfPasses)

        // Line 6: Find monkey to be thrown to when the divisible test fails
        lineNumber++
        line = fileLines[lineNumber]
        let monkeyIfFailsString = line.match(numberRegEx)
        let monkeyIfFails: number = -1
        if (monkeyIfFailsString) monkeyIfFails = parseInt(monkeyIfFailsString[0])
        console.log('monkeyIfFails', monkeyIfFails)
    
        let monkeyThrownTo = 'return worryLevel % ' + divisibleBy + ' === 0 ? ' + monkeyIfPasses + ' : ' + monkeyIfFails
        console.log(monkeyThrownTo)

        const getMonkeyThrownTo: Function = new Function('worryLevel', monkeyThrownTo)



        let monkey = new Monkey(items, getNewWorryLevel,  getMonkeyThrownTo)
        monkeys.push(monkey)

    }
    // console.log('monkeys:', monkeys)

    // Loop through 20 rounds
    for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                if (LOGGING) console.log('monkey.items', monkey.items)
                monkey.numberOfItemsInspected++
                if (LOGGING) console.log('initial worry level: ', item)
                item = monkey.getNewWorryLevel(item, divisorsProduct)
                if (LOGGING) console.log('after worry level: ', item)
                let newMonkeyIndex = monkey.getMonkeyThrownTo(item)
                if (LOGGING) console.log('monkey thrown to: ', newMonkeyIndex)
                // Remove the old item from this monkey's items
                // monkey.items.splice(0, 1)
                if (LOGGING) console.log('item to move', item)
                monkeys[newMonkeyIndex].items.push(item)
                if (LOGGING) console.log('monkey.items after', monkey.items)
                if (LOGGING) console.log('')
            })
            monkey.items = []
        })
        // console.log(`monkeys after round ${roundNumber}:`)
        // console.log('monkeys:', monkeys)
    }

    // console.log('monkeys:', monkeys)
    let arrayOfItemsInspected: Array<number> = new Array()
    monkeys.forEach(monkey => {
        arrayOfItemsInspected.push(monkey.numberOfItemsInspected)
    })
    arrayOfItemsInspected.sort((a, b) => b - a)
    console.log(arrayOfItemsInspected)

    // Find 2 highest numbers any multiply
    
 
    return arrayOfItemsInspected[0] * arrayOfItemsInspected[1]
}

// solution(dataFolder + '/tests/input.txt', 1, 20)
// solution(dataFolder + '/input.txt', 1, 20)

// solution(dataFolder + '/tests/input.txt', 2, 10000)
solution(dataFolder + '/input.txt', 2, 10000)
    .then(answer => console.log('answer:', answer))
