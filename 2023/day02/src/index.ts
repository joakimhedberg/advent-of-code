import Bag from './classes/Bag'
import Cube from './classes/Cube'
import Set from './classes/Set'
import fs from 'fs'

const bag = new Bag()
bag.cubes.push(new Cube('red', 12))
bag.cubes.push(new Cube('green', 13))
bag.cubes.push(new Cube('blue', 14))

const sets: Set[] = []
for (const line of fs.readFileSync('./data/input.txt', 'utf-8').split('\n')) {
  const set = new Set()
  if (set.parse(line)) {
    sets.push(set)
  }
}

console.log(`Part 1: ` + sets.filter(s => bag.isSetPossible(s)).map(s => s.id).reduce((prev, curr) => prev + curr))
console.log(`Part 2: ` + sets.map(s => s.getMinimumPower()).reduce((prev, curr) => prev + curr))