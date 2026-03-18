export function hasAdjacentDuplicate(str: string): boolean {
  return (str + str).slice(1, -1).includes(str)
}

export function hasOnlyAdjacentDuplicate(str: string): boolean {
  if (str.length % 2 === 1) return false
  const mid = Math.trunc(str.length / 2)
  const part1 = str.slice(0, mid)
  const part2 = str.slice(mid)
  const result = part1 == part2
  return result
}