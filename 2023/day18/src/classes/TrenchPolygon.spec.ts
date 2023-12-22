import { expect, test, describe } from '@jest/globals'
import TrenchPolygon from './TrenchPolygon'
import Coordinate from './Coordinate'

describe('Test the polygon class', () => {
  test('Test polygon area', () => {
    const tp = new TrenchPolygon('')
    tp.pointsXY.splice(0, tp.pointsXY.length)
    tp.pointsXY.push(new Coordinate(0, 0))
    tp.pointsXY.push(new Coordinate(2, 0))
    tp.pointsXY.push(new Coordinate(2, 2))
    tp.pointsXY.push(new Coordinate(0, 2))
    expect(tp.area).toBe(4)
  })
})