import CoordinateType from "../enums/CoordinateType";
import PipeTypeEnum from "../enums/PipeTypeEnum";
import PipeSideType from "../types/PipeSideType";
import PipeNetwork from "./PipeNetwork";

const LEFT_CONNECTION = [PipeTypeEnum.EastWest, PipeTypeEnum.NorthWest, PipeTypeEnum.SouthWest, PipeTypeEnum.Start]
const RIGHT_CONNECTION = [PipeTypeEnum.EastWest, PipeTypeEnum.NorthEast, PipeTypeEnum.SouthEast, PipeTypeEnum.Start]
const TOP_CONNECTION = [PipeTypeEnum.NorthEast, PipeTypeEnum.NorthSouth, PipeTypeEnum.NorthWest, PipeTypeEnum.Start]
const BOTTOM_CONNECTION = [PipeTypeEnum.SouthEast, PipeTypeEnum.SouthWest, PipeTypeEnum.NorthSouth, PipeTypeEnum.Start]

export default class Pipe {
  public pipeType: PipeTypeEnum
  public connectedPipes: Pipe[] = []
  public coordinate: CoordinateType
  public coordinateStr: string
  public isInside = false
  public isMainPipe = false

  private _invertedDirections: Map<PipeSideType, PipeSideType> = new Map()
  constructor(symbol: string, x: number, y: number) {
    this.pipeType = symbol as PipeTypeEnum
    this.coordinate = { x: x, y: y }
    this.coordinateStr = PipeNetwork.coordToStr(this.coordinate)

    this._invertedDirections.set('left', 'right')
    this._invertedDirections.set('right', 'left')
    this._invertedDirections.set('top', 'bottom')
    this._invertedDirections.set('bottom', 'top')
  }

  public hasConnection(direction: PipeSideType) {
    switch (direction) {
      case 'left': return LEFT_CONNECTION.indexOf(this.pipeType) > -1
      case 'right': return RIGHT_CONNECTION.indexOf(this.pipeType) > -1
      case 'top': return TOP_CONNECTION.indexOf(this.pipeType) > -1
      case 'bottom': return BOTTOM_CONNECTION.indexOf(this.pipeType) > -1
    }
  }

  public isConnectable(pipe2: Pipe, direction: PipeSideType) {
    if (!pipe2) {
      return undefined
    }
    if (!this.hasConnection(this._invertedDirections.get(direction))) return false
    return pipe2.hasConnection(direction)
  }

  public get outwardPipes(): Pipe[] {
    return this.connectedPipes.filter(p => PipeNetwork.coordToStr(p.coordinate) !== PipeNetwork.coordToStr(this.coordinate))
  }

}