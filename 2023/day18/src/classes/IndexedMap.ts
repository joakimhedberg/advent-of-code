import ICoordinate from "../interfaces/ICoordinate"
import Trench from "./Trench"

export default class IndexedMap {
  private _map = new Map<string, Trench>()

  public set(coord: ICoordinate, value: Trench) {
    this._map.set(`${coord.x}, ${coord.y}`, value)
  }

  public get(coord: ICoordinate) {
    return this._map.get(`${coord.x}, ${coord.y}`)
  }

  public get size(): number {
    return this._map.size
  }
}