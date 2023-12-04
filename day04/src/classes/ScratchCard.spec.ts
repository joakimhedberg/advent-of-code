import {describe, expect, test} from '@jest/globals';
import ScratchCard from './ScratchCard';

describe('Testing the ScratchCard class', () => {
  const input = `Card   6: 65 19 45 54 72 39 64 15  3 60 | 91 62 10 73  1 77 25  9 92  7 81 48 19 50 52 32 69 75 24 93 30 60 72 59 53`
  const card = new ScratchCard(null)
  card.parse(input)
  
  test(`${input} should have 10 answers`, () => {
    expect(card.answers.length).toBe(10)
  })
  test(`${input} should have 3 winners`, () => {
    expect(card.winningNumbers.length).toBe(3)
  })
  test(`${input} should have a score of 4`, () => {
    expect(card.points).toBe(4)
  })
})