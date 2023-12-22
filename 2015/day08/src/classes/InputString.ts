export default class InputString {
  public readonly line: string
  constructor(line: string) {
    this.line = line
  }

  public get stringLength(): number {
    return this.line.length
  }

  public get contentLength(): number {
    return this.line.slice(1, -1).replaceAll(/\\["\\]{1}|\\x[0-9a-z]{2}/gm, '*').length
  }

  public get part1Calc(): number {
    return this.stringLength - this.contentLength
  }

  public get part2Calc(): number {
    return this.encodedLength - this.stringLength
  }

  public get encodedString(): string {
    return `"${this.line.replaceAll(/(["\\])/g, '\\$1')}"`
  }

  public get encodedLength(): number {
    return this.encodedString.length
  }
}