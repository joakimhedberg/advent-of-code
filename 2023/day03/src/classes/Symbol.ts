import Engine from "./Engine"
import PartNumber from "./PartNumber"

export default class Symbol {
  protected _engine: Engine
  public lineIndex: number
  public startIndex: number
  public endIndex: number
  public symbol: string
  public partNumbers: PartNumber[] = []

  constructor(engine: Engine, lineIndex: number, startIndex: number, endIndex: number, symbol: string) {
    this._engine = engine
    this.lineIndex = lineIndex
    this.startIndex = startIndex
    this.endIndex = endIndex
    this.symbol = symbol
  }

  public isPartAdjacent(part: PartNumber): boolean {
    if (Math.abs(part.lineIndex - this.lineIndex) > 1) return false
    return this._withinRange(part.startIndex - 1, part.endIndex, this.startIndex, this.startIndex)
  }

  private _withinRange(start: number, end: number, startIndex: number, endIndex: number) {
    if (end < start) {
      let tmp = end
      end = start
      start = tmp
    }
    return startIndex >= start && endIndex <= end
  }
}