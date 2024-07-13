import { solution } from '../src/index'

import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

describe('test solvePartOne', () => {
    it('result should be 21 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(answer).toBe(21)
    })
    
    test('result should be 1736 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 1)
        expect(answer).toBe(1736)
    })
    
    it('part 2 result should be 8 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(answer).toBe(8)
    })
    
    test('part 2 result should be 268800 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 2)
        expect(answer).toBe(268800)
    })
})
