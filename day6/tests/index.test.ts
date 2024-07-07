import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day6/data'

describe('test solvePartOne', () => {
    it('result should be 7 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', true)
        expect(partOneAnswer).toBe(7)
    })

    it('result should be 5 with sample data 2', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input2.txt', true)
        expect(partOneAnswer).toBe(5)
    })

    it('result should be 6 with sample data 3', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input3.txt', true)
        expect(partOneAnswer).toBe(6)
    })

    it('result should be 10 with sample data 4', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input4.txt', true)
        expect(partOneAnswer).toBe(10)
    })

    it('result should be 11 with sample data 5', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input5.txt', true)
        expect(partOneAnswer).toBe(11)
    })
    
    // test('result should be FJSRQCFTN with my data', async () => {
    //     let partOneAnswer = await solution(dataFolder + '/input.txt', true)
    //     expect(partOneAnswer).toBe('FJSRQCFTN')
    // })
    
    // test('part 2 result should be MCD with sample data', async () => {
    //     let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', false)
    //     expect(partTwoAnswer).toBe('MCD')
    // })
    
    // test('part 2 result should be CJVLJQPHS with my data', async () => {
    //     let partTwoAnswer = await solution(dataFolder + '/input.txt', false)
    //     expect(partTwoAnswer).toBe('CJVLJQPHS')
    // })
})
