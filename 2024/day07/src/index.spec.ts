import { expect, describe, test } from '@jest/globals'
import { getResultPart, isValidItem } from './calc'
const data = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

describe('day05', () => {
  test('Part 1', () => {
    expect(data.split('\n').filter(line => isValidItem(line, ['+', '*'])).map(item => getResultPart(item)).reduce((a, b) => a + b)).toBe(3749)
  })

  test('Part 2', () => {   
    expect(data.split('\n').filter(line => isValidItem(line, ['+', '*', '||'])).map(item => getResultPart(item)).reduce((a, b) => a + b)).toBe(11387)
  })
})