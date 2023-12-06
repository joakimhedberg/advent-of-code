export default class Day05Base {
  protected _id: number
  constructor(id: number) {
    this._id = id
  }

  public static parseMap(mapName: string, data: string): [number, number][] {
    const result: [number, number][] = []
    const localData = mapName + / map:(\n|\r|\s)([0-9\s]+)/g.exec(data)
    if (localData.length < 2) return result

    let count = 0
    for (const line of localData.split('\n').map(ld => ld.trim())) {
      const [fromId, toId, range] = line.split(' ').map(i => parseInt(i.trim()))
      if (isNaN(fromId) || isNaN(toId) || isNaN(range)) {
        continue
      }
      for (let i = 0; i < range; i++) {
        result.push([fromId + 1, toId + 1])
        count++
      }
    }

    return result
  }
}