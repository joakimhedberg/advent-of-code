import fs from 'fs'
import LightController from './classes/LightController'
import ChristmasLightArray from './classes/ChristmasLightArray'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const controllers = LightController.parse(data)
const array = new ChristmasLightArray()

controllers.forEach(controller => controller.perform(array))

console.log('Part 1: ' + array.countOn)

// 379875 and 379350 are too high