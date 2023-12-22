import fs from 'fs'
import LavaCity from './classes/LavaCity'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const city = new LavaCity(data)

const path = city.dijkstra([0, 0], [city.matrix.length - 1, city.matrix[0].length - 1])

fs.writeFileSync('./data/output.txt', city.matrix.map((val, row) => val.map((v, col) => path[row][col] !== undefined? '*': v.toString()).join('')).join('\n'))

// 906 Is too low
console.log('Part 1: ' + city.getPathSum(path))