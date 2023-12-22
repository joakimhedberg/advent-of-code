import fs from 'fs'
import InputString from './classes/InputString'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const lines = data.split('\n').map(l => l.trim()).map(l => new InputString(l))
const part1 = lines.map(l => l.part1Calc).reduce((a, b) => a + b)
const part2 = lines.map(l => l.part2Calc).reduce((a, b) => a + b)
console.log('Part 1: ' + part1)
console.log('Part 2: ' + part2)