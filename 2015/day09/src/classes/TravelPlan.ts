import Destination from "./Destination"

export default class TravelPlan {
  public readonly travelMap = new Map<string, Destination>()
  public readonly destinations: Destination[] = []
  public readonly distances = new Map<string, number>()

  constructor(data: string) {
    for (const line of data.split('\n')) {
      const [travel, distance] = line.split(' = ').map(i => i.trim())
      const [source, dest] = travel.split(' to ').map(i => i.trim())
      const src = this.travelMap.get(source) ?? new Destination(source)
      const dst = this.travelMap.get(dest) ?? new Destination(dest)
      this.travelMap.set(source, src)
      this.travelMap.set(dest, dst)
      src.neighbors.push([parseInt(distance), dst])
      dst.neighbors.push([parseInt(distance), src])
      this.distances.set(`${source}:${dest}`, parseInt(distance))
      this.distances.set(`${dest}:${source}`, parseInt(distance))
    }

    this.destinations.push(...this.travelMap.values())
  }

  private _passed = new Map<string, boolean>()
  public getShortestPaths(start: Destination, cost: number, first: boolean = true): number[] {
    if (first) this._passed = new Map<string, boolean>()
    if (this._passed.has(start.name)) return []
    this._passed.set(start.name, true)
    for (const neighbor of start.neighbors.sort((a, b) => a[0] -b[0])) {
      return [cost, ...this.getShortestPaths(neighbor[1], neighbor[0])]
    }
  }

  public get part1Result(): number {
    const permutations = this.getPermutations(this.destinations)
    let result = Number.MAX_VALUE
    for (const perm of permutations) {
      const pairs = this.getPairs(perm)
      let distance = pairs.map(p => this.distances.get(`${p[0].name}:${p[1].name}`)).reduce((a, b) => a + b)
      if (distance < result) result = distance
    }

    return result
  }

  public get part2Result(): number {
    const permutations = this.getPermutations(this.destinations)
    let result = 0
    for (const perm of permutations) {
      const pairs = this.getPairs(perm)
      let distance = pairs.map(p => this.distances.get(`${p[0].name}:${p[1].name}`)).reduce((a, b) => a + b)
      if (distance > result) result = distance
    }

    return result
  }

  private getPairs<T>(inputArr: T[]) {
    const result: [T, T][] = []
    for (let i = 0; i < inputArr.length - 1; i++) {
      result.push([inputArr[i], inputArr[i + 1]])
    }

    return result
  }

  private getPermutations<T>(inputArr: T[]) {
    const result: T[][] = []
  
    function permute(arr: T[], m: T[] = []) {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; ++i) {
          const current = arr.slice()
          const next = current.splice(i, 1)
          permute(current.slice(), m.concat(next))
        }
      }
    }
  
    permute(inputArr)
  
    return result
  }
}