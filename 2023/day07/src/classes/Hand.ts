import HandTypeEnum from "../enums/HandTypeEnum"


export default class Hand {
  private _hand: string
  private _bid: number
  private _part2: boolean
  private _CARD_VALUES: string = '23456789TJQKA'
  constructor(line?: string, part2?: boolean) {
    this._part2 = part2
    if (part2) {
      this._CARD_VALUES = 'J23456789TQKA'
    }
    if (line) {
      this.parse(line)
    }
  }

  public parse(data: string): boolean {
    const [hand, bid] = data.trim().split(' ')
    this._hand = hand.trim()
    this._bid = parseInt(bid.trim())

    if (hand.length !== 5) {
      throw new Error('Invalid amount of cards')
    }

    for (const card of hand) {
      if (this._CARD_VALUES.indexOf(card) < 0) {
        throw new Error('Invalid card')
      }
    }

    return !isNaN(this._bid)
  }

  public get hand(): string {
    return this._hand
  }

  public get bid(): number {
    return this._bid
  }

  /*
    AAAAA: Five of a kind
    AAAA4: Four of a kind
    AABBB: Full house
    AAA34: Three of a kind
    AABB4: Two pairs
    AA234: Pair
    A1234: High Card
  */
  public get handType(): HandTypeEnum {
    const map = new Map<string, number>()
    for (const letter of this._hand) {
      map.set(letter, (map.get(letter) ?? 0) + 1)
    }

    if (this._part2) {
      if (this._hand === 'JJJJJ') return HandTypeEnum.FiveOfAKind
      const j = map.get('J')
      map.delete('J')
      if (j !== undefined) {
        let max: [string, number] = undefined
        for (const entry of map.entries()) {
          if (!max) {
            max = entry
          }
          else if (entry[1] > max[1]) {
            max = entry
            max = entry
          }
        }
        map.set(max[0], max[1] + j)
      }
    }

    let result = HandTypeEnum.HighCard
    map.forEach((amount) => {
      switch (amount) {
        case 2:
          switch (result) {
            case HandTypeEnum.HighCard:
              result = HandTypeEnum.Pair
              break
            case HandTypeEnum.Pair:
              result = HandTypeEnum.TwoPair
              break
            case HandTypeEnum.ThreeOfAKind:
              result = HandTypeEnum.FullHouse
              break
          }
          break
        case 3:
          switch (result) {
            case HandTypeEnum.HighCard:
              result = HandTypeEnum.ThreeOfAKind
              break
            case HandTypeEnum.Pair:
              result = HandTypeEnum.FullHouse
              break
          }
          break
        case 4:
          switch (result) {
            case HandTypeEnum.HighCard:
              result = HandTypeEnum.FourOfAKind
              break
          }
          break
        case 5:
          result = HandTypeEnum.FiveOfAKind
          break
      }
    })

    return result
  }

  public getScore(rank: number) {
    return this._bid * rank
  }

  public compare(hand2: Hand) {
    const ht = hand2.handType - this.handType
    if (ht !== 0) {
      return ht
    }
    for (let i = 0; i < this._hand.length; i++) {
      const l1 = this._CARD_VALUES.indexOf(this._hand[i])
      const l2 = this._CARD_VALUES.indexOf(hand2.hand[i])

      const comparison = l2 - l1
      if (comparison !== 0) {
        return comparison
      }
    }

    return 0
  }
  
}