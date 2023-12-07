import { test, describe, expect } from '@jest/globals'
import NaughtyOrNice from './NaughtyOrNice'

describe('Test the naughty or nice class', () => {
  test('Expect a naughty reply', () => {
    expect(new NaughtyOrNice('nvrslorjpqaasudn').isNice).toBe(false)
  })

  test('Expect a nice reply', () => {
    expect(new NaughtyOrNice('kkcuvbezftvkhebf').isNice).toBe(true)
  })

  test('Expect a nice reply, part2', () => {
    expect (new NaughtyOrNice('qjhvhtzxzqqjkmpb').isNice2).toBe(true)
  })

  test('Expect a nice reply, part2', () => {
    expect (new NaughtyOrNice('xxyxx').isNice2).toBe(true)
  })

  test('Expect a naughty reply, part2', () => {
    expect (new NaughtyOrNice('uurcxstgmygtbstg').isNice2).toBe(false)
  })

  test('Expect a naughty reply, part2', () => {
    expect (new NaughtyOrNice('ieodomkazucvgmuy').isNice2).toBe(false)
  })
  
  test('Expect repeat letters to be true', () => {
    expect( new NaughtyOrNice('ueihvxviirnooomi').hasRepeat).toBe(true)
  })

  test('Expect dual pairs to be false', () => {
    expect( new NaughtyOrNice('ueihvxviirnooomi').hasDualPairs).toBe(false)
  })
})