import fs from 'fs'

export default class BookOrder {
  private _index: Map<number, number[]> = new Map()
  private _output: string[] = []

  constructor(data: string) {
    for (const line of data.split('\n').map(i => i.trim()).filter(i => i.indexOf('|') > -1)) {
      const [x, y] = line.split('|').map(i => parseInt(i.trim()))

      const before = this._index.get(x) ?? []
      before.push(y)
      this._index.set(x, before)
    }

    this._index.forEach(value => value.sort())
  }

  private isBefore(numbers: number[], number: number, index: number): boolean {
    const map = this._index.get(number)
    if (!map) {
      this._output.push(`\tNo map, this is ok`)
      return false
    }
    
    for (let i = index; i >= 0; i--) {
      if (map.indexOf(numbers[i]) > -1) {
        this._output.push(`\tInvalid: ${numbers[i]} is before ${number}`)
        this._output.push(`\tMap used: ${map}`)
        return true
      }
    }
    
    return false
  }

  public validateOrder(items: number[]): boolean {
    for (let i = items.length - 1; i > 0; i--) {
      const item = items[i]
      this._output.push(`Validating: ${items}`)
      this._output.push(`\tNumber: ${item}`)
      if (this.isBefore(items, items[i], i)) {
        return false
      }
      else {
        this._output.push(`\tItem is OK`)
      }
    }

    return true
  }

  public fixInvalidItems(data: string): number {
    const items = data.split('\n').map(i => i.trim()).filter(i => i.indexOf(',') > -1).map(i => i.split(',').map(i => parseInt(i)))

    const invalidItems: number[][] = []
    for (const item of items) {
      if (!this.validateOrder(item)) {
        invalidItems.push(item)
      }
    }

    let total = 0
    for (let i = 0; i < invalidItems.length; i++) {
      this.sortItems(invalidItems[i])
      const item = invalidItems[i]
      const mid = Math.floor(item.length / 2)
      console.log(this.validateOrder(invalidItems[i]))
      total += item[mid]
    }

    return total
  }

  private sortItems(items: number[]) {
    console.log('Before: ' + items.join(','))
    for (let i = items.length; i > 0; i--) {
      let after = items[i]
      for (let j = 0; j < i; j++) {
        let before = items[j]
        const mapping = this._index.get(after)
        if (mapping) {
          if (mapping.indexOf(before) > -1) {
            items.splice(j, 0, after)
            items.splice(i, 1)
            i--
            j--
          }
        }
      }
    }
    console.log('After: ' + items.join(','))
  }

  public calculateMidValues(data: string): number {
    const items = data.split('\n').map(i => i.trim()).filter(i => i.indexOf(',') > -1).map(i => i.split(',').map(i => parseInt(i)))

    let total = 0
    for (const item of items) {
      if (this.validateOrder(item)) {
        this._output.push('Valid item: ' + item)
        const mid = Math.floor(item.length / 2)
        total += item[mid]
      }
    }

    return total
  }
}