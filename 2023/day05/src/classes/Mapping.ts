import MappingItem from "./MappingItem"
import MappingRange from "./MappingRange"

export default class Mapping {
  public readonly mapName: string
  public mappingItems: MappingItem[] = []

  constructor(mapName: string) {
    this.mapName = mapName
  }

  public* getIntersectingValues(range: MappingRange) {
    for (const item of this.mappingItems) {
      if (item.intersectsFrom(range)) {
        for (const value of item.getIntersectOffsetValues(range)) {
          yield value
        }
      }
    }
  }

  public parse(data: string): number {
    const pattern = new RegExp(`${this.mapName} map:\\n?([0-9\\s]*)(?=\\n{2,}|$)`, 'g')
    const localData = pattern.exec(data)
    if (!localData) return 0
    if (localData.length < 2) return 0

    let count = 0
    for (const line of localData[0].split('\n').map(ld => ld.trim())) {
      const [toId, fromId, range] = line.split(' ').map(i => parseInt(i.trim()))
      if (!isNaN(fromId) && !isNaN(toId) && !isNaN(range)) {
        this.mappingItems.push(new MappingItem(fromId, toId, range))
        count++
      }
    }

    return count
  }

  public findMatchingId(fromId: number): number {
    for (const map of this.mappingItems) {
      if (map.withinFrom(fromId)) {
        return map.getOffsetValue(fromId)
      }
    }

    return fromId
  }
}