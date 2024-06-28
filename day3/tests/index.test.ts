import { solvePartOne, solvePartTwo } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day3/data'

describe('test solvePartOne', () => {
    it('result should be 157 with sample data', async () => {
        let partOneAnswer = await solvePartOne(dataFolder + '/tests/input.txt')
        expect(partOneAnswer).toBe(157)
    })
    
    test('result should be 8394 with my data', async () => {
        let partOneAnswer = await solvePartOne(dataFolder + '/input.txt')
        expect(partOneAnswer).toBe(8394)
    })
    
    test('part 2 result should be 70 with sample data', async () => {
        let partTwoAnswer = await solvePartTwo(dataFolder + '/tests/input.txt')
        expect(partTwoAnswer).toBe(70)
    })
    
    test('part 2 result should be 2413 with my data', async () => {
        let partTwoAnswer = await solvePartTwo(dataFolder + '/input.txt')
        expect(partTwoAnswer).toBe(2413)
    })
})
