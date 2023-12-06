import ScratchCardCollection from "./ScratchCardCollection"

export default class ScratchCard {
  public cardNumber: number
  public answers: number[]
  public actual: number[]
  private _isProcessed: boolean = false
  public collection: ScratchCardCollection
  public downstreamWinners: ScratchCard[] = []

  constructor(collection: ScratchCardCollection) {
    this.collection = collection
  }
  // Card 163: 67 35 79 21 98 27 69 44 72 91 | 83 69 50 33 18 77 81 58 35 98 31 60 79 27 30 72 54 40 19 34 80 91 63 55 67
  public parse(line: string): boolean {
    line = line.trim()
    if (!line.startsWith('Card ')) return false
    const [card, data] = line.split(':')
    const [, id] = card.trim().split(/\s+/)
    this.cardNumber = parseInt(id)
    const [answers, actual] = data.trim().split(' | ')
    this.answers = answers.trim().split(/\s+/).map(w => parseInt(w.trim()))
    this.actual = actual.trim().split(/\s+/).map(a => parseInt(a.trim()))

    return true
  }

  public get winningNumbers(): number[] {
    if (this._isProcessed) return []
    const result: number[] = []
    for (const actual of this.actual) {
      if (!!this.answers.find(a => a === actual)) {
        result.push(actual)
      }
    }

    return result
  }

  public isWinningCard(): boolean {
    return this.winningNumbers.length > 0
  }

  public get points(): number {
    const winners = this.winningNumbers
    let result = this.winningNumbers.length > 0 ? 1 : 0
    if (result === 0) return 0

    for (const w of winners.slice(1)) {
      result *= 2
    }
    return result
  }

  public recursivelyGetWinners(isDownstream: boolean = true, passed: number[]): ScratchCard[] {
    if (passed.find(f => f === this.cardNumber)) return []
    passed.push(this.cardNumber)
    if (this.downstreamWinners.length <= 0 && !isDownstream) {
      return []
    }
    else if (this.downstreamWinners.length > 0) {
      const result: ScratchCard[] = [this]
      for (const ds of this.downstreamWinners) {
        result.push(...ds.recursivelyGetWinners(true, passed))
      }
      return result

    } else if (isDownstream) {
      return [this]
    }
  }
}