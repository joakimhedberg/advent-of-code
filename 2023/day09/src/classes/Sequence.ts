export default class Sequence {
  public subSequence: Sequence | undefined
  public numbers: number[] = []

  public process() {
    if (this.numbers.every(o => o === 0)) {
      return
    }

    this.subSequence = new Sequence()
    for (let i = 0; i < this.numbers.length - 1; i++) {
      this.subSequence.numbers.push(this.numbers[i + 1] - this.numbers[i])
    }

    this.subSequence.process()
  }

  public getPreviousNumber(): number {
    const thisNr = this.numbers[0] ?? 0
    const nextNr = this.subSequence?.getPreviousNumber() ?? 0

    return thisNr - nextNr
  }

  public getNextNumber(): number {
    const thisNr = this.numbers[this.numbers.length - 1] ?? 0
    const nextNr = this.subSequence?.getNextNumber() ?? 0
    return thisNr + nextNr
  }
}