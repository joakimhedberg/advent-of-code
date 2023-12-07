import fs from 'fs'
import {Md5} from 'ts-md5'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

for (let i = 0; i < 6000000; i++) {
  const md = new Md5()
  md.appendStr(`${data}${i}`)
  const value = md.end()
  if (value.toString().startsWith('000000')) {
    console.log(i)
    console.log(value)
  }
}


console.log('Done')