import Slider from 'src/components/Slider/Slider'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

describe('Slider', () => {
  isConformant(Slider)
  handlesAccessibility(Slider)
})
