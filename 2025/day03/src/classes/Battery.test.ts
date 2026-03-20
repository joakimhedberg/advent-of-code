import { expect, describe, test } from '@jest/globals'
import Battery from './Battery'

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`
describe('day03', () => {
  test('Test battery pack', () => {
    const ds = new Battery(testData)
    expect(ds.maxJoltage).toBe(357)
  })
})