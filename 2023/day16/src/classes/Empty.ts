import GridItem from "./GridItem";
import LightBeam from "./LightBeam";

export default class Empty extends GridItem {
  public lightEnter(direction: "left" | "right" | "up" | "down"): LightBeam[] {
    switch (direction) {
      case 'left':
        break
      case 'right':
        break
      case 'up':
        break
      case 'down':
        break
    }
  }
}