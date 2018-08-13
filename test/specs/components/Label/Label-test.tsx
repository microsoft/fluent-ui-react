import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Label from 'src/components/Label/Label'
import { mountWithProvider } from '../../../utils'

describe('Label', () => {
  isConformant(Label)

  describe('icon', () => {
    it('sets tabIndex="0" if the icon has onClick prop', () => {
      const icon = mountWithProvider(
        <Label icon={{ name: 'close', key: 'icon-key', onClick: () => {} }} />,
      ).find('Icon[name="close"]')

      expect(icon.prop('tabIndex')).toEqual('0')
    })
  })
})
