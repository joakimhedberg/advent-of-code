import LightBeam from "./LightBeam"
import SquareGrid from "./SquareGrid"

export default abstract class GridItem {
  public abstract lightEnter(direction: 'left' | 'right' | 'up' | 'down'): LightBeam[]
  protected readonly _item: string
  protected readonly _grid: SquareGrid

  constructor(grid: SquareGrid, item: string) {
    this._item = item
    this._grid = grid
  }
}