import NumberRange from './NumberRange'

export default class DataSet {
  ranges: NumberRange[]
  constructor(data: string) {
    this.ranges = data.split(',').map(dt => new NumberRange(dt.trim()))
  }

  public getTotal() {
    let total = 0
    for (const rng of this.ranges) {
      total += rng.getInvalidNumberSummary()
    }
    return total
  }

  public getTotal2() {
    let total = 0
    for (const rng of this.ranges) {
      total += rng.getInvalidNumberSummary(true)
    }
    return total
  }

  public* range() {
    for (const range of this.ranges) {
      for (const rng of range.range()) {
        yield rng
      }
    }
  }
}