import fs from 'fs'
import Hand from './classes/Hand'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

console.log('Part 1: ' + data.split('\n').map(l => l.trim()).map(l => {
  const hand = new Hand()
  if (hand.parse(l)) {
    return hand
  }

  return undefined
}).sort((a, b) => a.compare(b)).filter(r => r !== undefined).map((hand, index, hands) => hand.getScore(hands.length - index)).reduce((a, b) => a + b))

console.log('Part 2: ' + data.split('\n').map(l => l.trim()).map(l => {
  const hand = new Hand(undefined, true)
  if (hand.parse(l)) {
    return hand
  }

  return undefined
}).sort((a, b) => a.compare(b)).filter(r => r !== undefined).map((hand, index, hands) => hand.getScore(hands.length - index)).reduce((a, b) => a + b))
