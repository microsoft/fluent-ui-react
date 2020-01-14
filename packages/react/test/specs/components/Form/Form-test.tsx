import { isConformant } from '../../commonTests'

import { Form, FormField } from '@fluentui/react'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'

const formImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Form)

describe('Form', () => {
  isConformant(Form)
  formImplementsCollectionShorthandProp('fields', FormField, { mapsValueToProp: 'label' })
})
