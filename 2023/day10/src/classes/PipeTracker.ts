import Pipe from "./Pipe";

export default class PipeTracker {
  public track(fromPipe: Pipe, pipePath: Pipe[]) {
    let totalSteps = 0
    let from = fromPipe
    from.isMainPipe = true
    pipePath.push(from)
    const passed: string[] = [fromPipe.coordinateStr, from.coordinateStr]
    while (true) {
      from = from.outwardPipes.filter(op => passed.indexOf(op.coordinateStr) < 0)[0]
      if (!from) break
      from.isMainPipe = true
      pipePath.push(from)
      passed.push(from.coordinateStr)
      totalSteps++
    }

    return Math.ceil(totalSteps / 2)
  }

}