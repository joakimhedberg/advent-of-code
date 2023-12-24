export default class Destination {
  public readonly name: string
  public readonly neighbors: [number, Destination][] = []

  constructor(name: string) {
    this.name = name
  }
}