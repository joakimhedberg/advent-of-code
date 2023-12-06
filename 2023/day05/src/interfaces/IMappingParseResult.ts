interface IMappingParseResult {
  seedToSoil?: number,
  soilToFertilizers?: number,
  fertilizerToWater?: number,
  waterToLight?: number,
  lightToTemperature?: number,
  temperatureToHumidity?: number,
  humidityToLocation?: number
}

export default IMappingParseResult