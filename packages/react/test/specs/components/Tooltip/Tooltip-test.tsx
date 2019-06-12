import * as React from 'react'

import Tooltip from 'src/components/Tooltip/Tooltip'

import { mountWithProvider } from '../../../utils'

describe('Tooltip', () => {
  describe('onOpenChange', () => {
    test('is called on hover', () => {
      const onOpenChange = jest.fn()

      mountWithProvider(<Tooltip trigger={<button />} content="Hi" onOpenChange={onOpenChange} />)
        .find('button')
        .simulate('mouseEnter')

      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'mouseenter' }),
        expect.objectContaining({ open: true }),
      )
    })

    // https://github.com/stardust-ui/react/pull/619
    test('is called on hover when controlled', () => {
      const onOpenChange = jest.fn()

      mountWithProvider(
        <Tooltip open={false} trigger={<button />} content="Hi" onOpenChange={onOpenChange} />,
      )
        .find('button')
        .simulate('mouseEnter')

      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'mouseenter' }),
        expect.objectContaining({ open: true }),
      )
    })
  })
})
