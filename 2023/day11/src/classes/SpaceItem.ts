import CoordinateType from "../types/CoordinateType"
import GalaxyResult from "./GalaxyResult"

export default class SpaceItem {
  public readonly itemType: '#' | '.'
  public readonly coordinate: CoordinateType
  public name: number
  public adjacentItems: SpaceItem[] = []

  public visited = false

  constructor(name: number, itemType: '#' | '.', coordinate: CoordinateType) {
    this.itemType = itemType
    this.coordinate = coordinate
    this.name = name
  }

  public get coordinateString(): string {
    return `${this.coordinate.x}, ${this.coordinate.y}`
  }
}