import fs from 'fs'
import LavaField from './classes/LavaField'
import MirrorLine from './classes/MirrorLine'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const fields = data.split('\n\n').map(dt => new LavaField(dt.trim()))
const fields2 = data.split('\n\n').map(dt => new LavaField(dt.trim(), true))

console.log('Part 1: ' + fields.map(f => MirrorLine.getMirrorCount(f)).reduce((a, b) => a + b))
console.log('Part 2: ' + MirrorLine.part2(fields))