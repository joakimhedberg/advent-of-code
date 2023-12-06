export default function calculateTotalArea(input: string): number {
  const [l, w, h] = input.trim().split('x').map(x => parseInt(x))
  const side1 = l * w
  const side2 = w * h
  const side3 = h * l

  return 2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3)
}

export function calculateRibbonLength(input: string): number {
  const [l, w, h] = input.trim().split('x').map(x => parseInt(x))
  return l + l + w + w + l * w * h
}