import { test, describe, expect } from '@jest/globals'
import NetworkTracker from './NetworkTracker'
import NodeNetwork from './NodeNetwork'
import { Instructions } from './Instructions'

describe('Test the network tracker', () => {
  test('Expect the result to be 6', () => {
    const input = `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`

    const nn = new NodeNetwork(input)
    const directions = new Instructions(input)
    const tracker = new NetworkTracker(nn.startNodes.map(n => n.node))
    const directionsGetter = () => directions.direction
    expect(tracker.travel(directionsGetter)).toBe(6)
  })
})