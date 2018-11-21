import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import ButtonGroup from 'src/components/Button/ButtonGroup'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import Button from 'src/components/Button/Button'
import { buttonGroupBehavior } from '../../../../src/lib/accessibility'
import { AccessibilityDefinition } from 'src/lib/accessibility/types'

const buttonGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(ButtonGroup)

describe('ButtonGroup', () => {
  isConformant(ButtonGroup)
  buttonGroupImplementsCollectionShorthandProp('buttons', Button)

  describe('accessibility', () => {
    handlesAccessibility(ButtonGroup, {
      defaultRootRole: 'presentation',
      focusZoneDefinition: (buttonGroupBehavior as AccessibilityDefinition).focusZone,
    })
  })
})
