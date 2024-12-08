import Room from "./Room";
import Tile from "./Tile";
import { Coordinate } from "./types";

export default class Obstacle extends Tile {
  constructor(coordinate: Coordinate, room: Room) {
    super(coordinate, room)
    this._tileType = 'obstacle'
  }
}