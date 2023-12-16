import fs from 'fs'
import InputLine from './classes/InputLine'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const lines = data.split('\n').map((v, i) => new InputLine(v, i))
const targets = new Map<string, InputLine>()
for (const line of lines) {
  targets.set(line.target, line)
}

const resolveVariable = (varName: string) => /[0-9]+/.test(varName)? parseInt(varName): targets.get(varName)?.inputValue
let count = 0
while (lines.find(f => f.inputValue === undefined)) {
  for (let i = 0; i < lines.length; i++) {
    lines[i].inputValue = InputLine.calculate(lines[i].parts[0], resolveVariable)
  }
}

console.log('Part 1: ' + targets.get('a').inputValue)