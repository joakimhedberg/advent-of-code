import fs from 'fs'
import NaughtyOrNice from './classes/NaughtyOrNice'

const naughtyList = fs.readFileSync('./data/input.txt', 'utf-8').trim().split('\n').map(l => new NaughtyOrNice(l.trim()))
console.log(`Part 1: ${naughtyList.filter(n => n.isNice).length}`)
console.log(`Part 2: ${naughtyList.filter(n => n.isNice2).length}`)