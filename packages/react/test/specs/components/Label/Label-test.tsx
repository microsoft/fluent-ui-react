import { isConformant, implementsShorthandProp } from '../../commonTests'

import { Label, Icon, Image } from '@fluentui/react'

const labelImplementsShorthandProp = implementsShorthandProp(Label)

describe('Label', () => {
  isConformant(Label)
  labelImplementsShorthandProp('icon', Icon, {
    mapsValueToProp: 'name',
    requiredShorthandProps: { name: 'at' },
  })
  labelImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' })
})
