import Bank from './Bank'

export default class Battery {
  banks: Bank[]

  constructor(data: string) {
    this.banks = data.split('\n').map(d => new Bank(d.trim()))
  }

  public get maxJoltage(): number {
    return this.banks.reduce((prev, curr) => prev + curr.highestJoltage, 0)
  }

  public get maxJoltage2(): number {
    return this.banks.reduce((prev, curr) => prev + curr.highestJoltage2, 0)
  }
}