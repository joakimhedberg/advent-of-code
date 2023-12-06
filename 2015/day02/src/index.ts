import fs from 'fs'
import Present from './classes/Present'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const presents = data.split('\n').map(line => new Present(line))

console.log('Part 1: ' + presents.map(p => p.totalArea).reduce((curr, prev) => curr + prev))
console.log('Part 2: ' + presents.map(p => p.ribbonLength).reduce((curr, prev) => curr + prev))