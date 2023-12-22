import fs from 'fs'
import InputLine from './classes/InputLine'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const lines = data.split('\n').map((v, i) => new InputLine(v, i))
const targets = new Map<string, InputLine>()
for (const line of lines) {
  targets.set(line.target, line)
}

const resolveVariable = (varName: string) => /[0-9]+/.test(varName)? parseInt(varName): targets.get(varName)?.inputValue
while (lines.find(f => f.inputValue === undefined)) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].inputValue === undefined) {
      lines[i].inputValue = InputLine.calculate(lines[i].parts[0], resolveVariable)
    }
  }
}

const part1 = targets.get('a').inputValue
console.log('Part 1: ' + part1)

targets.forEach(t => t.inputValue = undefined)
targets.get('b').inputValue = part1

while (lines.find(f => f.inputValue === undefined)) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].inputValue === undefined) {
      lines[i].inputValue = InputLine.calculate(lines[i].parts[0], resolveVariable)
    }
  }
}
console.log('Part 2: ' + targets.get('a').inputValue)

