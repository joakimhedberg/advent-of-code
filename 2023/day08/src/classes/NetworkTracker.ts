import Node from './Node'

export default class NetworkTracker {
  public startNodes: Node[]
  public currentNodes: Node[]
  constructor(startNodes: Node[]) {
    this.startNodes = startNodes
    this.currentNodes = Array.from(this.startNodes)
  }

  public index: number = 0
  public reset() {
    this.currentNodes = Array.from(this.startNodes)
    this.index = 0
  }

  public travel(directionGetter: () => 'L' | 'R'): number {
    while (true) {
      const direction = directionGetter()
      
      for (let i = 0; i < this.currentNodes.length; i++) {
        this.currentNodes[i] = this.currentNodes[i].go(direction)
      }
      
      this.index++
      
      let found = true
      for (let i = 0; i < this.currentNodes.length; i++) {
        if (!this.currentNodes[i].isEndNode(true)) {
          found = false
        }
      }

      if (found) break
    }

    return this.index
  }
}