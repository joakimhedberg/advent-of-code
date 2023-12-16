import ICoordinate from "../interfaces/ICoordinate"
import GridItem from "./GridItem"
import SquareGrid from "./SquareGrid"

export default class LightBeam {
  public startPoint: ICoordinate
  public endPoint: ICoordinate
  public endItem: GridItem | undefined
  public childBeams: LightBeam[] = []

  constructor(startPoint: ICoordinate, endPoint: ICoordinate, endItem: GridItem) {
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.endItem = endItem
  }

  public get coordinates(): ICoordinate[] {
    return [this.startPoint, this.endPoint, ...this.childBeams.filter(cb => cb !== undefined).map(cb => cb.coordinates).flat()]
  }
}