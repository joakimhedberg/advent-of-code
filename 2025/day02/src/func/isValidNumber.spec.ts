import { expect, describe, test } from '@jest/globals'
import DataSet from '../classes/DataSet'
import { hasAdjacentDuplicate, hasOnlyAdjacentDuplicate } from './isValidNumber'

const testData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
const testAdjacentDuplicates = (number: number, expectFalse: boolean, part2?: boolean) => test(`Test adjacent number ${number}`, () => {
  if (part2) {
    if (expectFalse) {
      expect(hasAdjacentDuplicate(`${number}`)).toBeFalsy()
    }
    else {
      expect(hasAdjacentDuplicate(`${number}`)).toBeTruthy()
    }  
  }
  else {
    if (expectFalse) {
      expect(hasOnlyAdjacentDuplicate(`${number}`)).toBeFalsy()
    }
    else {
      expect(hasOnlyAdjacentDuplicate(`${number}`)).toBeTruthy()
    }
  }
})

describe('day01', () => {
  testAdjacentDuplicates(22, false)
  testAdjacentDuplicates(6464, false)
  testAdjacentDuplicates(123123, false)
  testAdjacentDuplicates(123456, true)

  testAdjacentDuplicates(22, false, true)
  testAdjacentDuplicates(6464, false, true)
  testAdjacentDuplicates(123123, false, true)
  testAdjacentDuplicates(2121212121, false, true)
  testAdjacentDuplicates(123456, true, true)
  testAdjacentDuplicates(29570013260, true, true)
  testAdjacentDuplicates(565653, true, true)
  test('Test data set part 1', () => {
    const ds = new DataSet(testData)
    expect(ds.getTotal()).toBe(1227775554)
  })

  test('Test data set part 2', () => {
    const ds = new DataSet(testData)
    expect(ds.getTotal2()).toBe(4174379265)
  })
})