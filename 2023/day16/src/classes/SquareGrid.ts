import BeamDirection from "../enums/BeamDirection"
import ICoordinate from "../interfaces/ICoordinate"
import Empty from "./Empty"
import GridItem from "./GridItem"
import Mirror from "./Mirror"
import Splitter from "./Splitter"

export default class SquareGrid {
  public readonly data: string
  public readonly gridMatrix: GridItem[][]
  public readonly gridMap = new Map<string, GridItem>()
  constructor(data: string) {
    this.data = data
    this.gridMatrix = data.split('\n').map((line, y) => line.trim().split('').map((i, x) => SquareGrid.createItem({ x: x, y: y }, this, i)))
    for (const gm of this.gridMatrix) {
      for (const item of gm) {
        this.gridMap.set(this._coordToString(item.coordinate), item)
      }
    }
  }

  public reset() {
    this.gridMap.forEach(item => {
      item.isPassed = false
      item.passedIndex = -1
    })
  }

  public getNextItemAtDirection(coordinate: ICoordinate, direction: BeamDirection) {
    return this.getItemAtCoordinate(this.getNextCoordinate(coordinate, direction))
  }

  public getNextCoordinate(coordinate: ICoordinate, direction: BeamDirection) {
    return {
      x: direction === BeamDirection.left ? coordinate.x - 1 : direction === BeamDirection.right ? coordinate.x + 1 : coordinate.x,
      y: direction === BeamDirection.up? coordinate.y - 1: direction === BeamDirection.down? coordinate.y + 1: coordinate.y
    }
  }

  private _coordToString(coord: ICoordinate): string {
    const result = `${coord.x}, ${coord.y}`
    return result
  }

  public getItemAtCoordinate(coordinate: ICoordinate) {
    const item = this.gridMap.get(this._coordToString(coordinate))
    return item
  }

  public static createItem(coordinate: ICoordinate, grid: SquareGrid, item: string): (Mirror | Empty | Splitter) {
    if (item === '.') {
      return new Empty(coordinate, grid, item)
    }
    else if (['/', '\\'].indexOf(item) > -1) {
      return new Mirror(coordinate, grid, item)
    }
    else if (['|', '-'].indexOf(item) > -1) {
      return new Splitter(coordinate, grid, item)
    }

    throw new Error('Unidentified item')
  }
}