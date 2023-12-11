import fs from 'fs'
import LightController from './classes/LightController'
import ChristmasLightArray from './classes/ChristmasLightArray'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const controllers = LightController.parse(data)
const array = new ChristmasLightArray()
const arrayPart2 = new ChristmasLightArray(true)

controllers.forEach(controller => controller.perform(array))
controllers.forEach(controller => controller.perform(arrayPart2))
console.log('Part 1: ' + array.countOn)
console.log('Part 2: ' + arrayPart2.totalBrightness)