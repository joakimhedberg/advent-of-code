import { describe, test, expect } from '@jest/globals'
import MappingCollection from './MappingCollection'
import fs from 'fs'
import Mapping from './Mapping'
import Seed from './Seed'

const testCollectionName = (name: string, collection: Mapping) => {
  return test(`Expect collection to be named ${name}`, () => {
    expect(collection.mapName).toBe(name)
  })
}

const testCollectionCount = (collection: Mapping, count: number) => {
  return test(`Expect collection to contain ${count} items`, () => {
    expect(collection.mappingItems.length).toBe(count)
  })
}

describe('Testing the MappingCollection', () => {
  const data = fs.readFileSync('./data/input.txt', 'utf-8')
  const collection = new MappingCollection()
  collection.parse(data)

  testCollectionName('seed-to-soil', collection.seedToSoil)
  testCollectionName('soil-to-fertilizer', collection.soilToFertilizers)
  testCollectionName('fertilizer-to-water', collection.fertilizerToWater)
  testCollectionName('water-to-light', collection.waterToLight)
  testCollectionName('light-to-temperature', collection.lightToTemperature)
  testCollectionName('temperature-to-humidity', collection.temperatureToHumidity)
  testCollectionName('humidity-to-location', collection.humidityToLocation)
  
  testCollectionCount(collection.seedToSoil, 37)
  testCollectionCount(collection.soilToFertilizers, 19)
  testCollectionCount(collection.fertilizerToWater, 9)
  testCollectionCount(collection.waterToLight, 26)
  testCollectionCount(collection.lightToTemperature, 46)
  testCollectionCount(collection.temperatureToHumidity, 25)
  testCollectionCount(collection.humidityToLocation, 20)

  test('Expect seed 3082872446 to have soil id 3146600596', () => {
    const seeds = Seed.parse(data)
    const result = collection.traceSeedToEnd(seeds.get(3082872446))
    expect(seeds.get(3082872446).soil.soilId).toBe(3146600596)
    expect(result.soil.soilId).toBe(3146600596)
  })
})