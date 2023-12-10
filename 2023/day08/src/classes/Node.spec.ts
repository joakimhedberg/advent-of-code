import { test, describe, expect } from '@jest/globals'
import Node from './Node'

describe('Test the node class', () => {
  test('Expect node to be end node', () => {
    const node = new Node('ZZZ', 'AAA', 'BBB')
    expect(node.isEndNode(false)).toBe(true)
    expect(node.isEndNode(true)).toBe(true)
  })
})