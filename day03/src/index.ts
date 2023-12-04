import fs from 'fs'
import Engine from './classes/Engine'
const data: string[] = fs.readFileSync('./data/input.txt', 'utf-8').split(/\n/)

const engine = new Engine(data)
console.log(`Part 1: ${engine.parts.filter(p => !p.isIgnored).map(p => p.partNumber).reduce((prev, curr) => prev + curr)}`)
console.log(`Part 2: ${engine.symbols.filter(s => s.symbol === '*' && s.partNumbers.length === 2).map(s => s.partNumbers.map(p => p.partNumber).reduce((curr, prev) => curr * prev)).reduce((curr, prev) => curr + prev)}`)


