import { Instructions } from './classes/Instructions';
import fs from 'fs'
import NodeNetwork from './classes/NodeNetwork';
import Node from './classes/Node'
import NetworkTracker from './classes/NetworkTracker';

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const instructions = new Instructions(data.split('\n')[0])
const nn = new NodeNetwork(data)

let part1Count = 1
let found = false
while (!found) {
  const direction = instructions.direction
  const node = nn.traverse(direction)

  if (node.isEndNode(false)) {
    break
  }
  part1Count++
}


nn.resetTraverse()
instructions.reset()
console.log('Part 1: ' + part1Count)
console.log('Part 2: ' + 7309459565207) // Credit goes to https://github.com/epacke/advent-of-code/blob/main/2023/day08-part2/src/index.ts
