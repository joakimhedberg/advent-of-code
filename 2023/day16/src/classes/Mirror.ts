import BeamDirection from '../enums/BeamDirection'
import ICoordinate from '../interfaces/ICoordinate'
import GridItem, { CONCURRENT_MAX } from './GridItem'
import SquareGrid from './SquareGrid'

export default class Mirror extends GridItem {
  public readonly directionMapAngle60 = new Map<BeamDirection, BeamDirection>()
  public readonly directionMapAngle120 = new Map<BeamDirection, BeamDirection>()
  constructor(coordinate: ICoordinate, grid: SquareGrid, item: string) {
    super(coordinate, grid, item)

    this.directionMapAngle120.set(BeamDirection.left, BeamDirection.up)
    this.directionMapAngle120.set(BeamDirection.right, BeamDirection.down)
    this.directionMapAngle120.set(BeamDirection.up, BeamDirection.left)
    this.directionMapAngle120.set(BeamDirection.down, BeamDirection.right)

    this.directionMapAngle60.set(BeamDirection.left, BeamDirection.down)
    this.directionMapAngle60.set(BeamDirection.right, BeamDirection.up)
    this.directionMapAngle60.set(BeamDirection.up, BeamDirection.right)
    this.directionMapAngle60.set(BeamDirection.down, BeamDirection.left)
  }
  private _lightEnterAngle60(direction: BeamDirection, itemCallback: (item: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    const nextDirection = this.directionMapAngle60.get(direction)
    const nextItem = this._grid.getNextItemAtDirection(this.coordinate, nextDirection)
    if (!nextItem) {
      return [this]
    }

    return [this, ...nextItem.trace(nextDirection, itemCallback, concurrentPasses, passedIndex)]
  }

  private _lightEnterAngle120(direction: BeamDirection, itemCallback: (item: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    const nextDirection = this.directionMapAngle120.get(direction)
    const nextItem = this._grid.getNextItemAtDirection(this.coordinate, nextDirection)
    if (!nextItem) {
      return [this]
    }

    return [this, ...nextItem.trace(nextDirection, itemCallback, concurrentPasses, passedIndex)]
  }

  public trace(direction: BeamDirection, itemCallback: (item: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    super.trace(direction, itemCallback, concurrentPasses, passedIndex)
    if (this.isPassed) concurrentPasses++
    else concurrentPasses = 0
    this.isPassed = true
    if (concurrentPasses > CONCURRENT_MAX) {
      return []
    }
    this.passedIndex = passedIndex
    itemCallback(this)
    switch (this.item) {
      case '/':
        return this._lightEnterAngle60(direction, itemCallback, concurrentPasses, passedIndex + 1)
      case '\\':
        return this._lightEnterAngle120(direction, itemCallback, concurrentPasses, passedIndex + 1)
    }
  }
}