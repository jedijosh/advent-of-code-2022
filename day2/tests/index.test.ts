import { solvePartOne, solvePartTwo } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day2/data'

describe('test solvePartOne', () => {
    it('result should be 15 with sample data', async () => {
        let partOneAnswer = await solvePartOne(dataFolder + '/tests/input.txt')
        expect(partOneAnswer).toBe(15)
    })
    
    test('result should be 12586 with my data', async () => {
        let partOneAnswer = await solvePartOne(dataFolder + '/input.txt')
        expect(partOneAnswer).toBe(12586)
    })
    
    test('part 2 result should be 12 with sample data', async () => {
        let partTwoAnswer = await solvePartTwo(dataFolder + '/tests/input.txt')
        expect(partTwoAnswer).toBe(12)
    })
    
    test('part 2 result should be 13193 with my data', async () => {
        let partTwoAnswer = await solvePartTwo(dataFolder + '/input.txt')
        expect(partTwoAnswer).toBe(13193)
    })
})
