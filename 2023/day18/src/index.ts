import fs from 'fs'
import TrenchPolygon from './classes/TrenchPolygon'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const poly = new TrenchPolygon(data)
const poly2 = new TrenchPolygon(data, true)

console.log('Part 1: ' + poly.area)
console.log('Part 2: ' + poly2.area)

