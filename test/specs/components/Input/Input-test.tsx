import React from 'react'

import { isConformant } from 'test/specs/commonTests'

import Input from 'src/components/Input/Input'
import { mountWithProvider } from 'test/utils'

describe('Input', () => {
  isConformant(Input)

  describe('onIconClick', () => {
    it('calls onIconClick when the icon is clicked', () => {
      const onClick = jest.fn()

      const input = mountWithProvider(<Input icon="close" onIconClick={onClick} />).find(
        'Icon[name="close"]',
      )
      input.simulate('click')
      expect(onClick).toHaveBeenCalled()
    })
  })
})
