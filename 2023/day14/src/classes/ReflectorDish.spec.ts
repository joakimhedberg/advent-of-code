import { test, describe, expect } from '@jest/globals'
import ReflectorDish from './ReflectorDish'

describe('Test the reflector dish', () => {
  test('Expect dish load to be 136', () => {
    const dish = new ReflectorDish(`O....#....
      O.OO#....#
      .....##...
      OO.#O....O
      .O.....O#.
      O.#..O.#.#
      ..O..#O..O
      .......O..
      #....###..
      #OO..#....`)
      expect(dish.process()).toBe(136)
  })
})
