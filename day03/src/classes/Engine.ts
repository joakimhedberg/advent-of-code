import PartNumber from './PartNumber'
import Symbol from './Symbol'

export default class Engine {
  private _data: string[]
  public parts: PartNumber[] = []
  public symbols: Symbol[] = []
  constructor(data: string[]) {
    this._data = data
    this._parsePartNumbersAndSymbols()
  }

  private _parsePartNumbersAndSymbols() {
    const numberMatch = /(\d+)/g
    const symbolMatch = /([^\d\.\r\n]+)/g
    for (let y = 0; y < 140; y++) {
      const lineData = this._data[y]

      let matchParts: RegExpMatchArray | null
      while ((matchParts = numberMatch.exec(lineData)) != null) {
        this.parts.push(new PartNumber(this, y, matchParts.index, matchParts.index + matchParts[1].length, parseInt(matchParts[1])))
      }

      let matchSymbols: RegExpMatchArray | null
      while ((matchSymbols = symbolMatch.exec(lineData)) != null) {
        this.symbols.push(new Symbol(this, y, matchSymbols.index, matchSymbols.index + matchSymbols[1].length, matchSymbols[1]))
      }
    }
    this.parts.filter(p => !this.isSymbolAdjacent(p)).forEach(p => p.setIgnored())
    for (const symbol of this.symbols) {
      for (const part of this.parts) {
        if (symbol.isPartAdjacent(part)) {
          symbol.partNumbers.push(part)
        }
      }
    }
  }

  public isSymbolAdjacent(part: PartNumber): boolean {
    return this.symbols.filter(symbol => symbol.isPartAdjacent(part)).length > 0
  }

  public isGearPart(part: PartNumber): boolean {
    const symbols = this.symbols.filter(symbol => symbol.isPartAdjacent(part))
    if (!!symbols.find(s => s.symbol === '*') && symbols.length === 2) {
      return true
    }

    return false
  }

  public createOutput(): string[] {
    const result: string[] = []
    for (let y = 0; y < 140; y++) {
      let line = ''
      for (let x = 0; x < 140; x++) {
        const symbol = this.symbols.filter(s => s.lineIndex === y && s.startIndex === x)
        const part = this.parts.filter(p => p.lineIndex === y && p.startIndex === x)
        if (symbol.length > 0) {
          line += symbol[0].symbol
        }
        else if (part.length > 0) {
          line += part[0].partNumber.toString()
          x = part[0].endIndex - 1
        }
        else {
          line += '.'
        }
      }
      result.push(line)
    }

    return result
  }
}