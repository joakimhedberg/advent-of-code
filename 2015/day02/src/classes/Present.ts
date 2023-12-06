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
    const parms: number[] = [this.length + this.length, this.width + this.width, this.height + this.height].sort((a, b) => a - b)
    const ribbonLength = parms.slice(0, 2).reduce((a, b) => a + b)
    const bowLength = this.length * this.width * this.height
    return ribbonLength + bowLength
    //return this.length + this.length + this.width + this.width + bowLength
  }
}