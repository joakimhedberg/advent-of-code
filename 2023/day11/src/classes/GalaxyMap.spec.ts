import { expect, test, describe } from '@jest/globals'
import GalaxyMap from './GalaxyMap'
import fs from 'fs'
import GalaxyResult from './GalaxyResult'



    //result.forEach(a => console.log(a.map(v => v === Number.MAX_VALUE ? '*' : v).join(' ')));
  describe('Test the space map', () => {
    const wholeMap = new GalaxyMap(fs.readFileSync('./data/input.txt', 'utf-8'))
    test('Expect the path length to be 14', async() => {
      const galaxy1 = wholeMap.spaceItems[0][7]
      const galaxy2 = wholeMap.spaceItems[0][22]
      expect(galaxy1.itemType).toBe('#')
      expect(galaxy2.itemType).toBe('#')
      const result = wholeMap.getShortestPath(galaxy1, galaxy2)
      expect(result).toBe(15)
    })
    
    const smallMap = new GalaxyMap(
       `...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....`)
    
  test('Test the small map column count', () => {
    expect(smallMap.columnCount).toBe(13)
  })
    
  test('Test the small map row count', () => {
    expect(smallMap.rowCount).toBe(12)
  })
    
    test('Get shortest path between galaxy 3 and 6', () => {
      expect(smallMap.getShortestPath(smallMap.galaxyMap.get(3), smallMap.galaxyMap.get(6))).toBe(17)
    })
    
    test('Get shortest path between galaxy 8 and 9', () => {
      expect(smallMap.getShortestPath(smallMap.galaxyMap.get(8), smallMap.galaxyMap.get(9))).toBe(5)
    })
    
  test('Expect shortest path totals', () => {
      expect(smallMap.getShortestPaths()).toBe(374)
  })
    
  test('Expect galaxy pairs to be 36', () => {
    expect(smallMap.galaxiesPaired.length).toBe(36)
})
})