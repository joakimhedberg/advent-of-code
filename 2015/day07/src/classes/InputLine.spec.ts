import { expect, test, describe } from '@jest/globals'
import InputLine from './InputLine'

describe('Test the InputLine class', () => {
  test('Testing the calculation', () => {
    expect(InputLine.calculate('8 RSHIFT 1', (varName: string) => parseInt(varName))).toBe(4)
  })

  test('Testing the calculation', () => {
    expect(InputLine.calculate('9 LSHIFT 5', (varName: string) => parseInt(varName))).toBe(288)
  })
})