import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day7/data'

describe('test solvePartOne', () => {
    it('result should be 95437 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 100000, 1)
        expect(answer).toBe(95437)
    })
    
    test('result should be 1915606 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 100000, 1)
        expect(answer).toBe(1915606)
    })
    
    it('part 2 result should be 24933642 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 100000, 2)
        expect(answer).toBe(24933642)
    })
    
    test('part 2 result should be 5025657 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 100000, 2)
        expect(answer).toBe(5025657)
    })
})
