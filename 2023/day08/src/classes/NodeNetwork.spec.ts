import { test, describe, expect } from '@jest/globals'
import NodeNetwork from './NodeNetwork'
import fs from 'fs'
import { Instructions } from './Instructions'

describe('Test the node network', () => {
  test('Find start node', () => {
    const nn = new NodeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(nn.startNode.isStartNode(false)).toBe(true)
  })

  test('Find start nodes, part 2', () => {
    const nn = new NodeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(nn.startNodes.length).toBe(6)
  })

  test('Ensure that all nodes have left and right values', () => {
    const nn = new NodeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    nn.nodes.forEach(node => {
      if (node.left === undefined || node.right === undefined) {
        throw new Error('Left or right node missing')
      }
    })
  })

  test('Node trace', () => {
    const input = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`

    const nn = new NodeNetwork(input)
    const directions = new Instructions(input.split('\n')[0])
    const dir = () => directions.direction
  })

  test('Ensure node count', () => {
    const nn = new NodeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(nn.nodes.size).toBe(666)
  })

  test('Ensure start node to exist', () => {
    const nn = new NodeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(nn.startNode).not.toBeUndefined()
  })

  test('Find multiple end nodes', () => {
    const input = `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`

    const instructions = new Instructions(input)
    const nn = new NodeNetwork(input)

    expect(nn.getPart2Results(instructions)).toBe(6)
  })
})