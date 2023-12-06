import Fertilizer from "../classes/Fertilizer";
import Humidity from "../classes/Humidity";
import Light from "../classes/Light";
import Seed from "../classes/Seed";
import Soil from "../classes/Soil";
import Temperature from "../classes/Temperature";
import Water from "../classes/Water";
import Location from '../classes/Location'
import RangedSeed from "../classes/RangedSeed";

interface ISeedMap {
  seed?: Seed
  soil?: Soil
  fertilizer?: Fertilizer
  water?: Water
  light?: Light
  temperature?: Temperature
  humidity?: Humidity
  location?: Location
}

export default ISeedMap