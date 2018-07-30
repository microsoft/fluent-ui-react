import React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Label from 'src/components/Label/Label'
import { mountWithProvider } from '../../../utils'

describe('Label', () => {
  isConformant(Label)

  describe('onRemove', () => {
    it('calls onRemove when clicking the removable icon', () => {
      const onRemove = jest.fn()
      const icon = mountWithProvider(<Label onRemove={onRemove} />).find('Icon[name="close"]')
      icon.simulate('click')
      expect(onRemove).toHaveBeenCalled()
    })
  })
})
