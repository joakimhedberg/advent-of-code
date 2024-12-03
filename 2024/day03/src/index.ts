import fs from 'fs'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const solvePart1 = (data: string): number => {
  const pattern = /(mul\([0-9]{1,3},[0-9]{1,3}\))/gm
  let match: RegExpMatchArray | null = null
  
  let total = 0
  while (match = pattern.exec(data)) {
    const numbers = match[1].match(/([0-9]{1,3})/gm)
    
    total += parseInt(numbers[0]) * parseInt(numbers[1])
  }
  return total
}

const solvePart2 = (data: string): number => {
  const pattern = /(?<=^|do\(\)|^)(.+?)(?=don't\(\)|$)/gs
  let match: RegExpMatchArray | null = null

  let total = 0
  while (match = pattern.exec(data)) {
    total += solvePart1(match[1])
  }

  return total
}

console.log(`Part 1: ${solvePart1(data)}`)
console.log(`Part 2: ${solvePart2(data)}`)
