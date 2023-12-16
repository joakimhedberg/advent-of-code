import BeamDirection from "../enums/BeamDirection"
import ICoordinate from "../interfaces/ICoordinate"
import Empty from "./Empty"
import GridItem from "./GridItem"
import LightBeam from "./LightBeam"
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

  private _coordToString(coord: ICoordinate): string {
    return `${coord.x}, ${coord.y}`
  }

  public createBeam(startPoint: ICoordinate, direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam {
    switch (direction) {
      case BeamDirection.left:
        const gridItemLeft = this.gridMap.get(this._coordToString({ x: startPoint.x - 1, y: startPoint.y }))
        if (gridItemLeft) {
          const beam = new LightBeam(startPoint, { x: startPoint.x - 1, y: startPoint.y }, gridItemLeft)
          beamCallback(beam)
          beam.childBeams.push(...gridItemLeft.lightEnter(direction, beamCallback))
          return beam
        }
      case BeamDirection.right:
        const gridItemRight = this.gridMap.get(this._coordToString({ x: startPoint.x + 1, y: startPoint.y }))
        if (gridItemRight) {
          const beam = new LightBeam(startPoint, { x: startPoint.x + 1, y: startPoint.y }, gridItemRight)
          beamCallback(beam)
          beam.childBeams.push(...gridItemRight.lightEnter(direction, beamCallback))
          return beam
        }
        break
      case BeamDirection.up:
        const gridItemUp = this.gridMap.get(this._coordToString({ x: startPoint.x, y: startPoint.y - 1}))
        if (gridItemUp) {
          const beam = new LightBeam(startPoint, { x: startPoint.x, y: startPoint.y - 1 }, gridItemUp)
          beamCallback(beam)
          beam.childBeams.push(...gridItemUp.lightEnter(direction, beamCallback))
          return beam
        }
        break
      case BeamDirection.down:
        const gridItemDown = this.gridMap.get(this._coordToString({ x: startPoint.x, y: startPoint.y + 1}))
        if (gridItemDown) {
          const beam = new LightBeam(startPoint, { x: startPoint.x, y: startPoint.y + 1 }, gridItemDown)
          beamCallback(beam)
          beam.childBeams.push(...gridItemDown.lightEnter(direction, beamCallback))
          return beam
        }
        break
    }
  }

  public static createItem(coordinate: ICoordinate, grid: SquareGrid, item: string): GridItem {
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