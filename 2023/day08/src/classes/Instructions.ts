export class Instructions {
  public input: string
  private _index = 0
  constructor(input: string) {
    this.input = input.split('\n')[0].trim()
  }

  public reset() {
    this._index = 0
  }

  public getDirections(maxDirections: number): ('L' | 'R')[] {
    const result: ('L' | 'R')[] = []
    for (let i = 0; i < maxDirections; i++) {
      result.push(this.direction)
    }

    return result
  }

  public get direction(): 'L' | 'R' {
    const result = this.input[this._index] as 'L' | 'R'
    this._index++
    if (this._index >= this.input.length) this._index = 0
    return result
  }
}