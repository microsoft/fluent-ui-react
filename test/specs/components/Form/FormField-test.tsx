import { isConformant } from 'test/specs/commonTests'

import FormField from 'src/components/Form/FormField'
import { implementsShorthandProp } from '../../commonTests'
import Text from '../../../../src/components/Text'

const formFieldImplementsShorthandProp = implementsShorthandProp(FormField)

describe('FormField', () => {
  isConformant(FormField)
  formFieldImplementsShorthandProp('label', Text)
  formFieldImplementsShorthandProp('message', Text)
})
