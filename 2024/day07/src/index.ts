import fs from 'fs'
import { getResultPart, isValidItem } from './calc'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const part1 = data.split('\n').filter(line => isValidItem(line, ['+', '*'])).map(item => getResultPart(item)).reduce((a, b) => a + b)
const part2 = data.split('\n').filter(line => isValidItem(line, ['+', '*', '||'])).map(item => getResultPart(item)).reduce((a, b) => a + b)
console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)
