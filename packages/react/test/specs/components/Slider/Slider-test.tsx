import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import Slider from 'src/components/Slider/Slider'

describe('Slider', () => {
  isConformant(Slider, {
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
    },
    autocontrolledPropMappings: {
      value: 'onChange',
    },
  })

  describe('accessibility', () => {
    handlesAccessibility(Slider, { partSelector: 'input' })
  })
})
