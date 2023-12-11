import LightActionEnum from "../enum/LightActionEnum"
import ICoordinate from "../interfaces/ICoordinate"
import ChristmasLightArray from "./ChristmasLightArray"

export default class LightController {
  public action: LightActionEnum
  public start: ICoordinate
  public end: ICoordinate

  public perform(array: ChristmasLightArray) {
    switch (this.action) {
      case LightActionEnum.off:
        array.off(this.start, this.end)
        break
      case LightActionEnum.on:
        array.on(this.start, this.end)
        break
      case LightActionEnum.toggle:
        array.toggle(this.start, this.end)
        break
    }
  }
  
  public static parse(data: string) {
    const pattern = /^([^0-9]+)(\d+,\d+)[^0-9]+(\d+,\d+)/gm
    const result: LightController[] = []
    let regexpResult: RegExpMatchArray | null
    let c = 0
    while (regexpResult = pattern.exec(data)) {
      if (regexpResult && regexpResult.length > 1) {
        const controller = new LightController()
        if (regexpResult[1].trim().startsWith('toggle')) {
          controller.action = LightActionEnum.toggle
        } else if (regexpResult[1].trim().startsWith('turn on')) {
          controller.action = LightActionEnum.on
        } else if (regexpResult[1].trim().startsWith('turn off')) {
          controller.action = LightActionEnum.off
        }

        const start = regexpResult[2].split(',').map(i => parseInt(i))
        controller.start = { x: start[0], y: start[1] }
        const end = regexpResult[3].split(',').map(i => parseInt(i))
        controller.end = { x: end[0], y: end[1] }
        result.push(controller)
      }
    }
    return result
  }
}