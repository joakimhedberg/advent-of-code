export default class Box {
  public readonly boxNumber: number
  private lenses: {name: string, amount: number}[] = []

  constructor(boxNumber: number) {
    this.boxNumber = boxNumber
  }

  public appendLens(label: string, amount: number) {
    const lens = this.lenses.find(l => l.name === label)
    if (lens) {
      lens.amount = amount
    }
    else {
      this.lenses.push({ name: label, amount: amount })
    }
  }

  public removeLens(label: string) {
    const lens = this.lenses.findIndex(l => l.name === label)
    if (lens > -1) {
      this.lenses.splice(lens, 1)
    }
  }

  public* getLensPowers() {
    for (let i = 0; i < this.lenses.length; i++) {
      yield (this.boxNumber + 1) * (i + 1) * this.lenses[i].amount
    }
  }
}