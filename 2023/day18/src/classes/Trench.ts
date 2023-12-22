import DirectionType from "../types/DirectionType"
import Coordinate from "./Coordinate"

export default class Trench {
  public readonly direction: DirectionType
  public readonly amount: number
  public readonly color: string
  public startCoordinate: Coordinate
  public readonly index: number

  constructor(index: number, direction: DirectionType, amount: number, color: string, isPart2?: boolean) {
    this.index = index
    this.direction = direction
    this.amount = amount
    this.color = color

    if (isPart2) {
      const instruction = parseInt(color.substring(2, 8), 16)
      this.amount = instruction >> 4
      this.direction = ['R', 'D', 'L', 'U'][instruction & 0xf] as DirectionType
    }
  }

  public get colorStr(): string {
    return this.color.slice(1, -1)
  }
}