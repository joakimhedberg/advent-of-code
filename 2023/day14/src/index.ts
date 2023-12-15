import fs from 'fs'
import ReflectorDish from './classes/ReflectorDish'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const dishArray = new ReflectorDish(data)
console.log('Part 1: ' + dishArray.process())

import './part2'
