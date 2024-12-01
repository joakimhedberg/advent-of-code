import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const groupConsecutiveNumbers = (data: string): string[] => {
  const result: string[] = []  
  let current = ''
  for (let i = 1; i < data.length; i++) {
    current += data[i - 1]
    if (data[i - 1] !== data[i]) {
      result.push(current)
      current = ''
    }
  }
  result.push(current + data.slice(-1))

  return result
}

let input = data
for (let i = 0; i < 40; i++) {
  input = groupConsecutiveNumbers(input).map(cn => `${cn.length}${cn[0]}`).join('')
}

let part1 = input.length

for (let i = 0; i < 10; i++) {
  input = groupConsecutiveNumbers(input).map(cn => `${cn.length}${cn[0]}`).join('')
}

let part2 = input.length
console.log('Part 1: ' + part1)
console.log('Part 2: ' + part2)