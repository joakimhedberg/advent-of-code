export default function turnDial(data: string[]) {
  let position = 50

  let zeroHits = 0
  let zeroPasses = 0

  for (const row of data) {
    const direction = row.charAt(0) as 'L' | 'R'
    let amount = parseInt(row.slice(1))
    amount *= direction === 'R'? -1: 1

    for (let i = 0; i < Math.abs(amount); i++) {
      position += amount > 0? 1: -1

      if (position < 0) position = 99
      if (position > 99) position = 0

      if (position === 0) zeroPasses++
    }

    if (position === 0) zeroHits++
  }

  console.log(`Hits: ${zeroHits}`)
  console.log(`Passes: ${zeroPasses}`)
}