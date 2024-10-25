import { solution, isAdjacent } from '../src/index'

import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

describe('test solvePartOne', () => {
    it('result should be 13 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(answer).toBe(13)
    })
    
    test('result should be 5619 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 1)
        expect(answer).toBe(5619)
    })
    
    it('part 2 result should be 1 with sample data 1', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(answer).toBe(1)
    })

    it('part 2 result should be 36 with sample data 2', async () => {
        let answer = await solution(dataFolder + '/tests/input2.txt', 2)
        expect(answer).toBe(36)
    })

    it('is adjacent should be false when points are not next to each other', async () => {
        let answer = isAdjacent({x: -2, y: 5}, {x: -1, y: 7})
        expect(answer).toBe(false)
    })

    it('is adjacent should be true when points are diagonal to each other', async () => {
        let answer = isAdjacent({x: -2, y: 5}, {x: -3, y: 6})
        expect(answer).toBe(true)
    })
    
    test('part 2 result should be 2376 with my data', async () => {
        let answer = await solution(dataFolder + '/input.txt', 2)
        expect(answer).toBe(2376)
    })
})
