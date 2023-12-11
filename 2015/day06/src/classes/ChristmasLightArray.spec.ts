import { test, describe, expect } from '@jest/globals'
import ChristmasLightArray from './ChristmasLightArray'

describe('Test the christmas light array', () => {
  test('Expect the number of lights to be on to equal zero', () => {
    const array = new ChristmasLightArray()
    expect(array.countOn).toBe(0)
  })

  test('Expect the number of lights to be on to equal 10', () => {
    const array = new ChristmasLightArray()
    array.on({x: 0, y: 0}, {x: 9, y: 0})
    expect(array.countOn).toBe(10)
  })

  test('Expect the number of lights to be on to equal 10', () => {
    const array = new ChristmasLightArray()
    array.on({x: 0, y: 0}, {x: 0, y: 9})
    expect(array.countOn).toBe(10)
  })

  test('Expect all the lights to be on', () => {
    const array = new ChristmasLightArray()
    array.on({x: 0, y: 0}, {x: 999, y: 999})
    expect(array.countOn).toBe(1000000)
  })

  test('Expect two lights to be on', () => {
    const array = new ChristmasLightArray()
    array.on({ x: 0, y: 0 }, { x: 4, y: 4 })
    array.toggle({ x: 0, y: 0 }, { x: 4, y: 4 })
    array.on({x: 0, y: 0}, {x: 0, y: 1})
    expect(array.countOn).toBe(2)
  })
})