import fs from 'fs'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

export const runComparison = (data: string) => {
  const lines = data.split('\n').map(line => line.trim())

  const arr1 = lines.map(l => parseInt(l.split('   ')[0]))
  const arr2 = lines.map(l => parseInt(l.split('   ')[1]))

  arr1.sort()
  arr2.sort()

  let diff = 0
  for (let i = 0; i < arr1.length; i++) {
    diff += Math.abs(arr1[i] - arr2[i])
  }

  return diff
}

export const runComparisonByMultiplication = (data: string) => {
  const lines = data.split('\n').map(line => line.trim())

  const arr1 = lines.map(l => parseInt(l.split('   ')[0]))
  const arr2 = lines.map(l => parseInt(l.split('   ')[1]))

  const numberMap = []
  for (let i = 0; i < arr1.length; i++) {
    let count = 0
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) count++
    }
    numberMap.push([arr1[i], count])
  }

  let total = 0
  numberMap.forEach(item => total += item[0] * item[1])
  return total
}

console.log(`Part 1: ${runComparison(data)}`)
console.log(`Part 2: ${runComparisonByMultiplication(data)}`)
