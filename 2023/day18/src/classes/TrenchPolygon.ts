import DirectionType from "../types/DirectionType";
import Coordinate from "./Coordinate";
import IndexedMap from "./IndexedMap";
import Trench from "./Trench";

export default class TrenchPolygon {
  public readonly pointsXY: Coordinate[] = []
  public readonly trenchMap = new IndexedMap()
  public readonly trenches: Trench[] = []

  constructor(data: string, part2?: boolean) {
    let nextCoordinate = new Coordinate(0, 0)
    this.pointsXY.push(nextCoordinate)

    this.trenches = data.split('\n').map((l, i) => {
      const [direction, amount, color] = l.trim().split(' ')
      const trench = new Trench(i, direction as DirectionType, parseInt(amount), color, part2)
      return trench
    })
    
    for (const trench of this.trenches) {
      trench.startCoordinate = nextCoordinate
      nextCoordinate = nextCoordinate.calculateNew(trench.direction, trench.amount)
      this.pointsXY.push(nextCoordinate)
    }


    let moveX = Math.min(...this.pointsXY.map(o => o.x))
    let moveY = Math.min(...this.pointsXY.map(o => o.y))

    this.pointsXY.forEach(pt => {
      pt.y -= moveY
      pt.x -= moveX
    })

    this.trenches.forEach(trench => this.trenchMap.set(trench.startCoordinate, trench))
  }

  public get area(): number {
    let interior = 0
    const polygon = [...this.pointsXY]
    for (let i = 0;  i < polygon.length; i++) {
      let addX = polygon[i].y
      let addY = polygon[i === polygon.length - 1? 0: i + 1].x
      let subX = polygon[i === polygon.length - 1? 0: i + 1].y
      let subY = polygon[i].x
      interior += (addX * addY * 0.5) - (subX * subY * 0.5)
    }
    const boundary = this.trenches.map(t => t.amount).reduce((a, b) => a + b)
    return Math.abs(interior) - boundary / 2 - 1 + boundary + 2;
  }

  public get asGeoJSON(): string {
    const output: string[] = []

    output.push('{')
    output.push('"type": "FeatureCollection",')
    output.push('"features": [{')
    output.push('"type": "Feature",')
    output.push('"properties": {')
    output.push(`"no": "no"`)
    output.push('},')
    output.push('"geometry": {')
    output.push('"type": "Polygon",')
    output.push('"coordinates": [[' + this.pointsXY.map(pt => `[${pt.x}, ${pt.y}]`).join(',') + ']]') 
    output.push('}},')
    output.push(
    this.trenches.map(t => {
      const res: string[] = []
      res.push('{"type": "Feature",')
      res.push('"properties": {')
      res.push(`"index": "${t.index}"`)
      res.push('},')
      res.push('"geometry": {')
      res.push('"type": "Point",')
      res.push(`"coordinates": [${t.startCoordinate.x}, ${t.startCoordinate.y}]`)
      res.push('}}')
      return res.join('\n')
    }).join(',\n')
    )
    output.push(']}')

    return output.join('\n')
  }
  
  public get asHTML(): string {
    const output: string[] = []
    output.push('<html><head>')
    output.push(`<style>
      body {
        font-family: monospace;
        font-weight: bold;
      }
    </style>`)

    for (let row = 0; row <= Math.max(...this.pointsXY.map(p => p.x)); row++) {
      let rowData = ''
      for (let col = 0; col < Math.max(...this.pointsXY.map(p => p.y)); col++) {
        const trench = this.trenchMap.get({x: col, y: row})
        if (trench) {
          rowData += `<span style="color: ${trench.colorStr}">${trench.index < 10 ? trench.index :  trench.index === 617? 'G': '#'}</span>`
        }
        else {
          rowData += '.'
        }
      }
      output.push(rowData)
    }

    output.push('</head><body>')
    output.push('</body></html>')
    return output.join('\n')
  }
}