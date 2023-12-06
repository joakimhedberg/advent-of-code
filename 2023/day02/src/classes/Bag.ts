import Cube from "./Cube";
import GameSet from './Set'

/**
 * A bag with cubes
 */
export default class Bag {
  public cubes: Cube[] = []

  public isSetPossible(set: GameSet) {
    for (const bag of set.bags) {
      if (!this.isBagPossible(bag)) {
        return false
      }
    }
    return true
  }

  public isBagPossible(bag: Bag) {
    for (const cube of bag.cubes) {
      const match = this.cubes.filter(x => x.color === cube.color && x.amount >= cube.amount)
      if (match.length <= 0) {
        return false
      }
    }
    return true
  }
}