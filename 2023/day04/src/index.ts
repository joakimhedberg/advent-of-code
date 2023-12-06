import fs from 'fs'
import process from 'process'

import ScratchCardCollection from "./classes/ScratchCardCollection";
const data: string = fs.readFileSync('./data/input.txt', 'utf-8')
const collection = new ScratchCardCollection()
if (!collection.parse(data)) {
  process.exit()  
}

console.log(`Part 1: ${collection.cards.map(c => c.points).reduce((curr, prev) => curr + prev)}`)
console.log(`Part 2: ${collection.getExtendedWinners().length}`)