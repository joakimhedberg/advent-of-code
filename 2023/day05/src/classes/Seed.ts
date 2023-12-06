import Soil from "./Soil"
import Day05Base from "./base/Day05base"

export default class Seed extends Day05Base {
  constructor(seedId: number) {
    super(seedId)
  }

  public soil: Soil | undefined
  public static parse(data: string): Map<number, Seed> {
    const result = /seeds:\s(.+)/g.exec(data)
    if (result == null) return new Map()
    if (result.length < 2) return new Map()

    const seeds = new Map<number, Seed>()
    for (const seed of result[1].split(' ').map(l => new Seed(parseInt(l)))) {
      seeds.set(seed.seedId, seed)
    }

    return seeds
  }

  public get seedId(): number {
    return this._id
  }
}