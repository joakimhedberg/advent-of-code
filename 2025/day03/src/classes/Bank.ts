export default class Bank {
  joltages: string[]
  public highestJoltage: number
  public highestJoltage2: number

  constructor(input: string) {
    this.joltages = input.split('')
    this.highestJoltage = this._findMaxOrderedConcatenation(this.joltages.map(j => parseInt(j)), 2)
    this.highestJoltage2 = this._findMaxOrderedConcatenation(this.joltages.map(j => parseInt(j)), 12)
  }

  private _findMaxOrderedConcatenation(joltages: number[], k: number): number {
    if (k <= 0) throw new Error('k must be greated than 0')
    if (k > joltages.length) throw new Error('k can not be larger than joltage length')
    const stack: string[] = []
    let toDrop = joltages.length - k

    for (const joltage of joltages) {
      const current = String(joltage)
      while (
        stack.length > 0 && toDrop > 0 && stack[stack.length - 1] < current
      )
      {
        stack.pop()
        toDrop--
      }
      stack.push(current)
    }

    const result = stack.slice(0, k).join('')
    return parseInt(result, 10)
  }

  private _findMaxJoltage(joltages: number[], length: number): number {
    let highest = 0
    
    function backtrack(start: number, path: number[]) {
      if (path.length === length) {
        const value = parseInt(path.join(''))
        if (value > highest) highest = value
        return
      }

      for (let i = start; i < joltages.length; i++) {
        path.push(joltages[i])
        backtrack(i + 1, path)
        path.pop()
      }
    }

    backtrack(0, [])
    return highest
  }
}