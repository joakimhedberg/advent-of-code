import OperatorPair from "./OperatorPair"

export default class MathEquation {
    public result: number
    public pairs: OperatorPair[] = []

    constructor(data: string) {
        const parts = data.split(':')
        this.result = parseInt(parts[0])
        const numbers = parts[1].trim().split(' ').map(item => parseInt(item))
        for (let i = 0; i < numbers.length - 1; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                this.pairs.push(new OperatorPair(numbers[i], numbers[j]))
            }
        }
    }

    public get total(): number {
        return this.pairs.map(m => m.result).reduce((a, b) => a + b)
    }

    public isValid(): boolean {

    }
}