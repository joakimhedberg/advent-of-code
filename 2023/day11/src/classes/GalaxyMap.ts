import CoordinateType from "../types/CoordinateType";
import SpaceItem from "./SpaceItem";

export default class GalaxyMap {
  public readonly spaceItems: SpaceItem[][]
  public readonly galaxyMap = new Map<number, SpaceItem>()
  
  private readonly _spaceData: string[][]

  constructor(input: string) {
    this._spaceData = input.split('\n').map(l => l.trim()).map(l => l.split(''))

    let galaxyName = 1
    this.spaceItems = this._spaceData.map((sd, y) => sd.map((s, x) => new SpaceItem(s === '#'? galaxyName++: -1, s as '#' | '.', { x: x, y: y })))

    for (const row of this.spaceItems) {
      for (const col of row) {
        const topRow = this.spaceItems[col.coordinate.y - 1]
        const bottomRow = this.spaceItems[col.coordinate.y + 1]
        if (topRow) {
          const topItem = topRow[col.coordinate.x]
          if (topItem) col.adjacentItems.push(topItem)
        }
        if (bottomRow) {
          const bottomItem = bottomRow[col.coordinate.x]
          if (bottomItem) col.adjacentItems.push(bottomItem)
        }
        
        const leftItem = row[col.coordinate.x - 1]
        if (leftItem) col.adjacentItems.push(leftItem)
        const rightItem = row[col.coordinate.x + 1]
        if (rightItem) col.adjacentItems.push(rightItem)

        if (col.name !== -1) {
          this.galaxyMap.set(col.name, col)
        }
      }
    }
  }

  public get rowCount(): number {
    return this.spaceItems.length + (this.getEmptyRowCrossings({x: 0, y: 0}, {x: 0, y: this.spaceItems.length - 1}))
  }

  public get columnCount(): number {
    return this.spaceItems[0].length + (this.getEmptyColumnCrossings({x: 0, y: 0}, {x: this.spaceItems[0].length - 1, y: 0}))
  }

  public resetAll() {
    this.spaceItems.forEach(row => row.forEach(i => i.visited = false))
  }

  private _isEmptyRow(index: number): boolean {
    for (const item of this._spaceData[index]) {
      if (item !== '.') return false
    }

    return true
  }

  private _isEmptyColumn(index: number): boolean {
    for (const row of this._spaceData) {
      if (row[index] !== '.') {
        return false
      }
    }
    return true
  }

  private _insertEmptyRow(index: number, isPart2?: boolean) {
    if (!isPart2) {
      this._spaceData.splice(index, undefined, Array.from(this._spaceData[index]))
    }
    else {
      for (let i = 0; i < 1000000; i++) {
        this._insertEmptyRow(index)
      }
    }
  }

  private _insertEmptyColumn(index: number, isPart2?: boolean) {
    if (!isPart2) {
      for (const row of this._spaceData) {
        row.splice(index, undefined, '.')
      }
    }
    else {
      for (let i = 0; i < 1000000; i++) {
        this._insertEmptyColumn(index)
      }
    }
  }

  public get galaxiesPaired(): [SpaceItem, SpaceItem][] {
    const result: [SpaceItem, SpaceItem][] = []
    const galaxies = this.galaxies
    for (let i = 0; i < galaxies.length - 1; i++) {
      const g1 = galaxies[i]
      for (let j = i + 1; j < galaxies.length; j++) {
        result.push([g1, galaxies[j]])
      }
    }

    return result
  }

  public get galaxies(): SpaceItem[] {
    const result: SpaceItem[] = []
    for (const row of this.spaceItems) {
      for (const col of row) {
        if (col.itemType === '#') result.push(col)
      }
    }

    return result
  }

  public getShortestPaths(part2?: boolean): number {
    const galaxies = this.galaxiesPaired
    let result = 0
    for (const [g1, g2] of galaxies) {
      result += this.getShortestPath(g1, g2, part2)
    }
    return result
  }

  public getEmptyColumnCrossings(coord1: CoordinateType, coord2: CoordinateType) {
    let count = 0
    for (let i = Math.min(coord1.x, coord2.x); i <= Math.max(coord1.x, coord2.x); i++) {
      if (this._isEmptyColumn(i)) {
        count++
      }
    }

    return count
  }

  public getEmptyRowCrossings(coord1: CoordinateType, coord2: CoordinateType) {
    let count = 0
    for (let i = Math.min(coord1.y, coord2.y); i <= Math.max(coord1.y, coord2.y); i++) {
      if (this._isEmptyRow(i)) {
        count++
      }
    }

    return count
  }

  public getShortestPath(galaxy1: SpaceItem, galaxy2: SpaceItem, isPart2?: boolean): number {
    const expansion = isPart2 ? 999999 : 1
    const deltaX = Math.abs(galaxy1.coordinate.x - galaxy2.coordinate.x) + (this.getEmptyColumnCrossings(galaxy1.coordinate, galaxy2.coordinate) * expansion)
    const deltaY = Math.abs(galaxy1.coordinate.y - galaxy2.coordinate.y) + (this.getEmptyRowCrossings(galaxy1.coordinate, galaxy2.coordinate) * expansion)
    return deltaX + deltaY
  }
}