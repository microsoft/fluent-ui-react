import { isConformant } from '../../commonTests'
import { ButtonGroup, Button } from '@fluentui/react'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'

const buttonGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(ButtonGroup)

describe('ButtonGroup', () => {
  isConformant(ButtonGroup)
  buttonGroupImplementsCollectionShorthandProp('buttons', Button)
})
