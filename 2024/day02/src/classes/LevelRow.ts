export default class LevelRow {
  items: number[]
  constructor(data: string) {
    this.items = data.split(' ').map(i => parseInt(i.trim()))
  }

  public isValid() {
    return this.isValidList([...this.items])
  }

  public isValidV2() {
    if (this.isValid()) return true

    const multipleLists: number[][] = []
    for (let i = 0; i < this.items.length; i++) {
      multipleLists.push([...this.items])
    }

    let i = 0
    for (const list of multipleLists) {
      list.splice(i++, 1)
    }

    for (const list of multipleLists) {
      if (this.isValidList([...list])) {
        return true
      }
    }

    return false
  }

  private isValidList(items: number[]) {
    let direction: 'asc' | 'desc' | undefined
    let isvalid = true
    for (let i = 0; i < items.length - 1; i++) {
      const nr1 = items[i]
      const nr2 = items[i + 1]
      const currentDirection = this.getDirection(nr1, nr2)
      if (currentDirection === 'eq') {
        isvalid = false
        break
      }
      
      if (direction !== undefined && direction !== currentDirection) {
        isvalid = false
        break
      }
      
      if (!this.isValidDiff(nr1, nr2)) {
        isvalid = false
        break
      }
      direction = currentDirection
    }
    
    return isvalid
  }

  private getDirection(nr1: number, nr2: number): 'asc' | 'desc' | 'eq' {
    const diff = nr2 - nr1
    if (diff > 0) return 'asc'
    if (diff < 0) return 'desc'
    return 'eq'
  }

  private isValidDiff(nr1: number, nr2: number): boolean {
    const absDiff = Math.abs(nr1 - nr2)
    return absDiff > 0 && absDiff < 4
  }
}