
export default class Node {
  public name: string
  public leftAddr: string
  public rightAddr: string

  public left: Node
  public right: Node

  constructor(name: string, left: string, right: string) {
    this.name = name.trim()
    this.leftAddr = left.trim()
    this.rightAddr = right.trim()
  }

  public isStartNode(part2: boolean) {
    return part2 && this.name.endsWith('A') || !part2 && this.name === 'AAA'
  }

  public isEndNode(part2: boolean): boolean {
    return part2 && this.name.endsWith('Z') || !part2 && this.name === 'ZZZ'
  }

  public go(direction: 'L' | 'R') {
    switch (direction) {
      case 'L':
        return this.left
      case 'R':
        return this.right
    }
  }
}