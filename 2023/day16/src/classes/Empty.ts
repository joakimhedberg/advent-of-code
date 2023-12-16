import BeamDirection from "../enums/BeamDirection";
import GridItem from "./GridItem";
import LightBeam from "./LightBeam";

export default class Empty extends GridItem {
  public lightEnter(direction: BeamDirection, beamCallback: (beam: LightBeam) => void): LightBeam[] {
    return [this._grid.createBeam(this.coordinate, direction, beamCallback)]
  }
}