export default class HotSpringGroup {
  public readonly rawData: string
  public readonly numbers: number[]
  public readonly springs: string

  constructor(line: string) {
    this.rawData = line.trim()
    const [states, groups] = line.split(' ')
    this.springs = states.trim()
    this.numbers = groups.trim().split(',').map(p => parseInt(p))
  }

  public get springsPart2(): string {
    const output: string[] = []
    for (let i = 0; i < 5; i++) {
      output.push(this.springs)
    }

    return output.join('?')
  }

  public get numbersPart2(): number[] {
    const output: number[] = []
    for (let i = 0; i < 5; i++) {
      output.push(...this.numbers)
    }
    return output
  }

  public static cache: Map<string, number> = new Map()
  public static count(springs: string, numbers: number[]): number {
    if (springs.length === 0) {
      return numbers.length === 0? 1: 0
    }

    if (numbers.length === 0) {
      return springs.includes('#')? 0: 1
    }

    const k = springs + numbers.join('-')
    if (HotSpringGroup.cache.has(k)) {
      return HotSpringGroup.cache.get(k)
    }
    
    let result = 0

    if ('.?'.includes(springs[0])) {
      result += this.count(springs.slice(1), [...numbers])
    }

    if ('#?'.includes(springs[0])) {
      const longEnough = numbers[0] <= springs.length
      const noDots = !springs.slice(0, numbers[0]).includes('.')
      const endOfString = numbers[0] === springs.length

      const followingCharIsNotBroken = springs[numbers[0]] != '#'
      if (longEnough && noDots && (endOfString || followingCharIsNotBroken)) {
        result += this.count(springs.slice(numbers[0] + 1), [...numbers.slice(1)])
      }
    }
    HotSpringGroup.cache.set(k, result)
    return result
  }
}