import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day1/data'

describe('test solution', () => {
    it('result should be 24000 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(24000)
    })
    
    test('result should be 75501 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(75501)
    })
    
    test('part 2 result should be 45000 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 3)
        expect(partTwoAnswer).toBe(45000)
    })
    
    test('part 2 result should be 215594 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 3)
        expect(partTwoAnswer).toBe(215594)
    })
})
