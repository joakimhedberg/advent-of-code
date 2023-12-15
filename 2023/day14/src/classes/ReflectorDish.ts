import IProcessedLine from "./interfaces/IProcessedLine"

export default class ReflectorDish {
  public readonly dishArray: string[][]
  public totalLoad: number
  public dishArrayProcessed: string[][]

  public processedLines: IProcessedLine[]

  constructor(data: string) {
    this.dishArray = data.split('\n').map(d => d.trim().split(''))
  }

  private _replaceAt = (arr1: string[][], row1: number, row2: number, index: number) => {
    const tmp = arr1[row2][index]
    arr1[row2][index] = arr1[row1][index]
    arr1[row1][index] = tmp
  }
  
  private _findNextStop = (arr: string[][], startRow: number, column: number): number => {
    for (let row = startRow - 1; row > 0; row--) {
      if (arr[row][column] !== '.') return row + 1
    }

    return 0
  }
  
  public solvepart2() {
    
  }

  public process() {
    const transposed = this.dishArray.reverse()[0].map((_, colIndex) => this.dishArray.map(row => row[colIndex]));
    for (const row of transposed) {
      for (let i = 0; i < row.length; i++) {
        while (row[i - 1] === 'O' && row[i] === '.') {
          row[i - 1] = '.'
          row[i] = 'O'
          i--
        }
      }
    }
    
    this.dishArrayProcessed = transposed[0].map((_, colIndex) => transposed.map(row => row[row.length - 1 - colIndex]))
    this.processedLines = []
    for (let i = 0; i < this.dishArrayProcessed.length; i++) {
      const item = this.dishArrayProcessed[i]
      const count = item.filter(o => o === 'O').length
      const position = this.dishArrayProcessed.length - i

      this.processedLines.push({
        line: item.join(''),
        count: count,
        index: i,
        position: position,
        load: count * position,
      })
    }   
    return this.totalLoad = this.processedLines.map(i => i.load).reduce((a, b) => a + b)
  }
}
