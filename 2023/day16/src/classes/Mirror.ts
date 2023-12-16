import GridItem from './GridItem'
import LightBeam from './LightBeam'

export default class Mirror extends GridItem {
  public lightEnter(direction: 'left' | 'right' | 'up' | 'down'): LightBeam[] {
    switch (direction) {
      case 'left':
        switch (this._item) {
          case '/':
            break
          case '\\':
            break
        }
        break
      case 'right':
        switch (this._item) {
          case '/':
            break
          case '\\':
            break
        }
        break
      case 'up':
        switch (this._item) {
          case '/':
            break
          case '\\':
            break
        }
        break
      case 'down':
        switch (this._item) {
          case '/':
            break
          case '\\':
            break
        }
        break
    }
  }
}