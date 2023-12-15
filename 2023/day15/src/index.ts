import fs from 'fs'
import Step from './classes/Step'
import Box from './classes/Box'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const steps = data.trim().split(',').map(step => new Step(step))
const hashMap = new Map<number, Step>()

const boxes = new Map<number, Box>()
for (let i = 0; i < 256; i++) {
  boxes.set(i, new Box(i))
}


let totalPart1 = 0
for (const step of steps) {
  totalPart1 += step.hashCode
  hashMap.set(step.hashCode, step)
  step.performBoxAction(boxes)
}
let totalPart2 = 0
boxes.forEach(box => {
  for (const result of box.getLensPowers()) {
    totalPart2 += result
  }
})

console.log('Part 1: ' + totalPart1)
console.log('Part 2: ' + totalPart2)

// 4343259 is too high
