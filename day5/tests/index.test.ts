import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day5/data'

describe('test solvePartOne', () => {
    it('result should be CMZ with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', true)
        expect(partOneAnswer).toBe('CMZ')
    })
    
    test('result should be FJSRQCFTN with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', true)
        expect(partOneAnswer).toBe('FJSRQCFTN')
    })
    
    test('part 2 result should be MCD with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', false)
        expect(partTwoAnswer).toBe('MCD')
    })
    
    test('part 2 result should be CJVLJQPHS with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', false)
        expect(partTwoAnswer).toBe('CJVLJQPHS')
    })
})
