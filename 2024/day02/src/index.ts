import fs from 'fs'
import LevelRow from './classes/LevelRow'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

export const countValidLevels = (data: string, v2?: boolean): number => {
  const rows: LevelRow[] = []
  for (const row of data.split('\n').map(i => i.trim())) {
    const lr = new LevelRow(row)
    if (!v2) {
      if (lr.isValid()) {
        rows.push(lr)
      }
    } else {
      if (lr.isValidV2()) {
        rows.push(lr)
      }
    }
  }

  return rows.length
}

const part1 = countValidLevels(data)
const part2 = countValidLevels(data, true)
console.log('Part 1: ' + part1)
console.log('Part 2: ' + part2)