import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const lines = data.split('\n')
const variableValues = new Map<string, number>()

const patternAssign = /([a-z]+) ->\s([a-z]+)/g
for (const line of data) {
  const [action, target] = line.split(' -> ')

}