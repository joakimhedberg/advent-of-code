import fs from 'fs'
import XmasFinder from './classes/XmasFinder'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const finder = new XmasFinder(data)

console.log(`Part 1: ${finder.countChristmas()}`)
console.log(`Part 2: ${finder.countXmas()}`)