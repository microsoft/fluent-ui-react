import * as React from 'react'
import { shallow } from 'enzyme'

import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import Text from 'src/components/Text'

describe('Text', () => {
  isConformant(Text)

  test('renders children', () => {
    expect(mountWithProvider(<Text>children</Text>).text()).toEqual('children')
  })
})
