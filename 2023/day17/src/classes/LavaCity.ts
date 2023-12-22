import ICoordinate from "../interfaces/ICoordinate"
import LavaItem from "./LavaItem"

export default class LavaCity {
  public readonly matrix: number[][]
  constructor(data: string) {
    this.matrix = data.split('\n').map((line) => line.trim().split('').map((l) => parseInt(l)))
  }

  public getNeighbors(row: number, col: number) {
    const neighbors: [number, number][] = []
    if (row > 0) neighbors.push([row - 1, col])
    if (col > 0) neighbors.push([row, col - 1])
    if (row < this.matrix.length - 1) neighbors.push([row + 1, col])
    if (row < this.matrix[0].length - 1) neighbors.push([row, col + 1])
    return neighbors
  }

  private consecutiveForwardMoves = 0
  updateConsecutiveForwardMoves(current: [number, number], next: [number, number]): void {
    const isForwardMove =
      current[0] < next[0] || (current[0] === next[0] && current[1] < next[1]);

    if (isForwardMove) {
      this.consecutiveForwardMoves++;
    } else {
      this.consecutiveForwardMoves = 0;
    }
  }

  public getCellValue(row: number, col: number): number {
    return this.matrix[row][col]
  }

  public getPathSum(path: [number, number][]): number {
    return path.map(p => this.matrix[p[0]][p[1]]).reduce((a, b) => a + b)
  }

  public dijkstra(start: [number, number], end: [number, number]): [number, number][] | undefined {
    const rows = this.matrix.length
    const cols = this.matrix[0].length

    const dist: number[][] = new Array(rows).fill([]).map(() => new Array(cols).fill(Number.POSITIVE_INFINITY))
    const visited: boolean[][] = new Array(rows).fill([]).map(() => new Array(cols).fill(false))
    const prev: [number, number][][] = new Array(rows).fill([]).map(() => new Array(cols).fill(null))

    dist[start[0]][start[1]] = 0

    while (true) {
      let minDist = Number.POSITIVE_INFINITY
      let current: [number, number] | null = null

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (!visited[i][j] && dist[i][j] < minDist) {
            minDist = dist[i][j]
            current = [i, j]
          }
        }
      }

      if (!current || minDist === Number.POSITIVE_INFINITY) break
      visited[current[0]][current[1]] = true
      
      const neighbors = this.getNeighbors(current[0], current[1])
      for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor
        const alt = dist[current[0]][current[1]] + this.getCellValue(neighborRow, neighborCol)

        this.updateConsecutiveForwardMoves(current, neighbor)
        if (alt < dist[neighborRow][neighborCol] && this.consecutiveForwardMoves < 3) {
          dist[neighborRow][neighborCol] = alt
          prev[neighborRow][neighborCol] = current
        }
      }
    }

    const path: [number, number][] = []
    let current = end
    while (current) {
      path.unshift(current)
      current = prev[current[0]][current[1]]
    }

    if (path.length === 1 && !path[0].every((value, index) => value === start[index])) {
      return null
    }

    return path
  }
}