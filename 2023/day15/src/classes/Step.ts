import Box from "./Box"

export default class Step {
  public readonly step: string
  public lensSlot: string[]
  private _hashCode: number | undefined
  constructor(step: string) {
    this.step = step
  }

  public * charCodes() {
    for (let i = 0; i < this.step.length; i++) {
      yield this.step.charCodeAt(i)
    }
  }

  public get label(): string | undefined {
    if (this.step.indexOf('=') > -1) {
      const [label, _] = this.step.split('=')
      return label
    }
    if (this.step.indexOf('-') > -1) {
      return this.step.split('-')[0]
    }

    return undefined
  }

  public get labelHash(): number {
    const label = this.label
    if (label === undefined) {
      return -1
    }

    return Step.calculateHashCode(this.label)
  }

  public get hashCode(): number {
    if (this._hashCode) {
      return this._hashCode
    }

    return this._hashCode = Step.calculateHashCode(this.step)
  }

  public static calculateHashCode(value: string) {
    let current = 0
    for (let i = 0; i < value.length; i++) {
      current += value.charCodeAt(i)
      current *= 17
      current = current % 256
    }
    return current
  }

  public performBoxAction(boxes: Map<number, Box>) {
    if (this.step.indexOf('=') > -1) {
      const [label, focalLength] = this.step.split('=')
      const box = boxes.get(this.labelHash)
      if (box) {
        box.appendLens(label, parseInt(focalLength))
      }
    }
    else if (this.step.indexOf('-') > -1) {
      const label = this.step.split('-')[0]
      const box = boxes.get(this.labelHash)
      if (box) {
        box.removeLens(label)
      }
    }
  }
}