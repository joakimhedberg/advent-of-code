import fs from 'fs'
import PipeNetwork from './classes/PipeNetwork'
import PipeTracker from './classes/PipeTracker'
import Pipe from './classes/Pipe'

const data =  fs.readFileSync('./data/input.txt', 'utf-8')
const network = new PipeNetwork(data)
const pt = new PipeTracker()

const pipePath: Pipe[] = []
const part1 = pt.track(network.startPipe, pipePath)
network.determineInsidePoints(pipePath)

console.log('Part 1: ' + part1)
console.log('Part 2: ' + network.insidePoints)

