import { solvePartOne, solvePartTwo } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day3/data'

describe('test solvePartOne', () => {
    it('result should be 2 with sample data', async () => {
        let partOneAnswer = await solvePartOne(dataFolder + '/tests/input.txt')
        expect(partOneAnswer).toBe(2)
    })
    
    test('result should be 582 with my data', async () => {
        let partOneAnswer = await solvePartOne(dataFolder + '/input.txt')
        expect(partOneAnswer).toBe(582)
    })
    
    test('part 2 result should be 4 with sample data', async () => {
        let partTwoAnswer = await solvePartTwo(dataFolder + '/tests/input.txt')
        expect(partTwoAnswer).toBe(4)
    })
    
    test('part 2 result should be 893 with my data', async () => {
        let partTwoAnswer = await solvePartTwo(dataFolder + '/input.txt')
        expect(partTwoAnswer).toBe(893)
    })
})
