import MirrorLine from "./MirrorLine"

export default class LavaField {
  private _rawData: string
  public readonly lavaMatrix: string[][] = []
  public readonly lavaRows: string[] = []
  public readonly lavaCols: string[] = []

  public readonly maxRow: number
  public readonly maxCol: number
  public readonly lavaMap: Map<string, string> = new Map()
  
  public readonly part2Fields: LavaField[] = []

  constructor(data: string, part2?: boolean) {
    this._rawData = data
    this.lavaMatrix = data.split('\n').map(l => l.trim().split(''))
    this.maxRow = this.lavaMatrix.length
    this.maxCol = this.lavaMatrix[0].length
    this.lavaRows = this._rawData.split('\n').map(l => l.trim())

    for (let i = 0; i < this.maxCol; i++) {
      let line = ''
      for (const data of this.lavaRows) {
        line += data[i]
      }
      this.lavaCols.push(line)
    }

    if (part2) {
      for (let i = 0; i < this._rawData.length; i++) {
        const newData = this._rawData.slice(0, i) + this._rawData.charAt(i) === '#' ? '.' : '#' + this._rawData.slice(i + 1)
        this.part2Fields.push(new LavaField(newData))
      }
    }
  }
}