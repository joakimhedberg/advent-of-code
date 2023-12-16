import fs from 'fs'
import SquareGrid from './classes/SquareGrid'
import BeamDirection from './enums/BeamDirection'
import LightBeam from './classes/LightBeam'

const data = fs.readFileSync('./data/input.txt', 'utf-8')
const sg = new SquareGrid(data)
const beams: LightBeam[] = []

const startBeam = sg.createBeam({ x: -1, y: 0 }, BeamDirection.right, beam => {
  beams.push(beam)
})

console.log(beams.length)