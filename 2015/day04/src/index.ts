import fs from 'fs'
import {Md5} from 'ts-md5'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

let part1: number = undefined
let part2: number = undefined
for (let i = 0; i < 6000000; i++) {
  const md = new Md5()
  md.appendStr(`${data}${i}`)
  const value = md.end()
  if (value.toString().startsWith('000000')) {
    part2 = i
  }
  else if (value.toString().startsWith('00000')) {
    part1 = i
  }

  if (part1 && part2) break
}

console.log('Part 1: ' + part1)
console.log('Part 2: ' + part2)