import fs from 'fs'
import TravelPlan from './classes/TravelPlan'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const tp = new TravelPlan(data)

console.log('Part 1: ' + tp.part1Result)
console.log('Part 2: ' + tp.part2Result)
