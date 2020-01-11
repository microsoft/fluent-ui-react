import { isConformant, implementsShorthandProp } from '../../commonTests'

import Label from '@fluentui/react/src/components/Label/Label'
import Icon from '@fluentui/react/src/components/Icon/Icon'
import Image from '@fluentui/react/src/components/Image/Image'

const labelImplementsShorthandProp = implementsShorthandProp(Label)

describe('Label', () => {
  isConformant(Label)
  labelImplementsShorthandProp('icon', Icon, {
    mapsValueToProp: 'name',
    requiredShorthandProps: { name: 'at' },
  })
  labelImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' })
})
