import Tile from "./Tile";
import { Coordinate, Direction, HitTestResult } from "./types";

export default class Room {
    private _room: Tile[][]
    constructor(data: string) {

    }

    public hittTest(currentCoordinate: Coordinate, direction: Direction): HitTestResult {
        const nextCoordinate = this._getCoordinateInDirection(currentCoordinate, direction)
        if (nextCoordinate === undefined) {
            return 'outofbounds'
        }

        const nextTile = this._room[nextCoordinate.x][nextCoordinate.y]
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

    public moveGuard(guardCoordinate: Coordinate, guardDirection: Direction)

    private _isOutOfBounds(coordinate: Coordinate): boolean {
        return (coordinate.x < 0 || coordinate.x >= this._room[0].length || coordinate.y < 0 || coordinate.y >= this._room.length)
    }
}