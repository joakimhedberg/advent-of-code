import { describe, expect, test } from '@jest/globals'
import PipeNetwork from './PipeNetwork'
import fs from 'fs'

describe('Testing the pipe network', () => {
  test('Test start node connections', () => {
    const pn = new PipeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(pn.startPipe.connectedPipes.length).toBe(2)
  })

  test('Test start node coordinates', () => {
    const pn = new PipeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(pn.startPipe.coordinate).toEqual({ x: 25, y: 83 })
  })

  test('Expect the point classification to work', () => {
    const pn = new PipeNetwork(fs.readFileSync('./data/input.txt', 'utf-8'))
    expect(pn.insidePoints).toBeLessThan(0)
  })
})