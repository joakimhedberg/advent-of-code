import Fertilizer from "./Fertilizer"
import Day05Base from "./base/Day05base"

export default class Soil extends Day05Base {
  constructor(soilId: number) {
    super(soilId)
  }

  public get soilId(): number {
    return this._id
  }

  public fertilizer: Fertilizer | undefined
}