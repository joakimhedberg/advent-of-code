import { expect, test, describe } from '@jest/globals'
import Mapping from './Mapping'
import fs from 'fs'

describe('Testing out the mapping', () => {
  const mapping = new Mapping('seed-to-soil')
  mapping.parse(fs.readFileSync('./data/input.txt', 'utf-8'))
  
  test(`Seed id 1 should have a match`, () => {
    expect(mapping.findMatchingId(1)).toBe(2045414947)
  })

  test('Mapping should contain 37 entries', () => {
    expect(mapping.mappingItems.length).toBe(37)
  })

  test('Mapping to minimum id should be 0', () => {
    expect(Math.min(...mapping.mappingItems.map(mi => mi.to.startValue))).toBe(0)
  })

  test('Mapping to maximum id should be 4216620431', () => {
    expect(Math.max(...mapping.mappingItems.map(mi => mi.to.startValue))).toBe(4216620431)
  })

  test('Mapping from minimum id should be 0', () => {
    expect(Math.min(...mapping.mappingItems.map(mi => mi.from.startValue))).toBe(0)
  })

  test('Mapping from maximum id should be 4282729265', () => {
    expect(Math.max(...mapping.mappingItems.map(mi => mi.from.startValue))).toBe(4282729265)
  })

  test('Mapping range minimum id should be 5135164', () => {
    expect(Math.min(...mapping.mappingItems.map(mi => mi.range))).toBe(5135164)
  })

  test('Mapping range maximum id should be 498674019', () => {
    expect(Math.max(...mapping.mappingItems.map(mi => mi.range))).toBe(498674019)
  })

  /*test('Seed ID 3082872446 should match 4219880855', () => {
    expect(mapping.findMatchingId(3082872446)).toBe(4219880855)
  })*/
})