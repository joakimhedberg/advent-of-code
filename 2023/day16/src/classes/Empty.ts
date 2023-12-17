import BeamDirection from "../enums/BeamDirection";
import GridItem, { CONCURRENT_MAX } from "./GridItem";
export default class Empty extends GridItem {
  public trace(direction: BeamDirection, itemCallback: (item: GridItem) => void, concurrentPasses: number, passedIndex: number): GridItem[] {
    super.trace(direction, itemCallback, concurrentPasses, passedIndex)
    itemCallback(this)
    if (this.isPassed) concurrentPasses++
    else concurrentPasses = 0
    this.isPassed = true
    if (concurrentPasses > CONCURRENT_MAX) {
      return []
    }
    this.passedIndex = passedIndex
    const next = this._grid.getNextItemAtDirection(this.coordinate, direction)
    if (next === undefined) {
      return [this]
    }

    return [this, ...next.trace(direction, itemCallback, concurrentPasses, passedIndex + 1)]
  }
}