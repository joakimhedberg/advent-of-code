import fs from 'fs'
import Battery from './classes/Battery'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const battery = new Battery(data)

console.log(`Part 1: ${battery.maxJoltage}`)
console.log(`Part 2: ${battery.maxJoltage2}`)