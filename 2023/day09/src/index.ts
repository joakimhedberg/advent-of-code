import fs from 'fs'
import Sequence from './classes/Sequence'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const sequences = data.split(/\n/g).map(seq => {
  const s = new Sequence()
  s.numbers = seq.trim().split(' ').map(s => parseInt(s))
  return s
})

sequences.forEach(seq => seq.process())

const part1 = sequences.map(seq => seq.getNextNumber()).reduce((prev, curr) => prev + curr)
const part2 = sequences.map(seq => seq.getPreviousNumber()).reduce((prev, curr) => prev + curr)

console.log('Part 1: ' + part1)
console.log('Part 2: ' + part2)