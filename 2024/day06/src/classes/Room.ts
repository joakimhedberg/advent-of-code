import Guard from "./Guard";
import Obstacle from "./Obstacle";
import Tile from "./Tile";
import { Coordinate, Direction, HitTestResult, WalkResult } from "./types";
import fs from 'fs'
export default class Room {
    private _room: Tile[][] = []
    private _guards: Guard[] = []

    private _raw: string
    private _rawMatrix: string[][]
    private _maxCol: number
    private _maxRow: number
    constructor(data: string) {
        this._raw = data
        this._rawMatrix = data.split('\n').map(i => i.split(''))
        this._maxCol = this._rawMatrix[0].length
        this._maxRow = this._rawMatrix.length
        this._buildMatrix()
    }

    private _buildMatrix(forcedObstacle?: Coordinate): boolean {
        this._room = []
        const matrix = this._raw.split('\n').map(row => row.trim().split(''))
        for (let y = 0; y < matrix.length; y++) {
            let current: Tile[] = []
            for (let x = 0; x < matrix[y].length; x++) {
                if (forcedObstacle && forcedObstacle.x === x && forcedObstacle.y === y) {
                    if (matrix[y][x] === '.') return false
                    current.push(new Obstacle({ x: x, y: y }, this))
                }
                else {
                    switch (matrix[y][x]) {
                        case '.':
                        case '*':
                            current.push(new Tile({ x: x, y: y }, this))
                            break
                        case '#':
                            current.push(new Obstacle({ x: x, y: y }, this))
                            break
                        default:
                            const guard = new Guard(matrix[y][x], { x: x, y: y }, this)
                            current.push(guard)
                            this._guards.push(guard)
                            break
                    }
                }
            }
            this._room.push(current)
        }

        return true
    }

    private _getItemAtCoordinate(coordinate: Coordinate) {
        return this._room[coordinate.y][coordinate.x]
    }

    public hittTest(currentCoordinate: Coordinate, direction: Direction): HitTestResult {
        const nextCoordinate = this._getCoordinateInDirection({ x: currentCoordinate.x, y: currentCoordinate.y }, direction)
        if (nextCoordinate === undefined) {
            return 'outofbounds'
        }

        const nextTile = this._getItemAtCoordinate(nextCoordinate)
        /*if (nextTile.passed) {
            console.log(`Next tile: ${nextTile.passed} - ${nextTile.passedDirection} - ${direction}`)
        }*/
        if (nextTile.tileType === 'floor' && nextTile.passed && nextTile.passedDirection === direction) {
            return 'loop'
        }
        switch (nextTile.tileType) {
            case 'floor':
                return 'tile'
            case 'obstacle':
                return 'obstable'
        }
    }

    private _getCoordinateInDirection(current: Coordinate, direction: Direction): Coordinate | undefined {
        let nextCoordinate: Coordinate | undefined
        switch (direction) {
            case 'down':
                nextCoordinate = {x: current.x, y: current.y + 1}
                break
            case 'up':
                nextCoordinate = {x: current.x, y: current.y - 1}
                break
            case 'left':
                nextCoordinate = {x: current.x - 1, y: current.y}
                break
            case 'right':
                nextCoordinate = {x: current.x + 1, y: current.y}
                break
        }

        if (this._isOutOfBounds(nextCoordinate)) {
            return undefined
        }

        return nextCoordinate
    }

    public replaceItems(fromCoordinate: Coordinate, toCoordinate: Coordinate) {
        const fromItem = this._getItemAtCoordinate(fromCoordinate)
        const toItem = this._getItemAtCoordinate(toCoordinate)
        this._room[fromCoordinate.y].splice(fromCoordinate.x, 1, toItem)
        this._room[toCoordinate.y].splice(toCoordinate.x, 1, fromItem)
        fromItem.x = toCoordinate.x
        fromItem.y = toCoordinate.y
        toItem.x = fromCoordinate.x
        toItem.y = fromCoordinate.y
    }

    public moveGuard(guardCoordinate: Coordinate, guardDirection: Direction) {
        const newCoord = this._getCoordinateInDirection(guardCoordinate, guardDirection)
        const tile = this._room[newCoord.y][newCoord.x]
        this.replaceItems(guardCoordinate, newCoord)
        tile.passed = true
        tile.passedDirection = guardDirection
    }

    private _isOutOfBounds(coordinate: Coordinate): boolean {
        return (coordinate.x < 0 || coordinate.x >= this._room[0].length || coordinate.y < 0 || coordinate.y >= this._room.length)
    }

    public Walk(): number | 'loop' {
        const guard = this._guards[0]
        let progress = 0

        let hittest: WalkResult
        while ((hittest = guard.Walk()) !== 'finish') {
            if (hittest === 'loop') {
                return 'loop'
            }
            if (progress > (this._maxCol * this._maxRow)) {
                return 'loop'
            }   
        }
        return this.passedCount
    }

    public get passedCount() {
        return this._room.map(r => r.map(t => t)).flat().filter(t => t.passed).length + 1
    }

    private _dumpRoom() {
        const room: string[] = []
        for (const row of this._room) {
            let current = ''
            for (const item of row) {
                switch (item.tileType) {
                    case 'floor':
                        current += item.passed ? '*' : '.'
                        break
                    case 'obstacle':
                        current += '#'
                        break
                    case 'guard':
                        if (item instanceof Guard) {
                            switch (item.direction) {
                                case 'up':
                                    current += '^'
                                    break
                                case 'down':
                                    current += 'v'
                                    break
                                case 'left':
                                    current += '<'
                                    break
                                case 'right':
                                    current += '>'
                                    break
                            }
                        }
                        break
                }
            }
            room.push(current)
        }

        fs.writeFileSync('./data/output.txt', room.join('\n'), {encoding: 'utf8', flag: 'w'})
    }

    public static findLoops(data: string) {
        const preRoom = new Room(data)
        preRoom.Walk()
        preRoom._guards.forEach(g => g.resetPosition())

        const newData = preRoom._room.map(row => row.map(col => col.tileType === 'floor' ? col.passed ? '*' : '.' : col.tileType === 'obstacle' ? '#' : col.tileType === 'guard' ? '^' : '').join('')).join('\n')

        let loopCount = 0
        for (let i = 0; i < newData.length; i++) {
            if (newData[i] === '*') {
                const room = new Room(this.setAtChar(newData, i, '#'))
                const result = room.Walk()
                if (result === 'loop')
                {
                    loopCount++
                }
            }
        }

        return loopCount
    }

    private static setAtChar(str: string, index: number, chr: string) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
}