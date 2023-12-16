import BeamDirection from "../enums/BeamDirection";
import GridItem from "./GridItem";
import LightBeam from "./LightBeam";

export default class Splitter extends GridItem {
  private _lightEnterVertical(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    switch (direction) {
      case BeamDirection.left:
      case BeamDirection.right:
        return [this._grid.createBeam(this.coordinate, direction, beamCallback)]
      case BeamDirection.up:
      case BeamDirection.down:
        return [
          this._grid.createBeam(this.coordinate, BeamDirection.left, beamCallback),
          this._grid.createBeam(this.coordinate, BeamDirection.right, beamCallback)
        ]
    }
  }

  private _lightEnterHorizontal(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    switch (direction) {
      case BeamDirection.up:
      case BeamDirection.down:
        return [this._grid.createBeam(this.coordinate, direction, beamCallback)]
      case BeamDirection.left:
      case BeamDirection.right:
        return [
          this._grid.createBeam(this.coordinate, BeamDirection.up, beamCallback),
          this._grid.createBeam(this.coordinate, BeamDirection.down, beamCallback)
        ]
    }
  }

  public lightEnter(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    switch (this._item) {
      case '-':
        return this._lightEnterHorizontal(direction, beamCallback)
      case '|':
        return this._lightEnterVertical(direction, beamCallback)
    }
  }
}