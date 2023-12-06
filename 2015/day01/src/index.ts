import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
let floor = 0
let basement: number | undefined = undefined

for (let i = 0; i < data.length; i++) {
  const char = data[i]
  if (char === '(') {
    floor++
  }
  else if (char === ')') {
    floor--
  }

  if (floor === -1 && basement === undefined) {
    basement = i + 1
  }
}

console.log('Part 1: ' + floor)
console.log('Part 2: ' + basement)