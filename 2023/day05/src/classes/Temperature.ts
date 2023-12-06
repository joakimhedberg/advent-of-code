import Humidity from "./Humidity";
import Day05Base from "./base/Day05base";

export default class Temperature extends Day05Base {
  constructor(temparatureId: number) {
    super(temparatureId)
  }

  public get temperatureId(): number {
    return this._id
  }

  public humidity: Humidity | undefined
}