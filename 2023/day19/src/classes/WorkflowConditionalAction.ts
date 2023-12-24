import Part from "./Part"

export default class WorkflowConditionalAction {
  public operator: '>' | '<'
  public readonly source: string
  public readonly value: number
  public readonly targetWorkflow: string

  constructor(line: string) {
    const [condition, target] = line.split(':')
    if (condition.indexOf('>') > -1) {
      const [source, value] = condition.split('>')
      this.source = source
      this.value = parseInt(value)
      this.operator = '>'
    }
    else {
      const [source, value] = condition.split('<')
      this.source = source
      this.value = parseInt(value)
      this.operator = '<'
    }
    this.targetWorkflow = target
  }

  private _isOperatorMatch(value: number): boolean {
    switch (this.operator) {
      case '<':
        return value < this.value
      case '>':
        return value > this.value
    }
  }

  public isMatch(part: Part) {
    switch (this.source) {
      case 'x':
        return this._isOperatorMatch(part.x)
      case 'm':
        return this._isOperatorMatch(part.m)
      case 'a':
        return this._isOperatorMatch(part.a)
      case 's':
        return this._isOperatorMatch(part.s)
    }
  }
}