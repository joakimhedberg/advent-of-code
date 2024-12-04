export default class XmasFinder {
  private _xmasMatrix: string[][]
  private _xmasMatrixTransposed: string[][]

  constructor(data: string) {
    this._xmasMatrix = data.split('\n').map(l => l.trim().split(''))
    this._xmasMatrixTransposed = this._xmasMatrix.map((_, colIndex) => this._xmasMatrix.map(row => row[colIndex]))
  }

  public countChristmas(): number {
    return this.countHorizontal() + this.countVertical() + this.countDiagonal()
  }

  public countXmas(): number {
    let count = 0
    for (let row = 0; row < this._xmasMatrix.length - 2; row++) {
      for (let col = 0; col < this._xmasMatrix[row].length - 2; col++) {
        const m1 = this._xmasMatrix[row][col]
        const a1 = this._xmasMatrix[row + 1][col + 1]
        const s1 = this._xmasMatrix[row + 2][col + 2]

        const m2 = this._xmasMatrix[row][col + 2]
        const a2 = this._xmasMatrix[row + 1][col + 1]
        const s2 = this._xmasMatrix[row + 2][col]

        if (a2 === 'A') {
          const word1 = m1 + a1 + s1
          const word2 = m2 + a2 + s2
          if (this._isMas(word1) && this._isMas(word2)) {
            count++
          }
        }
      }
    }

    return count
  }

  private _isMas(word: string): boolean {
    return word === 'MAS' || word === 'SAM'
  }

  private _countStraight(array: string[][]): number {
    let count = 0
    for (let row = 0; row < this._xmasMatrix.length; row++) {
      const line = array[row]
      for (let col = 0; col < line.length - 3; col++) {
        const word = line.slice(col, col + 4).join('')
        if (word === 'SAMX' || word ==='XMAS') {
          count++
        }
      }
    }

    return count
  }

  private countHorizontal(): number {
    return this._countStraight(this._xmasMatrix)
  }

  private countVertical(): number {
    return this._countStraight(this._xmasMatrixTransposed)
  }

  private countDiagonal(): number {
    return this._countLRDiagonal(this._xmasMatrix) + this._countRLDiagonal(this._xmasMatrixTransposed)
  }

  private _countLRDiagonal(array: string[][]) {
    let count = 0
    for (let row = 0; row < this._xmasMatrix.length - 3; row++) {
      const line = array[row]
      for (let col = 0; col < line.length - 3; col++) {
        const word = `${array[row][col]}${array[row + 1][col + 1]}${array[row + 2][col + 2]}${array[row + 3][col + 3]}`
        
        if (word === 'SAMX' || word === 'XMAS') {
          count++
        }
      }
    }

    return count
  }

  private _countRLDiagonal(array: string[][]) {
    let count = 0
    for (let row = 0; row < this._xmasMatrix.length - 3; row++) {
      const line = array[row]
      for (let col = 0; col < line.length - 3; col++) {
        const word = `${array[row][col + 3]}${array[row + 1][col + 2]}${array[row + 2][col + 1]}${array[row + 3][col]}`
        if (word === 'SAMX' || word === 'XMAS') {
          count++
        }
      }
    }

    return count
  }
}