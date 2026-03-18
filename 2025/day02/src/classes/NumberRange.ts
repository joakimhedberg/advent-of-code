import { hasAdjacentDuplicate, hasOnlyAdjacentDuplicate } from '../func/isValidNumber'

export default class NumberRange {
  private _startString: string
  private _endString: string
  
  private _startNumber: number
  private _endNumber: number

  constructor(rangeString: string) {
    [this._startString, this._endString] = rangeString.split('-')
    this._startNumber = parseInt(this._startString)
    this._endNumber = parseInt(this._endString)

    if (isNaN(this._startNumber) || isNaN(this._endNumber)) {
      throw new Error('Invalid number')
    }
  }

  public getInvalidNumbers(): number[] {
    const result: number[] = []
    for (const i of this.range()) {
      if (hasOnlyAdjacentDuplicate(`${i}`)) {
        result.push(i)
      }
    }

    return result
  }

  public* range() {
    for (let i = this._startNumber; i <= this._endNumber; i++) {
      yield i
    }
  }

  public getInvalidNumbers2() {
    const result: number[] = []
    for (const nr of this.range()) {
      if (hasAdjacentDuplicate(`${nr}`)) {
        result.push(nr)
      }
    }

    return result
  }

  public getInvalidNumberSummary(part2?: boolean) {
    let numbers: number[]
    if (part2) {
      numbers = this.getInvalidNumbers2()
    }
    else {
       numbers = this.getInvalidNumbers()
    }
    if (numbers.length <= 0) return 0
    return numbers.reduce((a, b) => a + b)
  }
}