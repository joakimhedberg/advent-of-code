import fs from 'fs'
import BookOrder from './classes/BookOrder'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const order = new BookOrder(data)
console.log(`Part 1: ${order.calculateMidValues(data)}`)
order.fixInvalidItems(data)