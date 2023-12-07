import { expect, describe, test } from '@jest/globals'
import Hand from './Hand'
import HandTypeEnum from '../enums/HandTypeEnum'

describe('Testing the hand class', () => {
  // A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2
  test('Expect the hand to be a high card', () => {
    const hand = new Hand()
    hand.parse('A982Q 22')
    expect(hand.handType).toBe(HandTypeEnum.HighCard)
  })

  test('Expect the hand to be a pair', () => {
    const hand = new Hand()
    hand.parse('A988Q 22')
    expect(hand.handType).toBe(HandTypeEnum.Pair)
  })

  test('Expect the hand to be two pairs', () => {
    const hand = new Hand()
    hand.parse('A8844 22')
    expect(hand.handType).toBe(HandTypeEnum.TwoPair)
  })

  test('Expect the hand to be three of a kind', () => {
    const hand = new Hand()
    hand.parse('38882 22')
    expect(hand.handType).toBe(HandTypeEnum.ThreeOfAKind)
  })

  test('Expect the hand to be a full house', () => {
    const hand = new Hand()
    hand.parse('88833 22')
    expect(hand.handType).toBe(HandTypeEnum.FullHouse)
  })

  test('Expect the hand to be four of a kind', () => {
    const hand = new Hand()
    hand.parse('88883 22')
    expect(hand.handType).toBe(HandTypeEnum.FourOfAKind)
  })

  test('Expect the hand to be five of a kind', () => {
    const hand = new Hand()
    hand.parse('88888 22')
    expect(hand.handType).toBe(HandTypeEnum.FiveOfAKind)
  })

  test('Compare hands and compare the results, part 2', () => {
    const hands = [
      new Hand('QQQQ7 42', true), // Four of a kind
      new Hand('7TTTA 42', true), // Three of a kind
      new Hand('JAAAA 42', true), // Five of a kind
      new Hand('74444 42', true), // Four of a kind
      new Hand('J4Q66 42', true), // Two pair
      new Hand('33AAA 42', true), // Full house
      new Hand('44ATQ 42', true), // Pair
      new Hand('34AKQ 42', true), // High card
      new Hand('TTT88 42', true), // Full house
      new Hand('7999A 42', true), // Three of a kind
      new Hand('TJTTT 42', true), // Five of a kind
      new Hand('488TQ 42', true), // Pair
      new Hand('34TKQ 42', true), // High card
      new Hand('43399 42', true) // Two pair
    ]

    expect(hands.sort((a, b) => a.compare(b)).map(h => h.hand)).toEqual([
      'TJTTT',
      'JAAAA',
      'QQQQ7',
      '74444',
      'TTT88',
      '33AAA',
      '7TTTA',
      '7999A',
      'J4Q66',
      '43399',
      '488TQ',
      '44ATQ',
      '34AKQ',
      '34TKQ'
    ])
  })

  test('Compare hands and compare the results', () => {
    const hands = [
      new Hand('QQQQ7 42'), // Four of a kind
      new Hand('7TTTA 42'), // Three of a kind
      new Hand('AAAAA 42'), // Five of a kind
      new Hand('74444 42'), // Four of a kind
      new Hand('44Q66 42'), // Two pair
      new Hand('33AAA 42'), // Full house
      new Hand('44ATQ 42'), // Pair
      new Hand('34AKQ 42'), // High card
      new Hand('TTT88 42'), // Full house
      new Hand('7999A 42'), // Three of a kind
      new Hand('TTTTT 42'), // Five of a kind
      new Hand('488TQ 42'), // Pair
      new Hand('34TKQ 42'), // High card
      new Hand('43399 42') // Two pair
    ]

    expect(hands.sort((a, b) => a.compare(b)).map(h => h.hand)).toEqual([
      'AAAAA',
      'TTTTT',
      'QQQQ7',
      '74444',
      'TTT88',
      '33AAA',
      '7TTTA',
      '7999A',
      '44Q66',
      '43399',
      '488TQ',
      '44ATQ',
      '34AKQ',
      '34TKQ'
    ])

  })
  
  test('Compare the examples to the expected results', () => {
    expect([
      new Hand('32T3K 765'),
      new Hand('T55J5 684'),
      new Hand('KK677 28'),
      new Hand('KTJJT 220'),
      new Hand('QQQJA 483')
    ].sort((h1, h2) => h1.compare(h2)).map((hand, index, hands) => hand.getScore(hands.length - index)).reduce((a, b) => a + b)).toEqual(6440)
  })
  
  test('Compare the examples to the expected results, part 2', () => {
    expect([
      new Hand('32T3K 765', true),
      new Hand('T55J5 684', true),
      new Hand('KK677 28', true),
      new Hand('KTJJT 220', true),
      new Hand('QQQJA 483', true)
    ].sort((h1, h2) => h1.compare(h2)).map((hand, index, hands) => hand.getScore(hands.length - index)).reduce((a, b) => a + b)).toEqual(5905)
  })
})