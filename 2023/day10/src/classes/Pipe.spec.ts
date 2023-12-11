import { describe, expect, test } from '@jest/globals'
import Pipe from './Pipe'
import PipeTypeEnum from '../enums/PipeTypeEnum'
import PipeSideType from '../types/PipeSideType'
import PipeNetwork from './PipeNetwork'

const testPipeConnection = (pipeName: string, pipe: Pipe, left: boolean, right: boolean, top: boolean, bottom: boolean) => {
  return test(`Test ${pipeName} connectivity`, () => {
    expect(pipe.hasConnection('left')).toBe(left)
    expect(pipe.hasConnection('right')).toBe(right)
    expect(pipe.hasConnection('top')).toBe(top)
    expect(pipe.hasConnection('bottom')).toBe(bottom)
  })
}

const arePipesConnected = (pipeName1: string, pipeName2: string, pipe1: Pipe, pipe2: Pipe, direction: PipeSideType, expectedResult: boolean) => {
  return test(`Is ${pipeName1} connected to ${pipeName2}?`, () => {
    expect(pipe1.isConnectable(pipe2, direction)).toBe(expectedResult)
  })
}

describe('Test pipe connections', () => {
  const pipeNorthSouth = new Pipe(PipeTypeEnum.NorthSouth, 0, 0)
  const pipeEastWest = new Pipe(PipeTypeEnum.EastWest, 0, 0)
  const pipeNorthEast = new Pipe(PipeTypeEnum.NorthEast, 0, 0)
  const pipeNorthWest = new Pipe(PipeTypeEnum.NorthWest, 0, 0)
  const pipeSouthWest= new Pipe(PipeTypeEnum.SouthWest, 0, 0)
  const pipeSouthEast = new Pipe(PipeTypeEnum.SouthEast, 0, 0)
  const pipeGround = new Pipe(PipeTypeEnum.Ground, 0, 0)
  const pipeStart = new Pipe(PipeTypeEnum.Start, 0, 0)

  testPipeConnection('North-south', pipeNorthSouth, false, false, true, true)
  testPipeConnection('East-west', pipeEastWest, true, true, false, false)
  testPipeConnection('North-east', pipeNorthEast, false, true, true, false)
  testPipeConnection('North-west', pipeNorthWest, true, false, true, false)
  testPipeConnection('South-west', pipeSouthWest, true, false, false, true)
  testPipeConnection('South-east', pipeSouthEast, false, true, false, true)
  testPipeConnection('Ground', pipeGround, false, false, false, false)
  testPipeConnection('Start', pipeStart, true, true, true, true)
})

describe('Test pipe connectivity', () => {
  const pipeNorthSouth = new Pipe(PipeTypeEnum.NorthSouth, 0, 0)
  const pipeEastWest = new Pipe(PipeTypeEnum.EastWest, 0, 0)
  const pipeNorthEast = new Pipe(PipeTypeEnum.NorthEast, 0, 0)
  const pipeNorthWest = new Pipe(PipeTypeEnum.NorthWest, 0, 0)
  const pipeSouthWest= new Pipe(PipeTypeEnum.SouthWest, 0, 0)
  const pipeSouthEast = new Pipe(PipeTypeEnum.SouthEast, 0, 0)
  const pipeGround = new Pipe(PipeTypeEnum.Ground, 0, 0)
  const pipeStart = new Pipe(PipeTypeEnum.Start, 0, 0)

  arePipesConnected('North-south', 'North-east', pipeNorthSouth, pipeNorthEast, 'bottom', false)
  arePipesConnected('East-west', 'North-east', pipeEastWest, pipeNorthEast, 'left', false)
  arePipesConnected('Start', 'North-west', pipeStart, pipeNorthWest, 'top', true)
})
