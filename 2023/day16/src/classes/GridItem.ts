import BeamDirection from "../enums/BeamDirection"
import ICoordinate from "../interfaces/ICoordinate"
import SquareGrid from "./SquareGrid"

export const CONCURRENT_MAX = 20
export default abstract class GridItem {
  public isPassed = false
  public passedIndex: number
  public trace(direction: BeamDirection, itemCallback: (item: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    return []
  }

  public get coordinateString(): string {
    return `${this.coordinate.x}, ${this.coordinate.y}`
  }

  public readonly item: string
  protected readonly _grid: SquareGrid
  public readonly coordinate: ICoordinate

  constructor(coordinate: ICoordinate, grid: SquareGrid, item: string) {
    this.item = item
    this._grid = grid
    this.coordinate = coordinate
  }
}