import Day05Base from "./base/Day05base";

export default class Location extends Day05Base {
  constructor(locationId: number) {
    super(locationId)
  }

  public get locationId(): number {
    return this._id
  }
}