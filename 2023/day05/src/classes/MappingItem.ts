import MappingRange from "./MappingRange"

export default class MappingItem {
  public from: MappingRange
  public to: MappingRange
  public range: number

  constructor(fromId: number, toId: number, range: number) {
    this.from = new MappingRange(fromId, range)
    this.to = new MappingRange(toId, range)
    this.range = range
  }

  public intersectsFrom(range: MappingRange): boolean {
    return this.from.intersects(range)
  }

  public* getIntersectOffsetValues(range: MappingRange) {
    for (const value of this.from.getIntersectingValues(range)) {
      yield this.getOffsetValue(value)
    }
  }

  public withinFrom(value: number): boolean {
    return this.from.isWithin(value)
  }

  public withinTo(value: number): boolean {
    return this.to.isWithin(value)
  }

  public getOffsetValue(value: number): number | undefined {
    if (this.withinFrom(value)) {

      return Math.abs(this.from.startValue - value) + this.to.startValue
    }
  }
}