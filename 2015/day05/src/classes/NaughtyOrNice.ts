const VOWELS = 'aeiou'
const NAUGHTIES = ['ab', 'cd', 'pq', 'xy']

export default class NaughtyOrNice {
  private _line: string
  constructor(line: string) {
    this._line = line
  }

  public get line(): string {
    return this._line
  }

  public get hasForbiddenText(): boolean {
    for (const naughty of NAUGHTIES) {
      if (this._line.indexOf(naughty) > -1) return true
    }

    return false
  }

  public get numberOfVowels(): number {
    let vowels = 0
    for (const char of this._line) {
      if (VOWELS.indexOf(char) > -1) {
        vowels++
      }
    }

    return vowels
  }

  public get hasConcurrentLetters(): boolean {
    for (let i = 0; i < this._line.length - 1; i++) {
      if (this._line[i] === this._line[i + 1]) return true
    }

    return false
  }

  public dualPairs: string
  public get hasDualPairs(): boolean {
    for (let i = 0; i < this._line.length - 1; i++) {
      const pair1 = this._line[i] + this._line[i + 1]
      
      for (let j = i + 2; j < this._line.length - 1; j++) {
        const pair2 = this._line[j] + this._line[j + 1]
        if (pair1 === pair2) {
          this.dualPairs = pair1
          return true
        }
      }
    }

    return false
  }

  public repeatLetter: string
  public get hasRepeat(): boolean {
    for (let i = 0; i < this._line.length - 2; i++) {
      const letter1 = this._line[i]
      const letter2 = this._line[i + 1]
      const letter3 = this._line[i + 2]
      if (letter1 !== letter2 && letter1 === letter3) {
        this.repeatLetter = this._line[i] + this._line[i + 1] + this._line[i + 2]
        return true
      }
    }

    return false
  }

  public get isNice2(): boolean {
    return this.hasDualPairs && this.hasRepeat
  }

  public get isNice(): boolean {
    if (this.hasForbiddenText) return false
    return this.numberOfVowels > 2 && this.hasConcurrentLetters
  }

}