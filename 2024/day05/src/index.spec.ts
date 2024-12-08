import { expect, describe, test } from '@jest/globals'
import BookOrder from './classes/BookOrder'

describe('day05', () => {
  test('Part 1', () => {
    const data = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
    const order = new BookOrder(data)
    
    expect(order.calculateMidValues(data)).toBe(143)
  })

  test('Part 2', () => {
    const data = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

    const order = new BookOrder(data)
    expect(order.fixInvalidItems(data)).toBe(123)
  })

})