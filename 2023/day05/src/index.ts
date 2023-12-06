import fs from 'fs'
import Seed from './classes/Seed'
import MappingCollection from './classes/MappingCollection'
import RangedSeed from './classes/RangedSeed'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const seeds = Seed.parse(data)
const rangedSeeds = RangedSeed.parse(data)

const mapping = new MappingCollection()
mapping.parse(data)

const locationIds: number[] = []
const locationIdsRange: number[] = []
for (const seed of seeds.values()) {
  const result = mapping.traceSeedToEnd(seed)
  locationIds.push(result.location.locationId)
}

let smallestLocationIdByRange = Number.MAX_VALUE
for (const seed of rangedSeeds) {
  for (const locationId of mapping.traceSeedRangeToLocationIds(seed.mappingRange)) {
    if (locationId < smallestLocationIdByRange) {
      smallestLocationIdByRange = locationId
    }
  }
}

console.log(`Part 1: ${Math.min(...locationIds)}`)
console.log(`Part 2: ${smallestLocationIdByRange}`)
