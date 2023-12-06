import { describe, expect, test } from '@jest/globals'
import DataLine from './DataLine'

describe('Testing the DataLine class', () => {
  const input = `shrzvdcghblt21
  sixdddkcqjdnzzrgfourxjtwosevenhg9
  threevt1onegxgvc9flk
  7dmqzksnlcpbsqkzqlfour1four
  4seven9gdlnhqxfseven94five
  nldeightwoshgnsjnzmbkbxcxltsqtstrgdmvqvxbfour6six
  87mmlvfr4
  six1vvrlxx8two
  znmfvdlhvjtwo9three4tzjqcfcgnsevenccvnsjczlpm
  5sixninesixnh
  three1tbtwo`

  const lines: DataLine[] = input.split('\n').map(inp => new DataLine(inp))
  test('Test dataline number function, digits only', () => {
    expect(lines[2].getNumber()).toEqual(19)
  })

  test('Test dataline number function, digits and words as numbers', () => {
    expect(lines[2].getNumber(true)).toEqual(39)
  })
})