import GridItem from "./GridItem"

export default class SquareGrid {
  public readonly data: string
  public readonly gridMatrix: GridItem[][]

  constructor(data: string) {
    this.data = data
  }
}