import ICoordinate from "../interfaces/ICoordinate";

export default class LavaItem {
  public readonly coordinate: ICoordinate
  public readonly cost: number
  public top: LavaItem | undefined
  public bottom: LavaItem | undefined
  public left: LavaItem | undefined
  public right: LavaItem | undefined
  public readonly isGoal: boolean
  constructor(coordinate: ICoordinate, cost: number, isGoal?: boolean) {
    this.coordinate = coordinate
    this.cost = cost
    if (isGoal) {
      this.isGoal = true
    }
  }

  public get neighbors(): LavaItem[] {
    return [this.top, this.bottom, this.left, this.right].filter(f => f !== undefined)
  }
}