import BeamDirection from '../enums/BeamDirection'
import GridItem from './GridItem'
import LightBeam from './LightBeam'

export default class Mirror extends GridItem {
  private _lightEnterAngle60(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    switch (direction) {
      case BeamDirection.left:
        return [this._grid.createBeam(this.coordinate, BeamDirection.up, beamCallback)]
      case BeamDirection.right:
        return [this._grid.createBeam(this.coordinate, BeamDirection.down, beamCallback)]
      case BeamDirection.up:
        return [this._grid.createBeam(this.coordinate, BeamDirection.right, beamCallback)]
      case BeamDirection.down:
        return [this._grid.createBeam(this.coordinate, BeamDirection.left, beamCallback)]
    }
  }

  private _lightEnterAngle120(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    switch (direction) {
      case BeamDirection.left:
        return [this._grid.createBeam(this.coordinate, BeamDirection.down, beamCallback)]
      case BeamDirection.right:
        return [this._grid.createBeam(this.coordinate, BeamDirection.up, beamCallback)]
      case BeamDirection.up:
        return [this._grid.createBeam(this.coordinate, BeamDirection.left, beamCallback)]
      case BeamDirection.down:
        return [this._grid.createBeam(this.coordinate, BeamDirection.right, beamCallback)]
    }
  }

  public lightEnter(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    switch (this._item) {
      case '/':
        return this._lightEnterAngle60(direction, beamCallback)
      case '\\':
        return this._lightEnterAngle120(direction, beamCallback)
    }
  }
}