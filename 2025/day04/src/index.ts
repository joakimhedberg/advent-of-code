import fs from 'fs'
import PaperGrid from './classes/PaperGrid'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const grid = new PaperGrid(data)

console.log(`Part 1: ${grid.part1}`)
console.log(`Part 2: ${grid.part2}`)