import fs from 'fs'
import Workflow from './classes/Workflow'
import HeapSystem from './classes/HeapSystem'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const heap = new HeapSystem(data)

console.log('Part 1: ' + heap.part1Result)
console.log('Part 2: ' + heap.part2Result)