import { solution, isAdjacent } from '../src/index'

import { parseFileIntoArrayOfLines, getDayNumber } from '../../utils'
const dayNumber = getDayNumber()
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2022-data/${dayNumber}/data`

describe('test solvePartOne', () => {
    it('result should be 13140 with sample data', async () => {
        let answer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(answer).toBe(13140)
    })
    
    // test('result should be 5619 with my data', async () => {
    //     let answer = await solution(dataFolder + '/input.txt', 1)
    //     expect(answer).toBe(5619)
    // })
    
    // it('part 2 result should be 1 with sample data', async () => {
    //     let answer = await solution(dataFolder + '/tests/input.txt', 2)
    //     expect(answer).toBe(1)
    // })

    // test('part 2 result should be 2376 with my data', async () => {
    //     let answer = await solution(dataFolder + '/input.txt', 2)
    //     expect(answer).toBe(2376)
    // })
})
