import { solution } from '../src/index'

import { getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

describe('test solvePartOne', () => {
    it('result should be 10605 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 1, 20)
        expect(answer).toBe(10605)
    })
    
    test('result should be 107822 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 1, 20)
        expect(answer).toBe(107822)
    })
    
    it('part 2 result should be 2713310158 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 2, 10000)
        expect(answer).toBe(2713310158)
    })

    test('part 2 result should be 27267163742 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 2, 10000)
        expect(answer).toBe(27267163742)
    })
})
