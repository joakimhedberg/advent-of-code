import DirectionType from '../types/DirectionType'

export default class Coordinate {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }
  public get y(): number {
    return this._y
  }

  public get x(): number {
    return this._x
  }

  public get asString(): string {
    return `${this.x}, ${this.y}`
  }

  public set y(value: number) {
    this._y = value
  }

  public set x(value: number) {
    this._x = value
  }

  public clone() {
    return new Coordinate(this._x, this._y)
  }

  public calculateNew(direction: DirectionType, amount: number): Coordinate {
    switch (direction) {
      case 'U':
        return new Coordinate(this.x, this.y - amount)
      case 'D':
        return new Coordinate(this.x, this.y + amount)
      case 'L':
        return new Coordinate(this.x - amount, this.y)
      case 'R':
        return new Coordinate(this.x + amount, this.y)
    }
  }
}