import MappingRange from "./MappingRange";

export default class RangedSeed {
  public mappingRange: MappingRange
  constructor(startValue: number, range: number) {
    this.mappingRange = new MappingRange(startValue, range)
  }

  public static* parse(data: string) {
    const result = /seeds:\s(.+)/g.exec(data)
    if (result == null) return new Map()
    if (result.length < 2) return new Map()

    const seedRangeIds = result[1].split(' ').map(i => parseInt(i))
    for (let i = 0; i < seedRangeIds.length; i += 2) {
      yield new RangedSeed(seedRangeIds[i], seedRangeIds[i + 1])
    }
    
  }

}