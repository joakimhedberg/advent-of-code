const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default class InputLine {
  public readonly line: string
  public readonly index: number
  public readonly parts: string[]

  public readonly inputs: string[] = []
  public readonly target: string
  public value: number | undefined
  public inputValue: number | undefined

  constructor(line: string, index: number) {
    this.line = line
    this.index = index
    this.parts = line.split(' -> ')
    this.inputs = this.parts[0].trim().split(/NOT|RSHIFT|LSHIFT|AND|OR/g).filter(i => i.trim() !== '').map(i => i.trim())
    this.target = this.parts[1]
  }

  public tryCalculateInput(variableResolver: (varName: string) => number | undefined) {
    const value = this.parts[0]
    if (/^[0-9]/gm.test(value)) {
      this.inputValue = parseInt(value)
      return !isNaN(this.inputValue)
    }
    else if (/^[a-z]/gm.test(value)) {
      const res = variableResolver(value.split(' -> ')[0])
      if (res) {
        this.inputValue = res
        return !isNaN(this.inputValue)
      }
    } else if (value.startsWith('NOT ')) {
      const val = value.slice(4)
      if (val !== undefined) {
        this.inputValue = ~parseInt(val)
        return this.inputValue !== undefined
      }
    }

    const variables = this._splitVariables(value)
    if (variables.length === 2) {
      let variableValues = this._resolveVariables(variables, variableResolver)
      if (variableValues.length !== variables.length) return undefined
      if (value.indexOf('RSHIFT') > -1) {
        this.inputValue = variableValues[0] >> variableValues[1]
      } else if (value.indexOf('LSHIFT') > -1) {
        this.inputValue = variableValues[0] << variableValues[1]
      }
      else if (value.indexOf('OR') > -1) {
        this.inputValue = variableValues[0] | variableValues[1]
      }
      else if (value.indexOf('AND') > -1) {
        this.inputValue = variableValues[0] & variableValues[1]
      }
    }
    return this.inputValue !== undefined
  }

  private _resolveVariables(vars: string[], resolver: (varName: string) => number | undefined): number[] {
    const result: number[] = []
    for (const v of vars) {
      if (/[0-9]+/.test(v)) {
        result.push(parseInt(v))
      }
      else {
        const r = resolver(v)
        if (r !== undefined) {
          result.push(r)
        }
      }
    }

    return result
  }

  private _splitVariables(value: string) {
    return value.split(/RSHIFT|LSHIFT|AND|OR/)
  }

  /*  lf RSHIFT 1
      cj OR cp
      lx
      1 AND cx
      hb LSHIFT 1
      NOT kx
  */
  public static calculate(value: string, resolveVariable: (varName: string) => number | undefined) {
    if (value.startsWith('NOT')) {
      const v = value.slice(4)
      const resolved = resolveVariable(v)
      if (resolved !== undefined) {
        return ~resolved
      }
    }
    else if (value.indexOf('RSHIFT') > - 1) {
      const [first, second] = value.split(' RSHIFT ')
      const var1 = resolveVariable(first)
      const var2 = resolveVariable(second)
      if (var1 !== undefined && var2 !== undefined) {
        return var1 >> var2
      }
    } else if (value.indexOf('LSHIFT') > - 1) {
      const [first, second] = value.split(' LSHIFT ')
      const var1 = resolveVariable(first)
      const var2 = resolveVariable(second)
      if (var1 !== undefined && var2 !== undefined) {
        return var1 << var2
      }
    }
    else if (value.indexOf('AND') > - 1) {
      const [first, second] = value.split(' AND ')
      const var1 = resolveVariable(first)
      const var2 = resolveVariable(second)
      if (var1 !== undefined && var2 !== undefined) {
        return var1 & var2
      }
    } else if (value.indexOf('OR') > - 1) {
      const [first, second] = value.split(' OR ')
      const var1 = resolveVariable(first)
      const var2 = resolveVariable(second)
      if (var1 !== undefined && var2 !== undefined) {
        return var1 | var2
      }
    }
    else if (/[0-9]+/.test(value)) {
      return parseInt(value)
    } else if (/[a-z]+/.test(value)) {
      return resolveVariable(value)
    }
    return undefined
  }

}