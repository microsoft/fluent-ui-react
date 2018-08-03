import React from 'react'

import { isConformant } from 'test/specs/commonTests'

import Input from 'src/components/Input/Input'
import { mountWithProvider } from 'test/utils'

describe('Input', () => {
  isConformant(Input)

  describe('icon shorthand', () => {
    it('creates the Icon component when the icon shorthand is provided', () => {
      const input = mountWithProvider(<Input icon="close" />).find('Icon[name="close"]')
      expect(input).not.toBe(undefined)
    })
  })
})
