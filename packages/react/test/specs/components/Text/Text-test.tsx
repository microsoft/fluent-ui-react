import * as React from 'react'

import { isConformant } from '../../commonTests'
import { mountWithProvider } from '../../../utils'

import { Text } from '@fluentui/react'

describe('Text', () => {
  isConformant(Text)

  test('renders children', () => {
    expect(mountWithProvider(<Text>children</Text>).text()).toEqual('children')
  })
})
