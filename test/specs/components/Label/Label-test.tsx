import React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Label from 'src/components/Label/Label'
import { mountWithProvider } from '../../../utils'

describe('Label', () => {
  isConformant(Label)

  describe('onIconClick', () => {
    it('calls onIconClick when the icon is clicked', () => {
      const onClick = jest.fn()
      const button = mountWithProvider(
        <Label icon={{ name: 'close', key: 'icon-key' }} onIconClick={onClick} />,
      ).find('Icon[name="close"]')
      button.simulate('click')

      expect(onClick).toHaveBeenCalled()
    })
  })
})
