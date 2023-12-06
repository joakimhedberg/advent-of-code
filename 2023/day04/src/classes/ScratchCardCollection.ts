import ScratchCard from "./ScratchCard"

export default class ScratchCardCollection {
  public cards: ScratchCard[] = []
  
  public parse(data: string): boolean {
    for (const line of data.split('\n')) {
      const card = new ScratchCard(this)
      if (card.parse(line)) {
        this.cards.push(card)
      }
    }

    return this.cards.length > 0
  }

  public getExtendedWinners(): ScratchCard[] {
    const result: ScratchCard[] = [...this.cards]
    for (let i = 0; i < result.length; i++) {
      const card = result[i]
      if (card.winningNumbers.length > 0) {
        result.splice(i + 1, 0, ...this.cards.slice(this.cards.indexOf(card) + 1, this.cards.indexOf(card) + 1 + card.winningNumbers.length))
      }
    }

    return result
  }
}