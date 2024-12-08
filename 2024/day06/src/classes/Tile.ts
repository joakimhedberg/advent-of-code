import Room from "./Room"
import { Coordinate, Direction, TileType } from "./types"

export default class Tile {
    protected _tileType: TileType
    protected _coordinate: Coordinate

    protected _room: Room

    public passed: boolean = false
    public passedDirection: Direction | undefined

    constructor(coordinate: Coordinate, room: Room) {
        this._coordinate = coordinate
        this._room = room
        this._tileType = 'floor'
   }

    public get tileType(): TileType {
        return this._tileType
    }

    public get x(): number {
        return this._coordinate.x
    }

    public get y(): number {
        return this._coordinate.y
    }

    public set x(value: number) {
        this._coordinate.x = value
    }

    public set y(value: number) {
        this._coordinate.y = value
    }
}