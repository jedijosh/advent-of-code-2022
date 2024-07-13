import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day6/data'

describe('test solvePartOne', () => {
    it('result should be 7 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 4)
        expect(partOneAnswer).toBe(7)
    })

    it('result should be 5 with sample data 2', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input2.txt', 4)
        expect(partOneAnswer).toBe(5)
    })

    it('result should be 6 with sample data 3', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input3.txt', 4)
        expect(partOneAnswer).toBe(6)
    })

    it('result should be 10 with sample data 4', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input4.txt', 4)
        expect(partOneAnswer).toBe(10)
    })

    it('result should be 11 with sample data 5', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input5.txt', 4)
        expect(partOneAnswer).toBe(11)
    })
    
    test('result should be 1953 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 4)
        expect(partOneAnswer).toBe(1953)
    })
    
    it('part 2 result should be 19 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 14)
        expect(partOneAnswer).toBe(19)
    })

    it('part 2 result should be 23 with sample data 2', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input2.txt', 14)
        expect(partOneAnswer).toBe(23)
    })

    it('part 2 result should be 23 with sample data 3', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input3.txt', 14)
        expect(partOneAnswer).toBe(23)
    })

    it('part 2 result should be 29 with sample data 4', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input4.txt', 14)
        expect(partOneAnswer).toBe(29)
    })

    it('part 2 result should be 26 with sample data 5', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input5.txt', 14)
        expect(partOneAnswer).toBe(26)
    })
    
    test('part 2 result should be 2301 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 14)
        expect(partOneAnswer).toBe(2301)
    })
})
