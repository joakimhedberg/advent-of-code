import fs from 'fs'

export default class BookOrder {
  private _indexKeyBeforeValue: Map<number, number[]> = new Map()
  private _indexValueBeforeKey: Map<number, number[]> = new Map()
  private _output: string[] = []

  constructor(data: string) {
    for (const line of data.split('\n').map(i => i.trim()).filter(i => i.indexOf('|') > -1)) {
      const [x, y] = line.split('|').map(i => parseInt(i.trim()))

      const after = this._indexKeyBeforeValue.get(x) ?? []
      after.push(y)
      this._indexKeyBeforeValue.set(x, after)

      const before = this._indexValueBeforeKey.get(y) ?? []
      before.push(x)
      this._indexValueBeforeKey.set(y, before)
    }


    this._indexKeyBeforeValue.forEach(value => value.sort())
    this._indexValueBeforeKey.forEach(value => value.sort())
  }

  private isBefore(numbers: number[], number: number, index: number): boolean {
    const map = this._indexKeyBeforeValue.get(number)
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
      if (this.validateOrder(invalidItems[i])) {
        const item = invalidItems[i]
        const mid = Math.floor(item.length / 2)
        total += item[mid]
      }
    }

    return total
  }

  private swap(items: number[], index1: number, index2: number) {
    const item1 = items[index1]
    items[index1] = items[index2]
    items[index2] = item1
  }

  private sortItems(items: number[]) {
    while (!this.validateOrder(items)) {
    for (let i = 0; i < items.length - 1; i++) {
      let after = items[i]
      for (let j = i + 1; j < items.length; j++) {
        let before = items[j]
        const mapping = this._indexValueBeforeKey.get(after)
        if (mapping) {
          if (mapping.indexOf(before) > -1) {
            this.swap(items, i, j)
          }
        }
      }
    }
  }
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