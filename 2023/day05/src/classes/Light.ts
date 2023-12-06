import Temperature from "./Temperature";
import Day05Base from "./base/Day05base";

export default class Light extends Day05Base {
  constructor(lightId: number) {
    super(lightId)
  }

  public get lightId(): number {
    return this._id
  }

  public temperature: Temperature | undefined
}