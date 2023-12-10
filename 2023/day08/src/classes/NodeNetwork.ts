import { Instructions } from './Instructions'
import Node from './Node'

export default class NodeNetwork {
  public nodes: Map<string, Node> = new Map()
  public startNode: Node
  public currentNode: Node
  public startNodes: { node: Node, currentNode: Node }[] = []

  constructor(input: string) {
    for (const line of input.split('\n').map(l => l.trim()).filter(l => l.indexOf(' = ') > -1)) {
      const [name, directions] = line.split(' = ')
      const [left, right] = directions.split(', ')
      const node = new Node(name, left.trim().slice(1), right.trim().slice(0, -1))
      this.nodes.set(node.name, node)
    }
    this.nodes.forEach(value => {
      value.left = this.nodes.get(value.leftAddr)
      value.right = this.nodes.get(value.rightAddr)

      if (value.isStartNode(true)) {
        this.startNodes.push({node: value, currentNode: value})
      }
    })

    this.currentNode = this.startNode = this.nodes.get('AAA')
  }

  public resetTraverse() {
    this.startNode = this.nodes.get('AAA')
  }

  public traverse(direction: 'L' | 'R'): Node {
    return this.currentNode = this.currentNode.go(direction)
  }

  public traverseMultiple(direction: 'L' | 'R') {
    this.startNodes.forEach(value => {
      value.currentNode = value.currentNode?.go(direction)
    })

    return (this.startNodes.map(n => n.currentNode?.isEndNode(true)).every(v => v === true))
  }

  public getPart2Results(ins: Instructions) {
    let count = 1

    while (true) {
      const direction = ins.direction
      for (const node of this.startNodes) {
        node.currentNode = node.currentNode.go(direction)
      }
      if (this.startNodes.map(n => n.currentNode.isEndNode(true)).every(e => e === true)) break
      count++
    }
    return count
  }
}