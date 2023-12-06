import Water from "./Water";
import Day05Base from "./base/Day05base";

export default class Fertilizer extends Day05Base {
  constructor(fertilizerId: number) {
    super(fertilizerId)
  }

  public get fertilizerId(): number {
    return this._id
  }

  public water: Water | undefined
}