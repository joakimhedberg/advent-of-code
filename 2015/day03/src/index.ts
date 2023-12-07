import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

let x = 0
let y = 0

let visited: Map<string, number> = new Map()
visited.set(`${x}, ${y}`, 0)
for (let i = 0; i < data.length; i += 2) {
  const char = data[i]
  switch (char) {
    case '^':
      y--
      break
    case 'v':
      y++
      break
    case '>':
      x++
      break
    case '<':
      x--
      break
  }

  let visit = visited.get(`${x}, ${y}`) ?? 0
  visited.set(`${x}, ${y}`, ++visit)
}

x = 0
y = 0
for (let i = 1; i < data.length; i += 2) {
  const char = data[i]
  switch (char) {
    case '^':
      y--
      break
    case 'v':
      y++
      break
    case '>':
      x++
      break
    case '<':
      x--
      break
  }

  let visit = visited.get(`${x}, ${y}`) ?? 0
  visited.set(`${x}, ${y}`, ++visit)
}

console.log(`Part 1: ${visited.size}`)