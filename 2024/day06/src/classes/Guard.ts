import Room from "./Room";
import Tile from "./Tile";
import { Coordinate, Direction, WalkResult } from "./types";

export default class Guard extends Tile {
    protected override _tileType: 'floor' | 'obstacle' | 'guard'
    private _direction: Direction

    constructor(data: string, coordinate: Coordinate, room: Room) {
        super(data, coordinate, room)
        switch (this._symbol) {
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
        }
    }

    private _rotateRight() {
        switch (this._direction) {
            case 'down':
                this._direction = 'left'
                break
            case 'left':
                this._direction = 'up'
                break
            case 'right':
                this._direction = 'down'
                break
            case 'up':
                this._direction = 'right'
                break
        }
    }

    public Walk(): WalkResult {
        switch (this._room.hittTest(this._coordinate, this._direction)) {
            case 'obstable':
                this._rotateRight()
                return 'rotate'
                break
            case 'outofbounds':
                return 'finish'
            case 'tile':
                this._room.moveGuard(this._coordinate, this._direction)
                return 'move'
        }
    }
}