import { test, describe, expect } from '@jest/globals'
import InputString from './classes/InputString'
import fs from 'fs'

describe('Test the thing', () => {
  const testData = fs.readFileSync('./data/testInput.txt', 'utf-8')
  const items = testData.split('\n').map(l => l.trim()).map(l => new InputString(l))
  
  test('Expect the first item data', () => {
    expect(items[0].stringLength).toBe(2)
    expect(items[0].contentLength).toBe(0)
    expect(items[0].encodedLength).toBe(6)
    expect(items[0].part1Calc).toBe(2)
  })

  test('Expect the second item data', () => {
    expect(items[1].stringLength).toBe(5)
    expect(items[1].contentLength).toBe(3)
    expect(items[1].encodedLength).toBe(9)
    expect(items[1].part1Calc).toBe(2)
  })

  test('Expect the third item data', () => {
    expect(items[2].stringLength).toBe(10)
    expect(items[2].contentLength).toBe(7)
    expect(items[2].encodedLength).toBe(16)
    expect(items[2].part1Calc).toBe(3)
  })

  test('Expect the fourth item data', () => {
    expect(items[3].stringLength).toBe(6)
    expect(items[3].contentLength).toBe(1)
    expect(items[3].encodedLength).toBe(11)
    expect(items[3].part1Calc).toBe(5)
  })

  test('Expect the data totals', () => {
    expect(items.map(m => m.part1Calc).reduce((a, b) => a + b)).toBe(12)
  })
})