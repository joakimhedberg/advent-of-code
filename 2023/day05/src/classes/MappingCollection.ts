import IMappingParseResult from "../interfaces/IMappingParseResult"
import ISeedMap from "../interfaces/ISeedMap"
import Fertilizer from "./Fertilizer"
import Humidity from "./Humidity"
import Light from "./Light"
import Mapping from "./Mapping"
import Seed from "./Seed"
import Soil from "./Soil"
import Temperature from "./Temperature"
import Water from "./Water"
import Location from "./Location"
import RangedSeed from "./RangedSeed"
import MappingRange from "./MappingRange"
import MappingItem from "./MappingItem"

export default class MappingCollection {
  public seedToSoil: Mapping = new Mapping('seed-to-soil')
  public soilToFertilizers: Mapping = new Mapping('soil-to-fertilizer')
  public fertilizerToWater: Mapping = new Mapping('fertilizer-to-water')
  public waterToLight: Mapping = new Mapping('water-to-light')
  public lightToTemperature: Mapping = new Mapping('light-to-temperature')
  public temperatureToHumidity: Mapping = new Mapping('temperature-to-humidity')
  public humidityToLocation: Mapping = new Mapping('humidity-to-location')
  
  public seeds = new Map<number, Seed>()
  public soils = new Map<number, Soil>()
  public fertilizers = new Map<number, Fertilizer>()
  public waters = new Map<number, Water>()
  public lights = new Map<number, Light>()
  public temperatures = new Map<number, Temperature>()
  public humidities = new Map<number, Humidity>()
  public locations = new Map<number, Location>()

  public parse(data: string): IMappingParseResult {
    this.seedToSoil = new Mapping('seed-to-soil')
    this.soilToFertilizers = new Mapping('soil-to-fertilizer')
    this.fertilizerToWater = new Mapping('fertilizer-to-water')
    this.waterToLight = new Mapping('water-to-light')
    this.lightToTemperature = new Mapping('light-to-temperature')
    this.temperatureToHumidity = new Mapping('temperature-to-humidity')
    this.humidityToLocation = new Mapping('humidity-to-location')
    const result: IMappingParseResult = {}

    result.seedToSoil = this.seedToSoil.parse(data)
    result.soilToFertilizers = this.soilToFertilizers.parse(data)
    result.fertilizerToWater = this.fertilizerToWater.parse(data)
    result.waterToLight = this.waterToLight.parse(data)
    result.lightToTemperature = this.lightToTemperature.parse(data)
    result.temperatureToHumidity = this.temperatureToHumidity.parse(data)
    result.humidityToLocation = this.humidityToLocation.parse(data)

    return result
  }

  public* traceSeedRangeToLocationIds(range: MappingRange) {
    for (const soilId of this.seedToSoil.getIntersectingValues(range)) {
      const fertilizerId = this.soilToFertilizers.findMatchingId(soilId)
      const waterId = this.fertilizerToWater.findMatchingId(fertilizerId)
      const lightId = this.waterToLight.findMatchingId(waterId)
      const temperatureId = this.lightToTemperature.findMatchingId(lightId)
      const humidityId = this.temperatureToHumidity.findMatchingId(temperatureId)
      const locationId = this.humidityToLocation.findMatchingId(humidityId)
      yield locationId
    }
  }

  public traceSeedToEnd(seed: Seed): ISeedMap {
    const result: ISeedMap = { seed: seed }
    this.seeds.set(seed.seedId, seed)

    this._trace<Seed, Soil>(
      seed.seedId,
      this.seedToSoil, this.soils,
      (id) => new Soil(id),
      (target) => {
        seed.soil = target
        result.soil = target
      },
    )

    this._trace<Soil, Fertilizer>(
      seed.soil.soilId,
      this.soilToFertilizers, this.fertilizers,
      (id) => new Fertilizer(id),
      (target) => {
        seed.soil.fertilizer = target
        result.fertilizer = target
      }
    )

    this._trace<Fertilizer, Water>(
      seed.soil.fertilizer.fertilizerId,
      this.fertilizerToWater, this.waters,
      (id) => new Water(id),
      (target) => {
        seed.soil.fertilizer.water = target
        result.water = target
      }
    )

    this._trace<Water, Light>(
      seed.soil.fertilizer.water.waterId,
      this.waterToLight, this.lights,
      (id) => new Light(id),
      (target) => {
        seed.soil.fertilizer.water.light = target
        result.light = target
      }
    )

    this._trace<Light, Temperature>(
      seed.soil.fertilizer.water.light.lightId,
      this.lightToTemperature, this.temperatures,
      (id) => new Temperature(id),
      (target) => {
        seed.soil.fertilizer.water.light.temperature = target
        result.temperature = target
      }
    )

    this._trace<Temperature, Humidity>(
      seed.soil.fertilizer.water.light.temperature.temperatureId,
      this.temperatureToHumidity, this.humidities,
      (id) => new Humidity(id),
      (target) => {
        seed.soil.fertilizer.water.light.temperature.humidity = target
        result.humidity = target
      }
    )

    this._trace<Humidity, Location>(
      seed.soil.fertilizer.water.light.temperature.humidity.humidityId,
      this.humidityToLocation, this.locations,
      (id) => new Location(id),
      (target) => {
        seed.soil.fertilizer.water.light.temperature.humidity.location = target
        result.location = target
      }
    )

    return result
  }

  private _trace<S, T>(sourceId: number, mapping: Mapping, map: Map<number, T>, instantiator: (id: number) => T, sourceSetter: (target: T) => void) {
    const targetId = mapping.findMatchingId(sourceId)
    let targetItem = map.get(targetId)
    if (!targetItem) {
      targetItem = instantiator(targetId)
      map.set(targetId, targetItem)
    }
    sourceSetter(targetItem)
  }
}