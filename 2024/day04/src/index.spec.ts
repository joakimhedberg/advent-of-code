import { expect, describe, test } from '@jest/globals'
import XmasFinder from './classes/XmasFinder'

describe('day03', () => {
  test('Part 1', () => {
    const finder = new XmasFinder(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`)
    
    expect(finder.countChristmas()).toBe(18)
  })

  test('Part 2', () => {
    const finder = new XmasFinder(`MMMSXXMASM
      MSAMXMSMSA
      AMXSXMAAMM
      MSAMASMSMX
      XMASAMXAMM
      XXAMMXXAMA
      SMSMSASXSS
      SAXAMASAAA
      MAMMMXMMMM
      MXMXAXMASX`)
          
          expect(finder.countXmas()).toBe(9)
  })
})