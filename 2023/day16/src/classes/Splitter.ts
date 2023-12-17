import BeamDirection from "../enums/BeamDirection";
import ICoordinate from "../interfaces/ICoordinate";
import GridItem, { CONCURRENT_MAX } from "./GridItem";
import SquareGrid from "./SquareGrid";

export default class Splitter extends GridItem {
  private splitterMapVertical = new Map<BeamDirection, BeamDirection[]>()
  private splitterMapHorizontal = new Map<BeamDirection, BeamDirection[]>()

  constructor(coordinate: ICoordinate, grid: SquareGrid, item: string) {
    super(coordinate, grid, item)
    this.splitterMapVertical.set(BeamDirection.left, [BeamDirection.up, BeamDirection.down])
    this.splitterMapVertical.set(BeamDirection.right, [BeamDirection.up, BeamDirection.down])
    this.splitterMapVertical.set(BeamDirection.down, [BeamDirection.down])
    this.splitterMapVertical.set(BeamDirection.up, [BeamDirection.up])

    this.splitterMapHorizontal.set(BeamDirection.left, [BeamDirection.left])
    this.splitterMapHorizontal.set(BeamDirection.right, [BeamDirection.right])
    this.splitterMapHorizontal.set(BeamDirection.down, [BeamDirection.left, BeamDirection.right])
    this.splitterMapHorizontal.set(BeamDirection.up, [BeamDirection.left, BeamDirection.right])
  }

  private _lightEnterVertical(direction: BeamDirection, beamCallback: (beam: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    const nextDirections = this.splitterMapVertical.get(direction)
    const result: GridItem[] = [this]
    let pi = passedIndex + 1
    for (const dir of nextDirections) {
      const nextItem = this._grid.getNextItemAtDirection(this.coordinate, dir)
      if (nextItem) {
        result.push(...nextItem.trace(dir, beamCallback, concurrentPasses, pi++))
      }
    }

    return result
  }

  private _lightEnterHorizontal(direction: BeamDirection, beamCallback: (beam: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    const nextDirections = this.splitterMapHorizontal.get(direction)
    const result: GridItem[] = [this]
    let pi = passedIndex + 1
    for (const dir of nextDirections) {
      const nextItem = this._grid.getNextItemAtDirection(this.coordinate, dir)
      if (nextItem) {
        result.push(...nextItem.trace(dir, beamCallback, concurrentPasses, pi++))
      }
    }

    return result
  }

  public trace(direction: BeamDirection, beamCallback: (beam: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    super.trace(direction, beamCallback, concurrentPasses, passedIndex)
    if (this.isPassed) concurrentPasses++
    else concurrentPasses = 0
    this.isPassed = true
    this.passedIndex = passedIndex
    if (concurrentPasses > CONCURRENT_MAX) {
      return []
    }
    beamCallback(this)
    switch (this.item) {
      case '-':
        return this._lightEnterHorizontal(direction, beamCallback, concurrentPasses, passedIndex)
      case '|':
        return this._lightEnterVertical(direction, beamCallback, concurrentPasses, passedIndex)
    }
  }
}