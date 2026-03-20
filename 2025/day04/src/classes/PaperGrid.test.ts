import { expect, describe, test } from '@jest/globals'
import PaperGrid from './PaperGrid'

const testData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

describe('day04', () => {
  test('Part 01', () => {
    const grid = new PaperGrid(testData)
    expect(grid.part1).toBe(13)
  })

  test('Part 02', () => {
    const grid = new PaperGrid(testData)
    expect(grid.part2).toBe(43)
  })
})