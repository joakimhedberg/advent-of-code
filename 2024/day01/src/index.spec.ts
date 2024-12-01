import { expect, describe, test } from '@jest/globals'
import { runComparison, runComparisonByMultiplication } from '.'

describe('Testing the list for part 1', () => {
  test('Example list part 1', () => {
    const data = `3   4
4   3
2   5
1   3
3   9
3   3`
    
    expect(runComparison(data)).toBe(11)
  })

  test('Example list part 2', () => {
    const data = `3   4
4   3
2   5
1   3
3   9
3   3`
    
    expect(runComparisonByMultiplication(data)).toBe(31)
  })
})
