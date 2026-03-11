import fs from 'fs'
import turnDial from './turnDial'
const data = fs.readFileSync('./data/input.txt', 'utf-8')
turnDial(data.split('\n').map(t => t.trim()))