export default class MappingRange {
  public readonly startValue: number
  public readonly range: number
  public readonly stopValue: number
  constructor(startValue: number, range: number) {
    this.startValue = startValue
    this.range = range
    this.stopValue = startValue + range
  }

  public isWithin(value: number) {
    return value >= this.startValue && value < this.stopValue
  }

  public asString(): string {
    return `${this.startValue}-${this.stopValue}`
  }

  public intersects(range: MappingRange) {
    return (range.startValue >= this.startValue && range.startValue < this.stopValue) || (range.stopValue >= this.startValue && range.stopValue < this.stopValue)
  }

  public* getIntersectingValues(range: MappingRange) {
    if (!this.intersects(range)) {
      return
    }

    for (let i = Math.max(this.startValue, range.startValue); i < Math.min(this.stopValue, range.stopValue); i++) {
      if (this.isWithin(i)) {
        yield i
      }
    }
  }
}