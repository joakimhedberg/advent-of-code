import Light from "./Light";
import Day05Base from "./base/Day05base";

export default class Water extends Day05Base {
  constructor(waterId: number) {
    super(waterId)
  }

  public get waterId(): number {
    return this._id
  }

  public light: Light | undefined
}