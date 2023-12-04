import fs from 'fs'
import DataLine from './classes/DataLine'

const data = fs.readFileSync('./data/input.txt').toString('utf-8')
const lines: DataLine[] = data.split('\n').map(data => new DataLine(data))

console.log('Part 1: ' + lines.map(l => l.getNumber()).reduce((prev, curr) => prev + curr))
console.log('Part 2:' + lines.map(l => l.getNumber(true)).reduce((prev, curr) => prev + curr))
