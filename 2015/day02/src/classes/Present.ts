export default class Present {
  public length: number
  public width: number
  public height: number
  constructor(line: string) {
    const [l, w, h] = line.trim().split('x').map(x => parseInt(x))
    this.length = l
    this.width = w
    this.height = h
  }

  public get totalArea(): number {
    const side1 = this.length * this.width
    const side2 = this.width * this.height
    const side3 = this.height * this.length
  
    return 2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3)
  }

  public get ribbonLength(): number {
    const parms: number[] = [this.length + this.length, this.width + this.width, this.height + this.height]
    const max = Math.max(...parms)
    const idx = parms.findIndex(p => p === max)
    return parms[0] + parms[1] + (this.length * this.width * this.height)
  }
}