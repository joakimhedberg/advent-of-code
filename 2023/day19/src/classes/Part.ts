export default class Part {
  public readonly index: number
  public readonly x: number
  public readonly m: number
  public readonly a: number
  public readonly s: number

  public readonly passedWorkflows: string[] = []

  constructor(index: number, line: string) {
    this.index = index
    const [x, m, a, s] = line.slice(1, -1).split(',').map(l => l.trim())
    this.x = parseInt(x.split('=')[1])
    this.m = parseInt(m.split('=')[1])
    this.a = parseInt(a.split('=')[1])
    this.s = parseInt(s.split('=')[1])
  }

  public get totals(): number {
    return this.x + this.m + this.a + this.s
  }
}