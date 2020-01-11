import { isConformant } from '../../commonTests'

import Form from '@fluentui/react/src/components/Form/Form'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import FormField from '@fluentui/react/src/components/Form/FormField'

const formImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Form)

describe('Form', () => {
  isConformant(Form)
  formImplementsCollectionShorthandProp('fields', FormField, { mapsValueToProp: 'label' })
})
