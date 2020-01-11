import { isConformant, handlesAccessibility } from '../../commonTests'
import Slider from '@fluentui/react/src/components/Slider/Slider'

describe('Slider', () => {
  isConformant(Slider, {
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
    },
  })

  describe('accessibility', () => {
    handlesAccessibility(Slider, { partSelector: 'input' })
  })
})
