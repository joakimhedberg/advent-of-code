export default class ChristmasLightArray {
  public readonly lights: boolean[][]
  constructor() {
    this.lights = []
    for (let x = 0; x <= 1000; x++) {
      this.lights[x] = []
      for (let y = 0; y <= 1000; y++) {
        this.lights[x][y] = false
      }
    }
  }

  public toggle(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        this.lights[x][y] = !this.lights[x][y]
      }
    }
  }

  public on(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        this.lights[x][y] = true
      }
    }
  }

  public off(x1, y1, x2, y2) {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        this.lights[x][y] = false
      }
    }
  }

  public get countOn(): number {
    let result = 0
    for (let x = 0; x < 999; x++) {
      for (let y = 0; y < 999; y++) {
        if (this.lights[x][y]) result++
      }
    }

    return result
  }
}