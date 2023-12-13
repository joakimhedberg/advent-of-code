import { describe, test, expect } from '@jest/globals'
import LavaField from './LavaField'
import MirrorLine from './MirrorLine'

describe('Test the mirror line', () => {
  test('Expect a horizontal mirror line', () => {
    const field = new LavaField(`#...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`)
    expect(MirrorLine.getMirrorCount(field)).toBe(400)
  })

  test('Expect a vertical mirror column', () => {
    const field = new LavaField(`#.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.`)
    expect(MirrorLine.getMirrorCount(field)).toBe(5)
  })
})