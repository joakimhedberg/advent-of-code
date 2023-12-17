import fs from 'fs'
import SquareGrid from './classes/SquareGrid'
import BeamDirection from './enums/BeamDirection'
import ICoordinate from './interfaces/ICoordinate'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const grid = new SquareGrid(data)


const performTrace = (startCoordinate: ICoordinate, direction: BeamDirection) => {
  grid.reset()
  const startItem = grid.getItemAtCoordinate(startCoordinate)
  const uniqueCoordinates = new Map<string, boolean>()
  
  startItem.trace(direction, (item) => {
    uniqueCoordinates.set(item.coordinateString, true)
  }, 0, 0)
  return uniqueCoordinates.size
}

let part2 = 0
const p1 = Math.max(performTrace({ x: 0, y: 0 }, BeamDirection.right), performTrace({ x: 0, y: 0 }, BeamDirection.down))
if (p1 > part2) part2 = p1

const p2 = Math.max(performTrace({ x: 0, y: grid.gridMatrix.length - 1 }, BeamDirection.right), performTrace({ x: 0, y: grid.gridMatrix.length - 1 }, BeamDirection.up))
if (p2 > part2) part2 = p2

const p3 = Math.max(performTrace({ x: grid.gridMatrix[0].length - 1, y: grid.gridMatrix.length - 1 }, BeamDirection.left), performTrace({ x: grid.gridMatrix[0].length - 1, y: grid.gridMatrix.length - 1 }, BeamDirection.up))
if (p3 > part2) part2 = p3

const p4 = Math.max(performTrace({ x: grid.gridMatrix[0].length - 1, y: 0 }, BeamDirection.down), performTrace({ x: grid.gridMatrix[0].length - 1, y: 0 }, BeamDirection.left))
if (p4 > part2) part2 = p4

for (let y = 1; y < grid.gridMatrix.length - 1; y++) {
  const left = performTrace({ x: 0, y: y }, BeamDirection.right)
  if (left > part2) part2 = left

  const right = performTrace({ x: grid.gridMatrix[0].length - 1, y: y }, BeamDirection.left)
  if (right > part2) part2 = right
}

for (let x = 1; x < grid.gridMatrix[0].length - 1; x++) {
  const top = performTrace({ x: x, y: 0 }, BeamDirection.down)
  if (top > part2) part2 = top

  const bottom = performTrace({ x: x, y: grid.gridMatrix.length - 1 }, BeamDirection.up)
  if (bottom > part2) part2 = bottom
}

console.log('Part 1: ' + performTrace({x: 0, y: 0}, BeamDirection.right))
console.log('Part 2: ' + part2)
