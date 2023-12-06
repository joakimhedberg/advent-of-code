import { expect, test, describe, beforeAll } from '@jest/globals'
import MappingItem from './MappingItem'

const testBoundsValue = (item: MappingItem, value: number, shouldBeWithin: boolean, validator: (value: number) => boolean) => {
  return test(`${value} should ${shouldBeWithin ? '' : ' NOT'} be within mapping bounds`, () => {
    expect(validator(value)).toBe(shouldBeWithin)
  })
}

describe('Testing the mapping item', () => {
  let item: MappingItem
  beforeAll(() => {
     item = new MappingItem(49, 53, 8)
  })
  
  testBoundsValue(item, 48, false, (val) => item.withinFrom(val))
  testBoundsValue(item, 49, true, (val) => item.withinFrom(val))
  testBoundsValue(item, 52, true, (val) => item.withinFrom(val))
  testBoundsValue(item, 56, true, (val) => item.withinFrom(val))
  testBoundsValue(item, 57, false, (val) => item.withinFrom(val))
  
  testBoundsValue(item, 52, false, (val) => item.withinTo(val))
  testBoundsValue(item, 55, true, (val) => item.withinTo(val))
  testBoundsValue(item, 58, true, (val) => item.withinTo(val))
  testBoundsValue(item, 60, true, (val) => item.withinTo(val))
  testBoundsValue(item, 61, false, (val) => item.withinTo(val)) 
})