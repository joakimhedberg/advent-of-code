import fs from 'fs'
import Race from './classes/Race'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const lines = data.split('\n')
const times = lines[0].trim().slice(13).trim().split(' ').filter(i => i.trim() !== '').map(i => parseInt(i))
const distances = lines[1].trim().slice(12).trim().split(' ').filter(i => i.trim() !== '').map(i => parseInt(i))

const timepart2 = parseInt(times.map(t => `${t}`).join(''))
const distancepart2 = parseInt(distances.map(t => `${t}`).join(''))

const racePart2 = new Race(timepart2, distancepart2)

const races: Race[] = []
for (let i = 0; i < times.length; i++) {
  races.push(new Race(times[i], distances[i]))
}

for (let i = 0; i < races.length; i++) {
  const race = races[i]
  for (let j = 0; j < race.time; j++) {
    const currentDistance = race.getDistancePerPush(j)
    if (currentDistance > race.distance) {
      race.recordPushingTimes.push(j)
    }

  }
}

for (let i = 0; i < racePart2.time; i++) {
  if (racePart2.getDistancePerPush(i) > racePart2.distance) {
    racePart2.recordPushingTimes.push(i)
  }
}

const part1 = races.filter(f => f.recordPushingTimes.length > 0).map(r => r.recordPushingTimes.length).reduce((curr, prev) => curr * prev)
const part2 = racePart2.recordPushingTimes.length
console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)

