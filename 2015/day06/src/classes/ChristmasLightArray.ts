import ICoordinate from "../interfaces/ICoordinate"

export default class ChristmasLightArray {
  public readonly lights: number[][]
  public part2: boolean
  constructor(part2?: boolean) {
    this.lights = []
    this.part2 = !!part2
    for (let x = 0; x <= 1000; x++) {
      this.lights[x] = []
      for (let y = 0; y <= 1000; y++) {
        this.lights[x][y] = 0
      }
    }
  }

  public toggle(start: ICoordinate, end: ICoordinate) {
    if (!this.part2) {
      this._performLightArray(start, end, (coordinate) => this.lights[coordinate.x][coordinate.y] = this.lights[coordinate.x][coordinate.y] > 0 ? 0 : 1)
    }
    else {
      this._performLightArray(start, end, (coordinate) => this.lights[coordinate.x][coordinate.y] += 2)
    }
  }

  public on(start: ICoordinate, end: ICoordinate) {
    if (!this.part2) {
      this._performLightArray(start, end, (coordinate) => this.lights[coordinate.x][coordinate.y] = 1)
    }
    else {
      this._performLightArray(start, end, (coordinate) => this.lights[coordinate.x][coordinate.y] += 1)
    }
  }

  public off(start: ICoordinate, end: ICoordinate) {
    if (!this.part2) {
      this._performLightArray(start, end, (coordinate) => this.lights[coordinate.x][coordinate.y] = 0)
    }
    else {
      this._performLightArray(start, end, (coordinate) => this.lights[coordinate.x][coordinate.y] -= this.lights[coordinate.x][coordinate.y] > 0? 1: 0)
    }
  }

  private _performLightArray(start: ICoordinate, end: ICoordinate, perform: (coordinate: ICoordinate) => void) {
    for (let x = start.x; x <= end.x; x++) {
      for (let y = start.y; y <= end.y; y++) {
        perform({x: x, y: y})
      }
    }
  }

  public get countOn(): number {
    let result = 0
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        if (this.lights[x][y] > 0) result++
      }
    }
    return result
  }

  public get totalBrightness(): number {
    let result = 0
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        result += this.lights[x][y]
      }
    }
    return result
  }
}