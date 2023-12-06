import Day05Base from "./base/Day05base";
import Location from './Location'

export default class Humidity extends Day05Base {
  constructor(humidityId: number) {
    super(humidityId)
  }

  public get humidityId(): number {
    return this._id
  }

  public location: Location | undefined
}