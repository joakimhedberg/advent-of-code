import { describe, test, expect } from '@jest/globals'
import calculateTotalArea, { calculateRibbonLength } from './functions/calculation'
import Present from './classes/Present'

describe('Testing the index document', () => {
  test('Test data should produce 6 as result', () => {
    const p = new Present('2x3x4')
    expect(p.totalArea).toEqual(58)
  })

  test('Test data should produce 34 as result', () => {
    const p = new Present('2x3x4')
    expect(p.ribbonLength).toEqual(34)
  })

  test('Test data should produce 14 as result', () => {
    const p = new Present('1x1x10')
    expect(p.ribbonLength).toEqual(14)
  })
})