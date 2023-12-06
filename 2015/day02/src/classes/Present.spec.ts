import { expect, describe, test } from '@jest/globals'
import Present from './Present'

describe('Testing the present class', () => {
  test('Calculate the correct ribbon length', () => {
    let present = new Present('2x3x4')
    expect(present.ribbonLength).toBe(34)

    present = new Present('1x1x10')
    expect(present.ribbonLength).toBe(14)
  })
})