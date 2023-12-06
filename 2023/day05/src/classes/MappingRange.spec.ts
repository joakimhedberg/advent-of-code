import { describe, test, expect } from '@jest/globals'
import MappingRange from './MappingRange'

describe('Test the mapping range object', () => {
  test('Test range intersection', () => {
    const range1 = new MappingRange(0, 20)
    const range2 = new MappingRange(15, 10)

    expect(range1.stopValue).toBe(20)
    expect(range1.intersects(range2)).toBe(true)
    expect(Array.from(range1.getIntersectingValues(range2))).toEqual([15, 16, 17, 18, 19])
  })
})