/**
 * A number of cubes with the same color
 */
export default class Cube {
  public color: string
  public amount: number
  constructor(color: string, amount: number) {
    this.color = color
    this.amount = amount
  }
}