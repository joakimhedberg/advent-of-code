const words: Map<string, number> = new Map()
words.set('1', 1)
words.set('2', 2)
words.set('3', 3)
words.set('4', 4)
words.set('5', 5)
words.set('6', 6)
words.set('7', 7)
words.set('8', 8)
words.set('9', 9)
words.set('10', 10)
words.set('one', 1)
words.set('two', 2)
words.set('three', 3)
words.set('four', 4)
words.set('five', 5)
words.set('six', 6)
words.set('seven', 7)
words.set('eight', 8)
words.set('nine', 9)
words.set('ten', 10)

export default class DataLine {
  private _rawData: string
  constructor(raw_data: string) {
    this._rawData = raw_data.trim()
  }

  public get rawData(): string {
    return this._rawData
  }
    
  public firstDigit(numbersAsWords?: boolean): number {
    
    for (let i = 0; i < this._rawData.length; i++) {
      if (numbersAsWords) {
        let result: number | undefined = undefined
        words.forEach((value, key) => {
          if (result !== undefined) {
            return
          }
          if (this._rawData.substring(i, i + key.length) == key) {
            result = value
            return
          }
        })

        if (result !== undefined) {
          return result
        }
      }
      else {
        let number = parseInt(this._rawData[i])
        if (!isNaN(number)) {
          return number
        }
      }
    }
  }

  public lastDigit(numbersAsWords?: boolean): number {
    for (let i = this._rawData.length; i >= 0; i--) {
      if (numbersAsWords) {
        let result: number | undefined = undefined
        words.forEach((value, key) => {
          if (result !== undefined) {
            return
          }

          if (this._rawData.substring(i - key.length, i) === key) {
            result = value
            return
          }
        })

        if (result !== undefined) {
          return result
        }
      }
      else {
        let number = parseInt(this._rawData[i])
        if (!isNaN(number)) {
          return number
        }
      }
    }
  }

  public getNumber(numbersAsWords?: boolean): number {
    return parseInt(`${this.firstDigit(numbersAsWords)}${this.lastDigit(numbersAsWords)}`)
  }
}