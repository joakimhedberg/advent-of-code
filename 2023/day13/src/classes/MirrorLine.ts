import LavaField from "./LavaField"

export default class MirrorLine {

  public static mirrorLines: number[] = []
  public static mirrorCols: number[] = []
  
  public static getMirrorCount(field: LavaField, part2?: boolean): number {
    let total = 0
    if (!part2) {
      for (let row = 0; row < field.maxRow; row++) {
        const result = MirrorLine.getMirroredItemsCount(field.lavaRows, row)
        total += result * 100
      }
    
      for (let col = 0; col < field.maxCol; col++) {
        const result = MirrorLine.getMirroredItemsCount(field.lavaCols, col)
        total += result
      }

      return total
    }
    else {
      let total = 0
      for (const subfield of field.part2Fields) {
        const result = MirrorLine.getMirrorCount(subfield)
        if (result > 0) total += result
      }

      return total
    }
  }

  public static getMirrorSlice(arr: string[], mirrorIndex: number): string[][] {
    let arr1 = arr.slice(0, mirrorIndex)
    let arr2 = arr.slice(mirrorIndex)
    arr1 = arr1.reverse().slice(0, arr2.length)
    return [arr1, arr2]
  }

  public static getMirroredItemsCount(arr: string[], startIndex: number): number {
    const [arr1, arr2] = MirrorLine.getMirrorSlice(arr, startIndex)
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== (arr2[i] ?? arr1[i])) return 0
    }
  
    return startIndex
  }

  public static fixSmudge(table: string[][]): number {
    for (let i = 1; i < table.length; i++) {
      let firstPart = table.slice(0, i).reverse()
      let secondPart = table.slice(i)
      firstPart.splice(secondPart.length)
      secondPart.splice(firstPart.length)
      
      let changes = 0
      firstPart.forEach((r, j) => {
        r.forEach((c, k) => {
          changes += firstPart[j][k] === secondPart[j][k]? 0: 1
        })
      })
      if (changes === 1) {
        return i
      }
    }

    return 0
  }

  public static transpose(matrix: string[][]) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]))
  }

  public static part2(fields: LavaField[]) {
    let sum = 0
    fields.forEach(field => {
      sum += MirrorLine.fixSmudge(field.lavaMatrix) * 100 + MirrorLine.fixSmudge(MirrorLine.transpose(field.lavaMatrix))
    })

    return sum
  }
}