import fs from 'fs'
import GalaxyMap from './classes/GalaxyMap'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const spaceMap = new GalaxyMap(data)

const shortest = spaceMap.getShortestPaths()
const shortest2 = spaceMap.getShortestPaths(true)
console.log('Part 1: ' + shortest)
console.log('Part 2: ' + shortest2)
