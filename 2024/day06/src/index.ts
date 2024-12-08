import fs from 'fs'
import Room from './classes/Room'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const room = new Room(data)
const part1 = room.Walk()
console.log('Part 1: ' + part1)
const part2 = Room.findLoops(data)
console.log('Part 2: ' + part2)
