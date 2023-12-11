import SpaceItem from "./SpaceItem";

export default class GalaxyResult {
  public paths: SpaceItem[][] = []
  public get shortestPath(): number {
    return this.paths.sort((a, b) => a.length - b.length)[0].length
  }
}