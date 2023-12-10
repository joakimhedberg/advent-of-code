import LightActionEnum from "../enum/LightActionEnum"
import ChristmasLightArray from "./ChristmasLightArray"

export default class LightController {
  public action: LightActionEnum
  public start: [number, number]
  public end: [number, number]

  public perform(array: ChristmasLightArray) {
    switch (this.action) {
      case LightActionEnum.off:
        array.off(this.start[0], this.start[1], this.end[0], this.end[1])
        break
      case LightActionEnum.on:
        array.on(this.start[0], this.start[1], this.end[0], this.end[1])
        break
      case LightActionEnum.toggle:
        array.toggle(this.start[0], this.start[1], this.end[0], this.end[1])
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
        controller.start = [start[0], start[1]]
        const end = regexpResult[3].split(',').map(i => parseInt(i))
        controller.end = [end[0], end[1]]
        result.push(controller)
      }
    }
    return result
  }
}