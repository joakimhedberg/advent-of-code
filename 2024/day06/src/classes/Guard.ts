import Room from "./Room";
import Tile from "./Tile";
import { Coordinate, Direction, WalkResult } from "./types";

export default class Guard extends Tile {
    protected override _tileType: 'floor' | 'obstacle' | 'guard'
    private _direction: Direction
    private _originalCoordinate: Coordinate
    constructor(symbol: string,coordinate: Coordinate, room: Room) {
        super(coordinate, room)
        this._tileType = 'guard'
        this._originalCoordinate = {x: coordinate.x, y: coordinate.y}
        switch (symbol) {
            case '^':
                this._direction = 'up'
                break
            case 'v':
                this._direction = 'down'
                break
            case '<':
                this._direction = 'left'
                break
            case '>':
                this._direction = 'right'
                break
            default:
                throw new Error(`Invalid guard type: ` + symbol)
        }
    }

    public resetPosition() {
        this._room.replaceItems(this._originalCoordinate, this._coordinate)
    }

    public get direction() {
        return this._direction
    }

    private _rotateRight() {
        switch (this._direction) {
            case 'down':
                this._direction = 'left'
                break
            case 'left':
                this._direction = 'up'
                break
            case 'up':
                this._direction = 'right'
                break
            case 'right':
                this._direction = 'down'
                break
        }
    }

    public Walk(): WalkResult {
        const hittest = this._room.hittTest(this._coordinate, this._direction)
        switch (hittest) {
            case 'obstable':
                this._rotateRight()
                return 'rotate'
            case 'outofbounds':
                return 'finish'
            case 'loop':
                return 'loop'
            case 'tile':
                this._room.moveGuard({ x: this._coordinate.x, y: this._coordinate.y }, this._direction)
                return 'move'
        }
    }
}