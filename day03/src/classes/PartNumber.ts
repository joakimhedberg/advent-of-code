import Engine from './Engine'
import Symbol from './Symbol'

export default class PartNumber extends Symbol {
  private _ignored: boolean = false
  private _isGear: boolean = false
  constructor(engine: Engine, lineIndex: number, startIndex: number, endIndex: number, partNumber: number) {
    super(engine, lineIndex, startIndex, endIndex, partNumber.toString())
  }

  public setIsGear() {
    this._isGear = true
  }

  public setIgnored() {
    this._ignored = true
  }

  public get isIgnored(): boolean {
    return this._ignored
  } 

  public get isGear(): boolean {
    return this._isGear
  }

  public get partNumber(): number {
    return parseInt(this.symbol)
  }
}