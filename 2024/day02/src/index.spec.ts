import { expect, describe, test } from '@jest/globals'
import { countValidLevels } from '.'

describe('Day 02', () => {
  test('Part 01', () => {
    const data = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
    
    expect(countValidLevels(data)).toBe(2)
  })

  test('Part 02', () => {
    const data = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
    
    expect(countValidLevels(data, true)).toBe(4)
  })
})
