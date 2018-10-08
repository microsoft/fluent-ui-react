import * as React from 'react'

import { isConformant } from 'test/specs/commonTests'

import InputBase from 'src/components/Input/InputBase'
import { mountWithProvider } from 'test/utils'

describe('InputBase', () => {
  isConformant(InputBase, {
    eventTargets: {
      onChange: 'input',
    },
  })

  describe('input', () => {
    it('renders a text <input> by default', () => {
      const input = mountWithProvider(<InputBase placeholder="Search ..." />).find(
        'input[type="text"]',
      )
      expect(input).not.toBe(undefined)
    })
  })
})
