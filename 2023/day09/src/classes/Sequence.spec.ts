import { test, describe, expect } from '@jest/globals'
import Sequence from './Sequence'

describe('Test the sequence class', () => {
  test('Expect the sequence predition', () => {
    const seq = new Sequence()
    seq.numbers = [0, 3, 6, 9, 12, 15]
    seq.process()
    expect(seq.getNextNumber()).toBe(18)
  })

  test('Expect the previous predition', () => {
    const seq = new Sequence()
    seq.numbers = [10, 13, 16, 21, 30, 45]
    seq.process()
    expect(seq.getPreviousNumber()).toBe(5)
  })
})