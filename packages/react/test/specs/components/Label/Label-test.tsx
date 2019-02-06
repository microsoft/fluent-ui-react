import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Label from 'src/components/Label/Label'
import Icon from 'src/components/Icon/Icon'
import Image from 'src/components/Image/Image'
import { mountWithProvider } from 'test/utils'
import { implementsShorthandProp } from '../../commonTests'

const labelImplementsShorthandProp = implementsShorthandProp(Label)

describe('Label', () => {
  isConformant(Label)
  labelImplementsShorthandProp('icon', Icon, { mapsValueToProp: 'name' })
  labelImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' })
})
