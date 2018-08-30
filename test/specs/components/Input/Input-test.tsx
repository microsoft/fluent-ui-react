import * as React from 'react'

import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'

import Input from 'src/components/Input/Input'
import Icon from 'src/components/Icon/Icon'
import { mountWithProvider } from 'test/utils'

describe('Input', () => {
  isConformant(Input, {
    eventTargets: {
      onChange: 'input',
    },
  })
  implementsShorthandProp(Input)('icon', Icon, { mapsValueToProp: 'name' })

  describe('input', () => {
    it('renders a text <input> by default', () => {
      const input = mountWithProvider(<Input placeholder="Search ..." />).find('input[type="text"]')
      expect(input).not.toBe(undefined)
    })
  })

  describe('icon', () => {
    it('creates the Icon component when the icon shorthand is provided', () => {
      const input = mountWithProvider(<Input icon={{ name: 'close' }} />).find('Icon[name="close"]')
      expect(input).not.toBe(undefined)
    })
  })
})
