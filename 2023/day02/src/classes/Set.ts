import Bag from "./Bag"
import Cube from "./Cube"

/**
 * A set of games as detailed in the input data, identified by the ID number
 */
export default class Set {
  public id: number | undefined
  public bags: Bag[] = []

  public parse(line: string): boolean {
    line = line.trim()
    if (!line.startsWith('Game ')) {
      return false
    }

    const gameData = line.split(':')
    if (gameData.length !== 2 || !gameData[0].startsWith('Game ')) return false
    this.id = parseInt(gameData[0].slice(5))
    for (const setString of gameData[1].split(';')) {
      const bag = new Bag()
      this.bags.push(bag)
      for (const bagString of setString.split(',')) {
        const [amount, color] = bagString.trim().split(' ')
        const cube = new Cube(color, parseInt(amount))
        bag.cubes.push(cube)
      }
    }

    return true
  }

  public getMinimumPower() {
    let red = 0
    let green = 0
    let blue = 0

    for (const bag of this.bags) {
      for (const cube of bag.cubes) {
        if (cube.color === 'red' && red < cube.amount) {
          red = cube.amount
        }
        if (cube.color === 'green' && green < cube.amount) {
          green = cube.amount
        }
        if (cube.color === 'blue' && blue < cube.amount) {
          blue = cube.amount
        }
      }
    }

    return red * green * blue
  }
}