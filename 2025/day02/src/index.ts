import fs from 'fs'
import DataSet from './classes/DataSet'
const data = fs.readFileSync('./data/input.txt', 'utf-8')

const dataSet = new DataSet(data)
console.log(`Part 1: ${dataSet.getTotal()}`) // 8576933996 is correct
console.log(`Part 2: ${dataSet.getTotal2()}`) // 25663320831
