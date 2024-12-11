import { Operator } from "../classes/Operator";

export function isValidItem(item: string, operators: Operator[]): boolean {
    const [result, number] = item.split(':').map(i => i.trim())
    const numericResult = parseInt(result)

    const numbers = number.split(' ').map(i => parseInt(i.trim()))

    for (const possibility of generatePossibilities(operators, numbers.length - 1)) {
        const expression: (number | string)[] = []
        let poss = 0
        for (let i = 0; i < numbers.length; i++) {
            expression.push(numbers[i])
            if (poss < possibility.length) {
                expression.push(possibility[poss])
            }
            poss++
        }
        console.log(expression)
        if (evaluateExpression(expression) === numericResult) {
            return true
        }
    }

    return false
}

export function getResultPart(item: string) {
    return parseInt(item.split(':')[0])
}

function evaluateExpression(expression: (number | string)[]): number | string {
  let result: number | string = expression[0]; // Start with the first number
  
  for (let i = 1; i < expression.length; i += 2) {
      const operator = expression[i]
      const nextValue = expression[i + 1]

      if (typeof nextValue !== "number") {
          throw new Error("Invalid expression: Numbers must follow operators.")
      }

      switch (operator) {
          case "+":
              if (typeof result === "string") {
                  throw new Error("Invalid operation: Cannot add to a string.")
              }
              result = (result as number) + nextValue
              break
          case "*":
              if (typeof result === "string") {
                  throw new Error("Invalid operation: Cannot multiply a string.")
              }
              result = (result as number) * nextValue
              break
          case "||":
              result = parseInt(result.toString() + nextValue.toString())
              break
          default:
              throw new Error(`Invalid operator: ${operator}`)
      }
  }
  
  return result
}

export function generatePossibilities(operators: Operator[], length: number): string[][] {
    const results: string[] = []
    if (length === 1) {
        return operators.map(operator => [operator]);
    }

    const smallerCombinations = generatePossibilities(operators, length - 1)
    const combinations: string[][] = []

    for (const operator of operators) {
        for (const smallerCombination of smallerCombinations) {
            combinations.push([operator, ...smallerCombination])
        }
    }

    return combinations
}