import fs from 'fs'
import HotSpringGroup from './classes/HotSpringGroup'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const springs = data.split('\n').map(l => new HotSpringGroup(l))
console.log('Part 1: ' + springs.map(s => HotSpringGroup.count(s.springs, [...s.numbers])).reduce((a, b) => a + b))
console.log('Part 2: ' + springs.map(s => HotSpringGroup.count(s.springsPart2, [...s.numbersPart2])).reduce((a, b) => a + b))