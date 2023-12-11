import CoordinateType from "../enums/CoordinateType";
import PipeTypeEnum from "../enums/PipeTypeEnum";
import Pipe from "./Pipe";
import classifyPoint from 'robust-point-in-polygon'

export default class PipeNetwork {
  public pipes: Pipe[][] = []
  public startPipe: Pipe | undefined
  private pipeMap: Map<string, Pipe> = new Map()
  
  constructor(data: string) {
    this.pipes = data.split('\n').map(l => l.split('')).map((value, y) => value.map((l, x) => new Pipe(l, x, y)))

    for (const row of this.pipes) {
      for (const pipe of row) {
        if (pipe.pipeType === PipeTypeEnum.Start) {
          this.startPipe = pipe
        }
        this.pipeMap.set(PipeNetwork.coordToStr(pipe.coordinate), pipe)
      }
    }

    this.pipeMap.forEach(pipe => {
      for (const conn of this.getConnectable(pipe)) {
        pipe.connectedPipes.push(conn)
      }
    })
  }

  public getPipeByCoordinate(coordinate: CoordinateType): Pipe | undefined {
    return this.pipeMap.get(PipeNetwork.coordToStr(coordinate))
  }

  public static coordToStr(coordinate: CoordinateType): string {
    return `${coordinate.x}, ${coordinate.y}`
  }

  public getConnectable(pipe: Pipe) {
    const result: Pipe[] = []
    const pipeTop = this.pipeMap.get(PipeNetwork.coordToStr({ x: pipe.coordinate.x, y: pipe.coordinate.y - 1 }))
    const pipeBottom = this.pipeMap.get(PipeNetwork.coordToStr({ x: pipe.coordinate.x, y: pipe.coordinate.y + 1 }))
    
    const pipeLeft = this.pipeMap.get(PipeNetwork.coordToStr({x: pipe.coordinate.x - 1, y: pipe.coordinate.y}))
    const pipeRight = this.pipeMap.get(PipeNetwork.coordToStr({x: pipe.coordinate.x + 1, y: pipe.coordinate.y}))
    
    if (pipeLeft?.isConnectable(pipe, 'left')) {
      result.push(pipeLeft)
    }
    
    if (pipeRight?.isConnectable(pipe, 'right')) {
      result.push(pipeRight)
    }

    if (pipeTop?.isConnectable(pipe, 'top')) {
      result.push(pipeTop)
    }

    if (pipeBottom?.isConnectable(pipe, 'bottom')) {
      result.push(pipeBottom)
    }

    return result
  }

  public determineInsidePoints(pipePath: Pipe[]) {
    const polygon: [number, number][] = pipePath.map(p => [p.coordinate.x, p.coordinate.y])
    this.pipeMap.forEach(pipe => pipe.isInside = classifyPoint(polygon, [pipe.coordinate.x, pipe.coordinate.y]) < 0)
  }

  public get insidePoints(): number {
    return Array.from(this.pipeMap.values()).filter(p => p.isInside && !p.isMainPipe).length
  }

  /**
   * Present the pipe network with colors
   * @returns Colorful representation of the network
   */
  public createHTML(): string {
    const output: string[] = []
    output.push('<html><head>')
    output.push('<style>')
    output.push('.mainPipe {')
    output.push('color: red;')
    output.push('}')
    output.push('body {')
    output.push('   color: darkgray;')
    output.push('   font-family: "Courier New", Courier, monospace;')
    output.push('}')
    output.push('.inside {')
    output.push('    color: blue;')
    output.push('}')
    output.push('</style>')
    output.push('</head><body>')

    for (let y = 0; y < this.pipes.length; y++) {
      const line: string[] = []
      for (let x = 0; x < this.pipes[y].length; x++) {
        const p = this.pipes[y][x]
        line.push(this._createSpan(p.isMainPipe? 'main': p.isInside? 'inside': 'body', p.pipeType))
      }
      output.push(line.join('') + '<br/>\n')
    }

    output.push('</body></html>')

    return output.join('\n')
  }

  private _createSpan(type: 'main' | 'body' | 'inside', content: string) {
    return `<span class="${type === 'main'? 'mainPipe': type === 'inside'? 'inside': ''}">${content}</span>`
  }
}
