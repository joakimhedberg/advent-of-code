export default class Variable {
  public readonly name: string
  public value: number
  
  constructor(name: string, value: number) {
    this.name = name
    this.value = value
  }
}