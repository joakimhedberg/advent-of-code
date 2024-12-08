export default class OperatorPair {
    public readonly number1: number
    public readonly number2: number

    public operator: Operator = '+'
    constructor(number1: number, number2: number) {
        this.number1 = number1
        this.number2 = number2
    }

    public get result(): number {
        switch(this.operator) {
            case '+':
                return this.number1 + this.number2
            case '*':
                return this.number1 * this.number2
        }
    }
}


export type Operator = '+' | '*'