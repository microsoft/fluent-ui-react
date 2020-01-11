import { isConformant } from '../../commonTests'
import ButtonGroup from '@fluentui/react/src/components/Button/ButtonGroup'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import Button from '@fluentui/react/src/components/Button/Button'

const buttonGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(ButtonGroup)

describe('ButtonGroup', () => {
  isConformant(ButtonGroup)
  buttonGroupImplementsCollectionShorthandProp('buttons', Button)
})
