import ICoordinate from "../interfaces/ICoordinate"
import SquareGrid from "./SquareGrid"

export default class LightBeam {
  public startBeam: LightBeam | undefined
  public startPoint: ICoordinate
  public endPoint: ICoordinate
  public childBeams: LightBeam[] = []

  public static createBeam(grid: SquareGrid, startPoint: ICoordinate, direction: 'left' | 'right' | 'up' | 'down'): LightBeam | undefined {
    switch (direction) {
      case 'up':
        break
      case 'down':
        break
      case 'left':
        break
      case 'right':
        break
    }
  }
}