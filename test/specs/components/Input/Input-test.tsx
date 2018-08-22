import * as React from 'react'

import { isConformant } from 'test/specs/commonTests'

import Input from 'src/components/Input/Input'
import { mountWithProvider } from 'test/utils'

describe('Input', () => {
  isConformant(Input)

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
