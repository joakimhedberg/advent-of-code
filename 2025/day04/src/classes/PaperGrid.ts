export default class PaperGrid {
  paper_grid: string[][]
  constructor(data: string) {
    this.paper_grid = data.split('\n').map(l => l.trim().split(''))
  }

  public adjacentRolls(x: number, y: number): number {
    return this.rollCount(x - 1, y) +
      this.rollCount(x + 1, y) +
      this.rollCount(x - 1, y - 1) +
      this.rollCount(x, y - 1) +
      this.rollCount(x + 1, y - 1) +
      this.rollCount(x - 1, y + 1) +
      this.rollCount(x, y + 1) +
      this.rollCount(x + 1, y + 1)
  }

  public rollCount(x: number, y: number) {
    return this.isRoll(x, y)? 1: 0
  }

  public isRoll(x: number, y: number): boolean {
    if (x < 0) return false
    if (x >= this.paper_grid[0].length) return false
    if (y < 0) return false
    if (y >= this.paper_grid.length) return false

    return this.paper_grid[y][x] == '@'
  }

  public rollPositions(): {x: number, y: number}[] {
    const result: {x: number, y: number}[] = []

    for (let y = 0; y < this.paper_grid.length; y++) {
      for (let x = 0; x < this.paper_grid[y].length; x++) {
        if (this.isRoll(x, y)) {
          result.push({x: x, y: y})
        }
      }
    }
    return result
  }

  public get part1(): number {
    let count = 0
    for (const rp of this.rollPositions()) {
      if (this.adjacentRolls(rp.x, rp.y) < 4) {
        count++
      }
    }

    return count
  }

  public get part2(): number {
    let count = 0

    let localCount = 0
    do {
      const removals: {x: number, y: number}[] = []
      localCount = 0
      for (const rp of this.rollPositions()) {
        if (this.adjacentRolls(rp.x, rp.y) < 4) {
          localCount++
          removals.push({x: rp.x, y: rp.y})
        }
      }
      
      this.removeRolls(removals)
      count += localCount

    } while (localCount > 0)
     
    return count
  }

  public removeRolls(positions: {x: number, y: number}[]) {
    for (const pos of positions) {
      this.paper_grid[pos.y][pos.x] = '.'
    }
  }

  public showDebug() {
    const output: string[][] = []
    for (let y = 0; y < this.paper_grid.length; y++) {
      let row: string[] = []
      for (let x = 0; x < this.paper_grid[y].length; x++) {
        if (this.isRoll(x, y)) {
          row.push(this.adjacentRolls(x, y).toString())
        }
        else {
          row.push('.')
        }
      }
      output.push(row)
    }

    console.log(output.map(l => l.join('')).join('\n'))
  }
}