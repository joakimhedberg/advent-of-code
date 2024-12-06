import Room from "./Room"
import { Coordinate, TileType } from "./types"

export default class Tile {
    protected _tileType: TileType
    protected _symbol: string
    protected _coordinate: Coordinate

    protected _room: Room

    constructor(data: string, coordinate: Coordinate, room: Room) {
        this._coordinate = coordinate
        this._room = room
        switch(data) {
            case '.': this._tileType = 'floor'
            break
            case '#': this._tileType = 'obstacle'
            break
            case '<':
            case '>':
            case '^':
            case 'v':
                this._tileType = 'guard'
                break
            default:
                throw new Error('Invalid tile type')
        }

        this._symbol = data
    }

    public get tileType(): TileType {
        return this._tileType
    }
}