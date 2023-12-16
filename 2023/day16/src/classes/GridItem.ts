import BeamDirection from "../enums/BeamDirection"
import ICoordinate from "../interfaces/ICoordinate"
import LightBeam from "./LightBeam"
import SquareGrid from "./SquareGrid"

export default abstract class GridItem {
  public abstract lightEnter(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[]
  protected readonly _item: string
  protected readonly _grid: SquareGrid
  public readonly coordinate: ICoordinate

  constructor(coordinate: ICoordinate, grid: SquareGrid, item: string) {
    this._item = item
    this._grid = grid
    this.coordinate = coordinate
  }
}